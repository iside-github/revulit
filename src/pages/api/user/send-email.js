import nc from 'next-connect';
import User from '../../../models/user';
import db from '../../../utils/db';
import { createToken } from '../../../utils/password-token';
import nodemailer from 'nodemailer';
// import { isAuth } from '../../../utils/auth';

const handler = nc();

// handler.use(isAuth);
handler.post(async (req, res) => {
    try {
        await db.connect();
        const user = await User.findOne({ email: req.body.email });
        await db.disconnect();
        if (!user) return res.status(404).json({ message: 'User not found' });
        const token = createToken(user);

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
            to: user.email,
            subject: 'Change your password',
            text: `Change your password: http://localhost:3000//authentication/password-reset?auth=${token}`,
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
            message: 'We sent a message to your email',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
