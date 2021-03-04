import express from "express";
import {
    adminMiddleware,
    requireSignIn,
    upload,
} from "../../common-middlewares/index.js";
import { createPage, getPage } from "../../controller/admin/page.js";

const router = express.Router();

router.post(
    "/page/create",
    requireSignIn,
    adminMiddleware,
    upload.fields([{ name: "banners" }, { name: "products" }]),
    createPage
);

router.get("/page/:category/:type", getPage);

export default router;
