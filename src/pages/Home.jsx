import { useState, useEffect } from "react";
import FeaturedSection from "../components/FeaturedSection.jsx";
import GiftSection from "../components/GiftSection.jsx";
import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import bg from "../assets/bg2.mp4";
import CartPop from "../components/CartPop.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/home.css";
import Footer from "../components/Footer.jsx";
import "../styles/home.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


function Home() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const [cartVisible, setCartVisible] = useState(false);
  const cartItems = useSelector(state => state.reducer.cartItems);
  const wishItems = useSelector(state => state.reducer.wishItems);


  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      getUserProfile()
      navigate("/")
    }
  }, [accessToken]);

  return (
    <div className="main">
      {cartVisible && (
        <CartPop
          setCartVisible={setCartVisible}
        />
      )}
      <div className="main-container">
        <Header
          cartCount={cartItems.length}
          wishCount={wishItems.length}
          setCartVisible={setCartVisible}
        />
        <HeroSection />
      </div>

      {/* <FeaturedSection addToCart={addToCart} addToWish={addToWish} />
      <GiftSection giftAddToCart={giftAddToCart} addToWish={addToWish} /> */}

      <Footer />
      <BottomBar wishCount={wishItems.length} />
    </div>
  );
}

export default Home;
