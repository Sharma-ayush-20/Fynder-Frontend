import axios from "axios";
import React from "react";
import { baseUrl } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

function UserCard({ user }) {
  const isPremium = user.isPremium;
  const dispatch = useDispatch();

  //accept and ignore the user
  const handleSendConnection = async (status, id) => {
    try {
      const response = await axios.post(
        `${baseUrl}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(removeUserFeed(id));
      }
    } catch (error) {}
  };

  return (
    <div className="flex w-full sm:pl-16">
      <div
        className="
      relative w-full max-w-sm 
      rounded overflow-hidden 
      shadow-xl bg-black 
      select-none
    "
      >
        {/* USER IMAGE */}
        <img
          src={user?.photoUrl}
          alt="User"
          className="w-full h-[580px] sm:h-[502px] object-cover"
        />

        {/* GRADIENT OVERLAY LIKE INSTAGRAM */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70"></div>

        {/* USER DETAILS */}
        <div className="absolute bottom-20 left-4 right-4 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-semibold drop-shadow-lg">
              {user.firstName}, {user.age}
            </h2>

            {/* PREMIUM BLUE TICK */}
            {isPremium && (
              <span
                className="
      w-5 h-5 rounded-full flex items-center justify-center
      bg-blue-700
      shadow-[0_0_12px_rgba(0,128,255,0.7)]
      border border-white/70
      
    "
              >
                ✓
              </span>
            )}
          </div>
          <p className="text-sm opacity-90 mt-1">{user.gender}</p>

          <p className="text-xs opacity-80 mt-2 line-clamp-2">{user.about}</p>
        </div>

        {/* ACTION BUTTONS  */}
        <div className="absolute bottom-6 sm:left-70 left-60 -translate-x-1/2 flex gap-6">
          {/* Reject */}
          <button
            onClick={() => handleSendConnection("ignored", user._id)}
            className="
          w-14 h-14 flex items-center justify-center
          bg-white rounded-full shadow-lg
          text-red-500 text-2xl font-bold
          hover:scale-110 active:scale-90 
          transition-all
        "
          >
            ✖
          </button>

          {/* Like */}
          <button
            onClick={() => handleSendConnection("interested", user._id)}
            className="
          w-14 h-14 flex items-center justify-center
          bg-white rounded-full shadow-lg
          text-green-500 text-2xl font-bold
          hover:scale-110 active:scale-90 
          transition-all
        "
          >
            ❤
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
