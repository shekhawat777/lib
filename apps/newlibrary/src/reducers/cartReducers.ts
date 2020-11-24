import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING,   } from "../constants/cartConstants";


function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
    switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const datas = state.cartItems.find(x => x.datas === item.datas);
      if (datas) {
        return {
          cartItems:
            state.cartItems.map(x => x.datas === datas.datas ? item : x)
        };
      }
      return { cartItems: [...state.cartItems, item] };
      case CART_REMOVE_ITEM:
        return { cartItems: state.cartItems.filter(x => x.datas!== action.payload) };
        case CART_SAVE_SHIPPING:
            return { ...state, shipping: action.payload };
          case CART_SAVE_PAYMENT:
            return { ...state, payment: action.payload };
      default:
      return state
  }
}

export { cartReducer }