import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import db from '../../../utils/db';
import { checkToken } from '../../../utils/password-token';

const handler = nc();

handler.use(checkToken);
handler.post(async (req, res) => {
    try {
        await db.connect();
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.new_password, salt);

        user.password = hashPassword;
        await user.save();
        await db.disconnect();
        res.status(200).send({
            message: 'Password changed',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
