import React from "react";
import { APP_BG } from "../utils/constants";
import Footer from "./Footer";
import { useSelector } from "react-redux";

function Login() {
  const theme = useSelector((store) => store?.theme?.value);

  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <img
          src={APP_BG}
          alt="Background"
          className="absolute inset-0 sm:w-full h-full object-cover brightness-60"
        />

        {/* Overlay Content */}
        <div className="relative flex flex-1 items-center lg:justify-center px-2 py-8">
          {/* Login Card */}
          <div className="bg-base-300/95 p-6 sm:p-8 rounded-2xl shadow-xl max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-center">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-primary text-center">
              Welcome Back
            </h1>

            {/* Subtitle */}
            <p className="text-base-content/80 mb-6 text-xs sm:text-base text-center">
              Sign in to your account to continue to your dashboard
            </p>

            {/* Email */}
            <label className="label w-full">
              <span className="label-text mb-1 sm:mb-2 text-sm sm:text-base">
                Email
              </span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full mb-4 text-sm sm:text-base"
              placeholder="Enter your email"
            />

            {/* Password */}
            <label className="label w-full">
              <span className="label-text mb-1 sm:mb-2 text-sm sm:text-base">
                Password
              </span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full mb-6 text-sm sm:text-base"
              placeholder="Enter your password"
            />

            {/* Buttons */}
            <button className="btn btn-primary w-full mb-2 hover:scale-105 transition-transform">
              Login
            </button>
            <button className="btn btn-ghost w-full hover:scale-105 transition-transform">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
