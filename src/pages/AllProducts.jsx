import { useState, useEffect } from "react";
import "../styles/allproducts.css";
import Header from "../components/Header.jsx";
import BottomBar from "../components/BottomBar.jsx";
import Footer from "../components/Footer.jsx";
import CartPop from "../components/CartPop.jsx";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import addToCartImg from "../assets/cart-product.svg";
import wishlistImg from "../assets/heart.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWish, fetchProducts } from "../redux/action/actions.js";
import Loader from "../components/Loader.jsx";



function AllProducts() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.reducer.cartItems);
  const wishItems = useSelector(state => state.reducer.wishItems);
  const { products, loading, error } = useSelector(state => state.product);
  const [cartVisible, setCartVisible] = useState(false);

  const addToCartProduct = (product) => {
    dispatch(addToCart(product))
  };

  const addToWishProduct = (product) => {
    dispatch(addToWish(product));
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
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

      <div className="all-products-container">
        <div className="all-products">
          {products && products.map((item) => (
            <div key={item._id} className="all-product">
              <Link to={`/products/${item.slug}`} state={{ items: item }}>
                <img
                  className="all-product-image"
                  src={item.image}
                  alt={item.name}
                />
              </Link>
              <div className="all-product-details">
                <h3 className="all-product-name">
                  <Link to={`/products/${item.slug}`} state={{ items: item }}>
                    {item.name}
                  </Link>
                </h3>
                <p className="all-product-size">{item.size}</p>
                <p className="all-product-price">{item.price}</p>
                <div className="all-products-btns">
                  <button
                    className="all-padd-to-wish"
                    onClick={() => {
                      addToWishProduct(item);
                      toast.success("Added to Wishlist", { duration: 1000 });
                    }}
                  >
                    <img src={wishlistImg} />
                  </button>
                  <button
                    className="all-padd-to-cart"
                    onClick={() => {
                      addToCartProduct(item);
                      toast.success("Added to Cart", { duration: 1000 });
                    }}
                  >
                    <img src={addToCartImg} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div >
      </div >

      <Footer />
      <BottomBar />
    </>
  );
}

export default AllProducts;
