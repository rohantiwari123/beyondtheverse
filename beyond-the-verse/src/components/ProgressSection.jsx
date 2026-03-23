import React from "react";

export default function ProgressSection({
  totalRaised,
  targetAmount,
  donorCount,
}) {
  const safeRaised = totalRaised || 0;
  let percent = (safeRaised / targetAmount) * 100;
  if (isNaN(percent)) percent = 0;
  if (percent > 100) percent = 100;

  return (
    <div className="mb-8 relative">
      <p className="text-sm text-slate-500 mb-1 font-medium uppercase tracking-wide flex justify-between">
        Goal Progress
        <span className="text-xs text-teal-600 font-bold bg-teal-50 px-2 rounded-md py-0.5">
          <span>{donorCount}</span> Supporters
        </span>
      </p>
      <div className="flex justify-between items-end mb-2">
        <div className="text-3xl font-bold text-teal-600">
          ₹<span>{safeRaised.toLocaleString("en-IN")}</span>
        </div>
        <div className="text-sm text-slate-500 font-medium mb-1">
          raised of{" "}
          <span className="font-bold text-slate-700">
            ₹{targetAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
        <div
          className="bg-teal-500 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-xs text-slate-400 text-right">
        <span>{percent.toFixed(0)}</span>% funded
      </p>
    </div>
  );
}
