import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { MessageCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store?.connection);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getConnections = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/connections`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addConnections(res.data.data));
      }
    } catch (error) {}
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  const ShimmerCard = () => (
    <div className="animate-pulse bg-base-200/50 border border-base-300/40 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-base-300"></div>
        <div className="space-y-2">
          <div className="w-28 h-4 bg-base-300 rounded"></div>
          <div className="w-40 h-3 bg-base-300 rounded"></div>
        </div>
      </div>
      <div className="w-16 h-8 bg-base-300 rounded-full"></div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 sm:mt-0 mt-5">

      {/* Glow Effect */}
      <div className="absolute left-70 top-30 w-92 h-92 bg-primary/20 blur-[120px] opacity-40 pointer-events-none"></div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-primary mb-8">
        Your Connections
      </h1>

      {/* Shimmer Loader */}
      {loading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((n) => (
            <ShimmerCard key={n} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && (!connections || connections.length === 0) ? (
        <div className="flex flex-col items-center justify-center text-center py-16 opacity-60">
          <p className="text-lg mb-4">No connections yet 💔</p>
          <NavLink
            to="/feed"
            className="btn btn-primary btn-sm hover:scale-105 transition-all"
          >
            🌟 Discover People
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {connections?.map((user) => (
            <div
              key={user?._id}
              className="
              flex items-center justify-between 
              bg-base-100/60 border border-base-300/40 rounded-2xl px-5 py-4 
              shadow-sm hover:shadow-xl 
              backdrop-blur-md
              transition-all duration-300 hover:scale-[1.01]
            "
            >
              {/* LEFT SIDE - Avatar + Info */}
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => navigate(`/profile/${user?._id}`)}
              >
                <img
                  src={
                    user?.photoUrl ||
                    `https://ui-avatars.com/api/?name=${user?.firstName}`
                  }
                  alt={user?.firstName}
                  className="w-14 h-14 rounded-full object-cover border border-primary/20 shadow-md"
                />

                <div>
                  <h2 className="font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-xs text-base-content/60 line-clamp-1">
                    {user?.about || "No bio available"}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE - Chat Button */}
              <button
                onClick={() =>
                  navigate(`/chat/${user?._id}`, { state: { user } })
                }
                className="
                btn btn-sm btn-primary 
                rounded-full px-4 flex items-center gap-1 
                shadow-md hover:scale-110 transition-all
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
