import { orderConstants } from "../actions/constants";

const initState = {
    orders: [],
    orderDetails: {},
    error: null,
    loading: false,
    orderFetching: false,
    placedOrderId: null,
};

export default (state = initState, action) => {
    switch (action.type) {
        case orderConstants.GET_ORDERS_REQUEST:
            state = {
                ...state,
                orderFetching: true,
            };
            break;
        case orderConstants.GET_ORDERS_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                orderFetching: false,
            };
            break;
        case orderConstants.GET_ORDERS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                orderFetching: false,
            };
            break;
        case orderConstants.USER_ORDER_DETAILS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case orderConstants.USER_ORDER_DETAILS_SUCCESS:
            state = {
                ...state,
                loading: false,
                orderDetails: action.payload.order,
            };
            break;

        case orderConstants.USER_ORDER_DETAILS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;

        case orderConstants.ADD_ORDER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case orderConstants.ADD_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false,
                placedOrderId: action.payload.order._id,
            };
            break;

        case orderConstants.ADD_ORDER_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;
    }
    return state;
};
