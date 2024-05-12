import "../styles/singleproduct.css";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import Header from "../components/Header.jsx";
import CartPop from "../components/CartPop.jsx";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWish,
  updateCartItemQuantity,
} from "../redux/action/actions.js";

function SingleProduct() {
  const location = useLocation();
  const items = location.state.items;
  const [itemQuantity, setItemQuantity] = useState(1);
  const { cartItems, wishItems } = useSelector((state) => state.reducer);
  const [cartVisible, setCartVisible] = useState(false);
  const dispatch = useDispatch();
  const handleQuantityChange = (qnty) => {
    if (qnty > 0 || itemQuantity + qnty > 0) {
      if (
        cartItems.filter((cartItem) => cartItem._id === items._id).length === 0
      ) {
        addToCartProduct(items);
      }
      dispatch(updateCartItemQuantity(items._id, qnty));
    }
  };

  const addToCartProduct = (product) => {
    dispatch(addToCart(product));
  };

  const addToWishProduct = (product) => {
    dispatch(addToWish(product));
  };

  useEffect(() => {
    let isProductInCart = cartItems.filter(
      (cartItem) => cartItem._id === items._id
    );
    setItemQuantity(isProductInCart[0]?.quantity || 1);
  }, [cartItems]);

  return (
    <>
      {cartVisible && <CartPop setCartVisible={setCartVisible} />}

      <Header
        cartCount={cartItems.length}
        wishCount={wishItems.length}
        setCartVisible={setCartVisible}
      />

      <div className="single-product-container">
        <div className="sp-container">
          <div className="sp-img-container">
            <img src={items.image} className="sp-img" />
          </div>
          <div className="sp-details">
            <h3 className="sp-name">{items.name}</h3>
            <p className="sp-size">{items.size}</p>
            <p className="sp-price">{items.price}</p>
            <div className="subHeadings">Description:</div>
            <div className="sp-desc">{items.desc}</div>
            <div className="subHeadings">Ingredients:</div>
            <div className="sp-desc">{items.ingredients}</div>
            <div className="subHeadings">Health Benefits:</div>
            <ol className="additionalBulletPoints">
              {items.additionalBulletPoints.map((point, index) => (
                <li key={index}>
                  <b>{point.heading}</b> {point.description}
                </li>
              ))}
            </ol>

            <button
              className="sp-add-to-cart"
              onClick={() => {
                addToCartProduct(items);
                toast.success("Added to Cart", { duration: 1000 });
              }}
            >
              Add to Cart
            </button>
            <button
              className="sp-add-to-cart"
              onClick={() => {
                addToWishProduct(items);
                toast.success("Added to Wishlist", { duration: 1000 });
              }}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <BottomBar />
    </>
  );
}

export default SingleProduct;
