import React, { useState } from "react";
import "../styles/registrationForm.css";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import { axiosInstance } from "../api.js";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { toast } from "sonner";
import Loader from "../components/Loader.jsx";
import CartPop from "../components/CartPop.jsx";
import Header from "../components/Header.jsx";
import { useSelector } from "react-redux";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [cartVisible, setCartVisible] = useState(false);
  const { cartItems, wishItems } = useSelector((state) => state.reducer);
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [verificationStage, setVerificationStage] = useState("phone"); // 'phone', 'otp', 'password'
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Indian phone number validation regex
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const finalizeRegistration = async () => {
    try {
      setLoading(true);
      const payload = {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };
      const response = await axiosInstance.post("/user/registration", payload);
      toast.success("Registration successful", {
        duration: 2000,
        position: "top-center",
      });
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : error.message,
        { duration: 2000, position: "top-center" }
      );
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (verificationStage === "phone" && !formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      verificationStage === "phone" &&
      !validatePhoneNumber(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = "Enter a valid Indian phone number";
    }

    if (verificationStage === "otp" && !formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    }

    if (
      verificationStage === "password" &&
      (!formData.password.trim() ||
        formData.password !== formData.confirmPassword)
    ) {
      newErrors.password = "Passwords do not match";
      newErrors.confirmPassword = "Passwords do not match";
    }
    console.log("verificationStage", verificationStage);
    if (Object.keys(newErrors).length === 0) {
      if (verificationStage === "phone") {
        setVerificationStage("otp");
      } else if (verificationStage === "otp") {
        setVerificationStage("password");
      } else {
        finalizeRegistration();
        setFormData({
          username: "",
          phoneNumber: "",
          email: "",
          otp: "",
          password: "",
          confirmPassword: "",
        });
        setVerificationStage("phone"); // Reset verification stage
        navigate("/account");
      }
    } else {
      // Update the errors state if there are validation errors
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleVerify = async () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid Indian phone number";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/user/otp", formData);
        console.log(response);
        toast.success("OTP generated successfully", {
          duration: 2000,
          position: "top-center",
        });
        setVerificationStage("otp");
        setLoading(false);
      } catch (error) {
        toast.error(
          error.response ? error.response.data.message : error.message,
          { duration: 2000, position: "top-center" }
        );

        setLoading(false);
      }
    } else {
      setErrors(newErrors);
      setLoading(false);
    }
  };

  const handlerSubmitOTP = async () => {
    const newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/user/verify-otp", {
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          otp: formData.otp,
        });
        console.log(response);
        if (response.status === 200) {
          setVerificationStage("password");
          toast.success("OTP Verified", {
            duration: 2000,
            position: "top-center",
          });
          setLoading(false);
        } else {
          newErrors.otp = "Invalid OTP";
          toast.error("Invalid OTP", {
            duration: 2000,
            position: "top-center",
          });
          setErrors(newErrors);
          setLoading(false);
        }
      } catch (error) {
        toast.error(
          error.response ? error.response.data.message : error.message,
          { duration: 2000, position: "top-center" }
        );

        setLoading(false);
      }
    } else {
      setErrors(newErrors);
      setLoading(false);
    }
  };

  async function handlerGoogleAuth() {
    try {
      setLoading(true);
      window.location.href = `http://localhost:3000/auth/google/callback`;
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : error.message,
        { duration: 2000, position: "top-center" }
      );
      setLoading(false);
    }
  }

  return (
    <div className="registration-form-container">
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
        <form onSubmit={handleSubmit} className="registrationForm">
          <h2 className="contact-head">Registration Form</h2>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          {verificationStage === "phone" && (
            <div className="form-group">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}
            </div>
          )}
          {verificationStage === "phone" && (
            <button type="button" onClick={handleVerify}>
              Verify
            </button>
          )}
          {verificationStage === "otp" && (
            <div className="form-group">
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
              />
              {errors.otp && <p className="error">{errors.otp}</p>}
            </div>
          )}
          {verificationStage === "otp" && (
            <button type="button" onClick={handlerSubmitOTP}>
              {" "}
              Submit OTP
            </button>
          )}
          {verificationStage === "password" && (
            <div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </div>
              <button type="submit">Register</button>
            </div>
          )}
          <div className="alignCenter">
            <GoogleButton onClick={handlerGoogleAuth} />
          </div>
        </form>
      </div>
      <Footer />
      <BottomBar />
    </div>
  );
};

export default RegistrationForm;
