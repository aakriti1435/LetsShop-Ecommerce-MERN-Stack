import authReducer from "./user";
import categoryReducer from "./category";
import productReducer from "./products";
import pageReducer from "./page";
import orderReducer from "./order";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    page: pageReducer,
    order: orderReducer,
});

export default rootReducer;
