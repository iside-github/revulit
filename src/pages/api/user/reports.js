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
        const reports = await Reports.find({
            company: user.company,
        })
            .select('-html')
            .populate({ path: 'user', select: 'email name avatar' });

        await db.disconnect();
        res.status(200).send({
            reports,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
