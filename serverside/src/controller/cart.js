import Cart from "../models/cart.js";

function runUpdate(condition, updateData) {
    return new Promise((ressolve, reject) => {
        //updating code here

        Cart.findOneAndUpdate(condition, updateData, { upsert: true })
            .then((result) => resolve())
            .catch((err) => reject(err));
    });
}

export const addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) return res.status(400).json({ error });

        if (cart) {
            //If cart already exists - update it
            let promiseArray = [];

            req.body.cartItems.forEach((cartItem) => {
                //Checking if item already exists or not
                const product = cartItem.product;
                const isItemPresent = cart.cartItems.find(
                    (c) => c.product == product
                );

                let condition, action;

                if (isItemPresent) {
                    //Item already present in cart - update the quantity

                    condition = {
                        user: req.user._id,
                        "cartItems.product": product,
                    };
                    action = {
                        //updating record in Sub collection
                        $set: {
                            //Updating the particular product not whole cart $ sign is used
                            "cartItems.$": cartItem,
                        },
                    };
                } else {
                    //Item not present in cart - then add the item

                    condition = { user: req.user._id };
                    action = {
                        //Pushing record in Sub collection
                        $push: {
                            cartItems: cartItem,
                        },
                    };
                }

                promiseArray.push(runUpdate(condition, action));

                // Cart.findOneAndUpdate(condition, action).exec(
                //     (error, _cart) => {
                //         if (error) return res.status(400).json({ error });

                //         if (_cart) return res.status(201).json({ cart: _cart });
                //     }
                // );
            });

            Promise.all(promiseArray)
                .then((response) => res.status(201).json({ response }))
                .catch((error) => res.status(400).json({ error }));
        } else {
            //Creating new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems,
            });

            cart.save((error, cart) => {
                if (error) return res.status(400).json({ error });

                if (cart) return res.status(201).json({ cart });
            });
        }
    });
};

export const getCartItems = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .populate("cartItems.product", "_id name price productPictures")
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
                let cartItems = {};
                cart.cartItems.forEach((item, index) => {
                    cartItems[item.product._id.toString()] = {
                        _id: item.product._id.toString(),
                        name: item.product.name,
                        img: item.product.productPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity,
                    };
                });
                res.status(200).json({ cartItems });
            }
        });
};

export const removeCartItem = (req, res) => {
    const { productId } = req.body.payload;
    if (productId) {
        Cart.updateOne(
            { user: req.user._id },
            {
                $pull: {
                    cartItems: {
                        product: productId,
                    },
                },
            }
        ).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                res.status(202).json({ result });
            }
        });
    }
};
