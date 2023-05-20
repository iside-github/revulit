import nc from 'next-connect';
import Reports from '../../../../models/reports';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        const userName = req.query.name;
        await db.connect();
        const reports = await Reports.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $addFields: {
                    userName: { $first: '$user.name' },
                },
            },
            {
                $match: {
                    userName: {
                        $regex: userName,
                        $options: 'i',
                    },
                },
            },
            {
                $project: {
                    html: 0,
                    user: 0,
                },
            },
            {
                $limit: 10,
            },
        ]);
        await db.disconnect();

        res.status(200).send({ reports });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
