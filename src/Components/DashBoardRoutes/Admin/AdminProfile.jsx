// src/pages/Dashboard/AdminProfile.jsx

import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";

const AdminProfile = () => {
  const { user } = useAuth();
  let {role }= useUserRole()
  console.log(role);


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
        🛡️ Admin Profile
      </h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-red-400 shadow-md"
        />
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-white bg-red-500 px-3 py-1 rounded-full inline-block mt-1 capitalize">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
