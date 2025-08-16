import React from "react";
import { Link } from "react-router";
import Slider from "react-slick";
import BannerImg1 from "../../assets/Banner.png";
import BannerImg2 from "../../assets/s1.jpg";
import BannerImg3 from "../../assets/s2.jpg";
import { Typewriter } from "react-simple-typewriter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [BannerImg1, BannerImg2, BannerImg3];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <Slider {...settings} className="h-full">
        {images.map((src, i) => (
          <div key={i} className="h-[100vh]">
            <img
              src={src}
              alt={`Banner ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>

      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <Typewriter
              words={[
                "Find Your Perfect Home",
                "Explore Luxury Properties",
                "Buy, Rent or Sell Smartly",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>

          <p className="mb-6 text-base md:text-lg">
            Explore verified listings, best price offers, and trusted agent
            reviews — all in one place.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/properties">
              <button className="px-6 py-3 rounded-full bg-primary-600 text-white font-semibold shadow hover:scale-105 transition">
                Browse Listings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
