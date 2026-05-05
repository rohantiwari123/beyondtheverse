import React from 'react';
import ResearchCard from './ResearchCard';
import ResearchEmptyState from './ResearchEmptyState';

const ResearchList = ({ researches }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4 flex items-center gap-2">
        <i className="fa-solid fa-book-open text-teal-600"></i> Published Researches
      </h2>
      
      {researches.length === 0 ? (
        <ResearchEmptyState />
      ) : (
        <div className="space-y-6">
          {researches.map((res) => (
            <ResearchCard key={res.id} res={res} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResearchList;