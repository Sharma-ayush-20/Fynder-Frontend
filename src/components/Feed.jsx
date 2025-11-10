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
    <div className="flex min-h-screen bg-base-200">

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-primary">Discover People</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feed && feed.length > 0 ? (
            feed.map((person, index) => (
              <UserCard key={index} user={person} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No users found 💔
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed;
