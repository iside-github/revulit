import User from '../models/user';
import bcrypt from 'bcryptjs';
import db from '../utils/db';

export const adminCreator = async () => {
    await db.connect();
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
        const salt = bcrypt.genSaltSync(10);

        const hashPassword = bcrypt.hashSync('example123', salt);
        const newAdmin = new User({
            email: 'admin@example.com',
            password: hashPassword,
            roles: ['user', 'admin', 'superadmin'],
        });

        await newAdmin.save();
    }
    await db.disconnect();
};
