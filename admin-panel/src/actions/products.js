import { productConstants } from "./constants";
import axios from "../helpers/axios";

export const addProduct = (form) => {
    return async (dispatch) => {
        dispatch({ type: productConstants.ADD_NEW_PRODUCT_REQUEST });

        const res = await axios.post(`/product/create`, form);
        console.log(res);

        if (res.status === 201) {
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
            });
        } else {
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};
