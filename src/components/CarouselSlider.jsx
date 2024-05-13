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
              Enjoy nature's goodness with our healthy drinks made of Pure Red
              Sandal!
            </h2>
            <h2>
              We offer refreshing drinks and immune-boosting tonics for every
              taste and lifestyle.
            </h2>
          </div>
          <div className="row">
            <div className="leftSideSection">
              <img src={slide1} alt="jiyaba bevareges" />
            </div>
            <div className="rightSideSection">
              <ul>
                <li>UPGRADE YOUR HYDRATION TODAY!!</li>
              </ul>
              <button class="btn">
                <i class="animation"></i>Shop Now<i class="animation"></i>
              </button>
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
              Unveil radiant skin with the power of nature. Try it today for a
              glowing complexion!.
            </h2>
          </div>
          <div className="row">
            <div className="leftSideSection">
              <img src={slide2} alt="jiyaba bevareges" />
            </div>
            <div className="rightSideSection">
              <ul>
                <li>TRY IT NOW FOR RADIANT SKIN!!</li>
              </ul>
              <button class="btn">
                <i class="animation"></i>Shop Now<i class="animation"></i>
              </button>
            </div>
          </div>
        </div>
      </Link>
      <Link to="/all-products">
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
              <button class="btn">
                <i class="animation"></i>Shop Now<i class="animation"></i>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </Slider>
  );
}

export default CarouselSlider;
