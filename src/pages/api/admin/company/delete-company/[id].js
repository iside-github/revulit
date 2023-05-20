import nc from 'next-connect';
import Company from '../../../../models/companies';
import db from '../../../../utils/db';
import { checkUserRole } from '../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('superadmin'));
handler.post(async (req, res) => {
    try {
        await db.connect();
        const company = await Company.findById(req.query.id);

        if (!company)
            return res.status(404).send({
                message: 'Company not found',
            });
        await Company.finByIdAndDelete(req.query.id);

        await db.disconnect();
        res.status(200).send({
            message: 'Company was successfully deleted',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
