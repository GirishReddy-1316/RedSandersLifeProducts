// actions/authActions.js

import { LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_USER_INFO } from './actionTypes';

export const loginSuccess = (accessToken, userInfo) => ({
    type: LOGIN_SUCCESS,
    payload: { accessToken, userInfo }
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

export const updateUserInfo = (userInfo) => ({
    type: UPDATE_USER_INFO,
    payload: { userInfo }
});
