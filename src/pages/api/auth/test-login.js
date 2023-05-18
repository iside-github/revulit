import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();
handler.post(async (req, res) => {
    try {
        await db.connect();
        const user = await User.findOne({ email: req.body.email });
        await db.disconnect();
        if (!user) return res.status(404).send({ message: 'User not found' });

        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid)
            return res.status(400).send({
                message: 'Incorrect Password',
            });

        const token = signToken(user);
        res.status(200).send({
            token,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
