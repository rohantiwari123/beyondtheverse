import React from 'react';

const ResearchSearch = ({ searchQuery, setSearchQuery, sortMode, setSortMode, viewMode, setViewMode, resultCount }) => {
  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
          <i className="fa-solid fa-magnifying-glass text-xs sm:text-sm text-slate-400"></i>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search titles, fields, authors..."
          className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 text-sm sm:text-base text-slate-800 outline-none transition-all placeholder:text-slate-350 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-slate-400 transition-colors hover:text-rose-500"
            aria-label="Clear search"
          >
            <i className="fa-solid fa-circle-xmark text-sm"></i>
          </button>
        )}
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            className="rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 px-2.5 sm:px-3.5 py-2 text-[11px] sm:text-sm font-bold text-slate-700 outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            aria-label="Sort research"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
            <option value="sources">Sources</option>
            <option value="readTime">Read Time</option>
          </select>

          {/* View Toggle */}
          <div className="flex rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 p-0.5 sm:p-1">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`h-8 w-8 sm:h-9 sm:w-9 rounded-md transition-all text-xs sm:text-sm ${
                viewMode === 'cards'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-label="Card view"
              title="Card View"
            >
              <i className="fa-solid fa-grip"></i>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compact')}
              className={`h-8 w-8 sm:h-9 sm:w-9 rounded-md transition-all text-xs sm:text-sm ${
                viewMode === 'compact'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-label="Compact view"
              title="List View"
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>

        {/* Result Count */}
        <div className="text-xs font-bold text-teal-600">
          {resultCount} result{resultCount === 1 ? '' : 's'}
        </div>
      </div>
    </div>
  );
};

export default ResearchSearch;
