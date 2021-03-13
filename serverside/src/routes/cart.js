import express from "express";
import {
    addItemToCart,
    getCartItems,
    removeCartItem,
} from "../controller/cart.js";
import { requireSignIn, userMiddleware } from "../common-middlewares/index.js";

const router = express.Router();

router.post(
    "/user/cart/addToCart",
    requireSignIn,
    userMiddleware,
    addItemToCart
);

router.get("/user/getCartItems", requireSignIn, userMiddleware, getCartItems);

router.post(
    "/user/cart/removeItem",
    requireSignIn,
    userMiddleware,
    removeCartItem
);

export default router;
