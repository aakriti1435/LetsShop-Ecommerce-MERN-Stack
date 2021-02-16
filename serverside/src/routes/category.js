import express from 'express';
import { requireSignIn, adminMiddleware } from '../common-middlewares/index.js';
import { addCategory, getCategories } from '../controller/category.js';

const router = express.Router();

router.post('/category/create', requireSignIn, adminMiddleware, addCategory);

router.get('/category/getCategory', getCategories);

export default router;