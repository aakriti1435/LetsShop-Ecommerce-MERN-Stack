import express from "express";
import {
    requireSignIn,
    adminMiddleware,
    upload,
} from "../common-middlewares/index.js";
import {
    createProduct,
    deleteProductById,
    getProductDetailsById,
    getProducts,
    getProductsBySlug,
} from "../controller/product.js";

const router = express.Router();

router.post(
    "/product/create",
    requireSignIn,
    adminMiddleware,
    upload.array("productPicture"),
    createProduct
);

router.get("/products/:slug", getProductsBySlug);

router.get("/product/:productId", getProductDetailsById);

router.delete(
    "/product/deleteProductById",
    requireSignIn,
    adminMiddleware,
    deleteProductById
);

router.post(
    "/product/getProducts",
    requireSignIn,
    adminMiddleware,
    getProducts
);

export default router;
