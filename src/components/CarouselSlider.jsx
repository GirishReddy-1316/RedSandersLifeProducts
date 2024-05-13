import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import "../styles/carousel.css";

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
          <h2 className="alignCenter">will show some content related to Jiyaba bevarages</h2>
        </div>
      </Link>
      <Link to="/all-products">
        <div className="carousel-slide slideTwo">
          <h2 className="alignCenter">will show some content related to Redsandal face powder</h2>
        </div>
      </Link>
      <Link to="/all-products">
        <div className="carousel-slide slideThree">
          <h2 className="alignCenter">will show some content related to Jiyaba Pooja items</h2>
        </div>
      </Link>
    </Slider>
  );
}

export default CarouselSlider;
