import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/GenericUI/Card/Card";
import "./Cart.css";
import { MUIButton } from "../../components/MUIComponents/MUIComponents";
import CartItem from "./CartItem/CartItem";

function Cart(props) {
    const cart = useSelector((state) => state.cart);
    const cartItems = cart.cartItems;

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
                        <CartItem key={index} cartItem={cartItems[key]} />
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
