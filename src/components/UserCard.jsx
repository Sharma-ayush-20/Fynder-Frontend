import axios from "axios";
import React from "react";
import { baseUrl } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

function UserCard({ user }) {
  const dispatch = useDispatch();

  //accept and ignore the user
  const handleSendConnection = async (status, id) => {
    try {
      const response = await axios.post(`${baseUrl}/request/send/${status}/${id}`, {}, {withCredentials: true})
      if(response.status === 200){
        toast.success(response.data.message)
        dispatch(removeUserFeed(id))
      }
    } catch (error) {
      
    }
  }

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={user?.photoUrl}
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user.firstName}</h2>
          {user.age && user.gender && <p>
            {user.age} , {user.gender}
          </p>}
          <p>
            {user.about}
          </p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleSendConnection("ignored", user._id)}>Ignore</button>
            <button className="btn btn-primary" onClick={() => handleSendConnection("interested", user._id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
