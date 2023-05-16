import nc from 'next-connect';
import User from '../../../../../models/user';
import db from '../../../../../utils/db';
import { checkUserRole } from '../../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('admin'));
handler.put(async (req, res) => {
    try {
        const { isBlock } = req.body;
        await db.connect();
        const user = await User.findById(req.query.id);
        if (!user)
            return res.status(404).send({
                message: 'User not found',
            });
        if (user.roles.includes('admin') || user.roles.includes('superadmin'))
            return res.status(500).send({
                message: 'Bad request',
            });
        await User.findByIdAndUpdate(user._id, { isBlock });

        await db.disconnect();

        res.status(200).send({
            message: 'User updated successfully',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
