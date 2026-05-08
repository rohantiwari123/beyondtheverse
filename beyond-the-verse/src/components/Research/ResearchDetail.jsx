import React, { useState, useEffect, useRef } from "react";
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
  const touchStartX = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (research) {
        const width = window.innerWidth;
        let limit = 2500; 

        if (width < 640) limit = 1000; // Mobile: 1 col
        else if (width < 1024) limit = 1800; // Tablet/Desktop: 2 cols

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
    setAnimClass("page-turn-next");
    setTimeout(() => setCurrentPageIndex((p) => p + 1), 250);
    setTimeout(() => setAnimClass(""), 500);
  };

  const handlePrev = () => {
    if (currentPageIndex <= 0 || animClass) return;
    setAnimClass("page-turn-prev");
    setTimeout(() => setCurrentPageIndex((p) => p - 1), 250);
    setTimeout(() => setAnimClass(""), 500);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) handleNext(); // swipe left
    if (diff < -50) handlePrev(); // swipe right
    touchStartX.current = null;
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

      {/* 2. GOOGLE PLAY BOOKS STYLE READER */}
      <div className="mx-auto flex h-[80vh] min-h-[550px] w-full flex-col overflow-hidden sm:h-[650px] sm:rounded-[1rem] sm:border sm:border-slate-200 sm:shadow-lg bg-white sm:bg-[#faf9f6]">
        
        {/* TOP BAR */}
        <div className="z-10 flex w-full shrink-0 items-center justify-between border-b border-slate-100 bg-white/80 px-4 py-3 sm:px-8 backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hidden sm:inline-block">
            {research.title}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:hidden">
            {research.title.substring(0, 30)}...
          </span>
          <span className="text-[10px] font-bold tracking-widest text-slate-400">
            {currentPageIndex + 1} / {pages.length}
          </span>
        </div>

        {/* READER AREA */}
        <div 
          className="relative flex-1 overflow-hidden select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          
          {/* TAP ZONES FOR MOBILE */}
          <div className="absolute inset-y-0 left-0 w-1/4 z-10 cursor-pointer" onClick={handlePrev}></div>
          <div className="absolute inset-y-0 right-0 w-1/4 z-10 cursor-pointer" onClick={handleNext}></div>

          {/* PAGE CONTENT */}
          <div className={`absolute inset-0 px-6 py-6 sm:px-10 sm:py-10 md:px-14 pointer-events-none transition-transform duration-500 ease-in-out ${animClass}`}>
            <div className="h-full w-full columns-1 gap-12 sm:columns-2 sm:[column-rule:1px_solid_rgba(0,0,0,0.05)] sm:[column-fill:auto]">
              {pages[currentPageIndex]?.split("\n\n").map((paragraph, idx) => {
                if (paragraph.includes("**EXECUTIVE_SUMMARY**")) {
                  return (
                    <p
                      key={idx}
                      className="mb-6 break-inside-avoid text-[15px] font-bold leading-relaxed text-slate-800 sm:text-[16px] font-sans"
                    >
                      {paragraph.replace("**EXECUTIVE_SUMMARY**", "").trim()}
                    </p>
                  );
                }
                return (
                  <p
                    key={idx}
                    className="mb-5 text-[15px] leading-relaxed text-slate-800 text-left sm:text-justify sm:text-[16px] sm:leading-[1.8] font-[Georgia,serif] tracking-wide"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="z-10 flex shrink-0 items-center justify-between border-t border-slate-100 bg-white px-4 py-3 sm:px-8">
          <button
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-100 disabled:opacity-30"
          >
            <i className="fa-solid fa-chevron-left"></i> <span>Prev</span>
          </button>

          {/* Progress bar */}
          <div className="flex-1 px-8 hidden sm:block">
             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-300 rounded-full" 
                  style={{ width: `${((currentPageIndex + 1) / pages.length) * 100}%` }}
                ></div>
             </div>
          </div>
          
          <div className="sm:hidden text-[10px] text-slate-400 font-medium">
            Tap edges or swipe
          </div>

          <button
            onClick={handleNext}
            disabled={currentPageIndex === pages.length - 1}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-100 disabled:opacity-30"
          >
            <span>Next</span> <i className="fa-solid fa-chevron-right"></i>
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

      {/* STYLES FOR ANIMATION */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideOutLeft {
          0% { transform: translateX(0); opacity: 1; }
          49% { transform: translateX(-20px); opacity: 0; }
          50% { transform: translateX(20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
          0% { transform: translateX(0); opacity: 1; }
          49% { transform: translateX(20px); opacity: 0; }
          50% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        .page-turn-next {
          animation: slideOutLeft 0.5s ease-in-out forwards;
        }

        .page-turn-prev {
          animation: slideOutRight 0.5s ease-in-out forwards;
        }
      `}} />
    </div>
  );
};

export default ResearchDetail;
