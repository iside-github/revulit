import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import Session from '../../../models/sessions';
import db from '../../../utils/db';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        await db.connect();
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: 'User not found' });
        const sessions = await Session.find({ user: req.user._id }).sort({
            createdAt: -1,
        });
        await db.disconnect();
        res.status(200).send({
            user,
            sessions,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

handler.put(async (req, res) => {
    try {
        const { password, security_update, news_message } = req.body;
        await db.connect();
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const salt = bcrypt.genSaltSync(10);
        var hashPassword;
        if (password) {
            hashPassword = bcrypt.hashSync(password, salt);
        }
        const newUser = await User.findByIdAndUpdate(req.user._id, {
            password: hashPassword,
            security_update,
            news_message,
        });
        await db.disconnect();
        res.status(200).send({
            user: newUser,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
