import nc from 'next-connect';
import Company from '../../../../models/companies';
import db from '../../../../utils/db';
import { checkUserRole } from '../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('superadmin'));
handler.post(async (req, res) => {
    try {
        await db.connect();

        const newCompany = new Company({
            name: req.body.name,
        });

        const comapny = await newCompany.save();
        res.status(200).send({
            comapny,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
