import React from 'react';

const ResearchEmptyState = ({ message = "No research yet", subMessage = "Be the first to share your knowledge with the community!" }) => {
  return (
    <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl border-dashed">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
        <i className="fa-solid fa-microscope text-2xl"></i>
      </div>
      <h3 className="text-lg font-bold text-slate-700 mb-1">{message}</h3>
      <p className="text-slate-500">{subMessage}</p>
    </div>
  );
};

export default ResearchEmptyState;