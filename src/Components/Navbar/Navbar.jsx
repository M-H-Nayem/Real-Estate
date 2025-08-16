import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  let { user, logOut } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  let links = [
    { name: "Home", to: "/" },
    { name: "All Properties", to: "/properties" },
    // { name: "Dashboard", to: "/dashboard" },
  ];
  let handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch(() => {});
  };

  let normalEffect = 'block px-4  py-2 rounded-md hover:bg-gray-500 hover:text-primary-content transition-colors'
  let activeEffect = 'bg-gray-500 text-gray-100 font-semibold shadow-lg'

  return (

    <div className="fixed top-0 z-100 w-full bg-gray-600 text-gray-200 shadow-md ">


    <nav className="max-w-[1400px] mx-auto" >
      <div className=" mx-auto flex items-center justify-between px-4 lg:px-0 py-3 md:py-4">
        {/* Logo + Website Name */}
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-xl font-bold"
          onClick={() => setNavOpen(false)}
        >
          {/* Placeholder for Logo */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-white">
            {/* You can replace this div with <img src="logo.png" alt="Logo" /> */}
            <span>🏠</span>
          </div>
          <span className="text-2xl">Estate Ease</span>
        </NavLink>

        {/* Hamburger Icon (mobile) */}
        <button
          className="lg:hidden text-2xl focus:outline-none   "
          onClick={toggleNav}
          aria-label="Toggle Menu"
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links */}
        <ul
          className={`flex-col lg:flex-row lg:flex lg:items-center absolute lg:static bg-primary lg:bg-transparent w-full md:w-auto left-0 lg:left-auto top-16 lg:top-auto transition-all duration-300 ease-in ${
            navOpen ? "flex" : "hidden"
          }`}
        >
          {links.map(({ name, to }) => {
            return (
              <li key={to} className="md:mx-2">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${normalEffect} ${
                      isActive
                        ? `${activeEffect}`
                        : ""
                    }`
                  }
                  onClick={() => setNavOpen(false)}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
          {user ? (
            <>
            <li className="md:mx-2">
                <NavLink
                  to={'/dashboard'}
                  className={({ isActive }) =>
                    `${normalEffect} ${
                      isActive
                        ? `${activeEffect}`
                        : ""
                    }`
                  }
                  onClick={() => setNavOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <div className="flex gap-3 items-center">
                
                < ><div className="hidden   w-10 h-10 lg:mx-3 lg:flex items-center ">
                  <img className="rounded-full" src={user?.photoURL} alt="" />
                </div></>
                {/* <h1 className="lg:block hidden">{user.displayName}</h1> */}
                <button
                  onClick={handleLogOut}
                  className="block px-4 btn  border-none py-2 md:mx-2 rounded-md hover:bg-gray-400 hover:text-white transition-colors bg-gray-500 text-white font-semibold text-start"
                >
                  LogOut
                </button>
              </div>
            </>
          ) : (
            <>
            
              <li className="md:mx-2">
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    `${normalEffect} ${
                      isActive
                        ? `${activeEffect}`
                        : ""
                    }`
                  }
                  onClick={() => setNavOpen(false)}
                >
                  LogIn
                </NavLink>
              </li>
              <li className="md:mx-2">
                <NavLink
                  to={"/register"}
                  className={({ isActive }) =>
                    `${normalEffect} ${
                      isActive
                        ? `${activeEffect}`
                        : ""
                    }`
                  }
                  onClick={() => setNavOpen(false)}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
