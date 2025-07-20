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

const DashBoard = () => {
  let { user } = useAuth();
  let { role } = useUserRole();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const getLinkClass = ({ isActive }) =>
    isActive
      ? "btn btn-ghost w-full justify-start gap-2 bg-blue-600 font-semibold text-white"
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
        {/* <li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/be-an-agent" className={getLinkClass}>
            <FaUserCircle /> Be an Agent
          </NavLink>
        </li> */}
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
    <div className="min-h-screen flex flex-col lg:flex-row ">
      {/* Sidebar */}
      <title>Dashboard</title>
      <aside
        className={` w-full lg:w-64 p-4 z-50 bg-white fixed overflow-y-auto transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Close icon for mobile */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={toggleSidebar}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-3"><li
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <NavLink to="/dashboard/my-profile" className={getLinkClass}>
            <FaUserCircle /> My Profile
          </NavLink>
        </li>{routes}</ul>
      </aside>

      {/* Content */}
      <main className="border-l flex-1 ml-0 lg:ml-64 p-4 bg-gray-100 min-h-screen">
        {/* Mobile Navbar */}
        <div className="lg:hidden flex justify-between items-center mb-4 mx-[5%]">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={toggleSidebar}>
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Outlet  */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
