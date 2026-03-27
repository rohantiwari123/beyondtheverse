import React, { useState } from "react";

const timeAgo = (timestamp) => {
  if (!timestamp) return "Just now";
  const seconds = Math.floor((new Date() - timestamp) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return "Just now";
};

const getBadgeInfo = (amount) => {
  if (amount >= 10000)
    return {
      html: (
        <i
          className="fa-solid fa-crown text-amber-500"
          title="Platinum Crown"
        ></i>
      ),
      class: "bg-amber-50 border-amber-200",
    };
  if (amount >= 5000)
    return {
      html: (
        <i
          className="fa-solid fa-medal text-yellow-500"
          title="Gold Supporter"
        ></i>
      ),
      class: "bg-yellow-50 border-yellow-200",
    };
  if (amount >= 1000)
    return {
      html: (
        <i
          className="fa-solid fa-medal text-slate-400"
          title="Silver Supporter"
        ></i>
      ),
      class: "bg-slate-50 border-slate-200",
    };
  return { html: null, class: "bg-white border-slate-100" };
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
  const rankColors = [
    "text-amber-500 text-xl",
    "text-slate-400 text-lg",
    "text-amber-600 text-base",
    "text-slate-300 text-sm",
    "text-slate-300 text-sm",
  ];

  return (
    <div className="mt-8 border-t border-slate-100 pt-6">
      <div className="flex gap-4 mb-4 border-b border-slate-100 pb-2">
        <button
          onClick={() => setActiveTab("recent")}
          className={`text-sm font-bold pb-1 flex items-center gap-1 uppercase tracking-wide transition ${
            activeTab === "recent"
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <i className="fa-regular fa-clock"></i> Recent
        </button>
        <button
          onClick={() => setActiveTab("top")}
          className={`text-sm font-bold pb-1 flex items-center gap-1 uppercase tracking-wide transition ${
            activeTab === "top"
              ? "text-amber-500 border-b-2 border-amber-500"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <i className="fa-solid fa-trophy text-amber-500"></i> Top
        </button>
      </div>

      <div className="space-y-3">
        {listToRender.length === 0 ? (
          <div className="text-sm text-slate-400 italic">
            No donations yet. Be the first!
          </div>
        ) : (
          listToRender.map((d, index) => {
            const safeName = String(d.name || "Well Wisher");
            const firstName = safeName.split(" ")[0] || "A";
            const safeAmount = Number(d.amount) || 0;
            const badge = getBadgeInfo(safeAmount);

            if (activeTab === "recent") {
              return (
                <div
                  key={d.id}
                  className={`p-3 rounded-xl border shadow-sm flex flex-col gap-2 transition ${badge.class}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm uppercase shadow-sm">
                        {firstName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-700 text-sm flex items-center gap-1">
                          {firstName} {badge.html}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {timeAgo(d.timestamp)}
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-teal-600 text-sm bg-white px-2 py-1 rounded-md border border-teal-100 shadow-sm">
                      ₹{safeAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {d.message && (
                    <div className="relative bg-slate-100 rounded p-2 mt-1 text-xs text-slate-600 italic">
                      <i className="fa-solid fa-quote-left text-slate-300 mr-1"></i>{" "}
                      {d.message}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={d.id}
                  className={`p-3 rounded-xl border shadow-sm flex items-center justify-between transition ${badge.class}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`font-black ${rankColors[index]} w-5 text-center`}
                    >
                      #{index + 1}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm uppercase shadow-sm">
                      {firstName.charAt(0)}
                    </div>
                    <div className="font-bold text-slate-700 text-sm flex items-center gap-1">
                      {firstName} {badge.html}
                    </div>
                  </div>
                  <span className="font-bold text-teal-600 text-sm bg-white px-2 py-1 rounded-md border border-teal-100 shadow-sm">
                    ₹{safeAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
}
