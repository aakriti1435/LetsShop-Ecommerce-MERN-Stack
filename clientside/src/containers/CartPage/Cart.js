import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/GenericUI/Card/Card";
import "./Cart.css";
import { MUIButton } from "../../components/MUIComponents/MUIComponents";
import CartItem from "./CartItem/CartItem";
import { addToCart, getCartItems } from "../../actions/cart";

function Cart(props) {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const [cartItems, setCartItems] = useState(cart.cartItems);

    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);

    const onQtyIncrement = (_id, qty) => {
        console.log(_id, qty);
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));
    };

    const onQtyDecrement = (_id, qty) => {
        console.log(_id, qty);
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, -1));
    };

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver to</div>}
                    style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
                >
                    {/* {JSON.stringify(cartItems)} */}
                    {Object.keys(cartItems).map((key, index) => (
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQtyIncrement={onQtyIncrement}
                            onQtyDecrement={onQtyDecrement}
                        />
                    ))}

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            background: "#ffffff",
                            justifyContent: "flex-end",
                            boxShadow: "0 0 10px 10px #eee",
                            padding: "10px 10px",
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "250px" }}>
                            <MUIButton
                                title="PLACE ORDER"
                                onClick={() => props.history.push(`/checkout`)}
                            />
                        </div>
                    </div>
                </Card>
                {/* <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (
                        qty,
                        key
                    ) {
                        return qty + cart.cartItems[key].qty;
                    },
                    0)}
                    totalPrice={Object.keys(cart.cartItems).reduce(
                        (totalPrice, key) => {
                            const { price, qty } = cart.cartItems[key];
                            return totalPrice + price * qty;
                        },
                        0
                    )}
                /> */}
            </div>
        </Layout>
    );
}

export default Cart;
