import { orderConstants } from "../actions/constants";

const initialState = {
    error: null,
    loading: false,
    orders: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case orderConstants.GET_ALL_ORDERS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case orderConstants.GET_ALL_ORDERS_SUCCESS:
            state = {
                ...state,
                loading: false,
                orders: action.payload.orders,
            };
            break;

        case orderConstants.GET_ALL_ORDERS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }
    return state;
};
