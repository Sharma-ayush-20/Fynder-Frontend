import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Crown, Menu, X } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Flame, Users2, Mail, Settings } from "lucide-react";

function Layout() {
  const user = useSelector((store) => store?.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-base-200 relative overflow-hidden">
      {/* menu button for mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-20 left-6 z-40 btn btn-circle btn-primary shadow-md"
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* sidebar  */}
      <div
        className={`fixed top-0 left-0 min-h-screen bg-base-100 shadow-xl pt-20 px-6 flex flex-col justify-between z-50 overflow-y-auto transition-all duration-300 border-r border-base-300 
      ${
        isOpen
          ? "translate-x-0 w-60"
          : "-translate-x-full sm:translate-x-0 sm:w-60"
      }`}
      >
        {/*  header  */}
        <div className="flex items-center justify-between sm:mb-6 mt-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-wide text-primary sm:text-center">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </h2>

          {/* Close button only for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="sm:hidden p-2 rounded-full hover:bg-base-200 transition-all"
          >
            <X className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* menu links */}
        <ul className="menu space-y-2 w-full">
          <li>
            <NavLink
              to="/feed"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[17px] font-medium px-3 py-3 rounded transition-all 
         ${
           isActive
             ? "bg-primary text-primary-content shadow-sm"
             : "hover:bg-base-300 hover:text-primary"
         }`
              }
            >
              <Flame className="w-5 h-5 text-red-400" />
              <span>Feed</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/connections"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[17px] font-medium px-3 py-3 rounded transition-all 
         ${
           isActive
             ? "bg-primary text-primary-content shadow-md"
             : "hover:bg-base-300 hover:text-primary"
         }`
              }
            >
              <Users2 className="w-5 h-5 text-sky-500" />
              <span>Connections</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/requests"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[17px] font-medium px-3 py-3 rounded transition-all 
         ${
           isActive
             ? "bg-primary text-primary-content shadow-md"
             : "hover:bg-base-300 hover:text-primary"
         }`
              }
            >
              <Mail className="w-5 h-5 text-orange-500" />
              <span>Requests</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/premium"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[17px] font-medium px-3 py-3 rounded transition-all 
         ${
           isActive
             ? "bg-primary text-primary-content shadow-md"
             : "hover:bg-base-300 hover:text-primary"
         }`
              }
            >
              <Crown className="w-5 h-5 text-yellow-500" />
              <span>Premium</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[17px] font-medium px-3 py-3 rounded transition-all 
         ${
           isActive
             ? "bg-primary text-primary-content shadow-md"
             : "hover:bg-base-300 hover:text-primary"
         }`
              }
            >
              <Settings className="w-5 h-5 text-gray-500" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>

        {/* ======= USER INFO ======= */}
        <div className="border-t border-base-300 pt-4 mt-4 mb-6 px-3">
          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user?.photoUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div>
                <p className="font-semibold text-base-content">
                  {user?.firstName}
                </p>
                <p className="text-sm text-base-content/60">{user?.email}</p>
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
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 ml-0 sm:ml-72 mt-20 sm:mt-15 bg-base-200 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
