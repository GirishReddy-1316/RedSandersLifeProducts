import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../assets/slide.jpg";
import slide2 from "../assets/slide2.jpg";

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
      <div className="carousel-slide">
        <img
          src={slide1}
          className="d-block w-100"
          alt="..."
        />
        <div className="carousel-caption">
          <h1 className="hero-heading">Welcome to Red Sanders Family</h1>
          <p className="hero-subtitle">
            A Taste of Authenticity, Straight from the Roots of the Red Sanders
            Tree to Your Bottle.
          </p>
        </div>
      </div>
      <div className="carousel-slide">
        <img
          src={slide2}
          className="d-block w-100"
          alt="..."
        />
        <div className="carousel-caption">
          <h1 className="hero-heading">Welcome to Red Sanders Family</h1>
          <p className="hero-subtitle">
            A Taste of Authenticity, Straight from the Roots of the Red Sanders
            Tree to Your Bottle.
          </p>
        </div>
      </div>
      <div className="carousel-slide">
        <img
          src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
          className="d-block w-100"
          alt="..."
        />
        <div className="carousel-caption">
          <h1 className="hero-heading">Welcome to Red Sanders Family</h1>
          <p className="hero-subtitle">
            A Taste of Authenticity, Straight from the Roots of the Red Sanders
            Tree to Your Bottle.
          </p>
        </div>
      </div>
     
    </Slider>
  );
}

export default CarouselSlider;
