import "../styles/wishlist.css";
import { useState, useEffect } from "react";
import "../styles/allproducts.css";
import Header from "../components/Header.jsx";
import BottomBar from "../components/BottomBar.jsx";
import Footer from "../components/Footer.jsx";
import CartPop from "../components/CartPop.jsx";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import addToCartImg from "../assets/cart-product.svg";
import deleteImg from "../assets/deletewish.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromWish } from "../redux/action/actions.js";

function Wishlist() {
  const [cartVisible, setCartVisible] = useState(false);
  const cartItems = useSelector(state => state.reducer.cartItems);
  const wishItems = useSelector(state => state.reducer.wishItems);
  const dispatch = useDispatch();

  const addToCartProduct = (product) => {
    dispatch(addToCart(product))
  };

  const removeFromWishProduct = (product) => {
    dispatch(removeFromWish(product));
  };


  return (
    <>
      {cartVisible && (
        <CartPop
          setCartVisible={setCartVisible}

        />
      )}
      <Header
        cartCount={cartItems.length}
        wishCount={wishItems.length}
        setCartVisible={setCartVisible}
      />

      <div className="wish-products-container">
        {wishItems.length === 0 ? (
          <div className="empty-wishlist-message">Your wishlist is empty!</div>
        ) : (
          <div className="wish-products">
            {wishItems.map((item, index) => (
              <div key={item.id} className="wish-product">
                <Link to={`/products/${item.slug}`} state={{ items: item }}>
                  <img
                    className="wish-product-image"
                    src={item.image}
                    alt={item.name}
                  />
                </Link>
                <div className="wish-product-details">
                  <h3 className="wish-product-name">
                    <Link to={`/products/${item.slug}`} state={{ items: item }}>
                      {item.name}
                    </Link>
                  </h3>
                  <p className="wish-product-size">{item.size}</p>
                  <p className="wish-product-price">{item.price}</p>
                  <div className="wish-product-btns">
                    <button
                      className="wish-removed"
                      onClick={() => {
                        removeFromWishProduct(item._id);
                        toast.warning("Removed from Wishlist", {
                          duration: 1000,
                        });
                      }}
                    >
                      <img src={deleteImg} alt="Remove from Wishlist" />
                    </button>
                    <button
                      className="wish-padd-to-cart"
                      onClick={() => {
                        addToCartProduct(item);
                        toast.success("Added to Cart", { duration: 1000 });
                      }}
                    >
                      <img src={addToCartImg} alt="Add to Cart" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <BottomBar />
    </>
  );
}

export default Wishlist;
