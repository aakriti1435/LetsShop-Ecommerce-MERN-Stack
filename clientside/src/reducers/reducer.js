import categoryReducer from "./category";
import productReducer from "./product";
import authReducer from "./user";
import cartReducer from "./cart";
import addressReducer from "./address";
import orderReducer from "./order";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
});

export default rootReducer;
