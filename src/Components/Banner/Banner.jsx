import React from "react";
import { Link } from "react-router";
import BannerImg from "../../assets/Banner.png";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <>
    <section
      className="relative lg:min-h-[70vh] min-h-[40vh] sm:min-h-[55vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${BannerImg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center text-white px-4 md:px-10 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <Typewriter
            words={[
              "Find Your Perfect Home",
              "Explore Luxury Properties",
              "Buy, Rent or Sell Smartly",
            ]}
            loop={true}
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
        <Link to="/properties">
          <button className="btn btn-primary px-6 text-white">
            Browse Listings
          </button>
        </Link>
      </div>
    </section>
    </>
  );
};

export default Banner;
