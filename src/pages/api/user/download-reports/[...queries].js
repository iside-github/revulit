import fs from 'fs';
import nc from 'next-connect';
import Reports from '../../../../models/reports';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';
import { htmlFilter } from '../../../../utils/htmlReader';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cheerio = require('cheerio');

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    try {
        const [id] = req.query.queries;
        const category = req.query.category;
        await db.connect();
        const report = await Reports.findById(id).select('html file_name');
        await db.disconnect();

        var html =
            category !== 'total'
                ? await new Promise((resolve) => {
                      let html = htmlFilter(report.html, category);
                      resolve(html);
                  })
                : report.html;

        const $ = cheerio.load(html);

        const header = [
            { id: 'Title', title: 'Title', quotedString: true },
            { id: 'Abstract', title: 'Abstract', quotedString: true },
            { id: 'Author', title: 'Author', quotedString: true },
            { id: 'Drug', title: 'Drug', quotedString: true },
            { id: 'Effect', title: 'Effect', quotedString: true },
            { id: 'Patient', title: 'Patient', quotedString: true },
            {
                id: 'Primary Safety Classification',
                title: 'Primary Safety Classification',
                quotedString: true,
            },
            {
                id: 'Safety Classification sub category',
                title: 'Safety Classification sub category',
                quotedString: true,
            },
        ];

        const data = [];
        $('table.dataframe tbody tr').each((index, row) => {
            const rowData = [];
            $(row)
                .find('td')
                .each((i, td) => {
                    var text = $(td).text().trim();
                    rowData.push(text);
                });
            data.push(rowData);
        });

        const fileName =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + '.csv';
        const path = `public/static/uploads/outputs/${fileName}`;
        const csvWriter = createCsvWriter({
            path: path,
            header,
        });

        const records = data.map((row) => {
            const record = {};
            header.forEach((column, index) => {
                record[column.id] = row[index];
            });
            return record;
        });

        csvWriter
            .writeRecords(records)
            .then(() => {
                res.download(path, fileName, (error) => {
                    if (error) {
                        console.error(
                            'Error sending CSV file as download:',
                            error
                        );
                    } else {
                        console.log('CSV file sent as download');
                    }
                });
            })
            .catch((err) => {
                console.error('Error writing CSV file:', err);
                res.status(500).send('An error occurred');
            });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default handler;
