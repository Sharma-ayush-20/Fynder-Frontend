import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../utils/constants"
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditProfile({user}) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    about: user.about,
    photoUrl: user.photoUrl,
    skills: user.skills || [],
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    const arr = value.split(",").map((h) => h.trim());
    setFormData({ ...formData, skills: arr });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${baseUrl}/profile/edit`, formData, {withCredentials: true})
      if(response.status === 200){
        dispatch(addUser(response.data.data))
        toast.success(response.data.message)
        navigate("/")
      }
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg shadow-2xl bg-base-200">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Edit Your Profile 💫
          </h2>

          <form onSubmit={saveProfile} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="input input-bordered w-full"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="input input-bordered w-full"
              />
            </div>

            {/* Age */}
            <div>
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="input input-bordered w-full"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
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

            {/* About */}
            <div>
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Write a short bio..."
                className="textarea textarea-bordered w-full h-24"
              ></textarea>
            </div>

            {/* Photo URL */}
            <div>
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Paste your photo URL"
                className="input input-bordered w-full"
              />
              {formData.photoUrl && (
                <div className="mt-3 flex justify-center">
                  <img
                    src={formData.photoUrl}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border border-base-300"
                  />
                </div>
              )}
            </div>

            {/* Hobbies */}
            <div>
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                type="text"
                name="hobbies"
                value={formData.skills.join(", ")} 
                onChange={handleSkillsChange}
                placeholder="e.g. Travelling, Music, Reading"
                className="input input-bordered w-full"
              />

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-outline badge-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>


            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
