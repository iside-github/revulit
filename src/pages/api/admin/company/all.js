import nc from 'next-connect';
import Company from '../../../../models/companies';
import db from '../../../../utils/db';
import { checkUserRole } from '../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('superadmin'));
handler.get(async (req, res) => {
    try {
        await db.connect();
        const companies = await Company.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'company',
                    as: 'users',
                },
            },
            {
                $lookup: {
                    from: 'reports',
                    localField: 'users._id',
                    foreignField: 'user',
                    as: 'repors',
                },
            },
            {
                $addFields: {
                    userCount: {
                        $cond: {
                            if: { $isArray: '$users' },
                            then: { $size: '$users' },
                            else: 0,
                        },
                    },
                    repoCount: {
                        $cond: {
                            if: { $isArray: '$repos' },
                            then: { $size: '$repos' },
                            else: 0,
                        },
                    },
                },
            },
            {
                $project: {
                    uid: 1,
                    email: 1,
                    name: 1,
                    createdAt: 1,
                    userCount: 1,
                    repoCount: 1,
                },
            },
        ]);

        await db.disconnect();

        res.status(200).send({
            companies,
        });
    } catch (error) {
        if (error.message.includes('email_1 dup key'))
            return res.status(400).json({ message: 'Email already in use' });
        res.status(400).json({ message: error.message });
    }
});

export default handler;
