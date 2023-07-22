import fs from "fs";
import path from "path";
import nc from "next-connect";
import Reports from "../../../../models/reports";
import db from "../../../../utils/db";
import { isAuth } from "../../../../utils/auth";
import { htmlFilter } from "../../../../utils/htmlReader";
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const cheerio = require("cheerio");

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
  try {
    const [id] = req.query.queries;
    const category = req.query.category;
    await db.connect();
    const report = await Reports.findById(id).select("html file_name");
    await db.disconnect();

    var html =
      category !== "total"
        ? await new Promise((resolve) => {
            let html = htmlFilter(report.html, category);
            resolve(html);
          })
        : report.html;

    const $ = cheerio.load(html);

    const header = [
      { id: "Title", title: "Title", quotedString: true, wrapText: true },
      {
        id: "Abstract",
        title: "Abstract",
        quotedString: true,
        wrapText: true,
      },
      {
        id: "Author",
        title: "Author",
        quotedString: true,
        wrapText: true,
      },
      { id: "Drug", title: "Drug", quotedString: true, wrapText: true },
      {
        id: "Effect",
        title: "Effect",
        quotedString: true,
        wrapText: true,
      },
      {
        id: "Patient",
        title: "Patient",
        quotedString: true,
        wrapText: true,
      },
      {
        id: "Primary Safety Classification",
        title: "Primary Safety Classification",
        quotedString: true,
        wrapText: true,
      },
      {
        id: "Safety Classification sub category",
        title: "Safety Classification sub category",
        quotedString: true,
        wrapText: true,
      },
    ];

    const data = [];
    $("table.dataframe tbody tr").each((index, row) => {
      const rowData = [];
      $(row)
        .find("td")
        .each((i, td) => {
          var text = $(td).text().trim();
          if (text.startsWith("[")) text = text.slice(1, text.length - 1);
          rowData.push(text);
        });
      data.push(rowData);
    });

    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".csv";
    const file_path = `public/static/uploads/outputs/${fileName}`;
    const csvWriter = createCsvWriter({
      path: file_path,
      header,
    });

    const records = data?.map((row) => {
      const record = {};
      header.forEach((column, index) => {
        record[column.id] = row[index];
      });
      return record;
    });

    const filePath = path.join(process.cwd(), file_path);
    csvWriter
      .writeRecords(records)
      .then(() => {
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}"`
        );

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
        fs.unlink(filePath, (err) => {
          if (err) console.log(err);
        });
      })
      .catch((err) => {
        console.error("Error writing CSV file:", err);
        res.status(500).send("An error occurred");
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default handler;
