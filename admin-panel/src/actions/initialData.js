import {
    categoryConstants,
    initialDataConstants,
    orderConstants,
    productConstants,
} from "./constants";
import axios from "../helpers/axios";

export const getInitialData = () => {
    return async (dispatch) => {
        dispatch({ type: initialDataConstants.GET_INITIAL_DATA_REQUEST });

        const res = await axios.get(`/initialData`);
        console.log(res);

        const { categories, products, orders } = res.data;

        if (res.status === 200) {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories },
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products },
            });
            dispatch({
                type: orderConstants.GET_ALL_ORDERS_SUCCESS,
                payload: { orders },
            });
        }
    };
};
