import express from 'express';
import { requireSignIn, adminMiddleware } from '../common-middlewares/index.js';
import { createProduct } from '../controller/product.js';
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});

const upload = multer({ storage });

const router = express.Router();

router.post('/product/create', requireSignIn, upload.array('productPicture'), createProduct);

export default router;