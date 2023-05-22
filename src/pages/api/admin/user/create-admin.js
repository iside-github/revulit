import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../../models/user';
import db from '../../../../utils/db';
import { checkUserRole, signToken } from '../../../../utils/auth';

const handler = nc();

handler.use(checkUserRole('superadmin'));
handler.post(async (req, res) => {
    try {
        await db.connect();
        const salt = bcrypt.genSaltSync(10);

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            roles: req.body.roles,
            company: req.body.companyId,
            name: req.body.name,
        });

        await newUser.save();
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        newUser.password = hashPassword;
        const savedUser = await newUser.save();
        await db.disconnect();
        res.status(200).send({
            user: savedUser,
        });
    } catch (error) {
        if (error.message.includes('email_1 dup key'))
            return res.status(400).json({ message: 'Email already in use' });
        res.status(400).json({ message: error.message });
    }
});

export default handler;
