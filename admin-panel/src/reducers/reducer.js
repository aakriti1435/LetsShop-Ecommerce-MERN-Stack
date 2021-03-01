import authReducer from "./user";
import categoryReducer from "./category";
import productReducer from "./products";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
});

export default rootReducer;
