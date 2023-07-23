import nc from "next-connect";
import db from "../../../utils/db";
import Files from "../../../models/files";
import Reports from "../../../models/reports";
import User from "../../../models/user";
import { isAuth } from "../../../utils/auth";
import { htmlResolver } from "../../../utils/htmlReader";
import { categoryCreator } from "../../../utils/categoryCreator";
import multer from "multer";
import axios from "axios";
import https from "https";
const FormData = require("form-data");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/static/uploads/files/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname +
          "-" +
          uniqueSuffix +
          "." +
          file["mimetype"].split("/")[1]
      );
    },
  }),
});

const uploadMiddleware = upload.single("file");

const handler = nc();

handler.use(isAuth);
handler.use(uploadMiddleware);
handler.post(async (req, res) => {
  try {
    const maxSize = 10; // 10mb
    const array_of_allowed_files = [
      "csv",
      "xml",
      "xlsx",
      "xlsm",
      "xlsb",
      "xltx",
      "xltm",
      "xls",
      "xlt",
      "slk",
      "dif",
      "txt",
      "pdf",
      "doc",
      "docx",
      "jpg",
    ];
    const file_extension = req.file.originalname.slice(
      ((req.file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    if (req.file && !array_of_allowed_files.includes(file_extension))
      return res.status(500).json({ message: "Invalid file" });

    if (req.file.size > 1024 * 1024 * maxSize)
      return res.status(500).send({
        message: "File is too big",
      });
    await db.connect();
    const formData = new FormData();
      formData.append("file", req.file.path, "klsajhdkashdjkashd");
      console.log(formData, "_____________________________________--------------->>>>>>>>>>>>>>>>>FORM");
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await axios.post(
      "http://97.74.95.51:8088/revleterature/upload",
      formData,
      {
        headers: { ...formData.getHeaders() },
        httpsAgent: agent,
        timeout: 240000,
      }
    );

    console.log(
      response,
      "______________________________________________________________>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );

    const ct = await htmlResolver(response.data);

    const user = await User.findById(req.user.user.user._id);
    const file = new Files({
      src: req.file.filename,
      name: req.file.originalname,
      user: user._id,
    });
    await file.save();

    const categories = categoryCreator(ct);
    const repo = new Reports({
      file_name: req.file.originalname,
      file_src: req.file.filename,
      html: resText,
      user: user._id,
      company: user.company,
      categories,
    });
    await repo.save();

    await db.disconnect();

    res.status(200).send({ categories, id: repo._id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
