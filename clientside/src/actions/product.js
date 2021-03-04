import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async (dispatch) => {
        const res = await axios.get(`/products/${slug}`);
        console.log(res);

        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data,
            });
        }
    };
};

export const getProductPage = (payload) => {
    return async (dispatch) => {
        const { cid, type } = payload.params;
        const res = await axios.get(`/page/${cid}/${type}`);
        console.log(res);
        if (res.status === 200) {
        } else {
        }
    };
};
