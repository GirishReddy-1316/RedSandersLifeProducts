import "../styles/herosection.css";
import { Link } from "react-router-dom";
import CarouselSlider from "./Corusel";

function HeroSection() {
  return (
    <div className="hero-container">
       <CarouselSlider />
      <h1 className="hero-heading">Welcome to Red Sanders Family</h1>
      <p className="hero-subtitle">
      A Taste of Authenticity, Straight from the Roots of the Red Sanders Tree to Your Bottle.
      </p>
      <Link to="/all-products">
        <button className="shop-now">Explore</button>
      </Link>
      <Link to="/admin-dashboard">
        <button className="shop-now">Admin Board</button>
      </Link>
      
    </div>
  );
}

export default HeroSection;
