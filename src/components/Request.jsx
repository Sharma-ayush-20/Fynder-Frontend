import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { CheckCircle, XCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✨ Shimmer UI Component
const ShimmerCard = () => (
  <div className="w-full bg-base-200/50 rounded-xl p-4 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-base-300 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-base-300 rounded"></div>
        <div className="h-3 w-3/4 bg-base-300 rounded"></div>
      </div>
    </div>
  </div>
);

function Request() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store?.request);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getRequests = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/requests/received`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addRequests(res.data.data));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

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
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="relative p-4 sm:p-8">
      {/* Glow Effect */}
      <div className="absolute left-40 top-30 w-42 h-52 bg-primary/20 blur-[120px] opacity-40 pointer-events-none"></div>

      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-10 mt-10 sm:mt-0">
        Requests Waiting For You 
      </h1>

      {/* Loader */}
      {loading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      )}

      {!loading && requests?.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <Sparkles className="w-10 h-10 text-primary mb-2" />
          <p className="text-base-content/70 text-lg">No pending requests 💌</p>
          <p className="text-sm text-base-content/60 mt-1">
            Explore & connect with awesome people!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {requests?.map((req) => {
            const user = req.fromUserId;
            return (
              <div
                key={req._id}
                className="
    flex flex-col sm:flex-row sm:items-center justify-between
    bg-base-100 rounded-2xl p-4 shadow-lg border border-base-300/40
    hover:border-primary/50 hover:shadow-xl
    transition-all duration-300 cursor-pointer gap-3
  "
                onClick={() => navigate(`/profile/${user?._id}`)}
              >
                {/* Avatar + Info */}
                <div className="flex items-center gap-4 flex-1">
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.firstName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-content flex items-center justify-center text-lg font-bold shadow-md">
                      {user.firstName?.[0]}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h2 className="font-semibold truncate">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-xs text-base-content/60 max-w-[180px] sm:max-w-[260px] truncate">
                      {user.about || "No bio available"}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div
                  className="
      flex gap-3 w-full sm:w-auto
      justify-end sm:justify-start
    "
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequest("accepted", req._id);
                    }}
                    className="btn btn-xs sm:btn-sm bg-green-500/90 text-white rounded-full hover:bg-green-600 hover:scale-110 transition-all flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" /> Accept
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequest("rejected", req._id);
                    }}
                    className="btn btn-xs sm:btn-sm btn-outline btn-error rounded-full hover:scale-110 transition-all flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> Ignore
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
