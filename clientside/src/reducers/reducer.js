import categoryReducer from "./category";
import productReducer from "./product";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
});

export default rootReducer;
