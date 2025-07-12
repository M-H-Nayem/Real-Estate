import React from "react";
import { FaHome, FaTachometerAlt } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const Welcome = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-4">
      <div className="max-w-xl">
        <div className="flex justify-center mb-6">
          <FaTachometerAlt className="text-6xl text-blue-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to your Dashboard!
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Hello <span className="font-semibold">{user?.displayName || "User"}</span>,
        </p>
        <p className="text-gray-500">
          Use the sidebar to navigate your profile, manage properties, reviews, and more. We're glad you're here.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
