import React from 'react';
import { Link } from 'react-router-dom';
import { formatResearchDate, getResearchExcerpt, getResearchReadTime, getResearchSources, getResearchTags } from './researchUtils';

const ResearchCard = ({ res, viewMode = 'cards' }) => {
  const sources = getResearchSources(res);
  const tags = getResearchTags(res);
  const readTime = getResearchReadTime(res);

  // 1. COMPACT VIEW: Clean Row List (Like a Magazine Index)
  if (viewMode === 'compact') {
    return (
      <Link
        to={`/research/${res.id}`}
        className="group block border-b border-slate-100 py-5 transition-colors hover:bg-slate-50/50 sm:px-4 sm:rounded-xl sm:border-b-0 sm:border sm:border-transparent sm:hover:border-slate-200 sm:mb-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex-1 min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-teal-600 font-semibold">{res.field || 'General'}</span>
              <span>•</span>
              <span>{formatResearchDate(res)}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-teal-600 truncate">
              {res.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 truncate">
              {getResearchExcerpt(res, 120)}
            </p>
          </div>
          
          <div className="hidden shrink-0 items-center text-sm font-medium text-slate-400 sm:flex">
            {readTime} min read
            <i className="fa-solid fa-arrow-right ml-4 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-teal-500"></i>
          </div>
        </div>
      </Link>
    );
  }

  // 2. CARD VIEW: Editorial Grid Item
  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white p-6 border border-slate-200/80 transition-all hover:border-teal-300 hover:shadow-md hover:shadow-teal-900/5">
      {/* Top Meta Data */}
      <div className="mb-4 flex items-center gap-3 text-xs sm:text-sm font-medium">
        <span className="rounded-md bg-teal-50 px-2.5 py-1 text-teal-700">
          {res.field || 'General'}
        </span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-500 flex items-center gap-1.5">
          <i className="fa-regular fa-clock"></i> {readTime} min
        </span>
      </div>

      {/* Title */}
      <Link to={`/research/${res.id}`} className="block mb-3">
        <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-teal-600 break-words sm:text-2xl">
          {res.title}
        </h3>
      </Link>

      {/* Excerpt with text-justify & break-words */}
      <p className="flex-1 text-sm text-slate-600 text-justify break-words hyphens-auto line-clamp-3 leading-relaxed sm:text-base sm:leading-relaxed mb-6">
        {getResearchExcerpt(res)}
      </p>

      {/* Footer / Author Info */}
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="flex items-center gap-2.5 truncate pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400 text-xs">
            <i className="fa-solid fa-user"></i>
          </div>
          <span className="text-sm font-semibold text-slate-700 truncate">
            {res.authorName || 'Anonymous'}
          </span>
        </div>
        <div className="shrink-0 text-xs font-medium text-slate-400 sm:text-sm">
          {formatResearchDate(res)}
        </div>
      </div>
    </article>
  );
};

export default ResearchCard;