import React, { useState, useEffect } from "react";
import {
  formatResearchDate,
  getResearchSources,
  getResearchTags,
} from "./researchUtils";

// SMART PAGINATION: Character limit adjusted for dense look
const paginateText = (text, abstract, charsLimit) => {
  const pages = [];
  let currentPage = "";

  if (abstract) {
    currentPage += `**EXECUTIVE_SUMMARY**\n${abstract}\n\n`;
  }

  if (!text) return pages.length ? [currentPage] : [];

  const paragraphs = text.split("\n");

  paragraphs.forEach((p) => {
    if (p.trim() === "") {
      currentPage += "\n";
      return;
    }

    const words = p.split(" ");
    words.forEach((word) => {
      if (currentPage.length + word.length > charsLimit) {
        pages.push(currentPage.trim());
        currentPage = word + " ";
      } else {
        currentPage += word + " ";
      }
    });
    currentPage += "\n\n";
  });

  if (currentPage.trim() !== "") pages.push(currentPage.trim());
  return pages;
};

const ResearchDetail = ({ research }) => {
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (research) {
        const width = window.innerWidth;
        let limit = 3500; 

        if (width < 640) limit = 1000; 
        else if (width < 1024) limit = 2000; 

        setPages(paginateText(research.body, research.abstract, limit));
        setCurrentPageIndex(0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [research]);

  if (!research || pages.length === 0) return null;

  const sources = getResearchSources(research);
  const tags = getResearchTags(research);

  const handleNext = () => {
    if (currentPageIndex >= pages.length - 1 || animClass) return;
    setAnimClass("flip-next");
    setTimeout(() => setCurrentPageIndex((p) => p + 1), 300);
    setTimeout(() => setAnimClass(""), 600);
  };

  const handlePrev = () => {
    if (currentPageIndex <= 0 || animClass) return;
    setAnimClass("flip-prev");
    setTimeout(() => setCurrentPageIndex((p) => p - 1), 300);
    setTimeout(() => setAnimClass(""), 600);
  };

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      
      {/* 1. HEADER */}
      <header className="mb-6 px-5 text-center sm:mb-10 sm:px-0">
        <span className="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {research.field || "General Insight"}
        </span>
        <h1 className="text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-slate-900 text-balance">
          {research.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
          <span className="font-semibold text-slate-800">
            {research.authorName || "Anonymous"}
          </span>
          <span>•</span>
          <time>{formatResearchDate(research)}</time>
        </div>
      </header>

      {/* 2. THE OPEN BOOK FRAME */}
      <div className="mx-auto flex h-[80vh] min-h-[550px] w-full flex-col overflow-hidden border-y border-slate-200 bg-white sm:h-[650px] sm:rounded-[2rem] sm:border sm:shadow-2xl">
        
        {/* TOP BAR */}
        <div className="z-10 flex w-full shrink-0 items-center justify-between border-b border-slate-50 bg-white px-6 py-4 sm:px-10">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
            Archive Reader
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
            Spread {currentPageIndex + 1} / {pages.length}
          </span>
        </div>

        {/* 3D FLIPPING SPREAD AREA */}
        <div className="relative flex-1 bg-white [perspective:2500px]">
          
          <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 hidden w-20 -translate-x-1/2 bg-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0)_100%)] sm:block"></div>

          <div
            className={`absolute inset-0 overflow-hidden bg-transparent px-6 py-6 sm:px-10 sm:py-8 md:px-14 ${animClass}`}
          >
            {/* 📖 THE FIX: column-fill-auto ensures left side fills first */}
            <div className="h-full w-full columns-1 gap-12 sm:columns-2 sm:[column-rule:1px_solid_rgba(0,0,0,0.03)] sm:[column-fill:auto]">
              {pages[currentPageIndex]?.split("\n\n").map((paragraph, idx) => {
                if (paragraph.includes("**EXECUTIVE_SUMMARY**")) {
                  return (
                    <p
                      key={idx}
                      className="mb-6 break-inside-avoid text-[14px] font-bold leading-relaxed text-slate-800 sm:text-[16px]"
                    >
                      {paragraph.replace("**EXECUTIVE_SUMMARY**", "").trim()}
                    </p>
                  );
                }
                return (
                  <p
                    key={idx}
                    className="mb-5 text-[13.5px] leading-relaxed text-slate-700 text-justify sm:text-[14.5px] sm:leading-[1.8] tracking-tight"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="z-10 flex shrink-0 items-center justify-between border-t border-slate-50 bg-slate-50/30 px-6 py-4">
          <button
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-5 py-2 text-[10px] font-bold text-slate-500 transition-all hover:text-teal-600 disabled:opacity-20"
          >
            <i className="fa-solid fa-arrow-left-long"></i> <span className="hidden sm:inline">Previous Spread</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentPageIndex === pages.length - 1}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2 text-[10px] font-bold text-white shadow-md transition-all hover:bg-teal-600 disabled:opacity-20"
          >
            <span className="hidden sm:inline">Next Spread</span> <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>
      </div>

      {/* 3. SOURCES & TAGS */}
      {(sources.length > 0 || tags.length > 0) && (
        <div className="mt-10 px-5 sm:px-0">
          <div className="grid gap-8 border-t border-slate-100 py-10 md:grid-cols-2">
            {tags.length > 0 && (
              <div>
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-medium text-slate-500">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
            {sources.length > 0 && (
              <div>
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Scientific Sources</h3>
                <ol className="list-inside list-decimal space-y-2 text-[11px] text-slate-500">
                  {sources.map((src) => (
                    <li key={src}>
                      <a href={src} target="_blank" rel="noopener noreferrer" className="break-all hover:text-teal-600 underline underline-offset-4 decoration-slate-200">{src.replace(/^https?:\/\/(www\.)?/, "")}</a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {/* UPDATED CSS: Strict One-Side 3D Flip */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flipPageNext {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-90deg); }
          50.1% { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes flipPagePrev {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          50.1% { transform: rotateY(-90deg); }
          100% { transform: rotateY(0deg); }
        }
        
        .flip-next { 
          transform-origin: left center; 
          animation: flipPageNext 0.6s ease-in-out forwards; 
          transform-style: preserve-3d; 
          backface-visibility: hidden;
        }
        
        .flip-prev { 
          transform-origin: right center; 
          animation: flipPagePrev 0.6s ease-in-out forwards; 
          transform-style: preserve-3d; 
          backface-visibility: hidden;
        }
      `}} />
    </div>
  );
};

export default ResearchDetail;