import nc from 'next-connect';
import db from '../../../utils/db';
import { isAuth } from '../../../utils/auth';
import expressFileUpload from 'express-fileupload';

const handler = nc();

handler.use(isAuth);
handler.use(expressFileUpload());
handler.post(async (req, res) => {
    try {
        console.log(req.files);

        res.status(200).send({
            message: 'We sent a message to your email',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
