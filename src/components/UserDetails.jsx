import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, BadgeCheck, Sparkles, Info } from "lucide-react";
import UserDetailsShimmer from "./UserDetailsShimmer";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/profile/${id}`, { withCredentials: true })
      .then((res) => setUser(res.data.data));
  }, [id]);

  if (!user) return <UserDetailsShimmer />

return (
  <div className="relative min-h-100vh overflow-hidden px-6 sm:px-12 py-10 flex items-center justify-center">
    
    {/* Glow BG Left */}
    <div className="absolute left-32 top-40 w-96 h-96 bg-primary/20 rounded-full blur-[130px] opacity-40"></div>

    {/* Glow BG Right */}
    <div className="absolute right-32 bottom-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[130px] opacity-40"></div>

    {/* Main Content */}
    <div className="flex flex-col sm:flex-row items-center gap-14 w-full max-w-6xl mt-10">
      
      {/* Profile Image */}
      <img
        src={user.photoUrl}
        alt={user.firstName}
        className="w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.4)] border-2 border-white/20"
      />

      {/* Right Info Section */}
      <div className="flex-1 space-y-4">
        
        {/* Name */}
        <h1 className="text-4xl font-bold flex items-center gap-2">
          {user.firstName}, {user.age}
          {user.isPremium && (
            <BadgeCheck className="text-blue-500 drop-shadow-md animate-pulse" />
          )}
        </h1>

        <p className="capitalize text-base-content/70 font-medium">
          {user.gender}
        </p>

        {/* About */}
        <p className=" text-base-content/80 max-w-md leading-relaxed">
          {user.about || "✨ Loves positive energy & great vibes!"}
        </p>

        {/* Skills */}
        {user.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-xs bg-primary/15 text-primary py-1 px-3 rounded-full border border-primary/20 hover:scale-105 transition"
              >
                <Sparkles className="w-3 h-3" /> {skill}
              </span>
            ))}
          </div>
        )}

        {/* Vibe Box */}
        <div className="flex items-center gap-2 bg-base-200/50 backdrop-blur-md border border-base-300/20 shadow-md p-3 rounded-xl max-w-md">
          <Info className="text-primary w-4 h-4" />
          “Confidence & Kindness look great on you 😌”
        </div>

      </div>
    </div>

    {/* Back button */}
    <button
      onClick={() => navigate(-1)}
      className="absolute sm:top-4 sm:left-4 top-0 right-4 bg-base-200/70 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>

  </div>
);


}
