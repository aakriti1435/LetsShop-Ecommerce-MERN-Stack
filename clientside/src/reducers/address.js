import { addressConstants } from "../actions/constants";

const initState = {
    address: [],
    error: null,
    loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case addressConstants.GET_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case addressConstants.GET_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case addressConstants.GET_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case addressConstants.ADD_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case addressConstants.ADD_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case addressConstants.ADD_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }
    return state;
};
