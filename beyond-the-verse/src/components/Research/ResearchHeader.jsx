import React from 'react';

const ResearchHeader = ({ stats }) => {
  const statCards = [
    { label: 'Papers', value: stats?.totalResearches || 0, icon: 'fa-scroll' },
    { label: 'Fields', value: stats?.totalFields || 0, icon: 'fa-layer-group' },
    { label: 'Sources', value: stats?.totalSources || 0, icon: 'fa-link' },
  ];

  return (
    <section className="relative -mx-4 overflow-hidden border-b border-teal-900/10 bg-slate-950 px-4 pb-8 pt-9 text-white shadow-sm sm:mx-0 sm:rounded-[2rem] sm:border sm:px-8 sm:pb-10 sm:pt-10 lg:px-10">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl"></div>
      <div className="absolute -bottom-28 left-4 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"></div>

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-teal-100 backdrop-blur">
            <i className="fa-solid fa-microscope text-teal-300"></i>
            Research Intelligence Hub
          </div>
          <h1 className="font-cabinet text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Community <span className="text-teal-300">Research</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
            Explore evidence-backed ideas with smarter discovery, field analytics, source visibility, and a reading experience tuned for every screen.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 text-center backdrop-blur sm:p-4">
              <i className={`fa-solid ${stat.icon} mb-2 text-teal-300`}></i>
              <div className="font-cabinet text-2xl font-black sm:text-3xl">{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchHeader;
