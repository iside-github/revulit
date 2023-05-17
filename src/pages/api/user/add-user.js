import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import db from '../../../utils/db';
import { checkUserRole } from '../../../utils/auth';
import { createToken } from '../../../utils/password-token';
import nodemailer from 'nodemailer';

const handler = nc();

handler.use(checkUserRole('admin'));
handler.post(async (req, res) => {
    try {
        const pwd = 'custom-password';
        await db.connect();
        const admin = await User.findById(req.user.user.user._id);
        const salt = bcrypt.genSaltSync(10);

        const newUser = new User({
            email: req.body.email,
            password: pwd,
            roles: ['user'],
            company: admin.company,
            name: req.body.name,
            isBlock: true,
        });

        await newUser.save();
        const hashPassword = bcrypt.hashSync(pwd, salt);

        newUser.password = hashPassword;
        const savedUser = await newUser.save();
        await db.disconnect();

        const token = createToken(savedUser, '1y');

        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            auth: {
                user: 'jamshidbekml@mail.ru',
                pass: '9f5AfnrcyQFuUmUmZa5m',
            },
        });

        // Xabar obyektini tuzish
        let mailOptions = {
            from: '"Company Name" <jamshidbekml@mail.ru>',
            to: savedUser.email,
            subject: 'Confirm your email',
            html: `<a href="vipsavdo.uz/?auth=${token}">Confirm my account</a>`,
        };

        // Xabarni yuborish
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Xabar yuborildi: ' + info.response);
            }
        });

        res.status(200).send({
            message: 'Confirmation sent successfully',
        });
    } catch (error) {
        if (error.message.includes('email_1 dup key'))
            return res.status(400).json({ message: 'Email already in use' });
        res.status(400).json({ message: error.message });
    }
});

export default handler;
