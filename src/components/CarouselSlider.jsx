import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/carousel.css";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
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
          <div className="upperSection">
            <h2>
          Jiyaba is the first company in the world to create beverages from red sandalwood.
            </h2>
            <h4>  Enjoy nature's goodness with our healthy drinks made of Pure Red
              Sandal!</h4>
            <h4> 
              Red Jiya and Red Tea, made from red sandal heartwood, are the world's first products of their kind.
            </h4>
          </div>
          <div className="row">
            <div className="leftSideSection">
              <img src={slide2} alt="jiyaba bevareges" />
            </div>
            <div className="rightSideSection">
            <img src={slide2} alt="jiyaba bevareges" />
              {/* <ul>
                <li>TRY IT NOW FOR RADIANT SKIN!!</li>
              </ul> */}
              {/* <button className="btn">
                <i className="animation"></i>Shop Now
                <i className="animation"></i>
              </button> */}
            </div>
          </div>
        </div>
      </Link>
      <Link to="/all-products">
        <div className="carousel-slide slideTwo">
          <div className="upperSection">
            <h2>
            Enhance your beauty the natural way with our pure red sandalwood
              face pack!
            </h2>
            <h2>
            Unveil radiant skin with the power of nature. 
            </h2>
            <h2>
            Try it today for a
              glowing complexion!.
            </h2>
          </div>
          <div className="row">
            <div className="leftSideSection">
              <img src={slide1} alt="jiyaba bevareges" />
            </div>
            <div className="rightSideSection">
              <img src={slide1} alt="jiyaba bevareges" />
              {/* <button className="btn">
                <i className="animation"></i>Shop Now
                <i className="animation"></i>
              </button> */}
            </div>
          </div>
        </div>
      </Link>
      {/* <Link to="/all-products">
        <div className="carousel-slide slideThree">
          <div className="upperSection">
            <h2>
              Elevate your worship experience with our pure, genuine red
              sandalwood Homam sticks, Incense sticks and Red sandal pearls
            </h2>
            <h2>Immerse yourself in divine worship like never before…</h2>
          </div>
          <div className="row">
            <div className="leftSideSection">
              <img src={slide3} alt="jiyaba bevareges" />
            </div>
            <div className="rightSideSection">
              <button className="btn">
                <i className="animation"></i>Buy Now
                <i className="animation"></i>
              </button>
            </div>
          </div>
        </div>
      </Link> */}
    </Slider>
  );
}

export default CarouselSlider;
