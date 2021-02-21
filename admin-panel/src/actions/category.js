import { categoryConstants } from "./constants"
import axios from '../helpers/axios';

export const getAllCategories = () => {
    return async(dispatch) => {

        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

        const res = await axios.get(`/category/getCategory`);
        console.log(res);

        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        };

    };
};