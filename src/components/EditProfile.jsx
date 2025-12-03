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
    skills: Array.isArray(user.skills)
      ? user.skills
      : user.skills?.split(",").map((s) => s.trim()) || [],
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

    const uploadData = new FormData();
    uploadData.append("firstName", formData.firstName);
    uploadData.append("lastName", formData.lastName);
    uploadData.append("age", formData.age);
    uploadData.append("gender", formData.gender);
    uploadData.append("about", formData.about);
    uploadData.append("skills", formData.skills);

    if (formData.photoUrl instanceof File) {
      uploadData.append("photoUrl", formData.photoUrl);
    }

    try {
      const res = await axios.patch(`${baseUrl}/profile/edit`, uploadData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
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
                  value={formData.age || ""}
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

              {/* Show Existing/Preview Image */}
              <div className="flex flex-col items-center gap-3">
                <img
                  src={
                    formData.photoUrl instanceof File
                      ? URL.createObjectURL(formData.photoUrl)
                      : formData.photoUrl
                  }
                  alt="Preview"
                  className="w-28 h-28 rounded-full object-cover border-2 border-primary shadow-md"
                />

                {/* Upload Input */}
                <input
                  type="file"
                  accept="image/*"
                  name="photoUrl"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, photoUrl: e.target.files[0] })
                  }
                />
              </div>
            </div>

            {/* SKILLS */}
            <div className="bg-base-100 p-4 rounded-xl border border-base-300">
              <h3 className="font-semibold text-lg mb-3">Skills</h3>

              {/* Add Skill Input */}
              <input
                type="text"
                placeholder="Add a skill & hit Enter 😎"
                className="input input-bordered w-full mb-3"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    e.preventDefault();
                    let newSkill = e.target.value.trim();

                    if (!formData.skills.includes(newSkill)) {
                      setFormData({
                        ...formData,
                        skills: [...formData.skills, newSkill],
                      });
                    }

                    e.target.value = "";
                  }
                }}
              />

              {/* Skill Chips */}
              <div className="flex flex-wrap gap-3 mt-3">
                {formData.skills.map((skill, idx) => {
                  const funEmojis = [
                    "🔥",
                    "⚡",
                    "🚀",
                    "🎯",
                    "💥",
                    "✨",
                    "💡",
                    "🎵",
                    "🎮",
                    "💪",
                  ];
                  const emoji = funEmojis[idx % funEmojis.length];

                  return (
                    <div
                      key={idx}
                      className="px-4 py-2 rounded-full flex items-center gap-2 
          bg-gradient-to-r from-[#8A2BE2] to-[#4B0082]
          text-white shadow-md cursor-pointer select-none
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-xl hover:brightness-110"
                    >
                      <span className="text-sm font-medium">
                        {emoji} {skill}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.skills.filter(
                            (_, i) => i !== idx
                          );
                          setFormData({ ...formData, skills: updated });
                        }}
                        className="text-xs hover:text-red-300 transition-all"
                      >
                        ✖
                      </button>
                    </div>
                  );
                })}
              </div>
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
