import React, { useState } from "react";

const ResearchFilter = ({
  fields,
  selectedField,
  onSelectField,
  minSources = 0,
  onMinSourcesChange,
  maxReadTime = null,
  onMaxReadTimeChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  if (!fields || fields.length === 0) return null;

  const hasActiveFilters = minSources > 0 || maxReadTime !== null;

  return (
    <div className="space-y-2">
      {/* Field Filter - Scrollable on mobile */}
      <div className="-mx-4 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-1.5 sm:min-w-0 sm:flex-wrap sm:gap-2">
          {/* "All" Button */}
          <button
            onClick={() => onSelectField(null)}
            className={`whitespace-nowrap rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${
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
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${
                selectedField === name
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{name}</span>
              <span
                className={`rounded-full px-1.5 py-0 text-[9px] sm:text-[10px] font-bold ${
                  selectedField === name
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          ))}

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`ml-1 flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${
              showAdvanced || hasActiveFilters
                ? "border-teal-200 bg-teal-50 text-teal-700"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
            title="Advanced filters"
          >
            <i className="fa-solid fa-sliders text-[10px]"></i>
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && <span className="h-1.5 w-1.5 rounded-full bg-teal-600"></span>}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50/50 p-3 sm:p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Min Sources Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                Min. Sources: <span className="text-teal-600">{minSources}</span>
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={minSources}
                onChange={(e) => onMinSourcesChange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                aria-label="Minimum sources filter"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0</span>
                <span>20+</span>
              </div>
            </div>

            {/* Max Read Time Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                Max Read Time: <span className="text-teal-600">{maxReadTime ? `${maxReadTime} min` : 'Any'}</span>
              </label>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={maxReadTime || 120}
                onChange={(e) => onMaxReadTimeChange(parseInt(e.target.value) === 120 ? null : parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                aria-label="Maximum read time filter"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5 min</span>
                <span>Any</span>
              </div>
            </div>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                onMinSourcesChange(0);
                onMaxReadTimeChange(null);
              }}
              className="text-xs font-bold text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1.5"
            >
              <i className="fa-solid fa-rotate-right text-[10px]"></i>
              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResearchFilter;
