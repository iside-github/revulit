import nc from 'next-connect';
import Company from '../../../../../models/companies';
import db from '../../../../../utils/db';
import { checkUserRole } from '../../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole(['admin', 'superadmin']));
handler.post(async (req, res) => {
    try {
        await db.connect();
        const company = await Company.findById(req.query.id);

        if (!company)
            return res.status(404).send({
                message: 'Company not found',
            });
        company.name = req.body.name;
        company.isBlock =
            req.body.isBlock !== undefined ? req.body.isBlock : company.isBlock;
        const updatedCompany = await company.save();

        await db.disconnect();
        res.status(200).send({
            company: updatedCompany,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
