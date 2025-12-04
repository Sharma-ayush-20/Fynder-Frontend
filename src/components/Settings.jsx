import { useSelector } from "react-redux";
import { Sun, Moon, LogOut, Crown, Edit, Shield, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";

export default function Settings() {
  const user = useSelector((store) => store?.user);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
    localStorage.clear();
  };

  const handleDelete = async () => {
  try {
    const res = await axios.delete(`${baseUrl}/profile/delete/${user?._id}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      toast.success("Account deleted successfully!");
      localStorage.clear();
      navigate("/landingpage"); 
    }
  } catch (error) {
    // console.log(error)
    toast.error(error?.response?.data?.message || "Error deleting account");
  }
};


  return (
    <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto px-4 sm:px-12 py-10">
      {/* Glow BG */}
      <div className="absolute right-20 top-40 w-80 h-80 bg-primary/30 blur-[150px] opacity-40 pointer-events-none"></div>
      <div className="absolute left-32 bottom-20 w-72 h-72 bg-pink-500/20 blur-[130px] opacity-40 pointer-events-none"></div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-10">
        ✨ Account Settings
      </h1>

      {/* Main Wrapper - Wider but not too wide */}
      <div className="w-full  bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 sm:p-10 space-y-4">
        {/* Edit Profile */}
        <button
          onClick={() => navigate(`/profile`)}
          className="w-full flex justify-between items-center py-4 px-3
      rounded-xl hover:bg-primary/10 hover:scale-[1.01]
      transition-all cursor-pointer"
        >
          <span className="flex items-center gap-3 font-semibold text-lg">
            <Edit className="w-5 h-5 text-primary" /> Edit Profile
          </span>
          <span className="text-xs opacity-60">Tap to update</span>
        </button>

        {/* Theme */}
        <div className="flex justify-between items-center w-full py-4 px-3 opacity-70">
          <span className="flex items-center gap-3 font-semibold text-lg">
            <Moon className="w-5 h-5 text-primary" /> Theme
          </span>

          <span className="text-xs text-base-content/50">
            <ThemeToggle />
          </span>
        </div>

        {/* Notifications */}
        <div className="flex justify-between items-center w-full py-4 px-3 opacity-60 cursor-not-allowed">
          <span className="flex items-center gap-3 font-semibold text-lg">
            <Bell className="w-5 h-5 text-warning" /> Notifications
          </span>
          <span className="text-xs">Coming Soon</span>
        </div>

        {/* Membership */}
        {user?.memberShipType && (
          <button
            onClick={() => navigate("/premium")}
            className="w-full flex justify-between items-center py-4 px-3
        rounded-xl hover:scale-[1.01] bg-yellow-500/10 transition"
          >
            <span className="flex items-center gap-3 font-semibold text-lg">
              <Crown className="w-5 h-5 text-yellow-500" />
              Membership — {user.memberShipType.toUpperCase()}
            </span>
            <span className="text-xs text-yellow-600">Manage →</span>
          </button>
        )}

        {/* Delete Account */}
        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full bg-red-600/20 text-red-600 py-4 rounded-xl 
  font-semibold shadow-md hover:bg-red-600/30 hover:scale-105 
  transition-all border border-red-600/40"
        >
          Delete Account 🗑️
        </button>

        {showDeleteModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm 
    flex items-center justify-center z-50 p-4 animate-fadeIn"
          >
            <div className="bg-base-100 rounded-2xl p-6 w-80 text-center shadow-xl">
              <h2 className="text-xl font-bold text-red-500">
                Confirm Deletion
              </h2>

              <p className="text-sm text-base-content/70 mt-2">
                This will permanently delete your account.
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-error/90 text-white py-4 rounded-xl text-lg 
      shadow-md hover:scale-105 hover:bg-error transition-all mt-6 flex items-center justify-center gap-2"
        >
          <LogOut className="w-6 h-6" /> Logout
        </button>
      </div>
    </div>
  );
}
