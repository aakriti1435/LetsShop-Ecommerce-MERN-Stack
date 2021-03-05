import { addressConstants } from "./constants";
import axios from "../helpers/axios";

export const getAddress = () => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/user/getAddress`);
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
