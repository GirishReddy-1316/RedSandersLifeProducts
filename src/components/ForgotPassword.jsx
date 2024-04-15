import React, { useState } from "react";
import "../styles/forgotpassword.css";
import axiosInstance from "../api";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ onPasswordReset }) {
  const navigate = useNavigate()
  const [EmailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [inputError, setInputError] = useState("");

  async function handleSendOtp() {
    if (!EmailOrPhone) {
      setInputError("Please enter Phone Number or Email");
      return;
    }

    // Logic to send OTP to the provided phone number or email
    try {
      const response = await axiosInstance.post('/user/forget-password', { email: EmailOrPhone, phone: EmailOrPhone });
      console.log('OTP sent', response.data);
      setShowOtpForm(true);
    } catch (error) {
      console.error('Error sending OTP:', error.response ? error.response.data.message : error.message);
      setInputError('Failed to send OTP!');
    }

  }

  async function handleOtpVerification() {
    try {
      const response = await axiosInstance.post('/user/verify-password-otp', { phoneNumber: EmailOrPhone, otp });
      console.log('OTP verification', response.data);
      if (response.status === 200) {
        setOtpVerified(true);
      } else {
        setInputError('OTP verification failed! Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.response ? error.response.data.message : error.message);
      setInputError('Failed to verify OTP!');
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setPasswordError("Please enter both passwords");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Logic to submit new password
    try {
      const response = axiosInstance.post('/user/reset-password', { EmailOrPhone, password: newPassword });
      if (response.status === 200) {
        setPasswordSubmitted(true);
        onPasswordReset();
        navigate("/account")
      } else {
        setInputError('Password reset failed! Please try again.');
      }
    } catch (error) {
      console.error('Error password reset:', error.response ? error.response.data.message : error.message);
      setInputError('Failed to password reset!');
    }
  }

  return (
    <div className="forgot-password-container">
      {!showOtpForm && (
        <div>
          <input
            type="text"
            placeholder="Phone Number or Email"
            value={EmailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          {inputError && <p className="error-message">{inputError}</p>}
          <button className="send-otp-button" onClick={handleSendOtp}>
            Send OTP
          </button>
        </div>
      )}

      {showOtpForm && !otpVerified && (
        <div className="otp-form-container">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="verify-otp-button"
            onClick={handleOtpVerification}
          >
            Verify OTP
          </button>
        </div>
      )}

      {otpVerified && (
        <div className="password-form-container">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="submit-button" onClick={handlePasswordSubmit}>
            Reset Password
          </button>
          {passwordError && (
            <p className="error-message">{passwordError}</p>
          )}
          {passwordSubmitted && (
            <p className="success-message">Password updated successfully!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
