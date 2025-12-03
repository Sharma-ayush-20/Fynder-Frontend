import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How do I create an account?",
    a: "Just sign up using your email or Google account and create your profile."
  },
  {
    q: "Is Fynder free to use?",
    a: "Yes! Basic features are free. Premium plans are optional."
  },
  {
    q: "How does Fynder find matches?",
    a: "We match based on interests, preferences, and profile compatibility."
  },
];

const FAQs = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content mt-20">

      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-base-300 sticky top-0 bg-base-100/80 backdrop-blur-md z-50">
        <button
          onClick={() => navigate("/landingpage")}
          className="btn btn-ghost btn-sm rounded-full"
        >
          ← Back
        </button>
        <h2 className="text-lg font-semibold">FAQs</h2>
      </header>

      {/* Title */}
      <section className="text-center px-6 md:px-20 pt-14">
        <div className="flex justify-center mb-3">
          <HelpCircle className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>

        <p className="opacity-70 mt-3 max-w-2xl mx-auto text-base md:text-lg">
          Quick answers for your common doubts.
        </p>
      </section>

      {/* FAQs */}
      <section className="px-6 md:px-40 py-14">
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              onClick={() => toggleFAQ(i)}
              className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base">{item.q}</h3>

                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-primary" : "rotate-0 opacity-70"
                  }`}
                />
              </div>

              <div
                className={`mt-3 text-sm opacity-80 leading-relaxed transition-all duration-300 overflow-hidden ${
                  openIndex === i ? "max-h-40" : "max-h-0"
                }`}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default FAQs;
