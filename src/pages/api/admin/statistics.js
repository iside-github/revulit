import nc from "next-connect";
import User from "../../../models/user";
import Category from "../../../models/categories";
import Reports from "../../../models/reports";
import db from "../../../utils/db";
import { isAuth } from "../../../utils/auth";

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
  try {
    const { filter } = req.query;
    await db.connect();
    const admin = await User.findById(req.user.user.user._id).populate({
      path: "company",
      select: "name",
    });
    const categories = await Category.find();
    var reports;
    if (filter && filter !== "undefined") {
      reports = await Reports.find({
        company: admin.company._id,
        createdAt: { $gt: filter },
      }).select("categories");
    } else {
      reports = await Reports.find({
        company: admin.company._id,
      }).select("categories");
    }

    let newObj = { total: 0 };
    categories.forEach((category) => {
      newObj[category.category_id] = 0;
    });
    reports.forEach((report) => {
      report.categories.forEach((category) => {
        newObj[category.category_id] += category.category_count;
      });
    });

    await db.disconnect();

    res.status(200).send({
      statistics: newObj,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default handler;
