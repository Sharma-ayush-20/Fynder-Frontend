import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="relative z-20 bg-base-200 text-base-content w-full shadow-inner">
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          {/* Logo and description */}
          <div className="flex flex-col gap-4 md:max-w-sm">
            <h2 className="text-4xl font-extrabold text-primary tracking-wide">
              fynder
            </h2>
            <p className="text-gray-600 font-semibold text-lg">
              Connecting people around the world. Find your perfect match,
              expand your network, and create meaningful connections.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl mb-2">Quick Links</h3>
            <a
              href="#home"
              className="hover:text-primary transition-all duration-300"
            >
              Home
            </a>
            <a
              href="#signup"
              className="hover:text-primary transition-all duration-300"
            >
              Sign Up
            </a>
            <a
              href="#login"
              className="hover:text-primary transition-all duration-300"
            >
              Login
            </a>
            <a
              href="#about"
              className="hover:text-primary transition-all duration-300"
            >
              About
            </a>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl mb-2">Follow Us</h3>
            <div className="flex gap-5 text-3xl">
              <a
                href="#"
                className="hover:text-primary transition-transform duration-300 hover:scale-125"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-transform duration-300 hover:scale-125"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-transform duration-300 hover:scale-125"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-transform duration-300 hover:scale-125"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-10 border-gray-300"></div>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm md:text-base">
          © 2025 Fynder. All rights reserved. Crafted with ❤️ for connections.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
