import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import toast from "react-hot-toast";

function Navbar() {
  const theme = useSelector((store) => store?.theme?.value);
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(removeUser());
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`navbar fixed top-0 left-0 w-full h-16 ${
        theme === "dark" ? "bg-base-300/80" : "bg-base-100/80"
      } shadow-md backdrop-blur-sm px-4 z-[9999]`}
    >
      {/* Left Section - Logo */}
      <div className="flex-1">
        <span className="sm:pl-4 pl-2 text-4xl sm:text-5xl font-medium tracking-tight hover:opacity-80 transition cursor-pointer">
          fynder
        </span>
      </div>

      {/* Right Section - Theme + Profile */}
      <div className="flex items-center gap-6 pr-2 sm:pr-6">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Avatar Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar cursor-pointer hover:scale-110 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-full ring-2 ring-primary/40 ring-offset-2 ring-offset-base-100 shadow-md overflow-hidden">
                <img alt="User avatar" src={user.photoUrl} />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-xl mt-5 w-48 p-3 shadow-xl border border-base-300/40 backdrop-blur-md animate-fadeIn"
            >
              <li>
                <Link
                  to="/profile"
                  className="text-base font-medium rounded-lg px-2 py-2 transition-all duration-200 hover:bg-base-200 dark:hover:bg-base-300"
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-base font-medium rounded-lg px-2 py-2 transition-all duration-200 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
