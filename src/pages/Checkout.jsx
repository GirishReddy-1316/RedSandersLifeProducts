import { useEffect, useState } from "react";
import "../styles/checkout.css";
import usStates from "../data/States.jsx";
import visa from "../assets/visa.png";
import mastercard from "../assets/master.png";
import amex from "../assets/amex.png";
import pasteIcon from "../assets/paste.svg";
import disc from "../assets/disc.png";
import Footer from "../components/Footer.jsx";
import PagesHeader from "../components/PagesHeader.jsx";
import BottomBar from "../components/BottomBar.jsx";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { axiosInstanceWithToken } from "../api.js";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/action/actions.js";

function Checkout() {
  const { cartItems, subtotal } = useSelector(state => state.reducer);
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [custName, setcustName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [country] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [mobile, setMobile] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const cvc = "9999";

  const [custNameValid, setcustNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [streetAddressValid, setStreetAddressValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);
  const [pinValid, setPinCode] = useState(true);
  const [selectedStateValid, setSelectedStateValid] = useState(true);
  const [mobileValid, setMobileValid] = useState(true);
  const [cardHolderNameValid, setCardHolderNameValid] = useState(true);

  const paste = () => {
    setcustName("Girish Reddy");
    setEmail("gundulurugiri@gmail.com");
    setStreetAddress("5-60, Mallaiahpalli");
    setCity("Tirupati");
    setPin("517101");
    setSelectedState("Andhra Pradesh");
    setMobile("9591834456");
    setCardHolderName("Girish Reddy");
  };

  const finalPrice = subtotal + 10;

  const expiry = "05/33";

  function validateForm() {
    let isValid = true;

    if (!custName.trim() || !/^[A-Za-z\s]+$/.test(custName)) {
      setcustNameValid(false);
      isValid = false;
      toast.error("Invalid Name ", {
        position: "bottom-center",
      });
    } else {
      setcustNameValid(true);
    }

    if (!email.trim() || !email.includes("@")) {
      setEmailValid(false);
      isValid = false;
      toast.error("Invalid Email", {
        position: "bottom-center",
      });
    } else {
      setEmailValid(true);
    }

    if (!streetAddress.trim()) {
      setStreetAddressValid(false);
      isValid = false;
      toast.error("Invalid Address", {
        position: "bottom-center",
      });
    } else {
      setStreetAddressValid(true);
    }

    if (!city.trim()) {
      setCityValid(false);
      isValid = false;
      toast.error("Invalid City", {
        position: "bottom-center",
      });
    } else {
      setCityValid(true);
    }

    if (!pin.trim() || !/^\d{6}$/.test(pin)) {
      setPinCode(false);
      isValid = false;
      toast.error("Invalid PinCode", {
        position: "bottom-center",
      });
    } else {
      setPinCode(true);
    }

    if (!selectedState) {
      setSelectedStateValid(false);
      isValid = false;
      toast.error("Invalid State", {
        position: "bottom-center",
      });
    } else {
      setSelectedStateValid(true);
    }

    if (!mobile.trim() || !/^\d+$/.test(mobile)) {
      setMobileValid(false);
      isValid = false;
      toast.error("Invalid Mobile Number", {
        position: "bottom-center",
      });
    } else {
      setMobileValid(true);
    }

    if (!cardHolderName.trim() || !/^[A-Za-z\s]+$/.test(cardHolderName)) {
      setCardHolderNameValid(false);
      isValid = false;
      toast.error("Invalid Cardholder Name", {
        position: "bottom-center",
      });
    } else {
      setCardHolderNameValid(true);
    }

    return isValid;
  }

  const handleCardHolderNameChange = (e) => {
    setCardHolderName(e.target.value);
  };

  const handleCvcChange = (e) => {
    setCvc(e.target.value);
  };


  async function createOrder() {
    try {
      if (!validateForm()) {
        return;
      }

      const order = {
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity
        })),
        totalPrice: finalPrice,
        shippingAddress: {
          street: streetAddress,
          city: city,
          state: selectedState,
          country: country,
          email: email,
          custName: custName,
          pin: pin,
          mobile: mobile,
        },
        paymentMethod: "Credit Card",
      };

      const response = await axiosInstanceWithToken.post("/order/create", order);
      console.log(response);

      if (response.status === 201) {
        dispatch(clearCart());
        navigate("/thankyou");
      } else {
        toast.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("An error occurred while creating the order");
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    createOrder();
  }


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/account")
    }

  }, [isLoggedIn])

  useEffect(() => {
    if (userInfo && userInfo.address) {
      setcustName(userInfo.address.custName || "");
      setEmail(userInfo.address.email || "");
      setStreetAddress(userInfo.address.street || "");
      setCity(userInfo.address.city || "");
      setPin(userInfo.address.pin || "");
      setSelectedState(userInfo.address.state || "");
      setMobile(userInfo.address.mobile || "");
      setCardHolderName(userInfo.cardHolderName || "");
    }

  }, [])



  return (
    <>
      <div className="checkout-page">
        <PagesHeader />

        <div className="checkout-main-container">
          <form onSubmit={handleFormSubmit} className="checkout-form">
            <div className="checkout-left">
              <div className="demo-details" onClick={paste}>
                <img src={pasteIcon} className="paste-image" />
                <p>Paste Demo Details</p>
              </div>
              <label>Name</label>
              <input
                type="text"
                name="custname"
                className={custNameValid ? "" : "error-input"}
                value={custName}
                onChange={(e) => setcustName(e.target.value)}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                className={emailValid ? "" : "error-input"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Street Address</label>
              <input
                type="text"
                name="streetAddress"
                className={streetAddressValid ? "" : "error-input"}
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <div className="city-pin">
                <input
                  placeholder="City"
                  type="text"
                  name="city"
                  className={cityValid ? "" : "error-input"}
                  id="mr"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <input
                  placeholder="pin Code"
                  type="text"
                  name="pin"
                  id="ml"
                  className={pinValid ? "" : "error-input"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>

              <div className="country-state">
                <input
                  type="text"
                  name="country"
                  id="mr2"
                  value={country}
                  readOnly
                />

                <input
                  placeholder="State"
                  id="ml2"
                  list="state-list"
                  name="state"
                  className={selectedStateValid ? "" : "error-input"}
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                />
                <datalist id="state-list">
                  {usStates.map((state, index) => (
                    <option key={index} value={state} />
                  ))}
                </datalist>
              </div>

              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                className={mobileValid ? "" : "error-input"}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="checkout-right">
              <div className="order-summary">
                <div className="order-summary-products">
                  {cartItems.map((item, index) => (
                    <div key={index} className="order-item">
                      <img
                        className="checkout-product-image"
                        src={item.image}
                        alt={item.name}
                      />
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>
                        ₹
                        {(
                          parseFloat(item.price.substring(1)) * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-totals">
                  <div className="order-item">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="order-item">
                    <span>Shipping</span>
                    <span>₹10.00</span>
                  </div>
                  <div className="order-item total">
                    <span>Total</span>
                    <span>₹{finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="card-information">
                <div className="test-mode">Test Mode</div>
                <label htmlFor="card-number">Card Number</label>
                <input
                  type="text"
                  id="card-number"
                  value={"1234 5678 9012 3456"}
                  readOnly
                />
                <div className="card-icons">
                  <img src={visa} alt="Visa" />
                  <img src={mastercard} alt="MasterCard" />
                  <img src={amex} alt="American Express" />
                  <img src={disc} alt="Discover" />
                </div>

                <div className="expiry-cvc">
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM / YY"
                    value={expiry}
                    readOnly
                  />
                  <input
                    type="password"
                    id="cvc"
                    placeholder="CVV/CVC"
                    value={cvc}
                    readOnly
                  />
                </div>

                <label htmlFor="cardholder-name">Cardholder Name</label>
                <input
                  type="text"
                  id="cardholder-name"
                  placeholder="Full name on card"
                  value={cardHolderName}
                  onChange={handleCardHolderNameChange}
                  className={cardHolderNameValid ? "" : "error-input"}
                />
              </div>

              <input type="submit" value="Place Order" />
            </div>
          </form>
        </div>

        <Footer />
        <BottomBar />
      </div>
    </>
  );
}

export default Checkout;
