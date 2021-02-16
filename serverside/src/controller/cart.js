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

            let condition, action;

            if (isItemPresent) {
                //Item already present in cart - update the quantity
                condition = { "user": req.user._id, "cartItems.product": product };
                action = {
                    //updating record in Sub collection 
                    "$set": {
                        //Updating the particular product not whole cart $ sign is used
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: isItemPresent.quantity + req.body.cartItems.quantity,
                        }
                    }
                };
            } else {
                //Item not present in cart - then add the item
                condition = { user: req.user._id };
                action = {
                    //Pushing record in Sub collection
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                };
            };

            Cart.findOneAndUpdate(condition, action).exec((error, _cart) => {
                if (error)
                    return res.status(400).json({ error });

                if (_cart)
                    return res.status(201).json({ cart: _cart });
            })


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