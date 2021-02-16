import Product from '../models/product.js';

export const createProduct = (req, res) => {
    res.status(200).json({ file: req.file, body: req.body });
};