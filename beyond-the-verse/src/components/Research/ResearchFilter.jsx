import React from 'react';

const ResearchFilter = ({ fields, selectedField, onSelectField }) => {
  if (!fields || fields.length === 0) return null;

  return (
    // EDGE-TO-EDGE MOBILE: -mx-4 cancels parent padding, overflow-x-auto allows scrolling
    <div className="-mx-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-2.5 sm:min-w-0 sm:flex-wrap">
        
        {/* "All Fields" Button */}
        <button
          onClick={() => onSelectField(null)}
          className={`flex items-center rounded-xl border px-5 py-2.5 text-xs font-bold transition-all active:scale-95 sm:text-sm ${
            selectedField === null
              ? 'border-slate-900 bg-slate-900 text-white shadow-md shadow-slate-900/10'
              : 'border-slate-200 bg-white text-slate-500 hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-700'
          }`}
        >
          All Insights
        </button>

        {/* Dynamic Field Buttons */}
        {fields.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => onSelectField(name)}
            className={`flex items-center gap-2.5 rounded-xl border px-5 py-2.5 text-xs font-bold transition-all active:scale-95 sm:text-sm ${
              selectedField === name
                ? 'border-teal-600 bg-teal-600 text-white shadow-md shadow-teal-600/10'
                : 'border-slate-200 bg-white text-slate-500 hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-700'
            }`}
          >
            <span className="whitespace-nowrap">{name}</span>
            <span 
              className={`flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1.5 text-[10px] font-black transition-colors ${
                selectedField === name 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-400 group-hover:bg-teal-100 group-hover:text-teal-600'
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