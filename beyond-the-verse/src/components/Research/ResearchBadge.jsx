import React from 'react';

const ResearchBadge = ({ field, onClick, active = false }) => {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
        active
          ? 'border-teal-500 bg-teal-600 text-white shadow-sm shadow-teal-600/20'
          : 'border-teal-100 bg-teal-50 text-teal-700'
      } ${onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-100' : ''}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-white' : 'bg-teal-500'}`}></span>
      {field || 'General'}
    </span>
  );
};

export default ResearchBadge;
