import React, { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../utils/feedSlice";
import { toast } from "react-hot-toast";
import UserCard from "./UserCard";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);
  const user = useSelector((store) => store?.user);

  const getUserFeed = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/feed`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(addUserFeed(response.data.users));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-extrabold text-primary mb-8 text-center tracking-tight">Discover People</h1>
      <div className="mt-10 bg-base-200 px-4">
        {feed && feed.length > 0 ? (
          <UserCard user={feed[0]} />
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No users found 💔
          </div>
        )}
      </div>
    </>
  );
}

export default Feed;
