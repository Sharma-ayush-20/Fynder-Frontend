import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../utils/feedSlice";
import { toast } from "react-hot-toast";
import UserCard from "./UserCard";
import SkeletonUserCard from "./SkeletonUserCard";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);
  const user = useSelector((store) => store?.user);

  const tips = [
    "🔥 Tip: Keep the conversation fun & positive.",
    "💬 Be yourself — authenticity beats perfection.",
    "📸 Smile in photos — it increases matches by 22%.",
  ];

  const motivationLines = [
    "🚀 Just a moment… someone awesome is heading your way!",
    "✨ Good things take time. Amazing people loading…",
    "❤️ The perfect match might just be one refresh away!",
    "🤝 Hang tight! Your next connection is coming soon!",
    "🌟 Keep smiling! Great vibes attract great people.",
    "🔥 No matches right now — but magic is just around the corner!",
  ];

  const randomLine =
    motivationLines[Math.floor(Math.random() * motivationLines.length)];

  const [tipIndex, setTipIndex] = useState(0);

  const getUserFeed = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/feed`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(addUserFeed(response.data.users));
      }
    } catch (error) {
      // toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserFeed();

    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <h1 className="text-3xl font-extrabold text-primary mb-8 text-center tracking-tight">Discover People</h1> */}
      <div className="relative mt-10 sm:mt-6 bg-base-200 px-4">
        {/* === RIGHT SIDE BLURRED SHAPE (Desktop only) === */}
        <div className="hidden sm:block absolute top-40 right-24 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* GLOW BUBBLE */}
        <div className="hidden sm:block absolute top-40 right-24 w-72 h-72 bg-primary/20 dark:bg-primary/30 rounded-full blur-[120px] pointer-events-none glow-float"></div>

        {/* === QUOTE BOX === */}
        <div
          className="hidden sm:block absolute top-[330px] right-16 bg-base-100 dark:bg-base-300 shadow-md border border-base-300/50 rounded-xl p-4 w-72 text-sm fade-slide lift-hover"
          style={{ animationDelay: "0.15s" }}
        >
          ✨ “Good vibes attract good people.”
        </div>

        {/* === TIP BOX === */}
        <div
          className="hidden sm:block absolute top-[420px] right-16 w-72 bg-base-100 dark:bg-base-300 shadow-md border border-base-300/40 rounded-2xl p-4 text-sm leading-relaxedfade-slide lift-hover"
          key={tipIndex}
        >
          <p className="opacity-80">{tips[tipIndex]}</p>
        </div>

        {/* === USER CARD === */}
        {!feed ? (
          <SkeletonUserCard />
        ) : feed.length > 0 ? (
          <UserCard user={feed[0]} />
        ) : (
          <p className="text-center mt-6 text-base-content/70 animate-fade-in">
            {randomLine}
          </p>
        )}
      </div>
    </>
  );
}

export default Feed;
