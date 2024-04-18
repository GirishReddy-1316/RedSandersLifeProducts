import { useNavigate } from "react-router-dom";
import "../styles/cartpop.css";
import cartClose from "../assets/close-cart.svg";
import CartProduct from "./CartProduct.jsx";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

function CartPop({
  setCartVisible,
}) {
  const popupRef = useRef();
  const navigate = useNavigate();
  const { cartItems, wishItems, itemCount, subtotal } = useSelector(state => state.reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setCartVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCartVisible]);

  return (
    <>
      <div className="popupcart" ref={popupRef}>
        <div className="popup-head">
          <p>My Cart</p>
          <p>{itemCount} Items</p>
          <img src={cartClose} onClick={() => setCartVisible(false)} />
        </div>
        <div className="popup-top">
          {cartItems.map((item, index) => (
            <CartProduct
              key={index}
              item={item}
              index={index}
              id={item._id}
            />
          ))}
        </div>
        <div className="popup-bottom">
          <div className="subtotal">
            <p>Subtotal</p>
            <p>₹{subtotal.toFixed(2)} Rs</p>
          </div>

          <button
            onClick={() =>
              itemCount > 0
                ? navigate("/checkout")
                : toast.warning("Your cart is empty!", { duration: 1000 })
            }
            className="buy"
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </>
  );
}

export default CartPop;
