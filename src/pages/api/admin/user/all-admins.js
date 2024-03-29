import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../../models/user';
import db from '../../../../utils/db';
import { checkUserRole } from '../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('superadmin'));
handler.get(async (req, res) => {
    try {
        await db.connect();
        const users = await User.aggregate([
            {
                $match: {
                    roles: {
                        $elemMatch: { $regex: 'admin', $options: 'i' },
                    },
                },
            },
            {
                $project: {
                    email: 1,
                    name: 1,
                    isBlock: 1,
                    avatar: 1,
                    createdAt: 1,
                },
            },
        ]);

        await db.disconnect();

        res.status(200).send({
            users,
        });
    } catch (error) {
        if (error.message.includes('email_1 dup key'))
            return res.status(400).json({ message: 'Email already in use' });
        res.status(400).json({ message: error.message });
    }
});

export default handler;
