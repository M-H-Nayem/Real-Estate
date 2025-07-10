// src/pages/Dashboard/UserProfile.jsx

import React from "react";
import useAuth from "../../../Hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        👤 My Profile
      </h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
        />
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full inline-block mt-1">
            User
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
