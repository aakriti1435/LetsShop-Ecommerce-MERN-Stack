import express from 'express';
import { requireSignIn, adminMiddleware } from '../common-middlewares/index.js';
import { createProduct } from '../controller/product.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/product/create', upload.single('productPicture'), createProduct);

export default router;