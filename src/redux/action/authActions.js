// actions/authActions.js

import { axiosInstance } from '../../api';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_USER_INFO } from './actionTypes';

export const loginSuccess = (token, userInfo) => ({
    type: LOGIN_SUCCESS,
    payload: { token, userInfo }
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

export const Logout = (token) => async (dispatch) => {
    console.log('Logout', token);
    try {
        const response = await axiosInstance.post(
            '/user/logout',
            {},
            {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            }
        );
        dispatch(logoutSuccess());
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to logout');
    }
};


export const updateUserInfo = (userInfo) => ({
    type: UPDATE_USER_INFO,
    payload: { userInfo }
});
