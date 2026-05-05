import React from 'react';
import { Link } from 'react-router-dom';
import ResearchBadge from './ResearchBadge';

const ResearchCard = ({ res }) => {
  return (
    <div className="card-base flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <ResearchBadge field={res.field} />
        
        {res.authorName && (
          <div className="text-sm text-slate-500 flex items-center gap-2 font-medium bg-slate-50 px-3 py-1.5 rounded-lg">
            <i className="fa-solid fa-user-astronaut text-slate-400"></i>
            {res.authorName}
          </div>
        )}
      </div>
      
      <Link to={`/research/${res.id}`} className="hover:text-teal-600 transition-colors">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{res.title}</h3>
      </Link>
      
      <div className="prose prose-slate max-w-none mb-6 text-slate-600 leading-relaxed whitespace-pre-wrap line-clamp-3">
        {res.body}
      </div>
      
      <Link to={`/research/${res.id}`} className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-2 w-fit">
        Read Full Research <i className="fa-solid fa-arrow-right text-xs"></i>
      </Link>
    </div>
  );
};

export default ResearchCard;