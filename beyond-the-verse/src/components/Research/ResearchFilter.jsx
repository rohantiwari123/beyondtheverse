import React from 'react';

const ResearchFilter = ({ fields, selectedField, onSelectField }) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelectField(null)}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          selectedField === null
            ? 'bg-teal-600 text-white shadow-sm'
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
        }`}
      >
        All Fields
      </button>
      {fields.map((field) => (
        <button
          key={field}
          onClick={() => onSelectField(field)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedField === field
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {field}
        </button>
      ))}
    </div>
  );
};

export default ResearchFilter;