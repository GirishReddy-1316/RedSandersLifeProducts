import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../styles/UserProfile.css"
import { Logout, logoutSuccess } from '../redux/action/authActions';
import Header from '../components/Header';

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
    console.log(userInfo)
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
                                userInfo.address && (<> <p><strong>Address:</strong></p>
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