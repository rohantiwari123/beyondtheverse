import React from 'react';

const ResearchSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
      </div>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search research titles, fields, or content..." 
        className="input-with-icon"
      />    </div>
  );
};

export default ResearchSearch;