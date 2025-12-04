import axios from "axios";
import React from "react";
import { baseUrl } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";
import { X, Heart, Info, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const isPremium = user.isPremium;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          src={
            user?.photoUrl ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt="User"
          onError={(e) => {
            e.target.src =
              "https://cdn-icons-png.flaticon.com/512/847/847969.png";
          }}
          className="
    w-full h-[580px] sm:h-[502px]
    object-cover
    rounded-2xl
    transition-all duration-300
    bg-base-300
  "
        />

        {/* GRADIENT OVERLAY LIKE INSTAGRAM */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70"></div>

        {/* USER DETAILS */}
        <div className="absolute bottom-28 left-5 right-5">
          {/* NAME */}
          <div className="flex items-center gap-2 drop-shadow-[0_0px_6px_rgba(0,0,0,0.9)]">
            <h2 className="text-[30px] font-extrabold text-white tracking-wide">
              {user.firstName}, {user.age}
            </h2>

            {user.isPremium && (
              <span
                className="
      ml-1 w-6 h-6
      flex items-center justify-center bg-cover"
              >
                <BadgeCheck className="w-6 h-6 text-blue-600" />
              </span>
            )}
          </div>

          {/* GENDER */}
          <p className="mt-1 text-sm font-medium text-white/95">
            {user.gender === "male"
              ? "Male"
              : user.gender === "female"
              ? "Female"
              : "Other"}
          </p>

          {/* ABOUT */}
          <p className="mt-1 text-[13px] text-white/90 leading-snug line-clamp-2">
            {user.about || "Here for good vibes ✨"}
          </p>

          {/* SKILLS */}
          {user.skills?.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {user.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="
            text-[11px] px-2 py-[3px] rounded-full 
            bg-white/20 backdrop-blur-md text-white
            border border-white/30 shadow-md
            hover:bg-white/30 transition-all
          "
                >
                  {skill}
                </span>
              ))}

              {/* If too many skills */}
              {user.skills.length > 3 && (
                <span className="text-[11px] text-white/90">
                  +{user.skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="absolute bottom-6 sm:left-1/2 left-1/2 -translate-x-1/2 flex gap-8 sm:gap-11 items-center">
          {/* Reject */}
          <button
            onClick={() => handleSendConnection("ignored", user._id)}
            className="
              w-14 h-14 flex items-center justify-center
              bg-white rounded-full shadow-xl
              text-red-500
              hover:scale-125 active:scale-90 transition-all 
              hover:shadow-red-200 cursor-pointer
            "
          >
            <X className="w-7 h-7" strokeWidth={3} />
          </button>

          {/* Info Button */}
          <button
            onClick={() => navigate(`/profile/${user._id}`)}
            className="
              w-12 h-12 flex items-center justify-center
              bg-white rounded-full shadow-xl
              text-blue-500
              hover:scale-125 active:scale-90 transition-all
              hover:shadow-blue-200 cursor-pointer
            "
          >
            <Info className="w-6 h-6" strokeWidth={3} />
          </button>

          {/* Like */}
          <button
            onClick={() => handleSendConnection("interested", user._id)}
            className="
              w-14 h-14 flex items-center justify-center
              bg-white rounded-full shadow-xl
              text-green-500
              hover:scale-125 active:scale-90 transition-all 
              hover:shadow-green-200 cursor-pointer
            "
          >
            <Heart className="w-7 h-7" fill="currentColor" stroke="none" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
