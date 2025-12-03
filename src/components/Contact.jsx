import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 text-base-content mt-20">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-base-300 sticky top-0 bg-base-100 z-50">
        <button
          onClick={() => navigate("/landingpage")}
          className="btn btn-xs btn-ghost rounded-full"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">Contact Us</h2>
      </div>

      {/* Hero text */}
      <div className="text-center px-6 md:px-20 pt-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Let’s Talk
        </h1>
        <p className="text-lg opacity-70 max-w-2xl mx-auto mt-3">
          We're here to assist you with any questions, feedback or support.
        </p>
      </div>

      {/* Contact + Form Layout */}
      <div className="px-6 md:px-28 lg:px-36 xl:px-48 py-16 grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* Info section */}
        <div className="space-y-6">
          {[
            { label: "Email Support", value: "support@fynder.com" },
            { label: "Headquarters", value: "Mumbai, India" },
            { label: "Business Hours", value: "Mon – Sat, 10 AM – 6 PM" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-base-200 border border-base-300 shadow-md"
            >
              <p className="font-semibold text-[18px]">{item.label}</p>
              <p className="opacity-75 mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Improved Contact form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent successfully!");
          }}
          className="p-8 rounded-2xl bg-base-200 border border-base-300 shadow-md space-y-6"
        >
          {/* Name */}
          <div className="form-control">
            <label className="label font-semibold">Full Name</label>
            <input
              type="text"
              className="input input-bordered h-14 rounded-lg text-base"
              required
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label font-semibold">Email Address</label>
            <input
              type="email"
              className="input input-bordered h-14 rounded-lg text-base"
              required
            />
          </div>

          {/* Message */}
          <div className="form-control">
            <label className="label font-semibold">Your Message</label>
            <textarea
              className="textarea textarea-bordered h-40 rounded-lg text-base leading-relaxed"
              required
            ></textarea>
          </div>

          <button className="btn btn-primary h-14 text-lg rounded-lg font-semibold hover:opacity-95 transition-all">
            Send Message →
          </button>
        </form>
      </div>

      {/* CTA */}
      <div className="text-center pb-20">
        <p className="opacity-70 mb-3">Or reach us on social platforms</p>
        <div className="flex justify-center gap-6 text-xl">
          <a className="hover:opacity-70 cursor-pointer">🌐</a>
          <a className="hover:opacity-70 cursor-pointer">📸</a>
          <a className="hover:opacity-70 cursor-pointer">🐦</a>
          <a className="hover:opacity-70 cursor-pointer">💼</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
