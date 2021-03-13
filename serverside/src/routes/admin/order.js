import express from "express";
import {
    adminMiddleware,
    requireSignIn,
} from "../../common-middlewares/index.js";
import {
    getCustomerOrders,
    updateOrder,
} from "../../controller/admin/order.js";

const router = express.Router();

router.post("/order/update", requireSignIn, adminMiddleware, updateOrder);

router.get(
    `/order/getCustomerOrders`,
    requireSignIn,
    adminMiddleware,
    getCustomerOrders
);

export default router;
