// actions/authActions.js

import { LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_USER_INFO } from './actionTypes';

export const loginSuccess = (token, userInfo) => ({
    type: LOGIN_SUCCESS,
    payload: { token, userInfo }
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

export const updateUserInfo = (userInfo) => ({
    type: UPDATE_USER_INFO,
    payload: { userInfo }
});
