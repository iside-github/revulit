import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../../models/user';
import db from '../../../../utils/db';
import { checkUserRole } from '../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('admin'));
handler.post(async (req, res) => {
    try {
        await db.connect();
        const admin = await User.findById(req.user._id);
        const salt = bcrypt.genSaltSync(10);

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            roles: ['user'],
            company: admin.company,
            name: req.body.name,
        });

        await newUser.save();
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        newUser.password = hashPassword;
        await newUser.save();
        await db.disconnect();

        res.status(200).send({
            message: 'User created successfully',
        });
    } catch (error) {
        if (error.message.includes('email_1 dup key'))
            return res.status(400).json({ message: 'Email already in use' });
        res.status(400).json({ message: error.message });
    }
});

export default handler;
