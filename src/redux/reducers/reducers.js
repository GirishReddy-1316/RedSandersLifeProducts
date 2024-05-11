import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADD_TO_WISH,
    REMOVE_FROM_WISH,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART,
    CLEAR_ORDER_ID,
    SET_ORDER_ID,
    ADD_SHIPPING_ADDRESS,
    UPDATE_SHIPPING_ADDRESS
} from '../action/actionTypes';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    cartItems: [],
    wishItems: [],
    itemCount: 0,
    subtotal: 0,
    orderId: null,
    shippingAddress: {}
};

const loadStateFromLocalStorage = (userId) => {
    try {
        const serializedState = localStorage.getItem(`cartAndWishState-${userId}`);
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return initialState;
    }
};

const saveStateToLocalStorage = (state, userId) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(`cartAndWishState-${userId}`, serializedState);
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
};

const generateUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = uuidv4(); // Generate a UUID
        localStorage.setItem('userId', userId);
    }
    return userId;
};

const reducer = (state = initialState, action) => {
    const userId = generateUserId();
    state = loadStateFromLocalStorage(userId);
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
            saveStateToLocalStorage(newState, userId);
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
            saveStateToLocalStorage(newState, userId);
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
            saveStateToLocalStorage(newState, userId);
            return newState;
        }
        case CLEAR_CART: {
            const newState = {
                ...state,
                cartItems: [],
                itemCount: 0,
                subtotal: 0,
            };
            saveStateToLocalStorage(newState, userId);
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
            saveStateToLocalStorage(newState, userId);
            return newState;
        }
        case REMOVE_FROM_WISH:
            newState = { ...state, wishItems: state.wishItems.filter(item => item._id !== action.payload) };
            saveStateToLocalStorage(newState, userId);
            return newState;
        case SET_ORDER_ID: {
            newState = {
                ...state,
                orderId: action.payload,
            };
            saveStateToLocalStorage(newState, userId);
            return newState;
        }
        case CLEAR_ORDER_ID: {
            newState = {
                ...state,
                orderId: null,
            };
            saveStateToLocalStorage(newState, userId);
            return newState;
        }
        case ADD_SHIPPING_ADDRESS:
        case UPDATE_SHIPPING_ADDRESS:
            newState = {
                ...state,
                shippingAddress: action.payload,
            };
            saveStateToLocalStorage(newState, userId);

        default:
            return state;
    }
};

export default reducer;
