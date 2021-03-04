import categoryReducer from "./category";
import productReducer from "./product";
import authReducer from "./user";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
});

export default rootReducer;
