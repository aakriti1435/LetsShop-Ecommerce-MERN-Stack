import { cartConstants } from "./constants";
import axios from "../helpers/axios";
import store from "../store/store";

export const addToCart = (product, newQty = 1) => {
    return async (dispatch) => {
        const {
            cart: { cartItems },
            auth,
        } = store.getState();

        const qty = cartItems[product._id]
            ? parseInt(cartItems[product._id].qty + newQty)
            : 1;

        cartItems[product._id] = { ...product, qty };

        if (auth.authenticate) {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const payload = {
                cartItems: [
                    {
                        product: product._id,
                        quantity: qty,
                        price: product.price,
                    },
                ],
            };

            console.log(payload);
            const res = await axios.post(`/user/cart/addToCart`, payload);
            console.log(res);

            if (res.status === 201) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: { cartItems },
                });
            } else {
                dispatch({
                    type: cartConstants.ADD_TO_CART_FAILURE,
                    payload: { error: res.data.error },
                });
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }

        console.log("addToCart::", cartItems);

        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
        });
    };
};

export const updateCart = () => {
    return async (dispatch) => {
        const cart = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : null;

        if (cart) {
            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: { cartItems: cart },
            });
        }
    };
};
