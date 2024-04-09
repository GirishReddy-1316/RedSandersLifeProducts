
import React, { useState } from "react";
import "../styles/forgotpassword.css";


function ForgotPassword({ onPasswordReset }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(""); 
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");

  

  function handleSendOtp() {
    // Validate phone number
    const re = /^[6-9]\d{9}$/; // Indian phone number regex pattern
    if (!re.test(phoneNumber)) {
      setPhoneError("Please enter a valid Indian phone number");
      return; // Exit function if phone number is invalid
    }
    // Logic to send OTP to the provided phone number
    setShowOtpForm(true); // Show OTP form after sending OTP
  }

  function handleOtpVerification() {
    // Logic to verify OTP
    setOtpVerified(true); // Set OTP verification flag to true
  }

  function handlePasswordChange(e) {
    setNewPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    // Compare new password and confirm password
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return; // Exit function if passwords don't match
    }
    // Logic to submit new password
    setPasswordSubmitted(true);
    // Call the parent function to handle password reset
    onPasswordReset();
  }

  
  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.target.value); // Set phone number value
  }

  function handleOtpChange(e) {
    const re = /^\d{0,4}$/; // Only accept digits with max length of 4
    const value = e.target.value;
    if (re.test(value)) {
      setOtp(value);
      setOtpError("");
    } else {
      setOtpError("OTP must be a 4-digit number");
    }
  }

  return (
    <div className="forgot-password-container"> {/* Apply container class */}
        <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      {phoneError && <p className="error-message">{phoneError}</p>}
      <button className="send-otp-button" onClick={handleSendOtp}>Send OTP</button>
      {showOtpForm && (
        <div className="otp-form-container">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {otpError && <p className="error-message">{otpError}</p>}
          <button className="verify-otp-button" onClick={handleOtpVerification}>Verify OTP</button>
        </div>
      )}
      {otpVerified && (
        <div className="password-form-container"> {/* Apply container class */}
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button className="submit-button" onClick={handlePasswordSubmit}>Submit</button> {/* Apply button class */}
          {passwordError && <p className="error-message">{passwordError}</p>} {/* Display password error message */}
          {passwordSubmitted && <p className="success-message">Password updated successfully!</p>} {/* Display success message */}
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
