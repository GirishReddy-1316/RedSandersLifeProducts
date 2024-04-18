// reducers/authReducer.js

import { LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_USER_INFO } from '../action/actionTypes';

const initialState = {
    isLoggedIn: false,
    accessToken: null,
    userInfo: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            const { accessToken, userInfo } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                accessToken,
                userInfo
            };
        }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: null,
                userInfo: {}
            };
        case UPDATE_USER_INFO: {
            const { userInfo } = action.payload;
            return {
                ...state,
                userInfo
            };
        }
        default:
            return state;
    }
};

export default authReducer;
