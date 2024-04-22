import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contact from "./pages/Contact.jsx";
import Policies from "./pages/Policies.jsx";
import Account from "./pages/Account.jsx";
import Wholesale from "./pages/Wholesale.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Faq from "./pages/Faq.jsx";
import { Toaster } from "sonner";
import UnderConstruction from "./pages/UnderConstruction.jsx";
import RegistrationForm from "./pages/RegistrationForm.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Thankyou from "./pages/Thankyou.jsx";
import "./styles/index.css";
import Orders from "./pages/Orders.jsx";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { axiosInstanceWithToken } from "./api.js";
import { Logout, updateUserInfo } from "./redux/action/authActions.js";
import UserProfile from "./pages/UserProfile.jsx";

function App() {
  let location = useLocation();
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(null);
  const [userActive, setUserActive] = useState(true);
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const resetTimer = () => {
    clearTimeout(timer);
    startTimer();
  };

  const startTimer = () => {
    const timeout = setTimeout(async () => {
      await dispatch(Logout(token));
      localStorage.removeItem("token");
    }, 300000);
    setTimer(timeout);
  };

  const handleUserActivity = () => {
    if (!userActive) {
      setUserActive(true);
      resetTimer();
    }
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const events = ['mousemove', 'keydown'];
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [userActive]);

  useEffect(() => {
    if (token && !isLoggedIn) {
      getUserProfile()
    }
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await axiosInstanceWithToken.get('/user/profile');
      dispatch(updateUserInfo(response.data.user))
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
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
