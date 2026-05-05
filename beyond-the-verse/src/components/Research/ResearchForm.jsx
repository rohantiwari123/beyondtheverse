import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const ResearchForm = ({ showToast }) => {
  const { isAuthenticated, userName, userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    field: '',
    title: '',
    body: '',
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
        field: formData.field,
        title: formData.title,
        body: formData.body,
        sources: formData.sources.filter(source => source.trim() !== ''),
        authorId: userId,
        authorName: userName || 'Anonymous Researcher',
        createdAt: serverTimestamp()
      });
      
      showToast("Research published successfully!", true);

      setFormData({
        field: '',
        title: '',
        body: '',
        sources: ['']
      });
    } catch (error) {
      console.error("Error publishing research:", error);
      showToast("Failed to publish research. Please try again later.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card-base mb-12">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <i className="fa-solid fa-pen-nib text-teal-600"></i> Publish Your Research
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        <div>
          <label className="font-bold text-slate-700 block mb-2 text-sm">Research Field Name</label>
          <input 
            type="text" 
            name="field" 
            value={formData.field} 
            onChange={handleInputChange} 
            required 
            className="input-base"
            placeholder="e.g., Artificial Intelligence, Quantum Physics..." 
          />
        </div>
        
        <div>
          <label className="font-bold text-slate-700 block mb-2 text-sm">Research Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange} 
            required 
            className="input-base"
            placeholder="Enter the title of your research" 
          />
        </div>
        
        <div>
          <label className="font-bold text-slate-700 block mb-2 text-sm">Main Body of Research</label>
          <textarea 
            name="body" 
            value={formData.body} 
            onChange={handleInputChange} 
            required 
            rows="8"
            className="textarea-base"
            placeholder="Detail your findings here..." 
          />
        </div>
        
        <div>
          <label className="font-bold text-slate-700 block mb-2 text-sm">Sources / References</label>
          <div className="flex flex-col gap-3">
            {formData.sources.map((source, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fa-solid fa-link text-slate-400 text-sm"></i>
                  </div>
                  <input 
                    type="url" 
                    value={source} 
                    onChange={(e) => handleSourceChange(index, e.target.value)} 
                    required
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
                    <i className="fa-solid fa-trash-can sm:hidden mr-2"></i>Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button 
            type="button" 
            onClick={addSourceField} 
            className="btn-secondary mt-3 w-max"
          >
            <i className="fa-solid fa-plus"></i> Add Another Source
          </button>
        </div>

        <div className="pt-4 mt-2 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-dark w-full sm:w-auto"
          >
            {isSubmitting ? (
              <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Publishing...</>
            ) : (
              'Submit Research'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResearchForm;