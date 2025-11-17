import React, { useState } from "react";
import Footer from "./Footer";
import { APP_BG, baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/signup`,
        { firstName, lastName, email, password },
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
    //   console.log(error);
    //   toast.error(error.message);
    }
  };

  return (
    <>
     <div className="relative min-h-screen flex items-center justify-center px-4">

  {/* Background Image */}
  <img
    src={APP_BG}
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover brightness-60"
  />

  {/* SIGNUP CARD */}
  <div
    className="
      relative z-10 mt-10
      bg-base-100/95 dark:bg-base-300/95
      backdrop-blur-xl
      border border-base-300/50
      shadow-2xl 
      rounded-xl
      w-full max-w-2xl
      p-8 sm:p-10
      animate-fadeIn
    "
  >
    {/* Heading */}
    <h1 className="text-3xl font-bold text-primary text-center">
      Let’s Get You Onboard 🚀
    </h1>

    <p className="text-center text-base-content/70 mt-1 mb-8 text-sm">
      Sign up and explore everything we’ve built just for you.
    </p>

    {/* FORM */}
    <form onSubmit={handleSubmit}
      className="
        grid grid-cols-1 sm:grid-cols-2 
        gap-6
      "
    >
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-4">

        {/* Firstname */}
        <label className="flex flex-col">
          <span className="text-sm mb-1">Firstname</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered rounded-lg h-11"
            placeholder="Enter your firstname"
            required
          />
        </label>

        {/* Lastname */}
        <label className="flex flex-col">
          <span className="text-sm mb-1">Lastname</span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered rounded-lg h-11"
            placeholder="Enter your lastname"
          />
        </label>

      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col gap-4">

        {/* Email */}
        <label className="flex flex-col">
          <span className="text-sm mb-1">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered rounded-lg h-11"
            placeholder="Enter your email"
            required
          />
        </label>

        {/* Password */}
        <label className="flex flex-col">
          <span className="text-sm mb-1">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered rounded-lg h-11"
            placeholder="Enter your password"
            required
          />
        </label>

      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm col-span-full text-center">
          {error}
        </p>
      )}

      {/* BUTTONS */}
      <div className="col-span-full flex flex-col gap-3 mt-2">
        <button
          type="submit"
          className="btn btn-primary w-full rounded-lg h-12 hover:scale-[1.02] transition-all"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate('/login')}
          type="button"
          className="btn btn-ghost w-full rounded-lg h-12"
        >
          login
        </button>
      </div>

    </form>
  </div>
</div>

      <Footer />
    </>
  );
}

export default Signup;
