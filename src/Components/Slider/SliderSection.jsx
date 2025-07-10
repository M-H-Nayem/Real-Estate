import React from "react";
import Slider from "react-slick";
import { Link } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s1 from "../../assets/s1.jpg";
import s2 from "../../assets/s2.jpg";
import s3 from "../../assets/s3.jpg";
import { Typewriter } from "react-simple-typewriter";

const sliderData = [
  {
    id: 1,
    title: "Satisfactory Luxurious Villa",
    description: "Experience the ultimate comfort and style.",
    img: s1, // local img in public/images
    link: "/properties/1",
  },
  {
    id: 2,
    title: "Modern Apartment for Living",
    description: "Live in the heart of the city with all amenities.",
    img: s2,
    link: "/properties/2",
  },
  {
    id: 3,
    title: "Cozy Cottage in the Countryside",
    description: "Escape the hustle and bustle and relax.",
    img: s3,
    link: "/properties/3",
  },
];

const SliderSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: false,
  };

  return (
    <>
      <h2 className="text-center text-2xl md:text-4xl font-bold text-gray-800 my-10 ">
      <Typewriter
        words={[
          "Discover Dream Properties 🏡",
          "Luxury Apartments, Villas & More!",
          "Find Your Perfect Home Today 🗝️",
        ]}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={2000}
      />
    </h2>

      <section className="relative">
        <Slider {...settings}>
          {sliderData.map((slide) => (
            <div key={slide.id} className="relative">
              <div
                className="h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div className="relative z-20 text-white text-center px-4 max-w-3xl">
                  <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-base md:text-lg mb-6 drop-shadow-sm">
                    {slide.subtitle}
                  </p>
                  <Link>
                    <button className="btn btn-primary text-white px-6">
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
};

export default SliderSection;
