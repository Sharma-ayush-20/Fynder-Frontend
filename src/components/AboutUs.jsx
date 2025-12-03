import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const theme = useSelector((store) => store?.theme?.value);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col sm:mt-20 mt-20">

      {/* Header with Back Button */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-base-300 sticky top-0 bg-base-100 z-50">
        <button
          onClick={() => navigate("/landingpage")}
          className="btn btn-sm btn-ghost rounded-full"
        >
          ← Back
        </button>
        <span className="font-bold text-xl">About Fynder</span>
      </div>

      {/* Hero Text */}
      <section className="px-6 md:px-32 pt-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Discover. Match. Connect.
        </h1>
        <p className="text-lg opacity-70 max-w-2xl mx-auto">
          Fynder helps people meet genuine personalities who share the same vibe.
          We connect you with real emotions, real friendships and real love.
        </p>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-32 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "1M+", desc: "Connections Created" },
          { title: "50+", desc: "Countries Reached" },
          { title: "4.9★", desc: "Rated by Users" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-xl bg-base-200 p-8 text-center shadow-sm hover:shadow-lg transition-all"
          >
            <h2 className="text-3xl font-bold text-primary">{stat.title}</h2>
            <p className="mt-2 opacity-80">{stat.desc}</p>
          </div>
        ))}
      </section>

      {/* Mission Section */}
      <section className="px-6 md:px-32 pb-16 text-center">
        <h3 className="text-3xl font-bold mb-4">Our Belief</h3>
        <p className="text-lg opacity-75 max-w-3xl mx-auto leading-relaxed">
          We believe that every person deserves a real moment — a moment that
          makes them feel understood, valued and appreciated. Fynder is built 
          to create those moments every single day.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center pb-16">
        <button
          onClick={() => navigate("/signup")}
          className="btn btn-primary btn-lg px-10 hover:opacity-90 transition"
        >
          Join Fynder →
        </button>
      </div>

    </div>
  );
};

export default AboutUs;
