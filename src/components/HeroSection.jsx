import "../styles/herosection.css";
import { Link } from "react-router-dom";
import CarouselSlider from "./CarouselSlider";

function HeroSection() {
  return (
    <div className="hero-container">
       <CarouselSlider />    
      
    </div>
  );
}

export default HeroSection;
