import authReducer from './user';
import categoryReducer from './category';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
});

export default rootReducer;