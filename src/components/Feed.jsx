import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);  
  const user = useSelector(store => store?.user)
  // console.log(user)

  const getUserFeed = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/feed`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log(response);
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
      {feed &&
       <div>
        <UserCard user={feed[0]}/>
      </div>}
      
    </>
  );
}

export default Feed;
