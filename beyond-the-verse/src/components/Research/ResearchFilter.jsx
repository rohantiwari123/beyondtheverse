import React from 'react';

const ResearchFilter = ({ fields, selectedField, onSelectField }) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 pt-4 no-scrollbar sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
        <button
          onClick={() => onSelectField(null)}
          className={`rounded-full border px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] transition-all active:scale-95 ${
            selectedField === null
              ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:text-teal-700'
          }`}
        >
          All Fields
        </button>
        {fields.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => onSelectField(name)}
            className={`rounded-full border px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] transition-all active:scale-95 ${
              selectedField === name
                ? 'border-teal-600 bg-teal-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:text-teal-700'
            }`}
          >
            {name}
            <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${selectedField === name ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResearchFilter;
