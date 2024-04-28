import { useEffect, useState } from "react";
import "../styles/checkout.css";
import indianStates from "../data/States.jsx";
import pasteIcon from "../assets/paste.svg";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setOrderId } from "../redux/action/actions.js";
import { axiosInstance } from "../api.js";
import CartPop from "../components/CartPop.jsx";
import Header from "../components/Header.jsx";

function Checkout() {
  const { cartItems, subtotal, wishItems } = useSelector(
    (state) => state.reducer
  );
  const [cartVisible, setCartVisible] = useState(false);
  const { isLoggedIn, userInfo, token } = useSelector((state) => state.auth);
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

  const [custNameValid, setcustNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [streetAddressValid, setStreetAddressValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);
  const [pinValid, setPinCode] = useState(true);
  const [selectedStateValid, setSelectedStateValid] = useState(true);
  const [mobileValid, setMobileValid] = useState(true);

    const finalPrice = subtotal + 10;


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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
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

    const mobileRegex = /^[789]\d{9}$/;

    if (!mobile.trim() || !mobileRegex.test(mobile)) {
      setMobileValid(false);
      isValid = false;
      toast.error("Invalid Mobile Number", {
        position: "bottom-center",
      });
    } else {
      setMobileValid(true);
    }

    return isValid;
  }

  async function createOrder(paymetInfo) {
    try {
      const order = {
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
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
        paymentMethod: paymetInfo,
      };

      let response;
      if (!isLoggedIn) {
        response = await axiosInstance.post("/order/create/guest", order);
      } else {
        response = await axiosInstance.post("/order/create", order, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      }
      if (response.status === 201) {
        dispatch(clearCart());
        dispatch(setOrderId(response.data.orderId));
        navigate("/thankyou");
      } else {
        toast.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("An error occurred while creating the order");
    }
  }

  async function processPayment() {
    const orderData = {
      amount: finalPrice,
    };

    try {
      const paymentResponse = await axiosInstance.get(
        `/payment/pay?amount=${finalPrice}`
      );
      const paymentRedirectUrl =
        paymentResponse.data.data.instrumentResponse.redirectInfo.url;
      window.location.href = paymentRedirectUrl;
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("An error occurred while processing the payment");
    }
  }

  async function validatePayment(merchantTransactionId) {
    try {
      const response = await axiosInstance.get(
        `/payment/validate/${merchantTransactionId}`
      );
      console.log(response);
      if (response.data && response.data.code === "PAYMENT_SUCCESS") {
        setTimeout(async () => {
          await createOrder(response.data.data.paymentInstrument);
        }, 1000);
      } else {
        toast.error("Payment validation failed");
      }
    } catch (error) {
      console.error("Error validating payment:", error);
      toast.error("An error occurred while validating the payment");
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await processPayment();
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("An error occurred while processing the payment");
    }
  }

  console.log(isLoggedIn);

  useEffect(() => {
    
    if (userInfo && userInfo.address) {
      setcustName(userInfo.address.custName || "");
      setEmail(userInfo.address.email || "");
      setStreetAddress(userInfo.address.street || "");
      setCity(userInfo.address.city || "");
      setPin(userInfo.address.pin || "");
      setSelectedState(userInfo.address.state || "");
      setMobile(userInfo.address.mobile || "");
    }
  }, []);

  const params = new URLSearchParams(window.location.search);
  const merchantTransactionId = params.get("merchantTransactionId");
  useEffect(() => {
    if (merchantTransactionId) {
      validatePayment(merchantTransactionId);
    }
  }, [merchantTransactionId]);

  return (
    <>
      <div className="checkout-page">
        {cartVisible && <CartPop setCartVisible={setCartVisible} />}
        <div className="main-container">
          <Header
            cartCount={cartItems.length}
            wishCount={wishItems.length}
            setCartVisible={setCartVisible}
          />
        </div>

        <div className="checkout-main-container">
          <form onSubmit={handleFormSubmit} className="checkout-form">
            <div className="checkout-left">
              <div className="demo-details">
                <p>Please enter your shipping address</p>
              </div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                name="custname"
                className={custNameValid ? "" : "error-input"}
                value={custName}
                onChange={(e) => setcustName(e.target.value)}
              />
              <label>Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your 10 digit mobile number"
                name="mobile"
                className={mobileValid ? "" : "error-input"}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your gmail id"
                name="email"
                className={emailValid ? "" : "error-input"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Street Address</label>
              <input
                type="text"
                name="streetAddress"
                placeholder="Enter your door number and street name"
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
                  placeholder="Pin Code"
                  type="text"
                  name="pin"
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
                  {indianStates.map((state, index) => (
                    <option key={index} value={state} />
                  ))}
                </datalist>
              </div>
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
                  {finalPrice < 750 && (
                    <div className="order-item total">
                      <p>
                        Since we're just starting out, we're open to accepting
                        slightly larger orders. The minimum cart value we
                        require is 750 rupees.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <input
                type="submit"
                value="Place Order"
                disabled={cartItems.length === 0 || finalPrice <= 750}
              />
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
