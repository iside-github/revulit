import nc from 'next-connect';
import User from '../../../../models/user';
import db from '../../../../utils/db';
import { checkUserRole } from '../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('superadmin'));
handler.put(async (req, res) => {
    try {
        const { users, isBlock } = req.body;
        await db.connect();

        users.forEach(async (id) => {
            let user = await User.findById(id);
            if (user) {
                await User.findByIdAndUpdate(id, { isBlock });
            }
        });

        await db.disconnect();

        res.status(200).send({
            message: 'Users updated successfully',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
