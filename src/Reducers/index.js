import { combineReducers } from 'redux';
import authReducer from './Auth_Reducers/Auth.Reducer';
import category_reducer from './Category_Reducers/category_reducer';
import product_reducer from './Product_Reducers/product_reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    category: category_reducer,
    product: product_reducer
});

export default rootReducer;