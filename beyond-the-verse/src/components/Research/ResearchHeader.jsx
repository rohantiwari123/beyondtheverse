import React from 'react';

const ResearchHeader = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-6 transition-all sm:bg-transparent sm:pt-12 lg:pt-20">
      
      {/* Background Decorative Pattern (Subtle) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-[5vw] sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          
          {/* TEXT AREA: Fluid Typography */}
          <div className="w-full text-left lg:w-3/5">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-10 bg-teal-500"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-teal-600 sm:text-xs">
                Observation Library
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              Exploring the <br />
              <span className="text-teal-600">Living Universe.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg lg:text-xl">
              A repository of evidence-backed inquiries, dismantling conditioned thought through rational observation and scientific rigor.
            </p>
            
            <div className="mt-10 hidden h-px w-full bg-slate-100 sm:block"></div>
          </div>

          {/* IMAGE AREA: Edge-to-Edge on Mobile */}
          <div className="relative w-full lg:w-2/5">
            <div className="relative -mx-[5vw] overflow-hidden sm:mx-0 sm:rounded-[2.5rem]">
              {/* Image Aspect Ratio for Mobile vs Desktop */}
              <div className="aspect-[4/3] w-full sm:aspect-[3/4] lg:aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=2000&auto=format&fit=crop" 
                  alt="Scientific Research"
                  className="h-full w-full object-cover brightness-95 grayscale-[0.2] transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Floating Aesthetic Tag */}
              <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md sm:bottom-10 sm:left-10">
                Systematic Inquiry
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResearchHeader;