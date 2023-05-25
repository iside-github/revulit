import nc from 'next-connect';
import User from '../../../../../models/user';
import Reports from '../../../../../models/reports';
import db from '../../../../../utils/db';
import { isAuth } from '../../../../../utils/auth';
import { getDays } from '../../../../../utils/getDays';
import { getStatistics } from '../../../../../utils/getStatistics';
import { getDatesBeforeToday } from '../../../../../utils/getDatesBeforeToday';

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        const { startTime, endTime } = req.query;

        await db.connect();
        const admin = await User.findById(req.user.user.user._id).populate({
            path: 'company',
            select: 'name',
        });
        var days;

        if (startTime && endTime) {
            days = getDays(startTime, endTime);
        } else {
            days = getDatesBeforeToday(10);
        }
        await db.disconnect();

        const data = days.map(async (day) => {
            return {
                day,
                statistics: await getStatistics(day, admin.company._id),
            };
        });

        Promise.all(data).then((values) => {
            res.status(200).send(values);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
