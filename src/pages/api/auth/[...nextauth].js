import NextAuth from 'next-auth';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';
import * as jwt from 'jsonwebtoken';
import { adminCreator } from '../../../utils/superAdminCreator';

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
            async authorize(credentials) {
                adminCreator();
                await db.connect();
                const userData = await User.findOne({
                    email: credentials.email,
                });
                await db.disconnect();
                if (!userData) throw new Error('User not found');
                if (
                    bcryptjs.compareSync(
                        credentials.password,
                        userData.password
                    )
                )
                    throw new Error('Incorrect password');
                const token = signToken(userData);
                return { access_token: token };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, data }) {
            if (data) {
                const { access_token } = data;
                token.accessToken = access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
