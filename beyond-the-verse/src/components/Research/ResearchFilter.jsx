import React from "react";

const ResearchFilter = ({ fields, selectedField, onSelectField }) => {
  if (!fields || fields.length === 0) return null;

  return (
    // EDGE-TO-EDGE MOBILE: Scrollable horizontally, standard padding
    <div className="-mx-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
        {/* "All" Button */}
        <button
          onClick={() => onSelectField(null)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            selectedField === null
              ? "bg-slate-900 text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          All
        </button>

        {/* Dynamic Field Buttons */}
        {fields.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => onSelectField(name)}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              selectedField === name
                ? "border-teal-600 bg-teal-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span className="whitespace-nowrap">{name}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                selectedField === name
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResearchFilter;
