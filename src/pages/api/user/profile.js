import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import Session from '../../../models/sessions';
import db from '../../../utils/db';
import { isAuth } from '../../../utils/auth';
import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'src/public/uploads/images/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(
                null,
                file.fieldname +
                    '-' +
                    uniqueSuffix +
                    '.' +
                    file['mimetype'].split('/')[1]
            );
        },
    }),
});

const uploadMiddleware = upload.single('avatar');

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

handler.use(uploadMiddleware);
handler.put(async (req, res) => {
    try {
        const { password, security_update, news_message, name } = req.body;
        await db.connect();
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const salt = bcrypt.genSaltSync(10);

        user.password = password
            ? bcrypt.hashSync(password, salt)
            : user.password;
        user.security_update = security_update
            ? security_update
            : user.security_update;
        user.news_message = news_message ? news_message : user.news_message;
        user.avatar = req.file ? req.file.filename : user.avatar;
        user.name = name ? name : user.name;
        await user.save();
        await db.disconnect();
        res.status(200).send({
            user,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
