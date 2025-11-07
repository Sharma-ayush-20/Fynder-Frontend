import React, { useState } from "react";
import { APP_BG, baseUrl } from "../utils/constants";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const theme = useSelector((store) => store?.theme?.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        // console.log(response.data.user)
        dispatch(addUser(response.data.user));
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error);
      toast.error(error.message);
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
            <form
              className="w-full max-w-md mx-auto flex flex-col gap-4 p-6 rounded-xl shadow-md"
              onSubmit={handleSubmit}
            >
              {/* Email */}
              <label className="flex flex-col w-full">
                <span className="text-sm sm:text-base mb-1">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full text-sm sm:text-base rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </label>

              {/* Password */}
              <label className="flex flex-col w-full">
                <span className="text-sm sm:text-base mb-1">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full text-sm sm:text-base rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </label>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm sm:text-base">{error}</p>
              )}

              {/* Buttons */}
              <button
                type="submit"
                className="btn btn-primary w-full py-2 text-sm sm:text-base mb-2 hover:scale-105 transition-transform duration-200"
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-ghost w-full py-2 text-sm sm:text-base hover:scale-105 transition-transform duration-200"
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
