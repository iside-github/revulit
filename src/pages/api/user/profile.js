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
            cb(null, 'public/static/uploads/images/');
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
        const user = await User.findById(req.user.user.user._id)
            .select('-password -roles')
            .populate({ path: 'company', select: 'name avatar' });

        if (!user) return res.status(404).json({ message: 'User not found' });
        const sessions = await Session.find({
            user: req.user.user.user._id,
        }).sort({
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
        const maxSize = 5; // 10mb
        const array_of_allowed_files = ['png', 'jpeg', 'jpg'];
        const array_of_allowed_file_types = [
            'image/png',
            'image/jpeg',
            'image/jpg',
        ];
        const file_extension = req.file.originalname.slice(
            ((req.file.originalname.lastIndexOf('.') - 1) >>> 0) + 2
        );

        if (
            (req.file && !array_of_allowed_files.includes(file_extension)) ||
            !array_of_allowed_file_types.includes(req.file.mimetype)
        )
            return res.status(500).json({ message: 'Invalid file' });

        if (req.file.size > 1024 * 1024 * maxSize)
            return res.status(500).send({
                message: 'File is too big',
            });

        const { password, security_update, news_message, name } = req.body;
        await db.connect();
        const user = await User.findById(req.user.user.user._id);

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
        bodyParser: false,
    },
};
