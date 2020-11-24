import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer, } from './reducers/productReducers';
const initialState ={};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    productSave:productSaveReducer,
    productDelete: productDeleteReducer,
})
const store = createStore(reducer,initialState,compose(applyMiddleware(thunk)));
export default store; 