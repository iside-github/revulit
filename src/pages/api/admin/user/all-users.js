import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../../models/user';
import db from '../../../../utils/db';
import { checkUserRole } from '../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('admin'));
handler.get(async (req, res) => {
    try {
        await db.connect();
        const admin = await User.findById(req.user.user.user._id);
        const users = await User.aggregate([
            {
                $match: {
                    company: admin.company,
                    roles: {
                        $not: {
                            $elemMatch: { $regex: 'admin', $options: 'i' },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'reports',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'reportsCount',
                },
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'company',
                    foreignField: '_id',
                    as: 'company',
                },
            },
            {
                $project: {
                    email: 1,
                    name: 1,
                    company: '$company.name',
                    isBlock: 1,
                    avatar: 1,
                    createdAt: 1,
                    reportCount: { $size: '$reportsCount' },
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
