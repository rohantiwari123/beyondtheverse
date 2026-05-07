import React from 'react';
import { formatResearchDate, getResearchReadTime, getResearchSources, getResearchTags, getResearchWordCount } from './researchUtils';

const ResearchDetail = ({ research }) => {
  if (!research) return null;

  const sources = getResearchSources(research);
  const tags = getResearchTags(research);
  const readTime = getResearchReadTime(research);

  const metaItems = [
    { label: 'Read time', value: `${readTime} min` },
    { label: 'Words', value: getResearchWordCount(research).toLocaleString('en-IN') },
    { label: 'Sources', value: sources.length },
    { label: 'Published', value: formatResearchDate(research) },
  ];

  return (
    <article className="overflow-hidden bg-white sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-sm">
      
      {/* Editorial Header - Edge-to-Edge on Mobile */}
      <header className="bg-slate-900 px-5 py-10 text-white sm:px-10 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <span className="inline-block rounded bg-teal-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-300 mb-5 sm:text-xs">
            {research.field || 'General'}
          </span>
          
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {research.title}
          </h1>
          
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-teal-400">
                <i className="fa-solid fa-user text-[10px]"></i>
              </div>
              <span className="font-semibold text-slate-200">{research.authorName || 'Anonymous'}</span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <time className="italic">{formatResearchDate(research)}</time>
          </div>
        </div>
      </header>

      {/* Main Grid: Responsive 1 col on mobile, 2 cols on desktop */}
      <div className="grid gap-10 px-5 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1fr_280px]">
        
        {/* Main Content Area */}
        <div className="min-w-0">
          
          {/* Abstract - Distinct Magazine Block */}
          {research.abstract && (
            <section className="mb-10 rounded-xl border-l-4 border-teal-500 bg-slate-50 p-6 sm:p-8">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Executive Summary</h2>
              <p className="text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
                {research.abstract}
              </p>
            </section>
          )}

          {/* Body Content - Justified & Highly Readable */}
          <section className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-[17px] leading-8 text-slate-800 text-justify break-words hyphens-auto sm:text-lg sm:leading-9">
              {research.body}
            </div>
          </section>

          {/* Tags Section */}
          {tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-100 pt-8">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-colors cursor-default">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Clean Sidebar - Stacks below on mobile, sticky on desktop */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          
          {/* Metadata Card */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Insight Details</h3>
            <div className="space-y-3">
              {metaItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sources Section */}
          {sources.length > 0 && (
            <div>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Sources & References</h3>
              <div className="grid gap-2">
                {sources.map((src, i) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3 text-sm transition-all hover:border-teal-200 hover:bg-teal-50 group"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 group-hover:bg-teal-500 group-hover:text-white">
                      {i + 1}
                    </span>
                    <span className="min-w-0 break-all font-medium text-slate-600 group-hover:text-teal-700">
                      {src.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
};

export default ResearchDetail;