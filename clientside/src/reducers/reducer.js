import categoryReducer from "./category";
import productReducer from "./product";
import authReducer from "./user";
import cartReducer from "./cart";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
});

export default rootReducer;
