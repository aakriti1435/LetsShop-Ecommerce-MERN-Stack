import express from "express";
import { requireSignIn, userMiddleware } from "../common-middlewares/index.js";
import { addAddress, getAddress } from "../controller/address.js";

const router = express.Router();

router.post("/user/address/create", requireSignIn, userMiddleware, addAddress);

router.get("/user/getAddress", requireSignIn, userMiddleware, getAddress);

export default router;
