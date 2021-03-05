import { addressConstants } from "./constants";
import axios from "../helpers/axios";

export const getAddress = () => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/user/getAddress`);
            console.log(res);

            dispatch({ type: addressConstants.GET_USER_ADDRESS_REQUEST });
            if (res.status === 200) {
                const {
                    userAddress: { address },
                } = res.data;
                dispatch({
                    type: addressConstants.GET_USER_ADDRESS_SUCCESS,
                    payload: { address },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: addressConstants.GET_USER_ADDRESS_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addAddress = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/user/address/create`, { payload });
            console.log(res);

            dispatch({ type: addressConstants.ADD_USER_ADDRESS_REQUEST });
            if (res.status === 201) {
                console.log(res);
                const {
                    address: { address },
                } = res.data;
                dispatch({
                    type: addressConstants.ADD_USER_ADDRESS_SUCCESS,
                    payload: { address },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: addressConstants.ADD_USER_ADDRESS_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
