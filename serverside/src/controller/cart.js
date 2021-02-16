import Cart from '../models/cart.js';

export const addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error)
            return res.status(400).json({ error });

        if (cart) {
            //If cart already exists - update it

            //Checking if item already exists or not
            const product = req.body.cartItems.product;
            const isItemPresent = cart.cartItems.find(c => c.product == product);

            if (isItemPresent) {
                //Item already present in cart - update the quantity
                Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product }, {
                    //updating record in Sub collection
                    "$set": {
                        "cartItems": {
                            ...req.body.cartItems,
                            quantity: isItemPresent.quantity + req.body.cartItems.quantity,
                        }
                    }
                }).exec((error, _cart) => {
                    if (error)
                        return res.status(400).json({ error });

                    if (_cart)
                        return res.status(201).json({ cart: _cart });
                })

            } else {
                //Item not present in cart - then add the item
                Cart.findOneAndUpdate({ user: req.user._id }, {
                    //Pushing record in Sub collection
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }).exec((error, _cart) => {
                    if (error)
                        return res.status(400).json({ error });

                    if (_cart)
                        return res.status(201).json({ cart: _cart });
                })
            }
        } else {
            //Creating new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });

            cart.save((error, cart) => {
                if (error)
                    return res.status(400).json({ error });

                if (cart)
                    return res.status(201).json({ cart });
            });
        };
    })
};