import express from 'express';
import { requireSignIn, adminMiddleware, upload } from '../common-middlewares/index.js';
import { createProduct } from '../controller/product.js';

const router = express.Router();

router.post('/product/create', requireSignIn, adminMiddleware, upload.array('productPicture'), createProduct);

export default router;