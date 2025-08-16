import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-300 px-6 py-12 ">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Branding & Social */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">EstateEase</h2>
          <p className="text-sm leading-relaxed">
            Find your dream property with trust, ease, and transparency.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white transition duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-white transition duration-200">
                All Properties
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition duration-200">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition duration-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-200">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-200">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-white">EstateEase</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
