import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CarouselSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      <div className="carousel-slide">
        <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption">Caption 1</div>
      </div>
      <div className="carousel-slide">
        <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption">Caption 2</div>
      </div>
      <div className="carousel-slide">
        <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption">Caption 3</div>
      </div>
      {/* Add more slides as needed */}
    </Slider>
  );
  
}

export default CarouselSlider;
