import express from "express";
import {
    adminMiddleware,
    requireSignIn,
} from "../../common-middlewares/index.js";
import { getInitialData } from "../../controller/admin/initialData.js";

const router = express.Router();

router.get("/initialData", requireSignIn, adminMiddleware, getInitialData);

export default router;
