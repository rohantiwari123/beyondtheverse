import React from 'react';
import ResearchBadge from './ResearchBadge';

const ResearchDetail = ({ research }) => {
  if (!research) return null;

  return (
    <div className="card-base">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <ResearchBadge field={research.field} />
        
        {research.authorName && (
          <div className="text-sm text-slate-500 flex items-center gap-2 font-medium bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
            <i className="fa-solid fa-user-astronaut text-slate-400"></i>
            {research.authorName}
          </div>
        )}
      </div>
      
      <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-8 leading-tight">
        {research.title}
      </h1>
      
      <div className="prose prose-slate prose-teal max-w-none mb-10 text-slate-700 leading-loose whitespace-pre-wrap text-[17px]">
        {research.body}
      </div>
      
      {research.sources && research.sources.length > 0 && research.sources[0] !== '' && (
        <div className="mt-8 pt-8 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i className="fa-solid fa-bookmark text-slate-400 text-lg"></i> Sources & References
          </h4>
          <ul className="space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-100">
            {research.sources.map((src, i) => (
              <li key={i} className="flex items-start">
                <a 
                  href={src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-teal-600 hover:text-teal-800 hover:underline flex items-center gap-2 break-all text-[15px] font-medium"
                >
                  <i className="fa-solid fa-link text-slate-400 text-xs shrink-0 mt-0.5"></i>
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResearchDetail;