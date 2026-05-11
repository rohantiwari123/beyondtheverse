import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Single Quill Editor tailored for academic writing
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
    <div className="flex flex-col h-full quill-editor-wrapper bg-white border border-slate-300 rounded-lg">
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
        className="flex-1 flex flex-col h-[500px]"
      />
    </div>
  );
};

const ResearchForm = ({ showToast }) => {
  const { isAuthenticated, userName, userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    field: "",
    title: "",
    abstract: "",
    body: "",
    tags: "",
    sources: [""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const prefillIMRAD = () => {
    setFormData({
      ...formData,
      body: `
        <h2>Introduction</h2>
        <p>State your research problem, background context, and objectives here...</p>
        <br>
        <h2>Methodology</h2>
        <p>Describe your research design, materials, and procedures here...</p>
        <br>
        <h2>Results</h2>
        <p>Present your empirical findings and data here without interpretation...</p>
        <br>
        <h2>Discussion</h2>
        <p>Interpret the results, discuss implications, and acknowledge limitations...</p>
        <br>
        <h2>Conclusion</h2>
        <p>Summarize the main findings and suggest future work...</p>
      `
    });
    if (showToast) showToast("IMRAD Template Applied", true);
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
        body: formData.body.trim(),
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
        body: "",
        tags: "",
        sources: [""],
      });
      setIsExpanded(false);
    } catch (error) {
      console.error("Error publishing research:", error);
      showToast("Failed to publish research. Please try again later.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="overflow-hidden border-y border-slate-200 bg-slate-50 shadow-sm sm:rounded-[2rem] sm:border mb-12">
      <style>{`
        .quill-editor-wrapper .ql-container {
          flex: 1;
          font-family: "Times New Roman", Times, serif !important;
          font-size: 12pt;
          line-height: 1.5;
          border: none !important;
        }
        .quill-editor-wrapper .ql-editor {
          padding: 1in;
          min-height: 500px;
        }
        @media (max-width: 640px) {
          .quill-editor-wrapper .ql-editor {
            padding: 1.5rem;
          }
        }
        .quill-editor-wrapper .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
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
            Academic Publisher
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
            Submit Academic Paper
          </h2>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
          <i className={`fa-solid ${isExpanded ? "fa-minus" : "fa-plus"}`}></i>
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-slate-100 py-10 w-full px-4 sm:px-10">
          
          <div className="mx-auto w-full max-w-[816px] space-y-8">
            
            {/* Document Header Info */}
            <div className="bg-white p-6 sm:p-10 shadow-sm border border-slate-200 rounded-xl space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Research Field</label>
                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  placeholder="e.g., Cognitive Science, Educational Technology..."
                  className="w-full border-b-2 border-slate-200 py-2 focus:border-teal-500 focus:outline-none placeholder-slate-300 font-serif text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Title</label>
                <textarea
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a formal research title..."
                  className="w-full border-b-2 border-slate-200 py-2 focus:border-teal-500 focus:outline-none resize-none placeholder-slate-300 font-serif text-2xl font-bold"
                  rows={2}
                />
              </div>
            </div>

            {/* Abstract */}
            <div className="bg-white p-6 sm:p-10 shadow-sm border border-slate-200 rounded-xl space-y-4">
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Abstract (150-250 Words)</label>
               <textarea
                 name="abstract"
                 value={formData.abstract}
                 onChange={handleInputChange}
                 placeholder="Provide a concise summary of the research question, methods, results, and conclusions..."
                 className="w-full border rounded-lg border-slate-200 p-4 focus:border-teal-500 focus:outline-none resize-y placeholder-slate-300 font-serif text-[12pt] leading-[1.5]"
                 rows={5}
               />
            </div>

            {/* Main Body (IMRAD) */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Main Manuscript (IMRAD Format)</label>
                <button onClick={prefillIMRAD} type="button" className="text-[10px] font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors uppercase tracking-widest border border-teal-200">
                  <i className="fa-solid fa-wand-magic-sparkles mr-1"></i> Apply IMRAD Template
                </button>
              </div>
              <QuillEditor 
                value={formData.body}
                onChange={(val) => setFormData({...formData, body: val})}
                placeholder="Begin writing your research paper here..."
              />
            </div>

            {/* References & Tags */}
            <div className="bg-white p-6 sm:p-10 shadow-sm border border-slate-200 rounded-xl grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Keywords</h3>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full border-b-2 border-slate-200 py-2 text-sm focus:border-teal-500 focus:outline-none placeholder-slate-300 font-serif"
                  placeholder="ethics, education (comma separated)"
                />
              </div>
              <div>
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">References / Bibliography</h3>
                <div className="space-y-3">
                  {formData.sources.map((source, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="url"
                        value={source}
                        onChange={(e) => handleSourceChange(index, e.target.value)}
                        className="w-full border-b-2 border-slate-200 py-2 text-sm focus:border-teal-500 focus:outline-none placeholder-slate-300 font-serif"
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
                    + Add Reference
                  </button>
                </div>
              </div>
            </div>

            {/* PUBLISH BUTTON */}
            <div className="pt-6 pb-12 flex justify-center">
               <button
                 onClick={handleSubmit}
                 disabled={isSubmitting || !formData.title || !formData.body || !formData.field}
                 className="w-full max-w-md rounded-2xl bg-slate-900 py-5 text-[14px] font-black tracking-wide text-white hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl hover:-translate-y-1"
               >
                 {isSubmitting ? (
                   <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Publishing...</>
                 ) : (
                   <><i className="fa-solid fa-paper-plane mr-2"></i>Submit Research Paper</>
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