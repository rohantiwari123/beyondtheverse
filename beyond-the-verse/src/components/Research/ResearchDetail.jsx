import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  formatResearchDate,
  getResearchSources,
  getResearchTags,
} from "./researchUtils";

// A component that isolates exactly one column (page) of the flowed text
const PageContent = ({ pageIndex, width, gap, children }) => {
  if (pageIndex < 0) return null;
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
       <div style={{
         height: '100%',
         width: '100%', // Ensures first column perfectly matches container width
         columnWidth: `${width}px`,
         columnGap: `${gap}px`,
         transform: `translateX(-${pageIndex * (width + gap)}px)`,
         willChange: 'transform',
       }}>
         {children}
       </div>
    </div>
  );
};

const ResearchDetail = ({ research }) => {
  const [dimensions, setDimensions] = useState({ 
    width: 0, height: 0, gap: 40, isMobile: true, 
    containerWidth: 300, containerHeight: 600, paddingX: 20, paddingY: 20 
  });
  
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // For mobile (single page)
  const [currentSpread, setCurrentSpread] = useState(0); // For desktop (2 pages per spread)
  const [animState, setAnimState] = useState(false); // 'next' or 'prev'

  const measureRef = useRef(null);
  const touchStartX = useRef(null);

  // 1. Calculate layout dimensions on resize
  useLayoutEffect(() => {
    const updateDims = () => {
      const isMobile = window.innerWidth < 640;
      const containerWidth = Math.min(window.innerWidth - 32, 1000); 
      const containerHeight = isMobile ? window.innerHeight * 0.75 : 650;
      
      const gap = isMobile ? 30 : 50;
      const paddingX = isMobile ? 24 : 40;
      const paddingY = isMobile ? 24 : 40;

      // Mobile: 1 page. Desktop: 2 pages side-by-side
      const width = isMobile 
        ? containerWidth - paddingX * 2 
        : (containerWidth / 2) - paddingX * 2;
      
      setDimensions({ 
        width, 
        height: containerHeight - paddingY * 2, 
        gap, 
        isMobile, 
        containerWidth, 
        containerHeight, 
        paddingX, 
        paddingY 
      });
    };

    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  // 2. Measure total pages based on actual CSS column scroll overflow
  useEffect(() => {
    if (measureRef.current && dimensions.width > 0) {
      const scrollWidth = measureRef.current.scrollWidth;
      if (scrollWidth > 0) {
        const cols = Math.round((scrollWidth + dimensions.gap) / (dimensions.width + dimensions.gap));
        setTotalPages(Math.max(1, cols));
      }
    }
  }, [dimensions, research]);

  // 3. Keep current page/spread within bounds on resize
  useEffect(() => {
    if (totalPages > 0) {
      if (dimensions.isMobile) {
        setCurrentPage(p => Math.min(p, Math.max(0, totalPages - 1)));
      } else {
        const maxSpread = Math.ceil(totalPages / 2) - 1;
        setCurrentSpread(s => Math.min(s, Math.max(0, maxSpread)));
      }
    }
  }, [totalPages, dimensions.isMobile]);

  if (!research) return null;

  const sources = getResearchSources(research);
  const tags = getResearchTags(research);

  // Reusable content renderer (No fixed fonts, inherits clean workspace text)
  const renderContent = () => (
    <div className="text-left sm:text-justify text-[14px] leading-relaxed text-slate-800 sm:text-[15px] sm:leading-[1.8] tracking-tight pb-8">
       {research.abstract && (
         <p className="mb-6 break-inside-avoid font-bold">
           {research.abstract}
         </p>
       )}
       {research.body?.split("\n").map((p, idx) => {
          if (!p.trim()) return <div key={idx} className="h-4" />;
          return <p key={idx} className="mb-4">{p}</p>;
       })}
    </div>
  );

  const handleNext = () => {
    if (animState) return;
    if (dimensions.isMobile) {
      if (currentPage >= totalPages - 1) return;
      setAnimState('next');
      setTimeout(() => {
        setCurrentPage(p => p + 1);
        setAnimState(false);
      }, 500); // match CSS duration
    } else {
      const maxSpread = Math.ceil(totalPages / 2) - 1;
      if (currentSpread >= maxSpread) return;
      setAnimState('next');
      setTimeout(() => {
        setCurrentSpread(s => s + 1);
        setAnimState(false);
      }, 600); // match CSS duration
    }
  };

  const handlePrev = () => {
    if (animState) return;
    if (dimensions.isMobile) {
      if (currentPage <= 0) return;
      setAnimState('prev');
      setTimeout(() => {
        setCurrentPage(p => p - 1);
        setAnimState(false);
      }, 500);
    } else {
      if (currentSpread <= 0) return;
      setAnimState('prev');
      setTimeout(() => {
        setCurrentSpread(s => s - 1);
        setAnimState(false);
      }, 600);
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  // --- MOBILE BOOK (Single Page Flip) ---
  const renderMobileBook = () => {
    const isNext = animState === 'next';
    const isPrev = animState === 'prev';
    const bgPage = isNext ? currentPage + 1 : isPrev ? currentPage - 1 : currentPage;
    
    return (
      <div className="relative w-full h-full bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Background Page (Revealed during flip) */}
        <div className="absolute inset-0" style={{ padding: `${dimensions.paddingY}px ${dimensions.paddingX}px` }}>
          <PageContent pageIndex={bgPage} {...dimensions}>{renderContent()}</PageContent>
        </div>

        {/* Flipping Page */}
        {(isNext || isPrev || !animState) && (
          <div 
            className="absolute inset-0 bg-white"
            style={{
              transformOrigin: isNext ? 'left center' : isPrev ? 'right center' : 'center',
              animation: isNext ? 'mobileFlipNext 0.5s ease-in-out forwards' 
                       : isPrev ? 'mobileFlipPrev 0.5s ease-in-out forwards' : 'none',
              padding: `${dimensions.paddingY}px ${dimensions.paddingX}px`,
              backfaceVisibility: 'hidden',
              boxShadow: (isNext || isPrev) ? '0 0 20px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <PageContent pageIndex={currentPage} {...dimensions}>{renderContent()}</PageContent>
          </div>
        )}
      </div>
    );
  };

  // --- DESKTOP BOOK (2-Page Spread 3D Flip) ---
  const renderDesktopBook = () => {
    const S = currentSpread;
    const isNext = animState === 'next';
    const isPrev = animState === 'prev';

    // Static Base Pages
    const leftPageIndex = isPrev ? (S - 1) * 2 : S * 2;
    const rightPageIndex = isNext ? (S + 1) * 2 + 1 : S * 2 + 1;

    return (
      <div className="relative w-full h-full flex bg-white rounded-xl shadow-2xl border border-slate-200" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Center Spine Shadow */}
        <div className="absolute top-0 bottom-0 left-1/2 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent z-10 pointer-events-none"></div>

        {/* STATIC LEFT PAGE */}
        <div className="w-1/2 h-full relative z-0 bg-white rounded-l-xl shadow-[inset_-15px_0_20px_rgba(0,0,0,0.03)]" style={{ padding: `${dimensions.paddingY}px ${dimensions.paddingX}px` }}>
           <PageContent pageIndex={leftPageIndex} {...dimensions}>{renderContent()}</PageContent>
        </div>

        {/* STATIC RIGHT PAGE */}
        <div className="w-1/2 h-full relative z-0 bg-white rounded-r-xl shadow-[inset_15px_0_20px_rgba(0,0,0,0.03)]" style={{ padding: `${dimensions.paddingY}px ${dimensions.paddingX}px` }}>
           <PageContent pageIndex={rightPageIndex} {...dimensions}>{renderContent()}</PageContent>
        </div>

        {/* FLIPPING PAGE (NEXT) */}
        {isNext && (
          <div 
            className="absolute top-0 right-0 w-1/2 h-full z-20"
            style={{
              transformOrigin: 'left center',
              animation: 'desktopFlipNext 0.6s ease-in-out forwards',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front Face (Current Right Page) */}
            <div className="absolute inset-0 bg-white rounded-r-xl shadow-[inset_10px_0_20px_rgba(0,0,0,0.03),-5px_0_10px_rgba(0,0,0,0.05)]" style={{ backfaceVisibility: 'hidden', padding: `${dimensions.paddingY}px ${dimensions.paddingX}px` }}>
               <PageContent pageIndex={S * 2 + 1} {...dimensions}>{renderContent()}</PageContent>
            </div>
            {/* Back Face (Next Left Page) */}
            <div className="absolute inset-0 bg-white rounded-l-xl shadow-[inset_-10px_0_20px_rgba(0,0,0,0.03),5px_0_10px_rgba(0,0,0,0.05)]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', padding: `${dimensions.paddingY}px ${dimensions.paddingX}px` }}>
               <PageContent pageIndex={(S + 1) * 2} {...dimensions}>{renderContent()}</PageContent>
            </div>
          </div>
        )}

        {/* FLIPPING PAGE (PREV) */}
        {isPrev && (
          <div 
            className="absolute top-0 left-0 w-1/2 h-full z-20"
            style={{
              transformOrigin: 'right center',
              animation: 'desktopFlipPrev 0.6s ease-in-out forwards',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front Face (Current Left Page) */}
            <div className="absolute inset-0 bg-white rounded-l-xl shadow-[inset_-10px_0_20px_rgba(0,0,0,0.03),5px_0_10px_rgba(0,0,0,0.05)]" style={{ backfaceVisibility: 'hidden', padding: `${dimensions.paddingY}px ${dimensions.paddingX}px` }}>
               <PageContent pageIndex={S * 2} {...dimensions}>{renderContent()}</PageContent>
            </div>
            {/* Back Face (Prev Right Page) */}
            <div className="absolute inset-0 bg-white rounded-r-xl shadow-[inset_10px_0_20px_rgba(0,0,0,0.03),-5px_0_10px_rgba(0,0,0,0.05)]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', padding: `${dimensions.paddingY}px ${dimensions.paddingX}px` }}>
               <PageContent pageIndex={(S - 1) * 2 + 1} {...dimensions}>{renderContent()}</PageContent>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-[1000px] pb-12">
      
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

      {/* 2. THE 3D BOOK ENGINE */}
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        
        {/* Top Info */}
        <div className="mb-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {dimensions.isMobile 
              ? `Page ${currentPage + 1} of ${totalPages}` 
              : `Pages ${currentSpread * 2 + 1}-${Math.min(currentSpread * 2 + 2, totalPages)} of ${totalPages}`}
          </span>
        </div>

        {/* Book Container */}
        <div 
          className="relative mx-auto [perspective:2500px]"
          style={{ width: dimensions.containerWidth, height: dimensions.containerHeight }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
           {dimensions.width > 0 && totalPages > 0 && (
             dimensions.isMobile ? renderMobileBook() : renderDesktopBook()
           )}
        </div>

        {/* Bottom Controls */}
        <div className="mt-6 flex w-full max-w-[400px] justify-between px-4 sm:max-w-[500px]">
          <button
            onClick={handlePrev}
            disabled={dimensions.isMobile ? currentPage === 0 : currentSpread === 0}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-100 disabled:opacity-30 border border-slate-200 shadow-sm bg-white"
          >
            <i className="fa-solid fa-chevron-left"></i> <span>Previous</span>
          </button>

          <span className="flex items-center text-[10px] font-bold tracking-widest text-slate-400 sm:hidden">
            SWIPE TO TURN
          </span>

          <button
            onClick={handleNext}
            disabled={dimensions.isMobile ? currentPage >= totalPages - 1 : currentSpread >= Math.ceil(totalPages / 2) - 1}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-100 disabled:opacity-30 border border-slate-200 shadow-sm bg-white"
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

      {/* HIDDEN MEASUREMENT NODE - Magically computes true pages without truncating characters */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', visibility: 'hidden', pointerEvents: 'none' }}>
        <div 
          ref={measureRef}
          style={{ 
            height: dimensions.height, 
            width: dimensions.width, 
            columnWidth: `${dimensions.width}px`, 
            columnGap: `${dimensions.gap}px` 
          }}
        >
          {renderContent()}
        </div>
      </div>

      {/* 3D ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Mobile Flip: single page rotates out to reveal the underlying next page */
        @keyframes mobileFlipNext {
          0% { transform: rotateY(0deg); opacity: 1; }
          100% { transform: rotateY(-90deg); opacity: 0; }
        }
        @keyframes mobileFlipPrev {
          0% { transform: rotateY(0deg); opacity: 1; }
          100% { transform: rotateY(90deg); opacity: 0; }
        }

        /* Desktop Flip: realistic spine rotation turning the page across the center */
        @keyframes desktopFlipNext {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-180deg); }
        }
        @keyframes desktopFlipPrev {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
      `}} />
    </div>
  );
};

export default ResearchDetail;
