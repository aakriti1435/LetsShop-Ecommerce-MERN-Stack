import { loginConstants, registerConstants } from "./constants"
import axios from '../helpers/axios';

export const signup = (user) => {
    return async(dispatch) => {
        dispatch({
            type: registerConstants.REGISTRATION_REQUEST
        });

        const res = await axios.post(`/admin/signUp`, {...user });

        if (res.status === 200) {
            const { message } = res.data;
            dispatch({
                type: registerConstants.REGISTRATION_SUCCESS,
                payload: { message }
            });
        } else {
            if (res.status === 400) {
                dispatch({
                    type: registerConstants.REGISTRATION_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        };
    }
};

export const login = (user) => {
    return async(dispatch) => {

        dispatch({
            type: loginConstants.LOGIN_REQUEST
        });

        const res = await axios.post(`/admin/signIn`, {...user });

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: loginConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            });
        } else {
            if (res.status === 400) {
                dispatch({
                    type: loginConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        };
    }
};

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token) {
            dispatch({
                type: loginConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            });
        } else {
            dispatch({
                type: loginConstants.LOGIN_FAILURE,
                payload: { error: 'Login Failed' }
            });
        }
    }
};

export const signout = () => {
    return async dispatch => {
        localStorage.clear();
        dispatch({
            type: loginConstants.LOGOUT_REQUEST
        });
    }
};