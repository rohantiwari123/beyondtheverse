import React from 'react';
import { Link } from 'react-router-dom';
import ResearchBadge from './ResearchBadge';
import { formatResearchDate, getResearchExcerpt, getResearchReadTime, getResearchSources, getResearchTags } from './researchUtils';

const ResearchCard = ({ res, viewMode = 'cards' }) => {
  const sources = getResearchSources(res);
  const tags = getResearchTags(res);
  const readTime = getResearchReadTime(res);

  if (viewMode === 'compact') {
    return (
      <Link
        to={`/research/${res.id}`}
        className="group block border-y border-slate-200 bg-white px-4 py-4 transition-all hover:bg-teal-50/40 sm:rounded-2xl sm:border sm:px-5 sm:shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
            <i className="fa-solid fa-file-lines"></i>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <span>{res.field || 'General'}</span>
              <span>•</span>
              <span>{readTime} min read</span>
              <span>•</span>
              <span>{sources.length} source{sources.length === 1 ? '' : 's'}</span>
            </div>
            <h3 className="line-clamp-2 text-base font-black leading-snug text-slate-900 transition-colors group-hover:text-teal-700 sm:text-lg">
              {res.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{getResearchExcerpt(res, 150)}</p>
          </div>
          <i className="fa-solid fa-chevron-right mt-4 text-xs text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-teal-500"></i>
        </div>
      </Link>
    );
  }

  return (
    <article className="group flex h-full flex-col border-y border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/5 sm:rounded-[2rem] sm:border sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ResearchBadge field={res.field} />
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
          <span className="rounded-full bg-slate-50 px-3 py-1.5"><i className="fa-regular fa-clock mr-1.5"></i>{readTime} min</span>
          <span className="rounded-full bg-slate-50 px-3 py-1.5"><i className="fa-solid fa-link mr-1.5"></i>{sources.length}</span>
        </div>
      </div>

      <Link to={`/research/${res.id}`} className="block">
        <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-teal-700 sm:text-3xl">
          {res.title}
        </h3>
      </Link>

      <p className="mt-4 flex-1 text-[15px] leading-7 text-slate-600 sm:text-base">
        {getResearchExcerpt(res)}
      </p>

      {tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">#{tag}</span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="min-w-0 text-sm">
          <div className="truncate font-bold text-slate-700">
            <i className="fa-solid fa-user-astronaut mr-2 text-slate-300"></i>{res.authorName || 'Anonymous Researcher'}
          </div>
          <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">{formatResearchDate(res)}</div>
        </div>
        <Link to={`/research/${res.id}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-all group-hover:bg-teal-600 group-hover:shadow-lg group-hover:shadow-teal-600/20">
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </Link>
      </div>
    </article>
  );
};

export default ResearchCard;
