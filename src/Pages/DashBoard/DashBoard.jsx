import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaBars,
  FaCheckCircle,
  FaClipboardList,
  FaComments,
  FaHandshake,
  FaPlusCircle,
  FaTasks,
  FaTimes,
  FaUsersCog,
  FaUserShield,
  FaUserTie,
  FaUserCircle,
  FaHeart,
  FaShoppingBag,
  FaStar,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";

const DashBoard =  () => {
  let { user } = useAuth();
  let { role } = useUserRole();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const getLinkClass = ({ isActive }) =>
    isActive
      ? "btn btn-ghost w-full justify-start gap-2 bg-gray-500 font-semibold text-white"
      : "btn btn-ghost w-full justify-start gap-2";

  let routes = <></>;

  {
    /* 🔵 User Routes */
  }
  if (role === "user") {
    routes = (
      <>
        
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/wishlist" className={getLinkClass}>
            <FaHeart /> Wishlist
          </NavLink>
        </li>
        
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/bought" className={getLinkClass}>
            <FaShoppingBag /> Property Bought
          </NavLink>
        </li>
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/reviews" className={getLinkClass}>
            <FaStar /> My Reviews
          </NavLink>
        </li>
      </>
    );
  }
  {
    /* 🟢 Agent Routes */
  }
  if (role === "agent" || role === "fraud" ) {
    routes = (
      <>
        {/* <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/agent-profile" className={getLinkClass}>
            <FaUserTie /> Agent Profile
          </NavLink>
        </li> */}
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/add-property" className={getLinkClass}>
            <FaPlusCircle /> Add Property
          </NavLink>
        </li>
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/my-properties" className={getLinkClass}>
            <FaClipboardList /> My Added Properties
          </NavLink>
        </li>
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/sold-properties" className={getLinkClass}>
            <FaCheckCircle /> My Sold Properties
          </NavLink>
        </li>
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/offers" className={getLinkClass}>
            <FaHandshake /> Requested Properties
          </NavLink>
        </li>
      </>
    );
  }
  {
    /* 🔴 Admin Routes */
  }
  if (role === "admin") {
    routes = (
      <>
        
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/manage-properties" className={getLinkClass}>
            <FaTasks /> Manage Properties
          </NavLink>
        </li>
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/advertise" className={getLinkClass}>
            <FaUserShield /> Advertise Property
          </NavLink>
        </li>
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/manage-users" className={getLinkClass}>
            <FaUsersCog /> Manage Users
          </NavLink>
        </li>
        <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/manage-reviews" className={getLinkClass}>
            <FaComments /> Manage Reviews
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <div className="flex min-h-screen pt-[72px]">
      <title>Dashboard</title>
      
      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-40  bg-opacity-75 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-50 p-4 pt-7 transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:z-auto lg:shadow-xl`}
      >
        {/* Close icon for mobile */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={toggleSidebar}>
            <FaTimes className="text-xl text-gray-800" />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-5 ">
          <li
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          >
            <NavLink to="/dashboard/my-profile" className={getLinkClass}>
              <FaUserCircle /> My Profile
            </NavLink>
          </li>
          {routes}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-100 min-h-screen">
        {/* Mobile Navbar with toggle button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <button onClick={toggleSidebar}>
            <FaBars className="text-xl text-gray-800" />
          </button>
        </div>

        {/* Outlet */}
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
