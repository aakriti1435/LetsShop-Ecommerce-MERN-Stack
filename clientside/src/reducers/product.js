import { productConstants } from "../actions/constants";

const initialState = {
    products: [],
    loading: false,
    error: null,
    message: "",
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: [],
    },
    pageRequest: false,
    page: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice,
                },
            };
            break;

        case productConstants.GET_PRODUCTS_BY_SLUG_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;

        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                loading: true,
                pageRequest: true,
            };
            break;

        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                loading: false,
                pageRequest: false,
            };
            break;

        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
                pageRequest: false,
            };
            break;
    }
    return state;
};
