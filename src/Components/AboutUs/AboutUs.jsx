import React from 'react';
import { FaBuilding, FaHandsHelping, FaLaptopCode } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section className="py-25  text-gray-800 font-sans">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-0">
        {/* Main Heading and Subtitle */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-gray-800 text-center">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            At EstateEase, we believe that finding your dream home should be a simple and transparent process.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              EstateEase was born from the idea that the home-finding process shouldn't be complicated and stressful. We built this platform to create a bridge of trust and transparency between property buyers and sellers. Our goal is to help every person find a property that is right for them, whether it's a small apartment, a spacious family home, or a luxurious villa.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              From the very beginning, we have prioritized honesty and clarity in every transaction.
            </p>
          </div>
          <div className="order-1 lg:order-2 rounded-xl shadow-lg overflow-hidden">
            <img 
              src="/aboutus.png" 
              alt="An image of a team collaborating on a project"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide a comprehensive platform with thousands of properties, detailed information, and high-quality images.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Verified Listings */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <div className="text-indigo-500 text-5xl mb-4">
              <FaBuilding />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">
              Verified Listings
            </h3>
            <p className="text-gray-600">
              Every property on our site is carefully verified to ensure the information is accurate and reliable.
            </p>
          </div>

          {/* Card 2: Expert Agents */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <div className="text-green-500 text-5xl mb-4">
              <FaHandsHelping />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">
              Expert Agents
            </h3>
            <p className="text-gray-600">
              We partner with experienced and trustworthy agents who are dedicated to helping you find the right property.
            </p>
          </div>

          {/* Card 3: User-Friendly Tools */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <div className="text-purple-500 text-5xl mb-4">
              <FaLaptopCode />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">
              User-Friendly Tools
            </h3>
            <p className="text-gray-600">
              Our platform features advanced search filters, bidding options, and a dashboard to easily manage your activities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
