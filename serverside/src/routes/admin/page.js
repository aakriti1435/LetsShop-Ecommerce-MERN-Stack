import express from "express";
import { upload } from "../../common-middlewares/index.js";
import { createPage } from "../../controller/admin/page.js";

const router = express.Router();

router.post(
    "/page/create",
    upload.fields([{ name: "banners" }, { name: "products" }]),
    createPage
);

export default router;
