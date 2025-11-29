import React, { useState } from "react";
import {
  Crown,
  Star,
  Check,
  Sparkles,
  Moon,
  SunMedium,
  IndianRupee,
} from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const PremiumPlans = () => {
  const [billing, setBilling] = useState("monthly");
  const theme = useSelector((store) => store?.theme?.value);

  const isMonthly = billing === "monthly";

  //prices
  const prices = {
    silver: {
      monthly: 299,
      yearly: 2999,
    },
    gold: {
      monthly: 599,
      yearly: 5999,
    },
  };

  const handleBuyClick = async (memberShipType, memberShipPeriod) => {
    console.log(memberShipType, memberShipPeriod);
    try {
      const orders = await axios.post(
        `${baseUrl}/payment/create`,
        { memberShipType, memberShipPeriod },
        { withCredentials: true }
      );
      if (orders.status === 200) {
        console.log(orders.data);
        const {amount, currency, keyId, notes, orderId} = orders.data

        // Open Razorpay Checkout
        const options = {
          key: keyId,
          amount,
          currency,
          name: "Fynder",
          description: `Upgrade to ${notes.memberShipType} — unlock more profile reach & connections`,
          order_id: orderId,
          prefill: {
            name: `${notes.firstName} ${notes.lastName}`,
            email:notes.email,
            contact: "9999999999",
            memberShipType: notes.memberShipType,
            memberShipPeriod: notes.memberShipPeriod,
          },
          theme: {
            color: "#6C63FF",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-base-100 text-base-content flex items-center justify-center px-4 py-8 sm:mt-0 mt-5"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-30%] h-[300px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[260px] w-[260px] rounded-full bg-gradient-to-tr from-sky-500 via-blue-500 to-emerald-400 opacity-40 blur-3xl" />
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-base-300/70 bg-base-100/70 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="w-3 h-3 text-secondary" />
              <span className="uppercase tracking-wide">Premium Access</span>
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Upgrade to{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Premium Experience
              </span>
            </h1>
            <p className="mt-2 text-sm md:text-base text-base-content/70 max-w-xl">
              Boost your profile on Fynder — Silver & Gold plans give you more
              reach, better impressions & higher priority.
            </p>
          </div>
        </div>

        {/* Billing toggle */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-base-content/80">
            <span className="inline-flex h-6 items-center rounded-full bg-base-100/80 px-2 text-[0.7rem] font-medium border border-base-300/70">
              🔒 Cancel anytime · No hidden fees
            </span>
          </div>

          <div className="inline-flex items-center rounded-full bg-base-100/80 border border-base-300/80 p-1 shadow-sm backdrop-blur mx-auto sm:mx-0">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-full font-medium transition-all ${
                isMonthly
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-md"
                  : "text-base-content/70"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-full font-medium transition-all flex items-center gap-1 ${
                !isMonthly
                  ? "bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 text-white shadow-md"
                  : "text-base-content/70"
              }`}
            >
              Yearly
              <span className="text-[0.65rem] bg-base-100/90 text-success px-1.5 py-0.5 rounded-full border border-success/20">
                Save 2 months
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Silver Plan */}
          <div className="card card-compact bg-base-100/90 backdrop-blur border border-base-300/70 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2">
                    <Star className="w-5 h-5 text-slate-500" />
                    <span className="text-xs font-semibold tracking-wide uppercase text-slate-500">
                      Silver
                    </span>
                  </div>
                  <h2 className="card-title text-xl md:text-2xl">
                    Silver Plan
                  </h2>
                </div>
                <span className="badge badge-outline border-slate-500/40 text-slate-600 text-xs">
                  For Starters
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-bold flex items-center gap-1">
                  <IndianRupee className="w-5 h-5 " />
                  {isMonthly
                    ? prices.silver.monthly.toLocaleString("en-IN")
                    : prices.silver.yearly.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-base-content/70">
                  / {isMonthly ? "month" : "year"}
                </span>
              </div>

              {!isMonthly && (
                <p className="text-xs text-success mt-1">
                  Effective ₹
                  {Math.round(prices.silver.yearly / 12).toLocaleString(
                    "en-IN"
                  )}
                  /month only
                </p>
              )}

              <p className="mt-3 text-sm text-base-content/70">
                Perfect for users starting their premium journey – better
                visibility, clean experience, and essential boosts.
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Priority matching & better visibility
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  See who interacted with your profile recently
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Ad-lite experience for smoother usage
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Premium chat themes & basic profile highlights
                </li>
              </ul>

              <div className="card-actions mt-6">
                {isMonthly ? (
                  <button
                    onClick={() => handleBuyClick("silver", "monthly")}
                    className="btn btn-outline w-full rounded-full"
                  >
                    Continue with Silver
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuyClick("silver", "yearly")}
                    className="btn btn-outline w-full rounded-full"
                  >
                    Continue with Silver
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Gold Plan */}
          <div className="card card-compact bg-gradient-to-b from-pink-500/90 via-purple-600/90 to-indigo-700/90 text-white border border-white/10 shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-60">
              <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute bottom-[-40px] left-[-40px] h-44 w-44 rounded-full bg-sky-300/20 blur-2xl" />
            </div>

            <div className="card-body relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2">
                    <Crown className="w-6 h-6 text-yellow-300 drop-shadow" />
                    <span className="text-xs font-semibold tracking-wide uppercase text-yellow-200">
                      Gold
                    </span>
                  </div>
                  <h2 className="card-title text-2xl md:text-3xl">
                    Gold Premium
                  </h2>
                </div>
                <span className="badge badge-lg border-0 bg-yellow-300 text-yellow-900 text-[0.7rem] font-semibold shadow">
                  Most Popular
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-bold flex items-center gap-1">
                  <IndianRupee className="w-5 h-5 " />
                  {isMonthly
                    ? prices.gold.monthly.toLocaleString("en-IN")
                    : prices.gold.yearly.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-white/80">
                  / {isMonthly ? "month" : "year"}
                </span>
              </div>

              {!isMonthly && (
                <p className="text-xs text-emerald-200 mt-1">
                  Effective ₹
                  {Math.round(prices.gold.yearly / 12).toLocaleString("en-IN")}
                  /month only – best value
                </p>
              )}

              <p className="mt-3 text-sm text-white/85">
                Full power unlock – maximum reach, priority everywhere & a
                premium social presence like top-tier apps.
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-200" />
                  Top-level profile boost & premium badge
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-200" />
                  See who viewed your profile & advanced insights
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-200" />
                  Priority in search, matches & recommendations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-200" />
                  Premium chat styles, reactions & profile themes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-200" />
                  Early access to upcoming features
                </li>
              </ul>

              <div className="card-actions mt-6">
                {isMonthly ? (
                  <button
                    onClick={() => handleBuyClick("gold", "monthly")}
                    className="btn w-full rounded-full border-0 bg-white text-purple-700 hover:bg-slate-100"
                  >
                    Go Gold Premium
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuyClick("gold", "yearly")}
                    className="btn w-full rounded-full border-0 bg-white text-purple-700 hover:bg-slate-100"
                  >
                    Go Gold Premium
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-[0.7rem] text-base-content/60 text-center">
          Prices shown in Indian Rupees. By continuing, you agree to our Terms &
          Privacy Policy. You can cancel anytime from Settings.
        </p>
      </div>
    </div>
  );
};

export default PremiumPlans;
