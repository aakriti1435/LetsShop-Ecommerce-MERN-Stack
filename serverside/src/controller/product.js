import Product from '../models/product.js';
import slugify from 'slugify';

export const createProduct = (req, res) => {

    const { name, price, description, category, createdBy } = req.body;

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save().exec((error, product) => {
        if (error)
            return res.status(400).json({ error });

        if (product)
            return res.status(201).json({ product });
    });
};