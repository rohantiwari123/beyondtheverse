import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "react-quill-new/dist/quill.snow.css"; // Required to render Quill's HTML correctly against Tailwind's reset
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

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-xl relative" ref={ref}>
      <div style={{ padding: props.padding, width: '100%', height: '100%', boxSizing: 'border-box' }}>
        {props.children}
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-bold text-slate-300 pointer-events-none">
        {props.number}
      </div>
    </div>
  );
});
Page.displayName = 'Page';

const ResearchDetail = ({ research }) => {
  const [dimensions, setDimensions] = useState({ 
    width: 0, height: 0, gap: 40, isMobile: true, 
    containerWidth: 300, containerHeight: 600, paddingX: 20, paddingY: 20 
  });
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const measureRef = useRef(null);
  const flipBookRef = useRef(null);

  // Calculate layout dimensions on resize
  useLayoutEffect(() => {
    let timeoutId;
    const updateDims = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      
      // Responsive container logic
      let containerWidth = window.innerWidth - 32; // mobile width
      if (!isMobile) {
        containerWidth = Math.min(window.innerWidth - 64, 1000); // desktop width max 1000
      }
      
      const containerHeight = isMobile ? window.innerHeight * 0.7 : 650;
      
      const gap = isMobile ? 24 : 40;
      const paddingX = isMobile ? 16 : 40;
      const paddingY = isMobile ? 24 : 40;

      // Single page width
      // In portrait (mobile), 1 page fills container. In landscape (desktop), 2 pages fill container.
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
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDims, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Measure total pages based on actual CSS column scroll overflow
  useEffect(() => {
    if (measureRef.current && dimensions.width > 0) {
      const scrollWidth = measureRef.current.scrollWidth;
      if (scrollWidth > 0) {
        const cols = Math.round((scrollWidth + dimensions.gap) / (dimensions.width + dimensions.gap));
        setTotalPages(Math.max(1, cols));
      }
    }
  }, [dimensions, research]);

  if (!research) return null;

  const sources = getResearchSources(research);
  const tags = getResearchTags(research);

  // Reusable content renderer (No fixed fonts, inherits clean workspace text)
  const renderContent = () => (
    <div className="text-left sm:text-justify text-[14px] leading-relaxed text-slate-800 sm:text-[15px] sm:leading-[1.8] tracking-tight pb-8">
       {research.abstract && (
         <div 
           className="mb-6 break-inside-avoid font-bold ql-editor px-0 py-0" 
           dangerouslySetInnerHTML={{ __html: research.abstract }}
         />
       )}
       {research.body && (
         <div 
           className="break-words ql-editor px-0 py-0"
           dangerouslySetInnerHTML={{ __html: research.body }}
         />
       )}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[1000px] pb-12">
      
      {/* HEADER */}
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

      {/* THE 3D BOOK ENGINE */}
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        
        {/* Book Container */}
        <div className="relative mx-auto flex justify-center w-full" style={{ width: dimensions.containerWidth }}>
           {dimensions.width > 0 && totalPages > 0 && (
             <HTMLFlipBook
               key={`${dimensions.width}-${dimensions.isMobile}-${totalPages}`}
               width={dimensions.width + dimensions.paddingX * 2} // Single page total width
               height={dimensions.height + dimensions.paddingY * 2}
               size="fixed"
               minWidth={280}
               maxWidth={1000}
               minHeight={400}
               maxHeight={1533}
               maxShadowOpacity={0.2}
               showCover={false}
               usePortrait={true} // Automatically switch to 1 page on mobile
               drawShadow={true}
               flippingTime={600}
               useMouseEvents={false}
               onFlip={(e) => setCurrentPage(e.data)}
               className="mx-auto shadow-2xl rounded-2xl"
               style={{ margin: "0 auto" }}
               ref={flipBookRef}
             >
               {[...Array(totalPages)].map((_, i) => (
                 <Page key={i} number={i + 1} padding={`${dimensions.paddingY}px ${dimensions.paddingX}px`}>
                   <PageContent pageIndex={i} width={dimensions.width} gap={dimensions.gap}>
                     {renderContent()}
                   </PageContent>
                 </Page>
               ))}
             </HTMLFlipBook>
           )}
        </div>

        {/* Bottom Controls */}
        <div className="mt-6 flex w-full max-w-[400px] justify-between items-center px-4 sm:max-w-[500px]">
          {currentPage > 0 ? (
            <button
              onClick={() => flipBookRef.current?.pageFlip()?.flipPrev()}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-100 border border-slate-200 shadow-sm bg-white min-w-[110px] justify-center"
            >
              <i className="fa-solid fa-chevron-left"></i> <span>Previous</span>
            </button>
          ) : <div className="min-w-[110px]" />}

          <span className="flex items-center text-[10px] font-bold tracking-widest text-slate-400">
            {dimensions.isMobile 
              ? `PAGE ${currentPage + 1} OF ${totalPages}` 
              : `PAGES ${currentPage + 1}-${Math.min(currentPage + 2, totalPages)} OF ${totalPages}`}
          </span>

          {currentPage + (dimensions.isMobile ? 1 : 2) < totalPages ? (
            <button
              onClick={() => flipBookRef.current?.pageFlip()?.flipNext()}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-100 border border-slate-200 shadow-sm bg-white min-w-[110px] justify-center"
            >
              <span>Next</span> <i className="fa-solid fa-chevron-right"></i>
            </button>
          ) : <div className="min-w-[110px]" />}
        </div>
      </div>

      {/* SOURCES & TAGS */}
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

    </div>
  );
};

export default ResearchDetail;
