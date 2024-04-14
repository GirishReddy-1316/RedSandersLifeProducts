import React, { useState } from 'react';
import '../styles/account.css';
import PagesHeader from '../components/PagesHeader.jsx';
import Footer from '../components/Footer.jsx';
import BottomBar from '../components/BottomBar.jsx';
import ForgotPassword from '../components/ForgotPassword.jsx';
import axiosInstance from '../api.js';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import axios from 'axios';

function Account() {
  const navigate = useNavigate()
  const [animationKey, setAnimationKey] = useState(0);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [custPassword, setCustPassword] = useState("");
  const [inputValid, setInputValid] = useState(true);
  const [custPasswordValid, setCustPasswordValid] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false)

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

    if (!emailOrPhone.trim() || !(emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone))) {
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
      console.log("Signing in with:", emailOrPhone);
      try {
        const response = await axiosInstance.post('/user/login', { emailOrPhone, password: custPassword });
        setFormSubmitted(true)
        console.log(response.data);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        navigate("/")

      } catch (error) {
        console.error('Login error:', error.response ? error.response.data.message : error.message);
        alert('Login failed!');
      }
    }
  }

  async function handlerGoogleAuth() {
    try {
      window.location.href = `http://localhost:3000/auth/google`
    } catch (error) {
      console.error('Google login error:', error.response ? error.response.data.message : error.message);
      alert('Google login failed!');
    }
  }

  return (
    <div className="account-container">
      <PagesHeader />
      <div className="pheader-container">
        <h2 className="contact-head">Login</h2>

        {!forgotPassword ? (
          <form onSubmit={handlerSignin} className="contact-form">
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

            <input type="submit" value="Sign In" />
            <a className="forgot-password" onClick={() => setForgotPassword(true)}>Forgot Password?</a>

            {formSubmitted && (
              <span className={`thanks ${formSubmitted ? "visible" : ""}`}>
                Welcome back
              </span>
            )}
          </form>
        ) : (
          <ForgotPassword onPasswordReset={() => setForgotPassword(false)} />
        )}
      </div>
      <GoogleButton
        onClick={handlerGoogleAuth}
      />
      <div className="registrationLink">
        Join us today! <Link to={"/registrationForm"}>Register</Link> now for free
        and become a part of our community.
      </div>
      <Footer />
      <BottomBar />
    </div>
  );
}

export default Account;
