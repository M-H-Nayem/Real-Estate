import React, { use, useState } from "react";
import { NavLink } from "react-router";
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
    { name: "Dashboard", to: "/dashboard" },
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

  return (
    <nav className="bg-primary text-primary-content shadow-md sticky top-0 z-50 lg:px-[10%]" >
      <div className=" mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo + Website Name */}
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-xl font-bold"
          onClick={() => setNavOpen(false)}
        >
          {/* Placeholder for Logo */}
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary-content">
            {/* You can replace this div with <img src="logo.png" alt="Logo" /> */}
            <span>🏠</span>
          </div>
          <span>Estate Ease</span>
        </NavLink>

        {/* Hamburger Icon (mobile) */}
        <button
          className="lg:hidden text-2xl focus:outline-none mx-[5%]  "
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
                    `block px-4 py-2 rounded-md hover:bg-secondary hover:text-primary-content transition-colors ${
                      isActive
                        ? "bg-secondary text-primary-content font-semibold"
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
              <div className="flex gap-3 items-center">
                
                <div className="hidden  w-10 h-10 lg:mx-3 lg:flex items-center ">
                  <img className="rounded-full" src={user.photoURL} alt="" />
                </div>
                <h1 className="lg:block hidden">{user.displayName}</h1>
                <button
                  onClick={handleLogOut}
                  className="block px-4 btn border-none py-2 md:mx-2 rounded-md hover:bg-secondary hover:text-primary-content transition-colors bg-secondary text-primary-content font-semibold text-start"
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
                    `block px-4 py-2 rounded-md hover:bg-secondary hover:text-primary-content transition-colors ${
                      isActive
                        ? "bg-secondary text-primary-content font-semibold"
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
                    `block px-4 py-2 rounded-md hover:bg-secondary hover:text-primary-content transition-colors ${
                      isActive
                        ? "bg-secondary text-primary-content font-semibold"
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
  );
};

export default Navbar;
