import nc from 'next-connect';
import Category from '../../../models/categories';
import db from '../../../utils/db';
import { checkUserRole } from '../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('superadmin'));
handler.get(async (req, res) => {
    try {
        await db.connect();
        const categories = await Category.find();

        await db.disconnect();

        res.status(200).send({
            categories,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
