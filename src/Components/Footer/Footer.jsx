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
    <footer className="bg-primary text-primary-content px-4 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Branding & Social */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold ">EstateVerse</h2>
          <p className="text-sm">
            Find your perfect property with ease and trust.
          </p>
          <div className="flex gap-4 text-lg">
            <a  className="hover:text-primary">
              <FaFacebookF />
            </a>
            <a  className="hover:text-primary">
              <FaTwitter />
            </a>
            <a  className="hover:text-primary">
              <FaInstagram />
            </a>
            <a  className="hover:text-primary">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Center: Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/properties" className="hover:underline">
              All Properties
            </Link>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            {/* <Link to="/contact" className="hover:underline">Contact</Link> */}
          </ul>
        </div>

        {/* Right: Privacy / Legal */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Legal</h3>
          <ul className="text-sm flex flex-col gap-2 cursor-default">
            <a
            //  to="/privacy-policy"
              className="hover:underline">
              Privacy Policy
            </a>
            <a
            // to="/terms" 
            className="hover:underline">
              Terms of Service
            </a>
            <a 
            // to="/cookies"
            className="hover:underline">
              Cookie Policy
            </a>
          </ul>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-10 border-t pt-4 text-center text-sm text-gray-200">
        &copy; {new Date().getFullYear()} EstateVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
