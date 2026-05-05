import React from 'react';

const ResearchSearch = ({ searchQuery, setSearchQuery, sortMode, setSortMode, viewMode, setViewMode, resultCount }) => {
  return (
    <div className="sticky top-14 z-30 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-xl sm:static sm:mx-0 sm:rounded-3xl sm:border sm:p-4 sm:shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, fields, authors, sources..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-10 text-[15px] text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-rose-500"
              aria-label="Clear research search"
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2 sm:flex sm:items-center">
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            aria-label="Sort research"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A-Z</option>
            <option value="sources">Most sourced</option>
            <option value="readTime">Quick reads</option>
          </select>

          <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`h-10 w-10 rounded-xl transition-all ${viewMode === 'cards' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              aria-label="Card view"
            >
              <i className="fa-solid fa-grip"></i>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compact')}
              className={`h-10 w-10 rounded-xl transition-all ${viewMode === 'compact' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              aria-label="Compact view"
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
        <span>{resultCount} matching insight{resultCount === 1 ? '' : 's'}</span>
        <span className="hidden sm:inline">Swipe filters on mobile</span>
      </div>
    </div>
  );
};

export default ResearchSearch;
