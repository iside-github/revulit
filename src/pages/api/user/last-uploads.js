import nc from 'next-connect';
import Reports from '../../../models/reports';
import User from '../../../models/user';
import db from '../../../utils/db';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        await db.connect();
        const user = await User.findById(req.user.user.user._id);
        const reports = await Reports.aggregate([
            {
                $match: {
                    user: user._id,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    html: 0,
                },
            },
        ]);
        await db.disconnect();

        res.status(200).send({ last_uploads: reports });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
