import nc from 'next-connect';
import Company from '../../../../../models/companies';
import db from '../../../../../utils/db';
import { checkUserRole } from '../../../../../utils/auth';
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
                file?.fieldname +
                    '-' +
                    uniqueSuffix +
                    '.' +
                    file?.mimetype.split('/')[1]
            );
        },
    }),
});

const uploadMiddleware = upload.single('avatar');

const handler = nc();

handler.use(checkUserRole(['admin', 'superadmin']));
handler.use(uploadMiddleware);
handler.post(async (req, res) => {
    try {
        const maxSize = 5;
        const array_of_allowed_files = ['png', 'jpeg', 'jpg'];
        const array_of_allowed_file_types = [
            'image/png',
            'image/jpeg',
            'image/jpg',
        ];
        const file_extension = req.file?.originalname.slice(
            ((req.file?.originalname.lastIndexOf('.') - 1) >>> 0) + 2
        );

        if (
            (req.file && !array_of_allowed_files.includes(file_extension)) ||
            (req.file &&
                !array_of_allowed_file_types.includes(req.file?.mimetype))
        )
            return res.status(500).json({ message: 'Invalid file' });

        if (req.file?.size > 1024 * 1024 * maxSize)
            return res.status(500).send({
                message: 'File is too big',
            });

        await db.connect();
        const company = await Company.findById(req.query.id);

        if (!company)
            return res.status(404).send({
                message: 'Company not found',
            });
        company.name = req.body?.name ? req.body.name : company.name;
        company.email = req.body?.email ? req.body.email : company.email;
        company.isBlock =
            req.body?.isBlock !== undefined
                ? req.body.isBlock
                : company.isBlock;
        company.avatar = req.file ? req.file?.filename : company.avatar;
        const updatedCompany = await company.save();

        await db.disconnect();
        res.status(200).send({
            company: updatedCompany,
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
