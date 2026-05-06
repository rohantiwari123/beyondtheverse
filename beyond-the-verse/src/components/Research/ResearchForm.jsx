import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const ResearchForm = ({ showToast }) => {
  const { isAuthenticated, userName, userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    field: '',
    title: '',
    abstract: '',
    body: '',
    tags: '',
    sources: ['']
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
    setFormData({ ...formData, sources: [...formData.sources, ''] });
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
      await addDoc(collection(db, 'researches'), {
        field: formData.field.trim(),
        title: formData.title.trim(),
        abstract: formData.abstract.trim(),
        body: formData.body.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        sources: formData.sources.filter(source => source.trim() !== ''),
        authorId: userId,
        authorName: userName || 'Anonymous Researcher',
        createdAt: serverTimestamp()
      });
      
      showToast("Research published successfully!", true);

      setFormData({
        field: '',
        title: '',
        abstract: '',
        body: '',
        tags: '',
        sources: ['']
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
    <section className="overflow-hidden border-y border-slate-200 bg-white shadow-sm sm:rounded-[2rem] sm:border">
      <button
        type="button"
        onClick={() => setIsExpanded(prev => !prev)}
        className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left sm:px-6"
      >
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-teal-600">Admin Studio</p>
          <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
            Publish Advanced Research
          </h2>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
          <i className={`fa-solid ${isExpanded ? 'fa-minus' : 'fa-plus'}`}></i>
        </span>
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="grid gap-5 border-t border-slate-100 px-4 pb-6 pt-5 sm:px-6 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-black text-slate-700">Research Field</label>
            <input
              type="text"
              name="field"
              value={formData.field}
              onChange={handleInputChange}
              required
              className="input-base"
              placeholder="Artificial Intelligence, Quantum Physics..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-slate-700">Keywords</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="input-base"
              placeholder="ethics, education, cognition"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-black text-slate-700">Research Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="input-base"
              placeholder="Enter a concise, searchable title"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-black text-slate-700">Abstract / Executive Summary</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleInputChange}
              rows="3"
              className="textarea-base"
              placeholder="Summarize the key question, method, and finding..."
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-black text-slate-700">Main Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              required
              rows="10"
              className="textarea-base"
              placeholder="Detail your methodology, observations, interpretation, and limitations..."
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-black text-slate-700">Sources / References</label>
            <div className="space-y-3">
              {formData.sources.map((source, index) => (
                <div key={index} className="grid gap-2 sm:grid-cols-[1fr_auto]">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <i className="fa-solid fa-link text-sm text-slate-400"></i>
                    </div>
                    <input
                      type="url"
                      value={source}
                      onChange={(e) => handleSourceChange(index, e.target.value)}
                      className="input-with-icon"
                      placeholder="https://example-source.com"
                    />
                  </div>

                  {formData.sources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSourceField(index)}
                      className="btn-danger shrink-0"
                    >
                      <i className="fa-solid fa-trash-can sm:hidden"></i>Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button type="button" onClick={addSourceField} className="btn-secondary mt-3 w-full sm:w-max">
              <i className="fa-solid fa-plus"></i> Add Source
            </button>
          </div>

          <div className="border-t border-slate-100 pt-5 lg:col-span-2">
            <button type="submit" disabled={isSubmitting} className="btn-dark w-full sm:w-auto">
              {isSubmitting ? (
                <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Publishing...</>
              ) : (
                <><i className="fa-solid fa-paper-plane mr-2"></i>Submit Research</>
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ResearchForm;
