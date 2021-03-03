import { categoryConstants } from "./constants";
import axios from "../helpers/axios";

const getAllCategories = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

        const res = await axios.get(`/category/getCategory`);
        console.log(res);

        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList },
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export const deleteCategories = (ids) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST });

        const res = await axios.post(`/category/delete`, {
            payload: { ids },
        });
        console.log("deleted", res);

        if (res.status === 200) {
            dispatch(getAllCategories());
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_SUCCESS,
            });
        } else {
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export const updateCategories = (form) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });

        const res = await axios.post(`/category/update`, form);
        console.log(res);
        if (res.status === 201) {
            dispatch(getAllCategories());
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_SUCCESS,
            });
        } else {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export const addCategory = (form) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });

        const res = await axios.post(`/category/create`, form);
        console.log(res);

        if (res.status === 201) {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload: { category: res.data.category },
            });
        } else {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export { getAllCategories };
