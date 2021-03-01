import Category from "../models/category.js";
import slugify from "slugify";
import { createCategories } from "../common-middlewares/index.js";

export const addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    };

    if (req.file) {
        categoryObj.categoryImage =
            process.env.BASEURL + "/public/" + req.file.filename;
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error });

        if (category) {
            return res.status(201).json({ category });
        }
    });
};

export const getCategories = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) return res.status(400).json({ error });

        if (categories) {
            const categoryList = createCategories(categories);
            return res.status(200).json({ categoryList });
        }
    });
};
