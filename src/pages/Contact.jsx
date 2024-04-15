import { useState } from "react";
import "../styles/contact.css";
import PagesHeader from "../components/PagesHeader.jsx";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import axiosInstance from "../api.js";

function Contact() {
  const [formState, setFormState] = useState({
    custName: "",
    email: "",
    mobile: "",
    message: "",
    custNameValid: true,
    emailValid: true,
    mobileValid: true,
    formSubmitted: false,
  });

  // De-structure for easier access in the code
  const { custName, email, mobile, message, custNameValid, emailValid, mobileValid, formSubmitted } = formState;

  function triggerAnimation() {
    setAnimationKey((prevKey) => prevKey + 1);
  }

  function validateForm() {
    const isValid = {
      custName: !!custName.trim(),
      email: !!email.trim() && email.includes("@"),
      mobile: !!mobile.trim() && /^\d+$/.test(mobile),
    };

    setFormState({
      ...formState,
      custNameValid: isValid.custName,
      emailValid: isValid.email,
      mobileValid: isValid.mobile,
    });

    return isValid.custName && isValid.email && isValid.mobile;
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axiosInstance.post('/contact', { custName, email, mobile, message });
        console.log(response.data);
        setFormState({ ...formState, formSubmitted: true });
        setFormState({
          ...formState,
          custName: "",
          email: "",
          mobile: "",
          message: "",
          formSubmitted: true,
        });

      } catch (error) {
        console.error('Error submitting contact query:', error);
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  return (
    <div className="contact-container">
      <PagesHeader />
      <form onSubmit={handleContactSubmit} className="contact-form">
        <h1>Contact Us</h1>
        <input
          id="custName"
          type="text"
          name="custName"
          className={custNameValid ? "" : "contact-error-input"}
          value={custName}
          onChange={handleChange}
          autoComplete="name"
          placeholder="Your Name"
        />
        <input
          id="email"
          type="email"
          name="email"
          className={emailValid ? "" : "contact-error-input"}
          value={email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="Email"
        />
        <input
          id="mobile"
          type="tel"
          name="mobile"
          className={mobileValid ? "" : "contact-error-input"}
          value={mobile}
          onChange={handleChange}
          autoComplete="tel"
          placeholder="Contact Number"
        />
        <textarea
          name="message"
          className="contact-text"
          value={message}
          onChange={handleChange}
          placeholder="Message"
        ></textarea>
        <input type="submit" value="Send" />
        {formSubmitted && (
          <span className="thanks visible">
            Your request has been received. We will review it and get back to you soon.
          </span>
        )}
      </form>
      <Footer />
      <BottomBar />
    </div>
  );
}

export default Contact;
