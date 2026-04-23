import React, { useState } from "react";

const timeAgo = (timestamp) => {
  if (!timestamp) return "Just now";
  const seconds = Math.floor((new Date() - timestamp) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " yrs ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " mos ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hrs ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return "Just now";
};

// 🌟 PREMIUM BADGE SYSTEM 🌟
const getBadgeInfo = (amount) => {
  if (amount >= 10000)
    return {
      icon: "fa-crown",
      color: "text-purple-600",
      bg: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
      border: "border-purple-200/60",
      label: "Visionary"
    };
  if (amount >= 5000)
    return {
      icon: "fa-medal",
      color: "text-amber-500",
      bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
      border: "border-amber-200/60",
      label: "Gold Sponsor"
    };
  if (amount >= 1000)
    return {
      icon: "fa-award",
      color: "text-blue-500",
      bg: "bg-gradient-to-br from-blue-50 to-sky-50",
      border: "border-blue-200/60",
      label: "Silver Sponsor"
    };
  return {
      icon: "fa-leaf",
      color: "text-emerald-500",
      bg: "bg-white",
      border: "border-slate-100",
      label: "Supporter"
  };
  };

  // 🌟 DYNAMIC AVATAR COLORS 🌟
  const getAvatarStyle = (char) => {
  const styles = [
    "bg-teal-100 text-teal-700",
    "bg-rose-100 text-rose-700",
    "bg-blue-100 text-blue-700",
    "bg-amber-100 text-amber-700",
    "bg-purple-100 text-purple-700",
    "bg-emerald-100 text-emerald-700"
  ];
  const index = char.charCodeAt(0) % styles.length;
  return styles[index] || styles[0];
  };

  export default function SupportersList({ donations }) {
  const [activeTab, setActiveTab] = useState("recent");

  const getList = () => {
    if (activeTab === "recent") {
      return donations.slice(0, 50); // Allow more items to demonstrate scrolling
    } else {
      return [...donations]
        .sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0))
        .slice(0, 10); // Show top 10
    }
  };

  const listToRender = getList();

  // Metallic Rank Colors for Top 10
  const rankColors = [
    "text-amber-400 drop-shadow-md", // 1st (Gold)
    "text-slate-400 drop-shadow-md", // 2nd (Silver)
    "text-amber-700 drop-shadow-md", // 3rd (Bronze)
    "text-slate-300",                // 4th
    "text-slate-300",                // 5th
    "text-slate-200",                // 6th
    "text-slate-200",                // 7th
    "text-slate-200",                // 8th
    "text-slate-200",                // 9th
    "text-slate-200",                // 10th
  ];
  return (
    <div className="animate-fade-in-up">
      
      {/* 🌟 APP-LIKE SEGMENTED TABS 🌟 */}
      <div className="flex p-1 mb-6 sm:mb-8 bg-zinc-100 rounded-xl border border-zinc-200 max-w-[240px] sm:max-w-[280px]">
        <button
          onClick={() => setActiveTab("recent")}
          className={`flex-1 text-xs sm:text-sm py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 font-semibold ${
            activeTab === "recent"
              ? "bg-white text-teal-600 shadow-sm border border-zinc-200"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          <i className="fa-regular fa-clock"></i> Recent
        </button>
        <button
          onClick={() => setActiveTab("top")}
          className={`flex-1 text-xs sm:text-sm py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 font-semibold ${
            activeTab === "top"
              ? "bg-white text-amber-600 shadow-sm border border-zinc-200"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          <i className="fa-solid fa-trophy"></i> Top 5
        </button>
      </div>

      {/* 🌟 LIST AREA 🌟 */}
      <div className="space-y-4">
        {listToRender.length === 0 ? (
          <div className="text-center py-10 sm:py-12 bg-zinc-50 border border-zinc-200 rounded-2xl border-dashed">
             <i className="fa-solid fa-seedling text-4xl sm:text-5xl text-zinc-300 mb-3 sm:mb-4"></i>
             <p className="text-sm sm:text-base text-zinc-500 font-medium">No supporters yet.</p>
             <p className="text-xs sm:text-sm text-zinc-400 mt-1">Be the first to plant a seed!</p>
          </div>
        ) : (
          listToRender.map((d, index) => {
            const safeName = String(d.name || "Well Wisher");
            const firstName = safeName.split(" ")[0] || "A";
            const firstChar = firstName.charAt(0).toUpperCase();
            const safeAmount = Number(d.amount) || 0;
            const badge = getBadgeInfo(safeAmount);
            const avatarStyle = getAvatarStyle(firstChar);

            return (
              <div
                key={d.id}
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-3 sm:gap-4 transition-all duration-300 hover:bg-zinc-50 bg-white border-zinc-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    
                    {/* Rank Number (Only in Top tab) */}
                    {activeTab === "top" && (
                      <div className={`text-xl sm:text-2xl lg:text-3xl w-6 sm:w-8 lg:w-10 text-center shrink-0 ${rankColors[index]}`}>
                        #{index + 1}
                      </div>
                    )}

                    {/* Dynamic Avatar */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl lg:text-2xl shadow-sm border border-white/60 shrink-0 transition-transform group-hover:scale-105 ${avatarStyle}`}>
                      {firstChar}
                    </div>
                    
                    <div>
                      <div className="text-slate-800 text-sm sm:text-base lg:text-lg flex items-center gap-1.5 sm:gap-2">
                        {firstName}
                        <i className={`fa-solid ${badge.icon} ${badge.color} text-xs sm:text-sm drop-shadow-sm`} title={badge.label}></i>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                        {/* Time Ago */}
                        <span className="text-[9px] sm:text-[10px] lg:text-xs text-slate-400">
                          {timeAgo(d.timestamp)}
                        </span>
                        
                        {/* Premium Label */}
                        {badge.label !== "Supporter" && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className={`text-[8px] sm:text-[9px] lg:text-[10px] ${badge.color}`}>
                              {badge.label}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Amount Badge */}
                  <span className="text-sm sm:text-base font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border shrink-0 bg-zinc-100 text-zinc-800 border-zinc-200">
                    ₹{safeAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* 🌟 FLOATING QUOTE BOX (Message) 🌟 */}
                {d.message && activeTab === "recent" && (
                  <div className="relative mt-1 sm:mt-2 bg-zinc-50 border border-zinc-200 rounded-xl p-3 sm:p-4 ml-12 sm:ml-14 text-xs sm:text-sm text-zinc-600">
                    <i className="fa-solid fa-quote-left text-zinc-200 absolute -left-2 -top-2 text-3xl sm:text-4xl bg-white rounded-full"></i>
                    <p className="relative z-10 font-medium">"{d.message}"</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}