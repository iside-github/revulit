import fs from 'fs';
import path from 'path';
import nc from 'next-connect';
import Reports from '../../../models/reports';
import Category from '../../../models/categories';
import User from '../../../models/user';
import db from '../../../utils/db';
import { isAuth } from '../../../utils/auth';
import moment from 'moment';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
moment.locale('uz-latn');

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        await db.connect();
        const user = await User.findById(req.user.user.user._id);
        const data = await Reports.find({
            company: user.company,
        })
            .select('-html')
            .populate({ path: 'user', select: 'email name avatar' });
        var categories = await new Promise(async (resolve) => {
            const data = await Category.find();
            resolve(data);
        });

        let newObj = categories.map((category) => ({
            id: category.category_id,
            title: category.category_title,
        }));

        const header = [
            { id: 'user', title: 'User' },
            { id: 'email', title: 'Email' },
            { id: 'upload-time', title: 'Upload Time' },
            { id: 'file-name', title: 'File Name' },
            ...newObj,
        ];

        const records = [];

        await data.forEach(async (report) => {
            const values = {
                user: report.user.name,
                email: report.user.email,
                'upload-time': moment(report.createdAt).format(
                    'MMMM Do YYYY, h:mm'
                ),
                'file-name': report.file_name,
            };

            await report.categories.forEach((category) => {
                values[category.category_id] = category.category_count;
            });

            records.push(values);
        });

        const fileName =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + '.csv';
        const file_path = `public/static/uploads/outputs/${fileName}`;
        const csvWriter = createCsvWriter({
            path: file_path,
            header,
        });

        const filePath = path.join(process.cwd(), file_path);
        csvWriter
            .writeRecords(records)
            .then(() => {
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader(
                    'Content-Disposition',
                    `attachment; filename="${fileName}"`
                );

                const fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);
                fs.unlink(filePath, (err) => {
                    if (err) console.log(err);
                });
            })
            .catch((err) => {
                console.error('Error writing CSV file:', err);
                res.status(500).send('An error occurred');
            });

        await db.disconnect();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
