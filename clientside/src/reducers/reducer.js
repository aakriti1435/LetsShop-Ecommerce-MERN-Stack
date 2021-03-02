import categoryReducer from "./category";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    category: categoryReducer,
});

export default rootReducer;
