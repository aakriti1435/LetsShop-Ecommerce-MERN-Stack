import Category from "../../models/category.js";
import Product from "../../models/product.js";
import { createCategories } from "../../common-middlewares/index.js";

export const getInitialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({})
        .select(
            "_id name slug price quantity description productPictures category"
        )
        .populate({ path: "category", select: "_id name" })
        .exec();

    res.status(200).json({
        categories: createCategories(categories),
        products,
    });
};
