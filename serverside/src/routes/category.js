import express from "express";
import {
    requireSignIn,
    adminMiddleware,
    upload,
} from "../common-middlewares/index.js";
import { addCategory, getCategories } from "../controller/category.js";

const router = express.Router();

router.post(
    "/category/create",
    requireSignIn,
    adminMiddleware,
    upload.single("categoryImg"),
    addCategory
);

router.get("/category/getCategory", getCategories);

export default router;
