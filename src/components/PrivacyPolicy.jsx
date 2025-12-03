import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
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
        <h2 className="text-lg font-semibold">Privacy Policy</h2>
      </header>

      {/* Title */}
      <section className="text-center px-6 md:px-20 pt-14">
        <div className="flex justify-center mb-3">
          <Shield className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Your Privacy Matters
        </h1>

        <p className="opacity-70 mt-3 max-w-2xl mx-auto text-base md:text-lg">
          We are committed to protecting your personal information and your right to privacy.
        </p>
      </section>

      {/* Content */}
      <section className="px-6 md:px-40 py-16 space-y-10 leading-relaxed text-[15px]">
        
        {/* Section 1 */}
        <div>
          <h3 className="font-bold text-lg mb-2">🔹 What information do we collect?</h3>
          <p className="opacity-80">
            We collect data that helps us verify identity, improve matching accuracy,
            and keep Fynder safe — including profile details, interests, and usage activity.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="font-bold text-lg mb-2">🔹 How do we use your data?</h3>
          <ul className="space-y-2 opacity-80">
            <li>✔️ To provide personalized matches</li>
            <li>✔️ To improve safety and detect fraud</li>
            <li>✔️ To enhance app experience</li>
            <li>✔️ To communicate important updates</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="font-bold text-lg mb-2">🔹 How do we protect your data?</h3>
          <p className="opacity-80">
            We use encrypted storage and secure authentication methods to keep
            your information safe from unauthorized access.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h3 className="font-bold text-lg mb-2">🔹 Your Rights</h3>
          <p className="opacity-80">
            You can request your profile deletion or download your data anytime through
            Settings or by contacting support.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h3 className="font-bold text-lg mb-2">🔹 Updates to this policy</h3>
          <p className="opacity-80">
            We may update this Privacy Policy as needed. Continued use of Fynder means
            you agree with the latest version.
          </p>
        </div>

      </section>

      <div className="h-10" />
      
    </div>
  );
};

export default PrivacyPolicy;
