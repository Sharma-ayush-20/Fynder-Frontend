import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 text-base-content mt-20">

      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-base-300 bg-base-100/80 backdrop-blur-md sticky top-0 z-50">
        <button
          onClick={() => navigate("/landingpage")}
          className="btn btn-ghost btn-sm rounded-full"
        >
          ← Back
        </button>
        <h2 className="text-lg font-semibold">Terms & Conditions</h2>
      </header>

      {/* Title Section */}
      <section className="px-6 md:px-20 pt-14 text-center">
        <div className="flex justify-center mb-3">
          <FileText className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Terms of Use
        </h1>
        <p className="opacity-70 mt-3 max-w-2xl mx-auto">
          Please read these terms carefully before using Fynder.
        </p>
      </section>

      {/* Terms Content */}
      <section className="px-6 md:px-40 py-16 space-y-8 leading-relaxed text-[15px]">
        
        <div>
          <h3 className="font-bold text-lg mb-2">1️⃣ Acceptance of Terms</h3>
          <p className="opacity-80">
            By creating an account or accessing Fynder, you agree to these terms and conditions.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-2">2️⃣ User Responsibilities</h3>
          <ul className="space-y-2 opacity-80">
            <li>✔️ You must provide accurate and honest information.</li>
            <li>✔️ You must not harass, bully or abuse other users.</li>
            <li>✔️ You must respect others' privacy and personal boundaries.</li>
            <li>✔️ Any illegal activity is strictly prohibited.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">3️⃣ Content & Safety</h3>
          <p className="opacity-80">
            We may remove harmful content and take action against accounts that violate our rules.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">4️⃣ Updates to Terms</h3>
          <p className="opacity-80">
            Fynder may update these terms as needed. Continued use of our services means you accept these updates.
          </p>
        </div>

      </section>

      {/* Bottom Spacing */}
      <div className="h-12"></div>

    </div>
  );
};

export default Terms;
