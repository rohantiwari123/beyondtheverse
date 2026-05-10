import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import HTMLFlipBook from "react-pageflip";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Quill Editor with local state to avoid triggering parent re-renders and FlipBook focus loss on every keystroke
const QuillEditor = ({ value, onChange, placeholder }) => {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleChange = (content) => {
    setLocalValue(content);
  };

  const handleBlur = () => {
    onChange(localValue);
  };

  return (
    <div className="flex-1 flex flex-col h-full quill-editor-wrapper overflow-hidden min-h-0">
      <ReactQuill
        theme="snow"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        modules={{
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['clean']
          ],
        }}
        className="flex-1 flex flex-col h-full min-h-0"
      />
    </div>
  );
};

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-xl relative" ref={ref}>
      <div style={{ padding: props.padding, width: '100%', height: '100%', boxSizing: 'border-box' }} className="flex flex-col">
        {props.children}
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-bold text-slate-300 pointer-events-none">
        {props.number}
      </div>
    </div>
  );
});
Page.displayName = 'Page';

const ResearchForm = ({ showToast }) => {
  const { isAuthenticated, userName, userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    field: "",
    title: "",
    abstract: "",
    bodyPages: [""],
    tags: "",
    sources: [""],
  });

  const [dimensions, setDimensions] = useState({ 
    width: 0, height: 0, gap: 40, isMobile: true, 
    containerWidth: 300, containerHeight: 600, paddingX: 20, paddingY: 20 
  });
  
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef(null);

  useLayoutEffect(() => {
    let timeoutId;
    const updateDims = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      
      let containerWidth = window.innerWidth - 32; // mobile width
      if (!isMobile) {
        containerWidth = Math.min(window.innerWidth - 64, 1000); // desktop width max 1000
      }
      
      const containerHeight = isMobile ? window.innerHeight * 0.7 : 650;
      
      const gap = isMobile ? 24 : 40;
      const paddingX = isMobile ? 16 : 40;
      const paddingY = isMobile ? 24 : 40;

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBodyPageChange = (index, value) => {
    const newBodyPages = [...formData.bodyPages];
    newBodyPages[index] = value;
    setFormData({ ...formData, bodyPages: newBodyPages });
  };

  const addBodyPage = () => {
    setFormData({ ...formData, bodyPages: [...formData.bodyPages, ""] });
    setCurrentPage(currentPage + (dimensions.isMobile ? 1 : 2));
  };

  const removeBodyPage = (index) => {
    const newBodyPages = formData.bodyPages.filter((_, i) => i !== index);
    setFormData({ ...formData, bodyPages: newBodyPages });
    setCurrentPage(Math.max(0, currentPage - (dimensions.isMobile ? 1 : 2)));
  };

  const handleSourceChange = (index, value) => {
    const newSources = [...formData.sources];
    newSources[index] = value;
    setFormData({ ...formData, sources: newSources });
  };

  const addSourceField = () => {
    setFormData({ ...formData, sources: [...formData.sources, ""] });
  };

  const removeSourceField = (index) => {
    const newSources = formData.sources.filter((_, i) => i !== index);
    setFormData({ ...formData, sources: newSources });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showToast("You must be logged in to publish research.", false);
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "researches"), {
        field: formData.field.trim(),
        title: formData.title.trim(),
        abstract: formData.abstract.trim(),
        body: formData.bodyPages.join("<br><br>").trim(),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        sources: formData.sources.filter((source) => source.trim() !== ""),
        authorId: userId,
        authorName: userName || "Anonymous Researcher",
        createdAt: serverTimestamp(),
      });

      showToast("Research published successfully!", true);

      setFormData({
        field: "",
        title: "",
        abstract: "",
        bodyPages: [""],
        tags: "",
        sources: [""],
      });
      setIsExpanded(false);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error publishing research:", error);
      showToast("Failed to publish research. Please try again later.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPages = 1 + formData.bodyPages.length; // Abstract + Body Pages

  return (
    <section className="overflow-hidden border-y border-slate-200 bg-slate-50 shadow-sm sm:rounded-[2rem] sm:border mb-12">
      <style>{`
        .quill-editor-wrapper .ql-container {
          flex: 1;
          overflow-y: auto;
          font-family: inherit;
          font-size: 14px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: #e2e8f0 !important;
        }
        .quill-editor-wrapper .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: #e2e8f0 !important;
          background: #f8fafc;
        }
      `}</style>
      
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left sm:px-6 bg-white"
      >
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-teal-600">
            Admin Studio
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
            Publish Advanced Research
          </h2>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
          <i className={`fa-solid ${isExpanded ? "fa-minus" : "fa-plus"}`}></i>
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-slate-100 py-10 w-full">
          
          <div className="mx-auto w-full max-w-[1000px]">
            {/* EXACT MATCH HEADER FOR EDITOR */}
            <header className="mb-6 px-5 text-center sm:mb-10 sm:px-0">
              <input
                type="text"
                name="field"
                value={formData.field}
                onChange={handleInputChange}
                placeholder="Research Field"
                className="mb-3 inline-block rounded-full bg-slate-200/60 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center border-none focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-400 transition-all hover:bg-slate-200"
              />
              <textarea
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a searchable research title..."
                className="w-full text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-slate-900 text-center bg-transparent focus:outline-none resize-none placeholder-slate-300"
                rows={2}
              />
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">
                  {userName || "Anonymous"}
                </span>
                <span>•</span>
                <time>Today</time>
              </div>
            </header>

            {/* THE 3D BOOK ENGINE (EDITOR MODE) */}
            <div className="mx-auto flex w-full flex-col items-center justify-center">
              <div className="relative mx-auto flex justify-center w-full" style={{ width: dimensions.containerWidth }}>
                {dimensions.width > 0 && totalPages > 0 && (
                  <HTMLFlipBook
                    key={`${dimensions.width}-${dimensions.isMobile}-${totalPages}`}
                    width={dimensions.width + dimensions.paddingX * 2}
                    height={dimensions.height + dimensions.paddingY * 2}
                    size="fixed"
                    minWidth={280}
                    maxWidth={1000}
                    minHeight={400}
                    maxHeight={1533}
                    maxShadowOpacity={0.2}
                    showCover={false}
                    usePortrait={true}
                    drawShadow={true}
                    flippingTime={600}
                    useMouseEvents={false}
                    startPage={currentPage}
                    onFlip={(e) => setCurrentPage(e.data)}
                    className="mx-auto shadow-2xl rounded-2xl bg-white"
                    style={{ margin: "0 auto" }}
                    ref={flipBookRef}
                  >
                    {/* PAGE 1: Abstract */}
                    <Page number={1} padding={`${dimensions.paddingY}px ${dimensions.paddingX}px`}>
                      <div className="flex flex-col h-full w-full">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Abstract / Summary</h3>
                        <QuillEditor 
                          value={formData.abstract}
                          onChange={(val) => setFormData({...formData, abstract: val})}
                          placeholder="Summarize the key question, method, and finding..."
                        />
                      </div>
                    </Page>
                    
                    {/* PAGES 2+: Body */}
                    {formData.bodyPages.map((pageText, index) => (
                      <Page key={`body-${index}`} number={index + 2} padding={`${dimensions.paddingY}px ${dimensions.paddingX}px`}>
                        <div className="flex flex-col h-full w-full">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                              Main Body {formData.bodyPages.length > 1 ? `(Pt. ${index + 1})` : ''}
                            </h3>
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeBodyPage(index)}
                                className="text-rose-500 hover:text-rose-600 p-1 text-[10px] font-bold"
                              >
                                <i className="fa-solid fa-trash-can mr-1"></i> Remove
                              </button>
                            )}
                          </div>
                          <QuillEditor 
                            value={pageText}
                            onChange={(val) => handleBodyPageChange(index, val)}
                            placeholder="Detail your methodology, observations, interpretation..."
                          />
                          {index === formData.bodyPages.length - 1 && (
                            <button
                              type="button"
                              onClick={addBodyPage}
                              className="mt-3 w-full rounded-xl border-2 border-dashed border-slate-200 py-2 text-[10px] font-bold text-teal-600 hover:border-teal-500 hover:bg-teal-50 transition-colors uppercase tracking-widest"
                            >
                              + Add New Page
                            </button>
                          )}
                        </div>
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
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-200 border border-slate-200 shadow-sm bg-white min-w-[110px] justify-center"
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
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-200 border border-slate-200 shadow-sm bg-white min-w-[110px] justify-center"
                  >
                    <span>Next</span> <i className="fa-solid fa-chevron-right"></i>
                  </button>
                ) : <div className="min-w-[110px]" />}
              </div>
            </div>

            {/* EXACT MATCH FOOTER: SOURCES & TAGS */}
            <div className="mt-10 px-5 sm:px-0">
              <div className="grid gap-8 border-t border-slate-200 py-10 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Keywords</h3>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-slate-300 bg-transparent py-2 px-1 text-sm focus:border-teal-500 focus:outline-none placeholder-slate-300 font-medium"
                    placeholder="ethics, education, cognition (comma separated)"
                  />
                </div>
                <div>
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Scientific Sources</h3>
                  <div className="space-y-3">
                    {formData.sources.map((source, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="url"
                          value={source}
                          onChange={(e) => handleSourceChange(index, e.target.value)}
                          className="w-full border-b-2 border-slate-300 bg-transparent py-2 px-1 text-sm focus:border-teal-500 focus:outline-none placeholder-slate-300 font-medium"
                          placeholder="https://..."
                        />
                        {formData.sources.length > 1 && (
                          <button type="button" onClick={() => removeSourceField(index)} className="text-rose-400 hover:text-rose-600 p-2 transition-colors">
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addSourceField} className="text-[10px] font-bold text-teal-600 hover:text-teal-700 mt-2 uppercase tracking-widest transition-colors">
                      + Add Source
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PUBLISH BUTTON */}
            <div className="pt-2 pb-12 flex justify-center px-5 sm:px-0">
               <button
                 onClick={handleSubmit}
                 disabled={isSubmitting || !formData.title || !formData.bodyPages[0] || !formData.field}
                 className="w-full max-w-md rounded-2xl bg-slate-900 py-5 text-[14px] font-black tracking-wide text-white hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
               >
                 {isSubmitting ? (
                   <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Publishing...</>
                 ) : (
                   <><i className="fa-solid fa-paper-plane mr-2"></i>Publish Research</>
                 )}
               </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default ResearchForm;