import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

function Layout() {
  const user = useSelector((store) => store?.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-base-200 relative">
      {/* menu button for mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-6 left-6 z-40 btn btn-circle btn-primary shadow-md"
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* sidebar  */}
      <div
        className={`fixed sm:static top-0 left-0 h-full bg-base-100 shadow-lg pt-20 p-10 sm:pt-5 flex flex-col justify-between z-50 transition-all duration-300 
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full sm:translate-x-0 sm:w-64"}
        `}
      >
        {/*  header  */}
        <div className="flex items-center justify-between sm:mb-6">
          <h2 className="text-2xl font-bold text-primary">Dashboard</h2>

          {/* Close button only for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="sm:hidden btn btn-ghost btn-circle"
          >
            <X className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* menu links */}
        <ul className="menu space-y-2">
          <li>
            <NavLink
              to="/feed"
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) =>
                `flex items-center gap-1 text-lg rounded px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md ring-2 ring-primary/30 scale-[1.02]"
                    : "hover:bg-base-200 hover:text-primary"
                }`
              }
            >
              💞 Feed
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/connections"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 text-lg rounded-lg px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md ring-2 ring-primary/30 scale-[1.02]"
                    : "hover:bg-base-200 hover:text-primary"
                }`
              }
            >
              👥 Connections
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/requests"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 text-lg rounded-lg px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md ring-2 ring-primary/30 scale-[1.02]"
                    : "hover:bg-base-200 hover:text-primary"
                }`
              }
            >
              📩 Requests
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 text-lg rounded-lg px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md ring-2 ring-primary/30 scale-[1.02]"
                    : "hover:bg-base-200 hover:text-primary"
                }`
              }
            >
              ⚙️ Settings
            </NavLink>
          </li>
        </ul>

        {/* ======= USER INFO ======= */}
        <div className="border-t pt-4 mt-4">
          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user?.photoUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user?.firstName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======= BACKDROP (for mobile overlay effect) ======= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm sm:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ======= RIGHT CONTENT AREA ======= */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
