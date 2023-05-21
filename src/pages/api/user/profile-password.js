import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import db from '../../../utils/db';
import { isAuth } from '../../../utils/auth';
import bcryptjs from 'bcryptjs';

const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
    try {
        const { password, oldPassword } = req.body;
        await db.connect();
        const user = await User.findById(req.user.user.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValid = bcryptjs.compareSync(oldPassword, user.password);
        if (!isValid) throw new Error('Incorrect password');

        const salt = bcrypt.genSaltSync(10);

        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        await db.disconnect();
        res.status(200).send({ message: 'Password changed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
