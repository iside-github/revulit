import nc from 'next-connect';
import Reports from '../../../../models/reports';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';
import { htmlFilter } from '../../../../utils/htmlReader';

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        const [id] = req.query.queries;
        const category = req.query.category;
        await db.connect();
        const report = await Reports.findById(id).select('html');
        await db.disconnect();

        var data =
            category !== 'total'
                ? await new Promise((resolve) => {
                      let html = htmlFilter(report.html, category);
                      resolve(html);
                  })
                : report.html;

        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
