import express from "express";
import {
    requireSignIn,
    adminMiddleware,
    upload,
} from "../common-middlewares/index.js";
import {
    addCategory,
    getCategories,
    updateCategory,
} from "../controller/category.js";

const router = express.Router();

router.post(
    "/category/create",
    requireSignIn,
    adminMiddleware,
    upload.single("categoryImg"),
    addCategory
);

router.post(
    "/category/update",
    // requireSignIn,
    adminMiddleware,
    upload.array("categoryImg"),
    updateCategory
);

router.get("/category/getCategory", getCategories);

export default router;
