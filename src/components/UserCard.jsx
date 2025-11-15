import axios from "axios";
import React from "react";
import { baseUrl } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

function UserCard({ user }) {
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
    <div className="relative w-full flex justify-center items-center">
      <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl select-none">
        {/* USER IMAGE */}
        <img
          src={user?.photoUrl}
          alt="User"
          className="w-full h-[70vh] sm:h-[420px] object-cover"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent"></div>

        {/* USER DETAILS */}
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold">
            {user.firstName}, {user.age}
          </h2>
          <p className="text-sm opacity-90">{user.gender}</p>
          <p className="text-xs opacity-80 mt-1 max-w-[250px]">{user.about}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="absolute bottom-4 right-4 flex gap-4">
          <button
            onClick={() => handleSendConnection("ignored", user._id)}
            className="btn w-14 h-14 rounded-full bg-white text-red-500 shadow-lg hover:scale-110 transition"
          >
            ✖
          </button>

          <button
            onClick={() => handleSendConnection("interested", user._id)}
            className="btn w-14 h-14 rounded-full bg-white text-green-500 shadow-lg hover:scale-110 transition"
          >
            ❤
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
