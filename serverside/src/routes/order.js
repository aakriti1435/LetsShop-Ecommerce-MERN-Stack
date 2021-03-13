import express from "express";
import { requireSignIn, userMiddleware } from "../common-middlewares/index.js";
import { addOrder, getOrder, getOrders } from "../controller/order.js";

const router = express.Router();

router.post("/addOrder", requireSignIn, userMiddleware, addOrder);

router.get("/getOrders", requireSignIn, userMiddleware, getOrders);

router.post("/getOrder", requireSignIn, userMiddleware, getOrder);

export default router;
