import React from "react";
import { Link } from "react-router-dom";
import {
  formatResearchDate,
  getResearchExcerpt,
  getResearchReadTime,
  getResearchSources,
  getResearchTags,
} from "./researchUtils";

const ResearchCard = ({ res, viewMode = "cards" }) => {
  const sources = getResearchSources(res);
  const tags = getResearchTags(res);
  const readTime = getResearchReadTime(res);

  // 1. COMPACT VIEW (List): Edge-to-Edge on mobile, rounded & bordered on desktop
  if (viewMode === "compact") {
    return (
      <Link
        to={`/research/${res.id}`}
        // Mobile: py-5, px-4 (edge-to-edge), bottom border only. 
        // Desktop (sm+): rounded corners, full border on hover.
        className="group block border-b border-slate-100 bg-white px-4 py-5 transition-all hover:bg-slate-50/50 sm:mb-2 sm:rounded-xl sm:border sm:border-transparent sm:px-5 sm:py-4 sm:hover:border-slate-200"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="font-semibold text-teal-600">
                {res.field || "General"}
              </span>
              <span>•</span>
              <span>{formatResearchDate(res)}</span>
            </div>
            <h3 className="truncate text-lg font-bold text-slate-900 transition-colors group-hover:text-teal-600 sm:text-xl">
              {res.title}
            </h3>
            <p className="mt-1 truncate text-sm text-slate-500 sm:mt-1.5">
              {getResearchExcerpt(res, 120)}
            </p>
          </div>

          {/* Desktop Read Button */}
          <div className="hidden shrink-0 items-center gap-4 sm:flex">
            <span className="text-sm font-medium text-slate-400">
              {readTime} min read
            </span>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition-all group-hover:border-teal-600 group-hover:bg-teal-600 group-hover:text-white">
              Read <i className="fa-solid fa-book-open text-xs"></i>
            </div>
          </div>

          {/* Mobile Read Indicator (Visible only on small screens) */}
          <div className="flex items-center justify-between sm:hidden">
             <span className="text-xs font-medium text-slate-400">
              <i className="fa-regular fa-clock mr-1"></i> {readTime} min read
            </span>
            <span className="text-xs font-bold text-teal-600 group-hover:text-teal-700">
              Read Article <i className="fa-solid fa-arrow-right ml-1"></i>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // 2. CARD VIEW: Flush/Edge-to-Edge on mobile, floating grid card on desktop
  return (
    <article 
      // Mobile: Bottom border only, no rounded corners, edge-to-edge padding
      // Desktop (sm+): Rounded corners, full borders, hover shadow
      className="group flex h-full flex-col border-b border-slate-100 bg-white p-5 transition-all hover:bg-slate-50/30 sm:rounded-2xl sm:border sm:border-slate-200/80 sm:p-6 sm:hover:border-teal-300 sm:hover:bg-white sm:hover:shadow-md sm:hover:shadow-teal-900/5"
    >
      {/* Top Meta Data */}
      <div className="mb-3 flex items-center gap-2.5 text-xs font-medium sm:mb-4 sm:text-sm">
        <span className="rounded-md bg-teal-50 px-2.5 py-1 text-teal-700">
          {res.field || "General"}
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5 text-slate-500">
          <i className="fa-regular fa-clock"></i> {readTime} min
        </span>
      </div>

      {/* Title */}
      <Link to={`/research/${res.id}`} className="mb-2 block sm:mb-3">
        <h3 className="break-words text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-teal-600 sm:text-2xl">
          {res.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="mb-5 line-clamp-3 flex-1 break-words text-sm leading-relaxed text-slate-600 hyphens-auto sm:mb-6 sm:text-justify sm:text-base sm:leading-relaxed">
        {getResearchExcerpt(res)}
      </p>

      {/* Footer / Author Info & CTA Button */}
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 sm:pt-5">
        <div className="flex flex-col pr-3">
          <span className="truncate text-sm font-bold text-slate-700">
            {res.authorName || "Anonymous"}
          </span>
          <span className="text-[11px] font-medium text-slate-400 sm:text-xs">
            {formatResearchDate(res)}
          </span>
        </div>

        {/* Card View Read Button */}
        <Link
          to={`/research/${res.id}`}
          className="flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-teal-600 hover:shadow-md hover:shadow-teal-600/20 sm:text-sm"
        >
          Read <i className="fa-solid fa-book-open text-xs"></i>
        </Link>
      </div>
    </article>
  );
};

export default ResearchCard;