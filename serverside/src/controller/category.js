import Category from "../models/category.js";
import slugify from "slugify";
import { createCategories } from "../common-middlewares/index.js";
import shortid from "shortid";

export const addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,
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

export const updateCategory = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = { name: name[i], type: type[i] };
            if (parentId[i] !== "") {
                category.parentId = parentId[i];
            }
            const updatedCategory = await Category.findOneAndUpdate(
                { _id: _id[i] },
                category,
                { new: true }
            );
            updatedCategories.push(updateCategory);
        }
        return res.status(201).json({ updatedCategories });
    } else {
        const category = { name, type };
        if (parentId !== "") {
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate(
            { _id },
            category,
            { new: true }
        );
        return res.status(201).json({ updateCategory });
    }

    res.status(200).json({ body: req.body });
};

export const deleteCategory = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deletedCategory = await Category.findOneAndDelete({
            _id: ids[i]._id,
        });
        deletedCategories.push(deletedCategory);
    }

    if (deletedCategories.length == ids.length) {
        res.status(200).json({ message: "Categories Deleted" });
    } else {
        res.status(400).json({ message: "Something went wrong" });
    }
};
