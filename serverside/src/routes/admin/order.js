import express from "express";
import {
    adminMiddleware,
    requireSignIn,
} from "../../common-middlewares/index.js";
import { updateOrder } from "../../controller/admin/order.js";

const router = express.Router();

router.post("/order/update", requireSignIn, adminMiddleware, updateOrder);

export default router;
