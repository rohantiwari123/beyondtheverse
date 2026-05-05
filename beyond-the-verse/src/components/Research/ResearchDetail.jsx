import React from 'react';
import ResearchBadge from './ResearchBadge';
import { formatResearchDate, getResearchReadTime, getResearchSources, getResearchTags, getResearchWordCount } from './researchUtils';

const ResearchDetail = ({ research }) => {
  if (!research) return null;

  const sources = getResearchSources(research);
  const tags = getResearchTags(research);
  const readTime = getResearchReadTime(research);
  const wordCount = getResearchWordCount(research);

  const metaItems = [
    { label: 'Read time', value: `${readTime} min`, icon: 'fa-clock' },
    { label: 'Words', value: wordCount.toLocaleString('en-IN'), icon: 'fa-align-left' },
    { label: 'Sources', value: sources.length, icon: 'fa-link' },
    { label: 'Published', value: formatResearchDate(research), icon: 'fa-calendar-day' },
  ];

  return (
    <article className="overflow-hidden border-y border-slate-200 bg-white sm:rounded-[2rem] sm:border sm:shadow-sm">
      <div className="relative overflow-hidden bg-slate-950 px-4 py-8 text-white sm:px-8 sm:py-10 lg:px-10">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl"></div>
        <div className="relative z-10">
          <ResearchBadge field={research.field} />
          <h1 className="mt-5 font-cabinet text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            {research.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-300">
            <span><i className="fa-solid fa-user-astronaut mr-2 text-teal-300"></i>{research.authorName || 'Anonymous Researcher'}</span>
            <span className="hidden text-slate-600 sm:inline">•</span>
            <span>{formatResearchDate(research)}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[1fr_260px] lg:px-10 lg:py-10">
        <div className="min-w-0">
          {research.abstract && (
            <section className="mb-8 rounded-3xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6">
              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.24em] text-teal-700">Abstract</p>
              <p className="text-base leading-8 text-slate-700 sm:text-lg">{research.abstract}</p>
            </section>
          )}

          <section>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">Full Research</p>
            <div className="whitespace-pre-wrap text-[17px] leading-9 text-slate-700 sm:text-lg sm:leading-10">
              {research.body}
            </div>
          </section>

          {tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">Insight Metrics</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {metaItems.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-3 shadow-sm">
                  <div className="mb-1 text-xs font-bold text-slate-400"><i className={`fa-solid ${item.icon} mr-2 text-teal-500`}></i>{item.label}</div>
                  <div className="font-cabinet text-xl font-black text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {sources.length > 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">Sources</p>
              <div className="space-y-2">
                {sources.map((src, i) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm font-semibold text-slate-600 transition-all hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-slate-400 group-hover:text-teal-600">{i + 1}</span>
                    <span className="min-w-0 break-all">{src}</span>
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
