import "../styles/herosection.css";
import { Link } from "react-router-dom";
import CarouselSlider from "./CarouselSlider";
import Benefits from "../pages/Benefits";
Benefits
function HeroSection() {
  return (
    <div className="hero-container">
       <CarouselSlider />    
       <Benefits/>
    </div>
  );
}

export default HeroSection;
