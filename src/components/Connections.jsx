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
    <div className="min-h-screen p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Connections</h1>

      {!connections || connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No connections found 💔</p>

          <NavLink
            to="/feed" 
            className="btn btn-primary btn-sm sm:btn-md transition-all duration-300 hover:scale-105"
          >
            🌟 Go Connect / Make Friends
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {connections.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-base-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
            >
              
              <div className="flex items-center gap-4">
                {/* Profile Image  */}
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={`${user.firstName}`}
                    className="w-12 h-12 rounded-full object-cover border border-primary"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold text-lg">
                    {user.firstName?.[0]}
                  </div>
                )}

                {/* User Info */}
                <div>
                  <h2 className="font-semibold text-lg">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {user.about || "No about info available"}
                  </p>
                </div>
              </div>

              {/* RIGHT: Message Button */}
              <button className="btn btn-sm btn-outline btn-primary flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Message</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Connections;
