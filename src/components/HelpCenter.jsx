import React from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, MessageCircle, ShieldCheck } from "lucide-react"; // Lucide Icons

const HelpCenter = () => {
  const navigate = useNavigate();

  const helpItems = [
    { title: "Account & Login", icon: <UserRound className="w-7 h-7" /> },
    { title: "Matches & Chats", icon: <MessageCircle className="w-7 h-7" /> },
    { title: "Privacy & Safety", icon: <ShieldCheck className="w-7 h-7" /> },
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content mt-20">

      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-base-300 sticky top-0 bg-base-100 z-50">
        <button
          onClick={() => navigate("/landingpage")}
          className="btn btn-ghost btn-sm rounded-full"
        >
          ← Back
        </button>
        <h2 className="text-lg font-semibold">Help Center</h2>
      </header>

      {/* Title Section */}
      <section className="text-center px-6 md:px-20 pt-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          How can we help you?
        </h1>
        <p className="opacity-70 mt-3 max-w-xl mx-auto text-base">
          Search for quick answers, explore common topics or contact support.
        </p>
      </section>

      {/* Search */}
      <div className="px-6 md:px-32 mt-10">
        <input
          type="text"
          placeholder="Search topics like account, chats, safety…"
          className="input input-bordered w-full h-14 rounded-xl text-base shadow-sm"
        />
      </div>

      {/* Help Topics */}
      <section className="px-6 md:px-32 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {helpItems.map((item, i) => (
          <div
            key={i}
            className="rounded-xl bg-base-200 border border-base-300 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-center"
          >
            <div className="flex justify-center text-primary">
              {item.icon}
            </div>
            <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
          </div>
        ))}
      </section>

      {/* CTA */}
      <div className="text-center pb-20 px-6">
        <p className="opacity-70 text-sm">Still need help?</p>
        <button
          className="btn btn-primary mt-3 font-medium"
          onClick={() => navigate("/contact")}
        >
          Contact Support →
        </button>
      </div>

    </div>
  );
};

export default HelpCenter;
