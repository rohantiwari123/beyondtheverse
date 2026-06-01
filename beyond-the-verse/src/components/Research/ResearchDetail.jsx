import React from "react";
import "react-quill-new/dist/quill.snow.css"; 
import {
  formatResearchDate,
  getResearchSources,
  getResearchTags,
} from "./researchUtils";

const ResearchDetail = ({ research }) => {
  if (!research) return null;

  const sources = getResearchSources(research);
  const tags = getResearchTags(research);

  return (
    <div className="bg-slate-100 min-h-screen py-4 sm:py-12 px-2 sm:px-4 select-none" onContextMenu={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}>

      {/* 🌟 ENFORCED JUSTIFICATION STYLES */}
      <style>{`
        .manuscript-body p {
          text-align: justify !important;
          text-justify: inter-word !important;
          hyphens: auto !important;
          margin-bottom: 1.5rem !important;
          line-height: 1.8 !important;
        }
        .manuscript-body {
          text-align: justify !important;
        }
        /* Ensure images and other blocks don't break justification */
        .manuscript-body img {
          margin: 2rem auto !important;
          display: block;
        }
      `}</style>

      {/* 🌟 RESPONSIVE A4 MANUSCRIPT CONTAINER */}
      <div 
        className="mx-auto bg-white shadow-[0_0_50px_rgba(0,0,0,0.08)] relative transition-all duration-500 w-full max-w-[210mm] min-h-[297mm] flex flex-col border border-slate-200/50"
        style={{ 
          fontFamily: '"Times New Roman", Times, serif',
          color: '#1a1a1a',
        }}
      >
        {/* Formal Header Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-teal-600/40 via-teal-600 to-teal-600/40 opacity-80"></div>

        {/* Inner Padding - Scales with width */}
        <div className="p-[7%] sm:p-[20mm] md:p-[25mm] flex-1 flex flex-col">
          
          {/* Page Number / Header Info */}
          <div className="flex justify-between items-center mb-12 text-[10pt] text-slate-400 font-serif italic tracking-wide border-b border-slate-50 pb-2">
            <span>Manuscript ID: {research.id?.slice(0, 8).toUpperCase()}</span>
            <span>Page 01</span>
          </div>

          {/* Title Section */}
          <header className="text-center mb-16 space-y-4">
            <h1 className="text-[16pt] sm:text-[22pt] font-bold uppercase tracking-tight leading-[1.2] text-slate-900">
              {research.title}
            </h1>
            <div className="text-[11pt] sm:text-[13pt] text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 tracking-wide">{research.authorName || "Anonymous Researcher"}</p>
              <p className="italic text-teal-700/80">{research.authorAffiliation || "Beyond the Verse Institute"}</p>
              <p className="mt-2 text-[10pt] uppercase tracking-[0.2em] opacity-50">{formatResearchDate(research)}</p>
            </div>
            <div className="flex justify-center pt-6">
               <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </div>
          </header>

          {/* Abstract */}
          {research.abstract && (
            <section className="mb-12">
              <h2 className="text-center font-bold mb-6 uppercase text-[10pt] tracking-[0.3em] text-slate-900 border-y border-slate-50 py-2">Abstract</h2>
              <p className="text-justify indent-10 leading-[1.8] text-[11pt] sm:text-[12pt] text-slate-800 verse-thought-serif">
                {research.abstract}
              </p>
              {tags.length > 0 && (
                <p className="mt-8 italic text-[10pt] text-slate-500 flex flex-wrap gap-2">
                  <span className="font-bold not-italic uppercase tracking-widest text-[9pt] text-slate-400">Keywords:</span> 
                  {tags.join(" • ")}
                </p>
              )}
            </section>
          )}

          {/* Main Body */}
          {research.body && (
            <article 
              className="text-justify prose-p:indent-10 prose-p:mb-6 ql-editor px-0 py-0 flex-1 manuscript-body"
              style={{ 
                fontFamily: '"Times New Roman", Times, serif', 
                fontSize: '12pt', 
                lineHeight: '1.7',
                color: '#222'
              }}
              dangerouslySetInnerHTML={{ __html: research.body }}
            />
          )}

          {/* References */}
          {sources.length > 0 && (
            <section className="mt-20 pt-10 border-t-2 border-double border-slate-100">
              <h2 className="text-left font-bold mb-8 uppercase text-[10pt] tracking-[0.2em] text-slate-400">Selected References</h2>
              <div className="space-y-4 text-justify text-[10pt] sm:text-[11pt] text-slate-500" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
                {sources.map((src, idx) => (
                  <p key={idx} className="break-all leading-relaxed">
                    <span className="font-bold text-slate-900 mr-2">[{idx + 1}]</span> 
                    <a href={src} target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:text-teal-600 transition-colors border-b border-teal-800/10 hover:border-teal-600">
                      {src}
                    </a>
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Formal Footer */}
          <footer className="mt-20 pt-8 border-t border-slate-50 flex justify-between items-end text-[8pt] text-slate-300 uppercase tracking-[0.25em]">
            <div className="flex flex-col gap-1">
              <span>Verified Digital Archive</span>
              <span>© {new Date().getFullYear()} Beyond the Verse</span>
            </div>
            <div className="text-right">
              Secured Document
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ResearchDetail;