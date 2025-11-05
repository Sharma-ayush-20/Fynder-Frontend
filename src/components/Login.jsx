import React, { useState } from "react";
import { APP_BG } from "../utils/constants";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const theme = useSelector((store) => store?.theme?.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/login`,
        { email, password },
        { withCredentials: true }
      );
      if(response.status === 200){
        toast.success(response.data.message)
        console.log(response.data.user)
      }
    } catch (error) {
      console.log("Error", error.message);
      toast.error(error.message)
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <img
          src={APP_BG}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-60"
        />

        {/* Overlay Content */}
        <div className="relative flex flex-1 items-center w-full justify-center px-4 py-8">
          {/* Login Card */}
          <div className="bg-base-300/95 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-center">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-primary text-center">
              Welcome Back
            </h1>

            {/* Subtitle */}
            <p className="text-base-content/80 mb-6 text-xs sm:text-base text-center">
              Sign in to your account to continue to your dashboard
            </p>

            {/* Form */}
            <form className="w-full flex flex-col" onSubmit={handleSubmit}>
              {/* Email */}
              <label className="label w-full">
                <span className="label-text mb-1 sm:mb-2 text-sm sm:text-base">
                  Email
                </span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full mb-4 text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />

              {/* Password */}
              <label className="label w-full">
                <span className="label-text mb-1 sm:mb-2 text-sm sm:text-base">
                  Password
                </span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full mb-6 text-sm sm:text-base"
                placeholder="Enter your password"
                required
              />

              {/* Buttons */}
              <button
                type="submit"
                className="btn btn-primary w-full mb-2 hover:scale-105 transition-transform"
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-ghost w-full hover:scale-105 transition-transform"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
