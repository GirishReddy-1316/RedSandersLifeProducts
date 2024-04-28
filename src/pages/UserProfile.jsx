import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../styles/UserProfile.css"
import { Logout, logoutSuccess, updateUserInfo } from '../redux/action/authActions';
import Header from '../components/Header';
import { axiosInstanceWithToken } from '../api';

const UserProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.reducer.cartItems);
    const wishItems = useSelector(state => state.reducer.wishItems);
    const { isLoggedIn, token, userInfo } = useSelector((state) => state.auth);
    async function handleLogout() {
        await dispatch(Logout(token));
        navigate("/account")
    }

    useEffect(() => {
        getUserProfile()
    }, []);

    const getUserProfile = async () => {
        try {
            const response = await axiosInstanceWithToken.get('/user/profile');
            localStorage.setItem('userId', response.data.user._id);
            dispatch(updateUserInfo(response.data.user))
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
    return (
        <>
            <div className="main-container">
                <Header
                    cartCount={cartItems.length}
                    wishCount={wishItems.length}
                // setCartVisible={setCartVisible}
                />
            </div>
            <div className="user-profile">
                {isLoggedIn && userInfo ? (
                    <div>
                        <h2>User Profile</h2>
                        <div className="user-details">
                            <p><strong>Email:</strong> {userInfo?.email}</p>
                            <p><strong>Username:</strong> {userInfo?.username}</p>
                            {
                                userInfo.address && Object.keys(userInfo.address).length > 0 && (<> <p><strong>Address:</strong></p>
                                    <p>Street: {userInfo.address?.street}</p>
                                    <p>City: {userInfo.address?.city}</p>
                                    <p>State: {userInfo.address?.state}</p>
                                    <p>Country: {userInfo.address?.country}</p>
                                    <p>Customer Name: {userInfo.address?.custName}</p>
                                    <p>Pin: {userInfo.address?.pin}</p>
                                    <p>Mobile: {userInfo.address?.mobile}</p></>)
                            }

                        </div>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <p className="login-prompt">Please log in to view your profile.</p>
                )}
            </div>
        </>

    )
}

export default UserProfile