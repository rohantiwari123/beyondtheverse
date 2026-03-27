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

// 🌟 NAYA: Premium Badge System 🌟
const getBadgeInfo = (amount) => {
  if (amount >= 10000)
    return {
      icon: "fa-crown",
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-200",
      label: "Visionary"
    };
  if (amount >= 5000)
    return {
      icon: "fa-medal",
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      label: "Gold Sponsor"
    };
  if (amount >= 1000)
    return {
      icon: "fa-award",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      label: "Silver Sponsor"
    };
  return { 
      icon: "fa-heart", 
      color: "text-rose-400", 
      bg: "bg-white", 
      border: "border-slate-100",
      label: "Supporter"
  };
};

// 🌟 NAYA: Dynamic Avatar Colors based on Name 🌟
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
      return donations.slice(0, 5);
    } else {
      return [...donations]
        .sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0))
        .slice(0, 5);
    }
  };

  const listToRender = getList();
  
  // Top 5 Rank colors
  const rankColors = [
    "text-amber-500 drop-shadow-md", // 1st
    "text-slate-400 drop-shadow",    // 2nd
    "text-amber-700 drop-shadow",    // 3rd
    "text-slate-300",                // 4th
    "text-slate-300",                // 5th
  ];

  return (
    <div className="animate-fade-in-up">
      
      {/* 🌟 NAYA: Modern Segmented Tabs 🌟 */}
      <div className="flex p-1 mb-6 bg-slate-100/80 rounded-xl border border-slate-200/60 max-w-[240px]">
        <button
          onClick={() => setActiveTab("recent")}
          className={`flex-1 text-xs sm:text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 ${
            activeTab === "recent"
              ? "bg-white text-teal-600 shadow-sm border border-slate-200/50"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <i className="fa-regular fa-clock"></i> Recent
        </button>
        <button
          onClick={() => setActiveTab("top")}
          className={`flex-1 text-xs sm:text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 ${
            activeTab === "top"
              ? "bg-white text-amber-500 shadow-sm border border-slate-200/50"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <i className="fa-solid fa-trophy"></i> Top 5
        </button>
      </div>

      {/* List Area */}
      <div className="space-y-3.5">
        {listToRender.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 border border-slate-100 rounded-2xl border-dashed">
             <i className="fa-solid fa-seedling text-3xl text-teal-200 mb-2"></i>
             <p className="text-sm text-slate-500 font-medium">No supporters yet.</p>
             <p className="text-xs text-slate-400 mt-1">Be the first to plant a seed!</p>
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
                className={`p-4 rounded-2xl border flex flex-col gap-3 transition-all hover:shadow-md ${badge.bg} ${badge.border} group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    
                    {/* Rank Number (Only in Top tab) */}
                    {activeTab === "top" && (
                      <div className={`font-black text-lg w-4 text-center ${rankColors[index]}`}>
                        #{index + 1}
                      </div>
                    )}

                    {/* Dynamic Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm border border-white/50 ${avatarStyle}`}>
                      {firstChar}
                    </div>
                    
                    <div>
                      <div className="font-extrabold text-slate-700 text-sm flex items-center gap-1.5">
                        {firstName}
                        {/* Tooltip Badge Icon */}
                        <i className={`fa-solid ${badge.icon} ${badge.color} text-xs`} title={badge.label}></i>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-0.5">
                        {/* Time Ago */}
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                          {timeAgo(d.timestamp)}
                        </span>
                        {/* Premium Label */}
                        {badge.label !== "Supporter" && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                            <span className={`text-[9px] font-bold uppercase tracking-wider ${badge.color}`}>
                              {badge.label}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Amount Badge */}
                  <span className={`font-black text-sm px-2.5 py-1 rounded-lg border shadow-sm ${badge.label !== "Supporter" ? 'bg-white text-slate-800 border-slate-100' : 'bg-teal-50 text-teal-700 border-teal-100'}`}>
                    ₹{safeAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Message / Quote Box */}
                {d.message && activeTab === "recent" && (
                  <div className="relative bg-white/60 backdrop-blur-sm border border-white rounded-xl p-3 ml-12 text-xs text-slate-600 font-medium leading-relaxed shadow-sm">
                    <i className="fa-solid fa-quote-left text-slate-300 absolute -left-2 -top-2 text-lg bg-white rounded-full"></i>
                    {d.message}
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
