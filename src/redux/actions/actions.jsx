import { UPDATE_WISH_ITEMS } from './actionTypes';
import { REMOVE_FROM_WISHLIST } from './actionTypes';
import { ADD_TO_CART } from './actionTypes';


export const updateWishItems = (wishItems) => {
  return {
    type: UPDATE_WISH_ITEMS,
    payload: wishItems,
  };
};
export const removeFromWishlist = (wishItems) => {
    return {
      type: REMOVE_FROM_WISHLIST,
      payload: wishItems,
    };
  };
  export const addToCart = (cartItems) => {
    return {
      type: ADD_TO_CART,
      payload: cartItems,
    };
  };