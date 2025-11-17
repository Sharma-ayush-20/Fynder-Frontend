import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import toast from "react-hot-toast";
import { MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store?.connection);
  console.log(connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/connections`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addConnections(res.data.data));
      } else {
        toast.error("Failed to fetch connections");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-primary mb-10 mt-7 sm:mb-6 sm:mt-0">
        Connections
      </h1>

      {!connections || connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <p className="text-base-content/60 text-lg mb-4">
            No connections found 💔
          </p>

          <NavLink
            to="/feed"
            className="btn btn-primary btn-sm sm:btn-md hover:scale-105 transition-all"
          >
            🌟 Find People
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {connections.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-base-100 border border-base-300/40 rounded-xl px-4 py-3 shadow-sm hover:shadow-md
            transition-all duration-300
            backdrop-blur-sm"
            >
              {/* LEFT: Avatar + Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  {user?.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.firstName}
                      className="w-14 h-14 rounded-full object-cover shadow-sm border border-base-300/40"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-base-300 text-base-content/80 text-xl font-medium shadow-sm">
                      {user?.firstName?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div>
                  <h2 className="text-base font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-xs text-base-content/60 line-clamp-1">
                    {user.about || "No bio available"}
                  </p>
                </div>
              </div>

              {/* RIGHT: Message Button */}
              <button
                className="
              btn btn-sm btn-primary 
              rounded-full px-4
              flex items-center gap-2
              hover:scale-105
              transition-all
            "
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Chat</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Connections;
