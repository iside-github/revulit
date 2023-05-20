import nc from 'next-connect';
import User from '../../../../../models/user';
import db from '../../../../../utils/db';
import { checkUserRole } from '../../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('superadmin'));
handler.put(async (req, res) => {
    try {
        await db.connect();
        const user = await User.findById(req.query.id);
        if (!user)
            return res.status(404).send({
                message: 'User not found',
            });
        await User.findByIdAndDelete(user._id);

        await db.disconnect();

        res.status(200).send({
            message: 'User deleted successfully',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
