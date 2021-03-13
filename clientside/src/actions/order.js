import { orderConstants, cartConstants } from "./constants";
import axios from "../helpers/axios";

//Fetching a single order details
export const getOrder = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: orderConstants.USER_ORDER_DETAILS_REQUEST });

            console.log("payload", payload);
            const res = await axios.post(`/getOrder`, payload);
            console.log(">>>>>", res);

            if (res.status === 200) {
                const { order } = res.data;
                dispatch({
                    type: orderConstants.USER_ORDER_DETAILS_SUCCESS,
                    payload: { order },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: orderConstants.USER_ORDER_DETAILS_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getOrders = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: orderConstants.GET_ORDERS_REQUEST });

            const res = await axios.get(`/getOrders`);
            console.log(res);

            if (res.status === 200) {
                const { orders } = res.data;
                dispatch({
                    type: orderConstants.GET_ORDERS_SUCCESS,
                    payload: { orders },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: orderConstants.GET_ORDERS_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const addOrder = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: orderConstants.ADD_ORDER_REQUEST });

            const res = await axios.post(`/addOrder`, payload);
            console.log(res);

            if (res.status === 201) {
                const { order } = res.data;

                dispatch({
                    type: cartConstants.RESET_CART,
                });

                dispatch({
                    type: orderConstants.ADD_ORDER_SUCCESS,
                    payload: { order },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: orderConstants.ADD_ORDER_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };
};
