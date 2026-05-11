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
    <div className="bg-slate-100 min-h-screen py-10 px-4 sm:px-8 select-none" onContextMenu={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}>
      <div 
        className="mx-auto bg-white shadow-2xl overflow-hidden relative"
        style={{ 
          maxWidth: '816px', // 8.5 inches at 96dpi
          padding: '1in', // 1-inch margins
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: '12pt',
          lineHeight: '1.5',
          color: 'black'
        }}
      >
        {/* Page Number (Assuming it's the first page header here, or just top right) */}
        <div className="absolute top-[0.5in] right-[1in] text-[12pt] font-serif">
          1
        </div>

        {/* Title Section */}
        <div className="text-center mt-8 mb-16 space-y-4">
          <h1 className="text-[14pt] font-bold uppercase tracking-wide">
            {research.title}
          </h1>
          <div className="text-[12pt]">
            <p>{research.authorName || "Anonymous Researcher"}</p>
            <p>{research.authorAffiliation || "Beyond the Verse Institute"}</p>
            <p>{formatResearchDate(research)}</p>
          </div>
        </div>

        {/* Abstract */}
        {research.abstract && (
          <div className="mb-8">
            <h2 className="text-center font-bold mb-4">Abstract</h2>
            <p className="text-justify indent-8">
              {research.abstract}
            </p>
            {tags.length > 0 && (
              <p className="mt-4 italic">
                <span className="font-bold not-italic">Keywords:</span> {tags.join(", ")}
              </p>
            )}
          </div>
        )}

        {/* Main Body */}
        {research.body && (
          <div 
            className="text-justify prose-p:indent-8 prose-p:mb-0 ql-editor px-0 py-0"
            style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt', lineHeight: '1.5' }}
            dangerouslySetInnerHTML={{ __html: research.body }}
          />
        )}

        {/* References */}
        {sources.length > 0 && (
          <div className="mt-12" style={{ pageBreakBefore: 'always' }}>
            <h2 className="text-center font-bold mb-4">References</h2>
            <div className="space-y-4 pl-4 text-justify" style={{ textIndent: '-1rem' }}>
              {sources.map((src, idx) => (
                <p key={idx} className="break-all">
                  Source {idx + 1}. Available at: <a href={src} target="_blank" rel="noopener noreferrer" className="underline">{src}</a>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchDetail;