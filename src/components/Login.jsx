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
        navigate("/profile");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      // console.log(error);
      // toast.error(error.message);
    }
  };

  return (
    <>
      <div className="relative sm:mt-2 min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <img
          src={APP_BG}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-70"
        />

        {/* Login Card */}
        <div
          className="
    relative z-10
    bg-base-100 dark:bg-base-300
    p-8 sm:p-10
    rounded-2xl
    shadow-xl
    w-full max-w-xs sm:max-w-sm md:max-w-md
    border border-base-300/40
    flex flex-col
    min-h-[430px] sm:min-h-[480px] 
    justify-center sm:mt-10
  "
        >
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary text-center mb-3 leading-tight">
            Welcome Back 👋
          </h1>

          {/* Subtitle */}
          <p className="text-base-content/70 text-center mb-8 text-sm sm:text-base leading-relaxed">
            Continue your Fynder journey and connect with amazing people.
          </p>

          {/* Form */}
          <form className="flex flex-col gap-5 mt-2" onSubmit={handleSubmit}>
            {/* Email */}
            <label className="flex flex-col w-full">
              <span className="text-sm mb-1 font-medium">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
          input input-bordered w-full 
          text-sm rounded-md
          h-11
        "
                placeholder="Enter your email"
                required
              />
            </label>

            {/* Password */}
            <label className="flex flex-col w-full">
              <span className="text-sm mb-1 font-medium">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
          input input-bordered w-full 
          text-sm rounded-md
          h-11
        "
                placeholder="Enter your password"
                required
              />
            </label>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="
        btn btn-primary w-full 
        text-sm sm:text-base py-3 mt-2 rounded-md
      "
            >
              Login
            </button>

            {/* Sign Up */}
            <button
              onClick={() => navigate("/signup")}
              type="button"
              className="
        btn btn-ghost w-full text-sm sm:text-base py-3 rounded-md
      "
            >
              Create an Account
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
