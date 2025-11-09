import React from "react";

function UserCard({ user }) {
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
