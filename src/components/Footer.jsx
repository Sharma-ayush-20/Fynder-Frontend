import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="relative bg-base-200 w-full shadow-inner border-t border-base-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-wide">
              fynder
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed text-sm sm:text-base">
              Discover meaningful connections with people who share your interests. Fynder helps you meet, chat, and grow together.
            </p>
            <button onClick={() => navigate("/login")} className="btn btn-primary w-fit mt-3 shadow-md hover:scale-105 transition-all text-sm sm:text-base">
              Join Now
            </button>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h3 className="font-bold text-lg sm:text-xl mb-2 text-primary">Company</h3>
            <Link to={"/aboutus"} className="hover:text-primary transition-all duration-300 text-sm sm:text-base">About Us</Link>
            <Link to={"/careers"} className="hover:text-primary transition-all duration-300 text-sm sm:text-base">Careers</Link>
            <Link to={"/blogs"} className="hover:text-primary transition-all duration-300 text-sm sm:text-base">Blog</Link>
            <Link to={"/contact"} className="hover:text-primary transition-all duration-300 text-sm sm:text-base">Contact</Link>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h3 className="font-bold text-lg sm:text-xl mb-2 text-primary">Support</h3>
            <Link to="/faq" className="hover:text-primary transition-all duration-300 text-sm sm:text-base">FAQs</Link>
            <Link to="/help" className="hover:text-primary transition-all duration-300 text-sm sm:text-base">Help Center</Link>
            <Link to="/terms" className="hover:text-primary transition-all duration-300 text-sm sm:text-base">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-primary transition-all duration-300 text-sm sm:text-base">Privacy Policy</Link>
          </div>

          {/* Newsletter & Social */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg sm:text-xl text-primary mb-2">Follow Us</h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Subscribe to get exclusive updates, news, and tips from Fynder.
            </p>

            {/* Social Media */}
            <div className="flex gap-4 sm:gap-5 text-2xl sm:text-3xl mt-3">
              <Link to="#" className="hover:text-primary transition-transform duration-300 hover:scale-125"><FontAwesomeIcon icon={faFacebook} /></Link>
              <Link to="#" className="hover:text-primary transition-transform duration-300 hover:scale-125"><FontAwesomeIcon icon={faTwitter} /></Link>
              <Link to="#" className="hover:text-primary transition-transform duration-300 hover:scale-125"><FontAwesomeIcon icon={faInstagram} /></Link>
              <Link to="#" className="hover:text-primary transition-transform duration-300 hover:scale-125"><FontAwesomeIcon icon={faLinkedin} /></Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-8 border-gray-300"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-gray-500">
          <p>© 2025 Fynder. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Made with ❤️ by <span className="text-primary font-semibold">Ayush Sharma</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
