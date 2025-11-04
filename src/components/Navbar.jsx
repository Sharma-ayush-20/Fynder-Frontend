import React from "react";
import ThemeToggle from "./themeToggle";

function Navbar() {
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm px-4">
        {/* Left Section - Logo */}
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl font-bold tracking-wide">
            🌿 Fynder
          </a>
        </div>

        {/* Right Section - Theme + Profile */}
        <div className="flex-none flex items-center gap-3">
          <ThemeToggle />

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-4"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-200 rounded-box mt-3 w-32 p-3 shadow"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a className="text-red-500">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
