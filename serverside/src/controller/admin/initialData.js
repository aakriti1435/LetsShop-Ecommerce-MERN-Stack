import Category from "../../models/category.js";
import Product from "../../models/product.js";
import Order from "../../models/order.js";
import { createCategories } from "../../common-middlewares/index.js";

export const getInitialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({ createdBy: req.user._id })
        .select(
            "_id name price quantity slug description productPictures category"
        )
        .populate({ path: "category", select: "_id name" })
        .exec();
    const orders = await Order.find({})
        .populate("items.productId", "name")
        .exec();

    res.status(200).json({
        categories: createCategories(categories),
        products,
        orders,
    });
};
