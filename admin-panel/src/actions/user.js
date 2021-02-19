import { authConstants } from "./constants"

export const login = (user) => {
    return async(dispatch) => {

        const res = await axios.post(`/admin/signIn`, {

        })

        dispatch({
            type: authConstants.LOGIN_REQUEST,
            payload: {...user }
        });
    }
};