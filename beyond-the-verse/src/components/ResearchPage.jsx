import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ResearchPage = () => {
  const { isAuthenticated, userName, userId } = useAuth();
  
  // State to store the list of submitted researches from database
  const [researches, setResearches] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to manage the current form input
  const [formData, setFormData] = useState({
    field: '',
    title: '',
    body: '',
    sources: [''] // Starts with one empty source input
  });

  // Fetch researches from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, 'researches'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const researchList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResearches(researchList);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Handle basic text inputs (field, title, body)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes for specific source links
  const handleSourceChange = (index, value) => {
    const newSources = [...formData.sources];
    newSources[index] = value;
    setFormData({ ...formData, sources: newSources });
  };

  // Add a new empty source field
  const addSourceField = () => {
    setFormData({ ...formData, sources: [...formData.sources, ''] });
  };

  // Remove a source field by its index
  const removeSourceField = (index) => {
    const newSources = formData.sources.filter((_, i) => i !== index);
    setFormData({ ...formData, sources: newSources });
  };

  // Handle form submission to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert("You must be logged in to publish research.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Add the new research to the Firestore 'researches' collection
      await addDoc(collection(db, 'researches'), {
        field: formData.field,
        title: formData.title,
        body: formData.body,
        sources: formData.sources.filter(source => source.trim() !== ''), // Filter out empty sources
        authorId: userId,
        authorName: userName || 'Anonymous Researcher',
        createdAt: serverTimestamp()
      });

      // Clear the form for the next entry
      setFormData({
        field: '',
        title: '',
        body: '',
        sources: ['']
      });
    } catch (error) {
      console.error("Error publishing research:", error);
      alert("Failed to publish research. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 mt-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-cabinet">
          Community <span className="text-teal-600">Research</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Publish your findings, share knowledge, and explore community research.
        </p>
      </div>
      
      {/* --- FORM SECTION --- */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm mb-12">
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all bg-slate-50 focus:bg-white"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all bg-slate-50 focus:bg-white"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-y bg-slate-50 focus:bg-white"
              placeholder="Detail your findings here..." 
            />
          </div>
          
          <div>
            <label className="font-bold text-slate-700 block mb-2 text-sm">Sources / References</label>
            <div className="flex flex-col gap-3">
              {formData.sources.map((source, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fa-solid fa-link text-slate-400 text-sm"></i>
                    </div>
                    <input 
                      type="url" 
                      value={source} 
                      onChange={(e) => handleSourceChange(index, e.target.value)} 
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all bg-slate-50 focus:bg-white"
                      placeholder="https://example-source.com" 
                    />
                  </div>
                    
                  {formData.sources.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeSourceField(index)} 
                      className="px-4 py-3 bg-rose-50 text-rose-600 font-bold border border-rose-100 rounded-xl hover:bg-rose-100 transition-colors"
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
              className="mt-3 px-4 py-2 bg-slate-100 text-slate-600 font-medium border border-slate-200 rounded-xl hover:bg-slate-200 transition-colors text-sm flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i> Add Another Source
            </button>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-3.5 font-bold rounded-xl transition-colors shadow-sm text-[15px] ${
                isSubmitting 
                ? 'bg-teal-400 text-white cursor-not-allowed' 
                : 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-600/20'
              }`}
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

      {/* --- DISPLAY SECTION --- */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
          Published Researches
        </h2>
        
        {researches.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl border-dashed">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <i className="fa-solid fa-microscope text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No research yet</h3>
            <p className="text-slate-500">Be the first to share your knowledge with the community!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {researches.map((res) => (
              <div key={res.id} className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <span className="inline-block bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-teal-100 self-start">
                    {res.field}
                  </span>
                  
                  {/* Optional: Show author name */}
                  {res.authorName && (
                    <div className="text-sm text-slate-500 flex items-center gap-2 font-medium bg-slate-50 px-3 py-1.5 rounded-lg">
                      <i className="fa-solid fa-user-astronaut text-slate-400"></i>
                      {res.authorName}
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{res.title}</h3>
                
                <div className="prose prose-slate max-w-none mb-6 text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {res.body}
                </div>
                
                {res.sources && res.sources.length > 0 && res.sources[0] !== '' && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <i className="fa-solid fa-bookmark text-slate-400"></i> Sources
                    </h4>
                    <ul className="space-y-2">
                      {res.sources.map((src, i) => (
                        <li key={i}>
                          <a 
                            href={src} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-teal-600 hover:text-teal-800 hover:underline flex items-start gap-2 break-all text-[15px]"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square mt-1 text-[12px] opacity-70 shrink-0"></i>
                            {src}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPage;