import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import '../styles/carousel.css'

function CarouselSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <Link to="/all-products">
        <div className="carousel-slide slideOne"> 
        <h2>Why RedSandal Wood?</h2>       
          <div className="carousel-caption">
            <h1 className="hero-heading">Welcome to Red Sanders Family</h1>
            <p className="hero-subtitle">
              A Taste of Authenticity, Straight from the Roots of the Red Sanders
              Tree to Your Body.
            </p>
          </div>
        </div>
      </Link>
      <Link to="/all-products"> 
        <div className="carousel-slide slideTwo"> 
        <h2>Why Redsandal is so Demand and Expensive</h2>            
          <div className="carousel-caption">
            <h1 className="hero-heading">Welcome to Red Sanders Family</h1>
            <p className="hero-subtitle">
              A Taste of Authenticity, Straight from the Roots of the Red Sanders
              Tree to Your Body.
            </p>
          </div>
        </div>
      </Link>
      <Link to="/all-products"> 
        <div className="carousel-slide slideThree">    
        <h2>Why wont we get the bebefit of redsandal wood</h2>       
          <div className="carousel-caption">
            <h1 className="hero-heading">Welcome to Red Sanders Family</h1>
            <p className="hero-subtitle">
              A Taste of Authenticity, Straight from the Roots of the Red Sanders
              Tree to Your Body.
            </p>
          </div>
        </div>
      </Link>
    </Slider>
  );
}

export default CarouselSlider;
