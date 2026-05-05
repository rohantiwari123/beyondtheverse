import React from 'react';

const ResearchEmptyState = ({ message = 'No research yet', subMessage = 'Be the first to share your knowledge with the community!' }) => {
  return (
    <div className="mx-4 border-y border-dashed border-slate-200 bg-white px-6 py-16 text-center sm:mx-0 sm:rounded-[2rem] sm:border">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-teal-50 text-teal-600 shadow-inner">
        <i className="fa-solid fa-microscope text-3xl"></i>
      </div>
      <h3 className="text-xl font-black text-slate-800">{message}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{subMessage}</p>
    </div>
  );
};

export default ResearchEmptyState;
