import express from 'express';
import { createCategories } from '../controller/category.js';

const router = express.Router();

router.post('/category/create', createCategories);

export default router;