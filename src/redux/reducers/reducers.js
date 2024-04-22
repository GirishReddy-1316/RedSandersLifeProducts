

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADD_TO_WISH,
    REMOVE_FROM_WISH,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART,
    CLEAR_ORDER_ID,
    SET_ORDER_ID,
} from '../action/actionTypes';

const initialState = {
    cartItems: [],
    wishItems: [],
    itemCount: 0,
    subtotal: 0,
    oderId: null
};

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cartAndWishState');
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return initialState;
    }
};

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartAndWishState', serializedState);
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
};

const reducer = (state = loadStateFromLocalStorage(), action) => {
    let newState;
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
            newState = { ...state, cartItems, itemCount, subtotal };
            saveStateToLocalStorage(newState);
            return newState;
        }
        case REMOVE_FROM_CART: {
            const cartItems = state.cartItems.filter(item => item._id !== action.payload);
            const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
            const subtotal = cartItems.reduce((total, item) => {
                const itemPrice = item.price ? parseFloat(item.price.substring(1)) : 0;
                return total + item.quantity * itemPrice;
            }, 0);
            newState = { ...state, cartItems, itemCount, subtotal };
            saveStateToLocalStorage(newState);
            return newState;
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
            newState = { ...state, cartItems, itemCount, subtotal };
            saveStateToLocalStorage(newState);
            return newState;
        }
        case CLEAR_CART: {
            const newState = {
                ...state,
                cartItems: [],
                itemCount: 0,
                subtotal: 0,
            };
            saveStateToLocalStorage(newState);
            return newState;
        }
        case ADD_TO_WISH: {
            const existingProductIndex = state.wishItems.findIndex(item => item._id === action.payload._id);
            if (existingProductIndex !== -1) {
                return state;
            }
            newState = {
                ...state,
                wishItems: [...state.wishItems, action.payload],
            };
            saveStateToLocalStorage(newState);
            return newState;
        }
        case REMOVE_FROM_WISH:
            newState = { ...state, wishItems: state.wishItems.filter(item => item._id !== action.payload) };
            saveStateToLocalStorage(newState);
            return newState;
        case SET_ORDER_ID: {
            newState = {
                ...state,
                orderId: action.payload,
            };
            saveStateToLocalStorage(newState);
            return newState;
        }
        case CLEAR_ORDER_ID: {
            newState = {
                ...state,
                orderId: null,
            };
            saveStateToLocalStorage(newState);
            return newState;
        }

        default:
            return state;
    }
};

export default reducer;
