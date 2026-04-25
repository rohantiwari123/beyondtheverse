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

export default function SupportersList({ donations }) {
  const [activeTab, setActiveTab] = useState("recent");

  const getList = () => {
    if (activeTab === "recent") {
      return donations.slice(0, 50); // Show recent 50
    } else {
      return [...donations]
        .sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0))
        .slice(0, 10); // Show top 10
    }
  };

  const listToRender = getList();

  return (
    <div className="animate-fade-in">
      
      {/* 🌟 APP-LIKE SEGMENTED TABS (Flat & Minimal) 🌟 */}
      <div className="flex p-1 mb-6 sm:mb-8 bg-slate-100/80 rounded-xl border border-slate-200 max-w-[240px] sm:max-w-[280px]">
        <button
          onClick={() => setActiveTab("recent")}
          className={`flex-1 text-xs sm:text-sm py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium ${
            activeTab === "recent"
              ? "bg-white text-slate-900 border border-slate-200"
              : "text-slate-500 hover:text-slate-800 border border-transparent"
          }`}
        >
          Recent
        </button>
        <button
          onClick={() => setActiveTab("top")}
          className={`flex-1 text-xs sm:text-sm py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium ${
            activeTab === "top"
              ? "bg-white text-slate-900 border border-slate-200"
              : "text-slate-500 hover:text-slate-800 border border-transparent"
          }`}
        >
          Top 10
        </button>
      </div>

      {/* 🌟 LIST AREA 🌟 */}
      <div className="space-y-4">
        {listToRender.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 border border-slate-200 rounded-2xl border-dashed">
             <i className="fa-solid fa-leaf text-3xl text-slate-300 mb-3"></i>
             <p className="text-sm text-slate-500 font-medium">No supporters yet.</p>
          </div>
        ) : (
          listToRender.map((d, index) => {
            const safeName = String(d.name || "Well Wisher");
            const firstName = safeName.split(" ")[0] || "A";
            const firstChar = firstName.charAt(0).toUpperCase();
            const safeAmount = Number(d.amount) || 0;

            return (
              <div
                key={d.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white transition-colors hover:bg-slate-50 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    
                    {/* Rank Number (Only in Top tab - Minimal Mono font) */}
                    {activeTab === "top" && (
                      <div className="text-slate-400 font-mono text-sm sm:text-base w-5 sm:w-6 text-right shrink-0">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </div>
                    )}

                    {/* Minimal Avatar */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg font-medium bg-slate-100 border border-slate-200 text-slate-600 shrink-0">
                      {firstChar}
                    </div>
                    
                    <div>
                      <div className="text-slate-900 font-medium text-sm sm:text-base">
                        {firstName}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                        {timeAgo(d.timestamp)}
                      </div>
                    </div>
                  </div>

                  {/* Minimal Amount Text */}
                  <span className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight shrink-0">
                    ₹{safeAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* 🌟 ELEGANT QUOTE BOX (Message) 🌟 */}
                {d.message && activeTab === "recent" && (
                  <div className="mt-1 ml-[3.25rem] sm:ml-[3.75rem]">
                    <p className="text-sm text-slate-600 italic border-l-2 border-slate-300 pl-3 py-0.5 leading-relaxed font-serif">
                      "{d.message}"
                    </p>
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
