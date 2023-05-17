import nc from 'next-connect';
import Reports from '../../../models/reports';
import db from '../../../utils/db';
import { isAuth } from '../../../utils/auth';
import { htmlResolver } from '../../../utils/htmlReader';

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        await db.connect();
        const reports = await Reports.find({
            company: req.user.company,
            // user: { $ne: req.user._id },
        }).populate('user', 'email');

        const response = reports.map((report) => {
            const result = htmlResolver(report.html);

            return {
                _id: report._id,
                file_name: report.file_name,
                file_src: report.file_src,
                report: result,
                user: report.user.email,
            };
        });

        await db.disconnect();
        res.status(200).send({
            reports: response,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
