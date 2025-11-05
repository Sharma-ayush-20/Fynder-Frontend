import React from "react";
import { APP_BG } from "../utils/constants.jsx";
import Footer from "./Footer.jsx";
import { useSelector } from "react-redux";

const LandingPage = () => {
    const theme = useSelector(store => store?.theme?.value)
  return (
    <>
      <div className="relative mx-auto min-h-screen overflow-x-hidden">
        {/* Background Image */}
        <img
          src={APP_BG}
          alt="Background image"
          className="absolute w-full h-full object-cover brightness-60"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">         

          {/* Content */}
          <div className="relative z-11 flex flex-col items-center justify-center">
            
            <div className="text-center mb-8">
              <p className="text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg mb-4 pr-4">
                Connect. Chat. Grow.
              </p>
              <p className={`text-2xl md:text-3xl lg:text-4xl ${theme === "dark" ? "text-primary" : "text-secondary"} font-semibold drop-shadow-md mt-2`}>
                Expand your network instantly
              </p>
            </div>

            {/* Buttons */}
            <div className="text-center mb-6">
              <button className={`btn ${theme === "dark" ? "text-white btn-accent" : "text-black btn-accent"} btn-lg px-8 py-3 text-xl shadow-lg hover:scale-105 transition-transform duration-300`}>
                Start your journey today
              </button>
            </div>
           
          </div>
          
        </div>
         
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
