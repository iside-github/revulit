import nc from 'next-connect';
import Reports from '../../../../models/reports';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';
import { htmlFilter } from '../../../../utils/htmlReader';

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        const [id, category] = req.query.queries;
        await db.connect();
        const report = await Reports.findById(id).select('html');
        await db.disconnect();

        const data = htmlFilter(report.html, category);

        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
