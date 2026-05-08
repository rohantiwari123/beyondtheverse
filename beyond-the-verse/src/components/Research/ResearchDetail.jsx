import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  formatResearchDate,
  getResearchSources,
  getResearchTags,
} from "./researchUtils";

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="bg-white overflow-hidden px-6 py-6 sm:px-10 sm:py-8 shadow-sm h-full w-full" ref={ref}>
      <div className="h-full w-full">
        {props.children}
      </div>
    </div>
  );
});

// SMART PAGINATION: Character limit adjusted for a single page
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPageNum, setCurrentPageNum] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (research) {
        const width = window.innerWidth;
        // Adjust character limit for a single page
        let limit = 1600; // desktop single page
        if (width < 640) limit = 1000; // mobile single page
        else if (width < 1024) limit = 1300; // tablet single page

        setPages(paginateText(research.body, research.abstract, limit));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [research]);

  if (!research || pages.length === 0) return null;

  const sources = getResearchSources(research);
  const tags = getResearchTags(research);

  const isMobile = windowWidth < 640;

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
      <div className="mx-auto flex w-full flex-col items-center justify-center py-4">
        
        <div className="mb-4 text-center">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
            Archive Reader • Page {currentPageNum + 1} of {pages.length}
          </span>
        </div>

        <div className="sm:shadow-2xl sm:rounded-[2rem] overflow-hidden border-y sm:border border-slate-200 bg-white mx-auto w-full max-w-[900px]">
           <HTMLFlipBook 
             width={isMobile ? windowWidth - 40 : 450} 
             height={isMobile ? window.innerHeight * 0.7 : 650} 
             size="stretch" 
             minWidth={300} 
             maxWidth={1000} 
             minHeight={400} 
             maxHeight={800} 
             maxShadowOpacity={0.5} 
             showCover={false} 
             mobileScrollSupport={true}
             usePortrait={true} // ensures 1 page on mobile
             onFlip={(e) => setCurrentPageNum(e.data)}
             className="mx-auto"
           >
             {pages.map((pageText, idx) => (
               <Page key={idx}>
                 <div className="h-full flex flex-col">
                   {pageText.split("\n\n").map((paragraph, pIdx) => {
                     if (paragraph.includes("**EXECUTIVE_SUMMARY**")) {
                       return (
                         <p
                           key={pIdx}
                           className="mb-4 break-inside-avoid text-[14px] font-bold leading-relaxed text-slate-800 sm:text-[15px]"
                         >
                           {paragraph.replace("**EXECUTIVE_SUMMARY**", "").trim()}
                         </p>
                       );
                     }
                     return (
                       <p
                         key={pIdx}
                         className="mb-4 text-[13.5px] leading-relaxed text-slate-700 text-justify sm:text-[14.5px] tracking-tight"
                       >
                         {paragraph}
                       </p>
                     );
                   })}
                 </div>
               </Page>
             ))}
           </HTMLFlipBook>
        </div>
        
        <div className="mt-4 text-[10px] text-slate-400 font-medium">
          {isMobile ? "Swipe to turn pages" : "Click edge or drag to turn pages"}
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
    </div>
  );
};

export default ResearchDetail;
