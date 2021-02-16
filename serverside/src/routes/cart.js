import express from 'express';
import { addItemToCart } from '../controller/cart.js';
import { requireSignIn, userMiddleware } from '../common-middlewares/index.js';

const router = express.Router();

router.post('/user/cart/addToCart', requireSignIn, userMiddleware, addItemToCart);

export default router;