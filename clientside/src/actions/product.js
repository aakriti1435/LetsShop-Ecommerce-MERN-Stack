import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST });

            const res = await axios.get(`/products/${slug}`);
            console.log(res);

            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
                    payload: { error: res.data.error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getProductPage = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });

            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            console.log(res);
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page },
                });
            } else {
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error: res.data.error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getProductDetailsById = (payload) => {
    return async (dispatch) => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        try {
            const { productId } = payload.params;
            const res = await axios.get(`/product/${productId}`);
            console.log(res);

            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                    payload: { productDetails: res.data.product },
                });
            } else {
                dispatch({
                    type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                    payload: { error: res.data.error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
