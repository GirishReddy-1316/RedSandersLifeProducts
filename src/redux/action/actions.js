// actions.js

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    ADD_TO_WISH,
    REMOVE_FROM_WISH,
    CLEAR_CART,
} from './actionTypes';

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const updateCartItemQuantity = (productId, quantity) => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { id: productId, quantity },
});

export const addToWish = (product) => ({
    type: ADD_TO_WISH,
    payload: product,
});

export const removeFromWish = (productId) => ({
    type: REMOVE_FROM_WISH,
    payload: productId,
});

export const clearCart = () => ({
    type: CLEAR_CART,
});
