import Category from "../models/categories";
import { categoryTitleCreator } from "./categoryCreator";
import db from "./db";
const cheerio = require("cheerio");

export const htmlResolver = async (html) => {
  const categories = categoryFinder(html);
  await db.connect();

  const savedCategories = await Category.find().select("category_id");
  const busyCategories = savedCategories?.map((e) => e.category_id);

  categories.forEach(async (category) => {
    if (!busyCategories.includes(category)) {
      const ctName = categoryTitleCreator(category);
      const newCategory = new Category({
        category_id: category,
        category_title: ctName,
      });

      await newCategory.save();
    }
  });
  await db.disconnect();

  const result = {};
  const $ = cheerio.load(html);

  const rows = $("tr").toArray();

  rows.forEach((row) => {
    const tr = $(row);

    const tds = tr.find("td").toArray();

    tds.forEach((td) => {
      const tdText = $(td).text().trim();
      if (categories.includes(tdText)) {
        result[tdText] = result[tdText] ? result[tdText] + 1 : 1;
      }
    });
  });

  for (let [key, value] of Object.entries(result)) {
    result.total = result.total ? result.total + value : value;
  }

  return result;
};

export const htmlFilter = (html, value) => {
  const $ = cheerio.load(html);

  const filteredTrElements = $("tbody tr").filter((index, element) => {
    let shouldInclude = false;
    $(element)
      .find("td")
      .each((tdIndex, tdElement) => {
        const tdText = $(tdElement).text();

        if (tdText == value) {
          shouldInclude = true;
          return false;
        }
      });
    return shouldInclude;
  });

  $("tbody").empty().append(filteredTrElements);

  return $.html();
};

export const categoryFinder = (html) => {
  const $ = cheerio.load(html);

  const thIndex = $(
    'thead th:contains("Primary Safety Classification")'
  ).index();
  const categories = [];

  $("tbody tr").each((index, element) => {
    const tdValue = $(element)
      .find("td")
      .eq(thIndex - 1)
      .text()
      .trim();
    if (!categories.includes(tdValue)) categories.push(tdValue);
  });

  return categories;
};
