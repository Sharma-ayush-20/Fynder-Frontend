import React from "react";
import ThemeToggle from "./themeToggle";
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
      const response = await axios.post(`${baseUrl}/logout`, {}, {withCredentials: true})
      if(response.status === 200){
        dispatch(removeUser());
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`navbar ${
        theme === "dark" ? "bg-base-300" : "bg-base-100"
      } shadow-md backdrop-blur-sm px-4`}
    >
      {/* Left Section - Logo */}
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-3xl sm:text-4xl font-bold tracking-tight">
          🌿 fynder
        </a>
      </div>

      {/* Right Section - Theme + Profile */}
      <div className="flex-none flex items-center gap-3">
        <ThemeToggle />

        {/* Avatar Dropdown */}
        {user && (
          <div className="dropdown dropdown-end md:pr-6 pr-8">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar md:mr-2 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt="User avatar"
                  src={` ${
                    user
                      ? user.photoUrl
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }`}
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-200 rounded-2xl mt-3 w-44 p-3 shadow-lg border border-base-300
              animate-fadeIn backdrop-blur-md"
            >
              <li>
                <a className="font-semibold text-base hover:text-primary transition-all duration-300">
                  Profile
                </a>
              </li>
              <li>
                <a className="font-semibold text-base hover:text-primary transition-all duration-300">
                  Settings
                </a>
              </li>
              <li>
                <Link onClick={handleLogout} className="font-semibold text-base text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all duration-300">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
