import authReducer from './user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;