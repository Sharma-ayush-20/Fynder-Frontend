import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    about: user.about,
    photoUrl: user.photoUrl,
    skills: user.skills || [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    const arr = e.target.value.split(",").map((s) => s.trim());
    setFormData({ ...formData, skills: arr });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${baseUrl}/profile/edit`, formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 sm:mt-12 mt-10">
      {/* GLOW BUBBLE – hidden on mobile */}
      <div
        className="hidden md:block absolute top-40 left-20 w-96 h-80 
  bg-blue-600/20 dark:bg-blue-400/30 rounded-full 
  blur-[130px] pointer-events-none"
      ></div>

      <div className="card w-full max-w-xl bg-base-200 shadow-xl rounded-xl border border-base-300">
        <div className="card-body">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-2">Edit Profile</h2>

          {/* Small Blue Accent Bar */}
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>

          <form onSubmit={saveProfile} className="space-y-6">
            {/* PERSONAL DETAILS */}
            <div className="bg-base-100 p-4 rounded-xl border border-base-300">
              <h3 className="font-semibold text-lg mb-3">Personal Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="input input-bordered w-full"
                />

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="input input-bordered w-full"
                />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* ABOUT */}
            <div className="bg-base-100 p-4 rounded-xl border border-base-300">
              <h3 className="font-semibold text-lg mb-3">About You</h3>

              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Write something about yourself..."
                className="textarea textarea-bordered w-full h-28"
              />
            </div>

            {/* PHOTO */}
            <div className="bg-base-100 p-4 rounded-xl border border-base-300">
              <h3 className="font-semibold text-lg mb-3">Profile Photo</h3>

              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="input input-bordered w-full"
              />

              {formData.photoUrl && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="w-28 h-28 rounded-full object-cover border-2 border-primary shadow-md"
                  />
                </div>
              )}
            </div>

            {/* SKILLS */}
            <div className="bg-base-100 p-4 rounded-xl border border-base-300">
              <h3 className="font-semibold text-lg mb-3">Skills</h3>

              <input
                type="text"
                value={formData.skills.join(", ")}
                onChange={handleSkillsChange}
                placeholder="React, Node, JavaScript..."
                className="input input-bordered w-full"
              />

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((s, i) => (
                    <span
                      key={i}
                      className="badge badge-primary badge-outline px-3 py-2 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* SUBMIT */}
            <button className="btn btn-primary btn-lg w-full mt-4">
              Save Changes ✔
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
