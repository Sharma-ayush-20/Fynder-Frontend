import React from "react";
import { useNavigate } from "react-router-dom";

const jobs = [
  {
    role: "Frontend Developer",
    location: "Mumbai, India",
    type: "Full-Time",
    desc: "Help us build smooth, fast & beautiful user experiences using React & modern UI.",
  },
  {
    role: "Backend Engineer",
    location: "Remote",
    type: "Full-Time",
    desc: "Scale our core matchmaking engine & develop secure backend APIs.",
  },
  {
    role: "Product Designer",
    location: "Bengaluru, India",
    type: "Hybrid",
    desc: "Create delightful and accessible experiences for real human connections.",
  },
];

const Careers = () => {
  const navigate = useNavigate();

  return (
    <div className=" mt-20 min-h-screen bg-base-100 text-base-content flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-base-300 sticky top-0 bg-base-100 z-50">
        <button
          onClick={() => navigate("/landingpage")}
          className="btn btn-sm btn-ghost rounded-full"
        >
          ← Back
        </button>
        <span className="font-bold text-xl">Careers at Fynder</span>
      </div>

      {/* Intro */}
      <section className="text-center px-6 md:px-32 pt-12">
        <h1 className="text-4xl md:text-5xl font-extrabold">Join Our Team</h1>
        <p className="text-lg opacity-70 max-w-2xl mx-auto mt-3">
          Work on a mission that truly connects the world.  
          We build technology that brings real people together.
        </p>
      </section>

      {/* Job Listings */}
      <section className="px-6 md:px-32 py-14 grid grid-cols-1 gap-6">
        {jobs.map((job, i) => (
          <div
            key={i}
            className="rounded-xl bg-base-200 p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold">{job.role}</h3>

            <div className="flex gap-4 text-sm opacity-70 mt-1">
              <p>{job.location}</p>
              <span>•</span>
              <p>{job.type}</p>
            </div>

            <p className="text-sm opacity-75 mt-3">{job.desc}</p>

            <button
              className="btn btn-primary btn-sm mt-4"
              onClick={() => alert(`Apply for ${job.role}`)}
            >
              Apply Now →
            </button>
          </div>
        ))}
      </section>

      {/* CTA */}
      <div className="text-center pb-20">
        <p className="opacity-70 mb-3">
          Not seeing a role that fits?
        </p>
        <button
          className="btn btn-outline"
          onClick={() => alert("Share your resume at careers@fynder.com")}
        >
          Send Us Your Resume
        </button>
      </div>
    </div>
  );
};

export default Careers;
