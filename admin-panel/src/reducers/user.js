import { loginConstants, registerConstants } from "../actions/constants";

const initialState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    error: null,
    message: '',
    loading: false
};

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case loginConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
            };
            break;

        case loginConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
            };
            break;

        case loginConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            };
            break;

        case loginConstants.LOGOUT_REQUEST:
            state = {
                ...initialState
            };
            break;

        case registerConstants.REGISTRATION_REQUEST:
            state = {
                ...state,
                loading: true
            };
            break;

        case registerConstants.REGISTRATION_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            };
            break;

        case registerConstants.REGISTRATION_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            };
            break;
    }
    return state;
};