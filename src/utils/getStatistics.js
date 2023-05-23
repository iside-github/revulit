import db from './db';
import Reports from '../models/reports';
import Category from '../models/categories';

export const getStatistics = async (day, userId) => {
    const startDate = new Date(day);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    let newObj = {};
    const categories = await Category.find();
    categories.forEach((category) => {
        newObj[category.category_id] = 0;
    });

    await db.connect();

    const reports = await Reports.find({
        company: userId,
        createdAt: {
            $gte: startDate,
            $lt: endDate,
        },
    }).select('-html');
    console.log(reports);
    await db.disconnect();

    reports.forEach((report) => {
        report.categories.forEach((category) => {
            newObj[category.category_id] += category.category_count;
        });
    });

    delete newObj.total;
    return newObj;
};
