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
import { toast } from "sonner";


function Home() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const username = searchParams.get('userName');
  const [cartVisible, setCartVisible] = useState(false);
  const cartItems = useSelector(state => state.reducer.cartItems);
  const wishItems = useSelector(state => state.reducer.wishItems);

  // Init useState to check for updates in localStorage without refreshing
  const [, setTokenUpdate] = useState();

  useEffect(() => {
    const handleTokenChange = (event) => {
      if (event.key === 'token' && event.newValue && event.newValue !== localStorage.getItem('token')) {
        setCredientials(event.newValue);
        setTokenUpdate(event.newValue);
      }
    };
    window.addEventListener('storage', handleTokenChange);
    return () => window.removeEventListener('storage', handleTokenChange);
  }, []);

  const setCredientials = (token) => {
    let toastShown = false;
    if (token && !toastShown) {
      localStorage.setItem('token', token);
      toast.success(`Welcome back, ${username}!`, {
        duration: 2000,
        position: "top-center",
      });
      toastShown = true;
      navigate("/");
    }
  }

  useEffect(() => {
    if (accessToken) {
      setCredientials(accessToken);
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