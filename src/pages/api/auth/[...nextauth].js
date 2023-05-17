import NextAuth from 'next-auth';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import Session from '../../../models/sessions';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';
import { adminCreator } from '../../../utils/superAdminCreator';
import { getDeviceInfo } from '../../../utils/getDeviceInfo';
import * as jwt from 'jsonwebtoken';

export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 * 60 * 60,
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
        encode: async ({ secret, token }) => {
            return jwt.sign({ ...token, userId: token.id }, secret, {
                algorithm: 'HS256',
            });
        },
        decode: async ({ secret, token }) => {
            return jwt.verify(token, secret, { algorithms: ['HS256'] });
        },
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials, req) {
                adminCreator();
                await db.connect();
                console.log(credentials);
                const userData = await User.findOne({
                    email: credentials.email,
                });
                if (!userData) throw new Error('User not found');
                const isValid = bcryptjs.compareSync(
                    credentials.password,
                    userData.password
                );
                if (!isValid) throw new Error('Incorrect password');
                if (userData.isBlock)
                    throw new Error('Your profile is blocked');
                const token = signToken(userData);
                const { ipAddress, deviceName } = getDeviceInfo(req);
                const session = new Session({
                    ip_address: ipAddress,
                    device: deviceName,
                    user: userData._id,
                });
                await session.save();
                await db.disconnect();

                // Return the user object along with the token
                return {
                    user: {
                        isBlock: userData?.isBlock,
                        _id: userData?._id,
                        email: userData?.email,
                    },
                    token,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Store the user object in the token
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            // Store the user object and token in the session
            session.user = token.user;
            session.token = token;
            return session;
        },
    },
});
