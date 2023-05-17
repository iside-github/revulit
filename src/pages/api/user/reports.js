import nc from 'next-connect';
import Reports from '../../../models/reports';
import db from '../../../utils/db';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        await db.connect();
        const reports = await Reports.find({
            company: req.user.company,
        })
            .populate('user', 'email name avatar')
            .select('-html');

        await db.disconnect();
        res.status(200).send({
            reports,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
