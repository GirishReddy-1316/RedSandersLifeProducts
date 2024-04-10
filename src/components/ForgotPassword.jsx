import React, { useState } from "react";
import "../styles/forgotpassword.css";

function ForgotPassword({ onPasswordReset }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [inputError, setInputError] = useState("");

  function handleSendOtp() {
    if (!phoneNumber && !email) {
      setInputError("Please enter Phone Number or Email");
      return;
    }

    // Logic to send OTP to the provided phone number or email
    setShowOtpForm(true);
  }

  function handleOtpVerification() {
    // Logic to verify OTP
    setOtpVerified(true);
  }

  function handlePasswordSubmit(e) {
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
    setPasswordSubmitted(true);
    onPasswordReset();
  }

  return (
    <div className="forgot-password-container">
      {!showOtpForm && (
        <div>
          <input
            type="text"
            placeholder="Phone Number or Email"
            value={phoneNumber || email}
            onChange={(e) =>
              phoneNumber ? setPhoneNumber(e.target.value) : setEmail(e.target.value)
            }
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
            Register
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
