

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADD_TO_WISH,
    REMOVE_FROM_WISH,
    UPDATE_CART_ITEM_QUANTITY,
} from '../action/actionTypes';

const initialState = {
    cartItems: [],
    wishItems: [],
    itemCount: 0,
    subtotal: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const existingProductIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            let cartItems;
            if (existingProductIndex !== -1) {
                cartItems = state.cartItems.map(item =>
                    item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                cartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
            }
            const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
            const subtotal = cartItems.reduce((total, item) => {
                const itemPrice = item.price ? parseFloat(item.price.substring(1)) : 0;
                return total + item.quantity * itemPrice;
            }, 0);
            return { ...state, cartItems, itemCount, subtotal };
        }
        case REMOVE_FROM_CART: {
            const cartItems = state.cartItems.filter(item => item._id !== action.payload);
            const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
            const subtotal = cartItems.reduce((total, item) => {
                const itemPrice = item.price ? parseFloat(item.price.substring(1)) : 0;
                return total + item.quantity * itemPrice;
            }, 0);
            return { ...state, cartItems, itemCount, subtotal };
        }
        case UPDATE_CART_ITEM_QUANTITY: {
            const cartItems = state.cartItems.map(item =>
                item._id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
            );
            const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
            const subtotal = cartItems.reduce((total, item) => {
                const itemPrice = item.price ? parseFloat(item.price.substring(1)) : 0;
                return total + item.quantity * itemPrice;
            }, 0);
            return { ...state, cartItems, itemCount, subtotal };
        }
        case ADD_TO_WISH: {
            const existingProductIndex = state.wishItems.findIndex(item => item._id === action.payload._id);
            if (existingProductIndex !== -1) {
                return state;
            }
            return {
                ...state,
                wishItems: [...state.wishItems, action.payload],
            };
        }
        case REMOVE_FROM_WISH:
            return { ...state, wishItems: state.wishItems.filter(item => item._id !== action.payload) };
        default:
            return state;
    }
};

export default reducer;
