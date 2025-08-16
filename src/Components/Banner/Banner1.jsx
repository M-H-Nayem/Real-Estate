// Banner.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router"; // make sure project uses react-router-dom
import BannerImg1 from "../../assets/Banner.png";
import BannerImg2 from "../../assets/s1.jpg";
import BannerImg3 from "../../assets/s2.jpg";
import { Typewriter } from "react-simple-typewriter";

const images = [BannerImg1, BannerImg2, BannerImg3];

export default function Banner1({ interval = 3500 }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // autoplay
  useEffect(() => {
    if (paused || images.length < 2) return;
    timerRef.current = setInterval(() => {
      setIdx((s) => (s + 1) % images.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [paused, interval]);

  // cleanup on unmount
  useEffect(() => () => clearInterval(timerRef.current), []);

  // quick runtime check if images are valid (dev-only)
  useEffect(() => {
    // open console and check these values
    // remove or comment out in production
    // eslint-disable-next-line no-console
    console.log("Banner images:", images);
  }, []);

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setPaused(false)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Homepage banner"
    >
      {/* stacked <img> tags */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-linear ${
              i === idx ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            draggable="false"
            onError={(e) => {
              // show useful console error if an image fails to load
              // eslint-disable-next-line no-console
              console.error("Banner image failed to load:", src, e?.nativeEvent?.target?.src);
            }}
          />
        ))}

        {/* overlay */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      </div>

      {/* centered content above images */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-[1400px] mx-auto">
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

          

          <div className="flex justify-center gap-4">
            <Link to="/properties">
              <button className="px-6 py-3 rounded-full  bg-white/10 text-white font-medium border border-white/20">
                Browse Listings
              </button>
            </Link>
            {/* <Link to="/contact">
              <button className="px-6 py-3 rounded-full bg-white/10 text-white font-medium border border-white/20">
                Contact Agent
              </button>
            </Link> */}
          </div>
        </div>
      </div>

      {/* indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${i === idx ? "scale-125 bg-white" : "bg-white/50"}`}
            title={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
