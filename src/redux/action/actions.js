// actions.js

import { axiosInstance } from '../../api';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    ADD_TO_WISH,
    REMOVE_FROM_WISH,
    CLEAR_CART,
    SET_ORDER_ID,
    CLEAR_ORDER_ID,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_SHIPPING_ADDRESS, UPDATE_SHIPPING_ADDRESS
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

export const setOrderId = (orderId) => ({
    type: SET_ORDER_ID,
    payload: orderId,
});

export const clearOrderId = () => ({
    type: CLEAR_ORDER_ID,
});



export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const response = await axiosInstance.get("/products");
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
}

export const addShippingAddress = (shippingAddress) => {
    console.log(shippingAddress);
    return {
        type: ADD_SHIPPING_ADDRESS,
        payload: shippingAddress,
    };
};

export const updateShippingAddress = (shippingAddress) => ({
    type: UPDATE_SHIPPING_ADDRESS,
    payload: shippingAddress,
});
