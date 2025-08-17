import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router"; // Use react-router-dom for browser-based apps

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 px-6 py-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-12">
        {/* Branding & Social Links */}
        <div className="space-y-4 md:col-span-2 lg:col-span-1">
          <h2 className="text-3xl font-bold text-white text-center lg:text-start">
            Estate <span className="">Ease</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-sm text-center lg:text-start">
            Find your dream property with trust, ease, and transparency.
          </p>
          <div className="flex gap-4 mt-4 justify-center lg:justify-start">
            <a
              href="https://www.linkedin.com/in/md--mahmudul-hasan-nayem/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaLinkedinIn className="text-2xl" />
            </a>
            <a
              href="https://github.com/M-H-Nayem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://x.com/m_h__nayem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/mahmudulhasannayem698"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaFacebookF className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white text-center lg:text-start">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-center lg:text-start">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                All Properties
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Dashboard
              </Link>
            </li>
            {/* <li>
              <Link to="/contact" className="text-gray-400 hover:text-white transition duration-200">
                Contact Us
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white text-center lg:text-start">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-center lg:text-start">
            <li>
              <p className="text-gray-400 hover:text-white transition duration-200">
                FAQ
              </p>
            </li>
            <li>
              <p className="text-gray-400 hover:text-white transition duration-200">
                Help Center
              </p>
            </li>
            <li>
              <p className="text-gray-400 hover:text-white transition duration-200">
                Report a Bug
              </p>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white text-center lg:text-start">
            Legal
          </h3>
          <ul className="space-y-3 text-sm text-center lg:text-start">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">
          Estate <span className="">Ease</span>
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
