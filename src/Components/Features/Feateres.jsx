// src/components/Fea.jsx
import React from "react";
import {
  FaBed,
  FaBath,
  FaHome,
  FaParking,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

const Feateres = () => {
  const propertyData = {
    name: "Kingdom Palace",
    location: "Savar , Dhaka",
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
      "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    ],
    stats: [
      { label: "Bedroom", value: "Four", icon: <FaBed /> },
      { label: "Bathroom", value: "Three", icon: <FaBath /> },
      { label: "Area", value: "1,024 ft", icon: <FaHome /> },
      { label: "Parking", value: "Indoor", icon: <FaParking /> },
      { label: "Area safety", value: null, icon: <FaShieldAlt />, rating: 4 },
    ],
  };

  const bookingData = {
    property: "Azalea Residences",
    price: 116,
    isSuperhost: true,
    isGreatLocation: true,
  };

  return (
    <div className=" py-10 px-4 lg:px-0">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800 text-center">
        Looking for a Rent❓
      </h2>
      <div className="max-w-[1400px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-3 md:p-5">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Gallery Section (Left side) */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-fit lg:h-[300px]">
                {/* Main large image on the left */}
                <div className="hidden lg:block col-span-2 row-span-2 md:col-span-1 md:row-span-2 overflow-hidden rounded-3xl">
                  <img
                    src={
                      propertyData.images[0] ||
                      "https://placehold.co/800x1000/E5E7EB/4B5563?text=Freepik+Image"
                    }
                    alt="Main Property"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                {/* Smaller images on the right */}
                <div className="col-span-2 row-span-2 md:col-span-1 md:row-span-2 overflow-hidden rounded-3xl">
                  <div className="grid grid-cols-2 grid-rows-2 gap-4 col-span-4 md:col-span-1">
                    {propertyData.images.slice(1, 5).map((img, index) => (
                      <div
                        key={index}
                        className="col-span-1 row-span-1 overflow-hidden rounded-2xl"
                      >
                        <img
                          src={
                            img ||
                            `https://placehold.co/400x400/E5E7EB/4B5563?text=Freepik+Img+${
                              index + 1
                            }`
                          }
                          alt={`Property ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  Find Your Perfect Place to Stay.
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  Explore our exclusive collection of handpicked properties,
                  designed for comfort and luxury. Your next home is just a
                  click away.
                </p>

                <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-500 font-bold">500+</span>{" "}
                    Properties
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-500 font-bold">25+</span>{" "}
                    Locations
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-500 font-bold">100%</span>{" "}
                    Verified Listings
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Widget Section (Right side) */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-6 rounded-3xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {bookingData.property}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      {bookingData.isSuperhost && (
                        <span className="flex items-center mr-2">
                          <FaStar className="text-orange-400 mr-1" />
                          Superhost
                        </span>
                      )}
                      {bookingData.isGreatLocation && (
                        <span className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-1" />
                          Great location
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    ${bookingData.price}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      Night
                    </span>
                  </div>
                </div>

                {/* Date & Guest Selectors */}
                <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Check In
                      </label>
                      <input
                        type="text"
                        value="11/09/2025"
                        readOnly
                        className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Check Out
                      </label>
                      <input
                        type="text"
                        value="20/09/2025"
                        readOnly
                        className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Guests
                    </label>
                    <input
                      type="text"
                      value="3 Guest"
                      readOnly
                      className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                </div>

                {/* Cancellation Policies */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Cancellation Polices
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">Non-Refundable</p>
                      <span className="font-medium text-gray-800">
                        $116 Total
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">Refundable</p>
                      <span className="font-medium text-gray-800">
                        $126 Total
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Free cancellation before sep21, after that, the
                      reservation is non-refundable.
                    </p>
                  </div>
                </div>

                {/* Total Section */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800">
                    Total Before Taxes:
                  </h4>
                  <span className="font-bold text-gray-800">$116</span>
                </div>
              </div>
            </div>
          </div>

          {/* Property Info Section (Below the main section) */}
          <div className="mt-10 border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {propertyData.name}
            </h3>
            <p className="text-gray-600 mb-6">{propertyData.location}</p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {propertyData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div className="text-xl text-gray-700 mb-2">{stat.icon}</div>
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <span className="font-semibold text-gray-800">
                    {stat.value || (
                      <div className="flex gap-1 mt-1">
                        {[...Array(stat.rating)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-green-500"
                          ></div>
                        ))}
                        {[...Array(5 - stat.rating)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-gray-300"
                          ></div>
                        ))}
                      </div>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feateres;
