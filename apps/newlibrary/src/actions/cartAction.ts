import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
      const { data } = await Axios.get("/api/products/" + productId);
      dispatch({
        type: CART_ADD_ITEM, payload: {
          product: data.id,
          name: data.tittle,
          image: data.image,
          price: data.price,
          countInStock: data.qtyInStock,
          qty
        }
      });
      const { cart: { cartItems } } = getState();
      
    } catch (error) {
  
    }
}
  const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  }
  const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING , payload: data });
  }
  const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT  , payload: data });
  }
  export{addToCart,removeFromCart,saveShipping,savePayment}