import nc from 'next-connect';
import db from '../../../utils/db';
import Files from '../../../models/files';
import { isAuth } from '../../../utils/auth';
import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/static/uploads/files/');
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

const uploadMiddleware = upload.single('file');

const handler = nc();

handler.use(isAuth);
handler.use(uploadMiddleware);
handler.post(async (req, res) => {
    try {
        const maxSize = 10; // 10mb
        const array_of_allowed_files = [
            'csv',
            'xml',
            'xlsx',
            'xlsm',
            'xlsb',
            'xltx',
            'xltm',
            'xls',
            'xlt',
            'slk',
            'dif',
            'txt',
            'pdf',
            'doc',
        ];
        const file_extension = req.file.originalname.slice(
            ((req.file.originalname.lastIndexOf('.') - 1) >>> 0) + 2
        );
        if (req.file && !array_of_allowed_files.includes(file_extension))
            return res.status(500).json({ message: 'Invalid file' });

        if (req.file.size > 1024 * 1024 * maxSize)
            return res.status(500).send({
                message: 'File is too big',
            });
        await db.connect();

        const file = new Files({
            src: req.file.filename,
            name: req.file.originalname,
            user: req.user._id,
        });
        await file.save();
        await db.disconnect();

        res.status(200).send({
            message: 'file uploaded successfully',
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
