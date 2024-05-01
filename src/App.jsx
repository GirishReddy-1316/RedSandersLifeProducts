import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstanceWithToken } from "./api.js";
import { Logout, updateUserInfo } from "./redux/action/authActions.js";
import { fetchProducts } from "./redux/action/actions.js";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useIdleTimer } from 'react-idle-timer';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Account from "./pages/Account.jsx";
import Checkout from "./pages/Checkout.jsx";
import Thankyou from "./pages/Thankyou.jsx";
import Contact from "./pages/Contact.jsx";
import Policies from "./pages/Policies.jsx";
import Wholesale from "./pages/Wholesale.jsx";
import UnderConstruction from "./pages/UnderConstruction.jsx";
import RegistrationForm from "./pages/RegistrationForm.jsx";
import Faq from "./pages/Faq.jsx";
import Orders from "./pages/Orders.jsx";
import UserProfile from "./pages/UserProfile.jsx";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const idleTimeRef = useRef(null);




  useEffect(() => {
    if (token && !isLoggedIn) {
      getUserProfile();
    }
    dispatch(fetchProducts());
  }, [token, isLoggedIn, dispatch]);

  const getUserProfile = async () => {
    try {
      const response = await axiosInstanceWithToken.get('/user/profile');
      localStorage.setItem('userId', response.data.user._id);
      dispatch(updateUserInfo(response.data.user));
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  const onIdle = () => {
    if (isLoggedIn) {
      console.log("Inactive");
      dispatch(Logout(token));
    }
  };

  useIdleTimer({
    crossTab: true,
    ref: idleTimeRef,
    timeout: 60 * 5 * 1000, // 5 minutes of inactivity
    onIdle: onIdle,
  });

  return (
    <>
      <Toaster richColors theme="dark" />
      <ScrollToTop />
      <div key={location.pathname} className="fade-in">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/underconstruction" element={<UnderConstruction />} />
          <Route path="/registrationForm" element={<RegistrationForm />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
