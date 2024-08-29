import { useState, useEffect } from "react";
import FeaturedSection from "../components/FeaturedSection.jsx";
import GiftSection from "../components/GiftSection.jsx";
import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import bg from "../assets/bg2.mp4";
import bgHome from "../assets/bg.mp4";
import CartPop from "../components/CartPop.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/home.css";
import Footer from "../components/Footer.jsx";
import "../styles/home.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Home() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const username = searchParams.get("userName");
  const [cartVisible, setCartVisible] = useState(false);
  const cartItems = useSelector((state) => state.reducer.cartItems);
  const wishItems = useSelector((state) => state.reducer.wishItems);
  let toastShown = false;
  useEffect(() => {
    if (accessToken && !toastShown) {
      localStorage.setItem("token", accessToken);
      toast.success(`Welcome, ${username} Logged in successfully With Google`, {
        duration: 2000,
        position: "top-center",
      });
      toastShown = true;
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [accessToken]);

  return (
    <div className="main">
      {cartVisible && <CartPop setCartVisible={setCartVisible} />}
      <div className="main-container">
        <Header
          cartCount={cartItems.length}
          wishCount={wishItems.length}
          setCartVisible={setCartVisible}
        />

        <div>
          <video className="background-video" autoPlay loop muted>
            <source src={bgHome} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <HeroSection />
      </div>
      <div>
        <video className="background-video" autoPlay loop muted>
          <source src={bg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* <FeaturedSection addToCart={addToCart} addToWish={addToWish} />
      <GiftSection giftAddToCart={giftAddToCart} addToWish={addToWish} /> */}

      <Footer />
      <BottomBar wishCount={wishItems.length} />
    </div>
  );
}

export default Home;
