import nc from 'next-connect';
import Company from '../../../../models/companies';
import db from '../../../../utils/db';
import { checkUserRole } from '../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('superadmin'));
handler.post(async (req, res) => {
    try {
        await db.connect();
        const companies = await Company.find().sort({ createdAd: -1 });
        const company = await Company.create({
            name: req.body.name,
            uid: companies.length ? companies[companies.length - 1].uid + 1 : 1,
        });

        await db.disconnect();
        res.status(200).send({
            company,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
