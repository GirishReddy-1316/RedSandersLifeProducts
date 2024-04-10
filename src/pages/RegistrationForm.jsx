import React, { useState } from 'react';
import '../styles/registrationForm.css';
import PagesHeader from "../components/PagesHeader.jsx";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [verificationStage, setVerificationStage] = useState('phone'); // 'phone', 'otp', 'password'

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (verificationStage === 'phone' && !formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (verificationStage === 'phone' && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid Indian phone number';
    }

    if (verificationStage === 'otp' && !formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    }

    if (verificationStage === 'password' && (!formData.password.trim() || formData.password !== formData.confirmPassword)) {
      newErrors.password = 'Passwords do not match';
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      // Proceed to next stage or submit the form if the last stage
      if (verificationStage === 'phone') {
        setVerificationStage('otp');
      } else if (verificationStage === 'otp') {
        setVerificationStage('password');
      } else {
        // Submit the form if no errors and at the last stage
        console.log('formdataaa',formData);
        alert('Form submitted successfully!');
        // Clear form fields
        setFormData({
          username: '',
          phoneNumber: '',
          email: '',
          otp: '',
          password: '',
          confirmPassword: '',
        });
        setVerificationStage('phone'); // Reset verification stage
      }
    } else {
      // Update the errors state if there are validation errors
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleVerify = () => {
    const newErrors = {};
  
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
  
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
  
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid Indian phone number';
    }
  
    if (Object.keys(newErrors).length === 0) {
      // Proceed to OTP verification stage
      setVerificationStage('otp');
    } else {
      // Update the errors state if there are validation errors
      setErrors(newErrors);
    }
  };
  

  return (
    <div className="registration-form-container">
      <PagesHeader />
      <div className='pheader-container'>
        <h2 className="contact-head">Registration Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        {verificationStage === 'phone' && (
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>
        )}
        {verificationStage === 'phone' && (
          <button type="button" onClick={handleVerify}>Verify</button>
        )}
        {verificationStage === 'otp' && (
          <div className="form-group">
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
            />
            {errors.otp && <p className="error">{errors.otp}</p>}
          </div>
        )}
        {verificationStage === 'otp' && (
          <input type="submit" value="Submit OTP" />
        )}
        {verificationStage === 'password' && (
          <div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
            <input type="submit" value="Register" />
          </div>
        )}
      </form>
      <Footer />
      <BottomBar />
    </div>
  );
};

export default RegistrationForm;
