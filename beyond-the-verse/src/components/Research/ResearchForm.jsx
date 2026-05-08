import React, { useState, useRef, useLayoutEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import HTMLFlipBook from "react-pageflip";

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-xl relative border border-slate-100" ref={ref}>
      <div className="h-full w-full flex flex-col p-6 sm:p-8">
        {props.children}
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-bold text-slate-300 pointer-events-none">
        {props.number}
      </div>
    </div>
  );
});
Page.displayName = "Page";

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
    width: 300, height: 500, isMobile: true, containerWidth: 320
  });
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2 + formData.bodyPages.length + 1; // Cover, Abstract, Body Pages, Sources & Publish
  const flipBookRef = useRef(null);

  useLayoutEffect(() => {
    let timeoutId;
    const updateDims = () => {
      const isMobile = window.innerWidth < 768;
      let containerWidth = window.innerWidth - 32;
      if (!isMobile) {
        containerWidth = Math.min(window.innerWidth - 64, 900);
      }
      
      const width = isMobile ? containerWidth : containerWidth / 2;
      setDimensions({
        width,
        height: 600, // Fixed height for form pages
        isMobile,
        containerWidth
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
        body: formData.bodyPages.join("\n\n").trim(),
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

  return (
    <section className="overflow-hidden border-y border-slate-200 bg-white shadow-sm sm:rounded-[2rem] sm:border mb-12">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left sm:px-6"
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
        <div className="border-t border-slate-100 bg-slate-50/50 py-8">
          <div className="mx-auto flex flex-col items-center">
            
            <div className="relative mx-auto flex justify-center w-full" style={{ width: dimensions.containerWidth }}>
              {dimensions.width > 0 && (
                <HTMLFlipBook
                  key={`${dimensions.width}-${dimensions.isMobile}-${formData.bodyPages.length}`}
                  width={dimensions.width}
                  height={dimensions.height}
                  size="fixed"
                  minWidth={280}
                  maxWidth={900}
                  minHeight={400}
                  maxHeight={800}
                  maxShadowOpacity={0.2}
                  showCover={false}
                  usePortrait={true}
                  drawShadow={true}
                  flippingTime={600}
                  useMouseEvents={false}
                  startPage={currentPage}
                  onFlip={(e) => setCurrentPage(e.data)}
                  className="mx-auto shadow-2xl rounded-2xl"
                  style={{ margin: "0 auto" }}
                  ref={flipBookRef}
                >
                  
                  {/* PAGE 1: Title & Meta */}
                  <Page number={1}>
                    <h3 className="text-xl font-black text-slate-800 mb-6">Research Details</h3>
                    <div className="space-y-5 flex-1">
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Research Field
                        </label>
                        <input
                          type="text"
                          name="field"
                          value={formData.field}
                          onChange={handleInputChange}
                          className="w-full border-b-2 border-slate-200 bg-transparent py-2 px-1 text-sm font-medium focus:border-teal-500 focus:outline-none"
                          placeholder="Artificial Intelligence..."
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Research Title
                        </label>
                        <textarea
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full border-b-2 border-slate-200 bg-transparent py-2 px-1 text-lg font-bold focus:border-teal-500 focus:outline-none resize-none"
                          placeholder="Enter a searchable title"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Keywords (comma separated)
                        </label>
                        <input
                          type="text"
                          name="tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          className="w-full border-b-2 border-slate-200 bg-transparent py-2 px-1 text-sm focus:border-teal-500 focus:outline-none"
                          placeholder="ethics, education, cognition"
                        />
                      </div>
                    </div>
                  </Page>

                  {/* PAGE 2: Abstract */}
                  <Page number={2}>
                    <h3 className="text-xl font-black text-slate-800 mb-6">Abstract / Summary</h3>
                    <div className="flex-1 flex flex-col">
                      <textarea
                        name="abstract"
                        value={formData.abstract}
                        onChange={handleInputChange}
                        className="w-full flex-1 border-2 border-slate-100 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed focus:border-teal-500 focus:bg-white focus:outline-none resize-none"
                        placeholder="Summarize the key question, method, and finding..."
                      />
                    </div>
                  </Page>

                  {/* DYNAMIC PAGES: Body */}
                  {formData.bodyPages.map((pageText, index) => (
                    <Page key={`body-${index}`} number={index + 3}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-slate-800">
                          Main Body {formData.bodyPages.length > 1 ? `(Pt. ${index + 1})` : ''}
                        </h3>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeBodyPage(index)}
                            className="text-rose-500 hover:text-rose-600 p-2 text-xs font-bold"
                          >
                            <i className="fa-solid fa-trash-can mr-1"></i> Remove Page
                          </button>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col">
                        <textarea
                          value={pageText}
                          onChange={(e) => handleBodyPageChange(index, e.target.value)}
                          className="w-full flex-1 border-2 border-slate-100 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed focus:border-teal-500 focus:bg-white focus:outline-none resize-none"
                          placeholder="Detail your methodology, observations, interpretation..."
                        />
                        {index === formData.bodyPages.length - 1 && (
                          <button
                            type="button"
                            onClick={addBodyPage}
                            className="mt-4 w-full rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-bold text-teal-600 hover:border-teal-500 hover:bg-teal-50 transition-colors"
                          >
                            + ADD NEW PAGE
                          </button>
                        )}
                      </div>
                    </Page>
                  ))}

                  {/* FINAL PAGE: Sources & Submit */}
                  <Page number={totalPages}>
                    <h3 className="text-xl font-black text-slate-800 mb-6">Sources & Publish</h3>
                    <div className="flex-1 flex flex-col">
                      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                        {formData.sources.map((source, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input
                              type="url"
                              value={source}
                              onChange={(e) => handleSourceChange(index, e.target.value)}
                              className="w-full border-b-2 border-slate-200 bg-transparent py-2 px-1 text-sm focus:border-teal-500 focus:outline-none"
                              placeholder="https://..."
                            />
                            {formData.sources.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeSourceField(index)}
                                className="text-rose-500 hover:text-rose-600 p-2"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addSourceField}
                          className="text-xs font-bold text-teal-600 hover:text-teal-700 mt-2"
                        >
                          + ADD SOURCE
                        </button>
                      </div>

                      <div className="pt-6 mt-auto">
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !formData.title || !formData.bodyPages[0] || !formData.field}
                          className="w-full rounded-xl bg-slate-900 py-4 text-sm font-black text-white hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-lg"
                        >
                          {isSubmitting ? (
                            <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Publishing...</>
                          ) : (
                            <><i className="fa-solid fa-paper-plane mr-2"></i>Publish Research</>
                          )}
                        </button>
                        {(!formData.title || !formData.bodyPages[0] || !formData.field) && (
                          <p className="text-center text-[10px] text-rose-500 mt-2 font-bold uppercase tracking-wider">
                            Fill Title, Field & Body to publish
                          </p>
                        )}
                      </div>
                    </div>
                  </Page>
                </HTMLFlipBook>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="mt-8 flex w-full max-w-[400px] justify-between items-center px-4 sm:max-w-[500px]">
              {currentPage > 0 ? (
                <button
                  type="button"
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
                  type="button"
                  onClick={() => flipBookRef.current?.pageFlip()?.flipNext()}
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-100 border border-slate-200 shadow-sm bg-white min-w-[110px] justify-center"
                >
                  <span>Next</span> <i className="fa-solid fa-chevron-right"></i>
                </button>
              ) : <div className="min-w-[110px]" />}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResearchForm;
