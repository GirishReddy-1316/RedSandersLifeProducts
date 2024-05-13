import React, { useState } from "react";
import "../styles/account.css";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import ForgotPassword from "../components/ForgotPassword.jsx";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import axios from "axios";
import { toast } from "sonner";
import Loader from "../components/Loader.jsx";
import { axiosInstance } from "../api.js";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/action/authActions.js";
import CartPop from "../components/CartPop.jsx";
import Header from "../components/Header.jsx";

function Account() {
  const navigate = useNavigate();
  const [cartVisible, setCartVisible] = useState(false);
  const { cartItems, wishItems } = useSelector((state) => state.reducer);
  const [animationKey, setAnimationKey] = useState(0);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [custPassword, setCustPassword] = useState("");
  const [inputValid, setInputValid] = useState(true);
  const [custPasswordValid, setCustPasswordValid] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  function triggerAnimation() {
    setAnimationKey((prevKey) => prevKey + 1);
  }

  function validateForm() {
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!custPassword.trim()) {
      setCustPasswordValid(false);
      isValid = false;
    } else {
      setCustPasswordValid(true);
    }

    if (
      !emailOrPhone.trim() ||
      !(emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone))
    ) {
      setInputValid(false);
      isValid = false;
    } else {
      setInputValid(true);
    }

    if (!isValid) {
      triggerAnimation();
    }

    return isValid;
  }

  async function handlerSignin(e) {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/user/login", {
          emailOrPhone,
          password: custPassword,
        });
        setLoading(false);
        setFormSubmitted(true);
        dispatch(loginSuccess(response.data.token, response.data.user));
        localStorage.setItem("token", response.data.token);
        toast.success(
          `Welcome, ${
            response.data?.user?.username || "User"
          } Logged in successfully`,
          {
            duration: 2000,
            position: "top-center",
          }
        );
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast.error(
          "Login failed: " +
            (error.response ? error.response.data.message : error.message),
          { duration: 2000, position: "top-center" }
        );
        setLoading(false);
      } finally {
        setFormSubmitted(false);
        setLoading(false);
      }
    }
  }

  async function handlerGoogleAuth() {
    try {
      setLoading(true);
      window.location.href = `https://redsanderslifeserver.onrender.com/auth/google/callback`;
    } catch (error) {
      console.error(
        "Google login error:",
        error.response ? error.response.data.message : error.message
      );
      setLoading(false);
      toast.error(
        error.response ? error.response.data.message : error.message,
        { duration: 2000, position: "top-center" }
      );
    }
  }

  return (
    <div className="account-container">
      {loading && <Loader />}
      {cartVisible && <CartPop setCartVisible={setCartVisible} />}
      <div className="main-container">
        <Header
          cartCount={cartItems.length}
          wishCount={wishItems.length}
          setCartVisible={setCartVisible}
        />
      </div>
      <div className="pheader-container">
        {!forgotPassword ? (
          <form onSubmit={handlerSignin} className="account-login-form">
            <h2 className="contact-head">Login</h2>
            <input
              id="emailOrPhone"
              key={`emailOrPhone-${animationKey}`}
              type="text"
              name="emailOrPhone"
              className={inputValid ? "" : "contact-error-input"}
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              autoComplete="email"
              placeholder="Email or phone number"
            />

            <input
              id="custpassword"
              key={`custPassword-${animationKey}`}
              type="password"
              name="custpassword"
              className={custPasswordValid ? "" : "contact-error-input"}
              value={custPassword}
              onChange={(e) => setCustPassword(e.target.value)}
              placeholder="Password"
            />

            {/* <input type="submit" value="Sign In" /> */}
            <button type="submit" >Sign In</button>
            <a
              className="forgot-password"
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </a>

            {formSubmitted && (
              <span className={`thanks ${formSubmitted ? "visible" : ""}`}>
                Welcome back
              </span>
            )}
            <div className="alignCenter">
              <GoogleButton onClick={handlerGoogleAuth} />
            </div>
            <div className="alignCenter">             
              <div className="registrationLink">
                Join us today! <Link to={"/registrationForm"}>Register</Link>{" "}
                now for free and become a part of our community.
              </div>              
            </div>
          </form>
        ) : (
          <ForgotPassword onPasswordReset={() => setForgotPassword(false)} />
        )}
      </div>

      <Footer />
      <BottomBar />
    </div>
  );
}

export default Account;
