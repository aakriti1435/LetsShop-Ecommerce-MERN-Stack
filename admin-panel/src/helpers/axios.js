import axios from "axios";
import { api } from "../urlConfig";
import store from "../store/store";
import { loginConstants } from "../actions/constants";

const token = window.localStorage.getItem("token");
console.log("Token>>>", token);

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
    },
});

axiosInstance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if (auth.token) {
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
});

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        console.log(error);
        const { status } = error.response;
        if (status === 500) {
            localStorage.clear();
            store.dispatch({ type: loginConstants.LOGOUT_SUCCESS });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
