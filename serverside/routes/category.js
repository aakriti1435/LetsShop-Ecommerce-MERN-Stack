import express from 'express';
import { addCategory, getCategories } from '../controller/category.js';

const router = express.Router();

router.post('/category/create', addCategory);

router.get('/category/getCategory', getCategories);

export default router;