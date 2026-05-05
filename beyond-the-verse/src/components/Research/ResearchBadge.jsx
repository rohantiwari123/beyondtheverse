import React from 'react';

const ResearchBadge = ({ field, onClick }) => {
  return (
    <span 
      onClick={onClick}
      className={`inline-block bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-teal-100 self-start ${onClick ? 'cursor-pointer hover:bg-teal-100 transition-colors' : ''}`}
    >
      {field}
    </span>
  );
};

export default ResearchBadge;