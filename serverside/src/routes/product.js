import express from "express";
import {
    requireSignIn,
    adminMiddleware,
    upload,
} from "../common-middlewares/index.js";
import { createProduct, getProductsBySlug } from "../controller/product.js";

const router = express.Router();

router.post(
    "/product/create",
    requireSignIn,
    adminMiddleware,
    upload.array("productPicture"),
    createProduct
);

router.get("/products/:slug", getProductsBySlug);

export default router;
