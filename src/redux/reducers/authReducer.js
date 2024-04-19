// reducers/authReducer.js

import { LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_USER_INFO } from '../action/actionTypes';

const initialState = {
    isLoggedIn: false,
    token: localStorage.getItem('token'),
    userInfo: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            const { token, userInfo } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                token,
                userInfo
            };
        }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                userInfo: {}
            };
        case UPDATE_USER_INFO: {
            const { userInfo } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                userInfo
            };
        }
        default:
            return state;
    }
};

export default authReducer;
