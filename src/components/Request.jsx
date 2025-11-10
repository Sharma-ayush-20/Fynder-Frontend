import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

function Request() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store?.request);

  const getRequests = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/requests/received`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addRequests(res.data.data));
      } else {
        toast.error("Failed to fetch requests");
      }
    } catch (error) {
    //   toast.error(error?.response?.data?.message || error.message);
    }
  };

   // Accept and ignore request
  const handleRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${baseUrl}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(addRequests(requests.filter((r) => r._id !== id)));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Connection Requests
      </h1>

      {!requests || requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No pending requests 💌</p>
          <p className="text-sm text-gray-400">
            Go explore and connect with new people!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {requests.map((req) => {
            const user = req.fromUserId;
            return (
              <div
                key={req._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-base-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* LEFT: Avatar + Info */}
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  {user.photoUrl ? (
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
                  <div className="min-w-0">
                    <h2 className="font-semibold text-lg truncate">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {user.about || "No about info available"}
                    </p>
                  </div>
                </div>

                {/* RIGHT: Action Buttons */}
                <div className="flex gap-3 sm:gap-4 justify-end sm:justify-start">
                  <button onClick={() => handleRequest("accepted", req._id)} className="btn btn-sm sm:btn-md btn-success hover:scale-105 transition-transform duration-200">
                    Accept
                  </button>
                  <button onClick={() => handleRequest("rejected", req._id)} className="btn btn-sm sm:btn-md btn-outline btn-error hover:scale-105 transition-transform duration-200">
                    Ignore
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Request;
