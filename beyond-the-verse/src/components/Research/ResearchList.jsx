import React from 'react';
import ResearchCard from './ResearchCard';
import ResearchEmptyState from './ResearchEmptyState';

const ResearchList = ({ researches, viewMode, selectedField, searchQuery }) => {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4 px-4 sm:px-0">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-teal-600">Research Library</p>
          <h2 className="mt-1 font-cabinet text-2xl font-black text-slate-900 sm:text-3xl">
            Published Researches
          </h2>
        </div>
        <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 sm:block">
          {researches.length} result{researches.length === 1 ? '' : 's'}
        </div>
      </div>

      {researches.length === 0 ? (
        <ResearchEmptyState
          message="No matching research"
          subMessage={searchQuery || selectedField ? 'Try another keyword or field filter.' : 'Be the first to share evidence-backed knowledge with the community.'}
        />
      ) : (
        <div className={viewMode === 'compact' ? 'space-y-0 sm:space-y-3' : 'grid gap-4 lg:grid-cols-2'}>
          {researches.map((res) => (
            <ResearchCard key={res.id} res={res} viewMode={viewMode} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ResearchList;
