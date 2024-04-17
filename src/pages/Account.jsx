import React, { useState } from "react";
import "../styles/account.css";
import PagesHeader from "../components/PagesHeader.jsx";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import ForgotPassword from "../components/ForgotPassword.jsx";
import axiosInstance from "../api.js";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import axios from "axios";
import { toast } from "sonner";
import Loader from "../components/Loader.jsx";

function Account() {
  const navigate = useNavigate();
  const [animationKey, setAnimationKey] = useState(0);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [custPassword, setCustPassword] = useState("");
  const [inputValid, setInputValid] = useState(true);
  const [custPasswordValid, setCustPasswordValid] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      console.log("Signing in with:", emailOrPhone);
      try {
        setLoading(true);
        const response = await axiosInstance.post("/user/login", {
          emailOrPhone,
          password: custPassword,
        });
        setLoading(false);
        setFormSubmitted(true);
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        toast.success("User Logged in successfully", {
          duration: 2000,
          position: "top-center",
        });
        navigate("/");
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
      window.location.href = `https://sore-tan-pangolin-kilt.cyclic.app/auth/google`;
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
          </form>
        ) : (
          <ForgotPassword onPasswordReset={() => setForgotPassword(false)} />
        )}
      </div>
      <GoogleButton onClick={handlerGoogleAuth} />
      <div className="registrationLink">
        Join us today! <Link to={"/registrationForm"}>Register</Link> now for
        free and become a part of our community.
      </div>
      <Footer />
      <BottomBar />
    </div>
  );
}

export default Account;
