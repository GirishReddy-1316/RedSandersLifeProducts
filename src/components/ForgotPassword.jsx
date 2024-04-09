import React, { useState } from "react";

function ForgotPassword({ onPasswordReset }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.target.value);
  }

  function handleSendOtp() {
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
    // Logic to submit new password
    setPasswordSubmitted(true);
    // Call the parent function to handle password reset
    onPasswordReset();
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
      {showOtpForm && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleOtpVerification}>Verify OTP</button>
        </div>
      )}
      {otpVerified && (
        <div>
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
          <button onClick={handlePasswordSubmit}>Submit</button>
          {passwordSubmitted && <p>Password updated successfully!</p>}
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
