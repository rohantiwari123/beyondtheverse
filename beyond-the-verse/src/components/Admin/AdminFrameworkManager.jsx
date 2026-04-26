import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AdminFrameworkManager({ showToast }) {
  const [scales, setScales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 Global Intro States
  const [isSavingIntro, setIsSavingIntro] = useState(false);
  const [introForm, setIntroForm] = useState({
    pageLabel: 'Beyond The Verse',
    pageTitle: 'The Knowledge Tree',
    shortDescription: 'A comprehensive mapping of reality, moving from the macro physical laws to the micro architecture of human cognition.',
    mainBody: '',
    coreThesis: ''
  });

  // Form states for Page (Scale)
  const [editingScaleId, setEditingScaleId] = useState(null);
  const [scaleForm, setScaleForm] = useState({ 
    title: '', 
    description: '', 
    orderNumber: '',
    mappingRationale: '',
    inquiryNodes: [''],
    subsections: []
  });

  useEffect(() => {
    // 🌟 Fetch Global Intro
    const fetchIntro = async () => {
      try {
        const docRef = doc(db, 'settings', 'framework_intro');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIntroForm(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching intro:", error);
      }
    };
    fetchIntro();

    // Fetch Pages (Scales)
    const q = query(collection(db, 'framework_scales'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
      setScales(data);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching framework data:", error);
      showToast("Failed to load data.", false);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🌟 Save Global Intro
  const handleSaveIntro = async () => {
    setIsSavingIntro(true);
    try {
      await setDoc(doc(db, 'settings', 'framework_intro'), introForm, { merge: true });
      showToast("Global Book Intro saved successfully! 📖");
    } catch (error) {
      console.error("Error saving intro:", error);
      showToast("Error saving intro.", false);
    } finally {
      setIsSavingIntro(false);
    }
  };

  // --- Page (Scale) Handlers ---
  const handleAddInquiryNode = () => {
    setScaleForm(prev => ({ ...prev, inquiryNodes: [...prev.inquiryNodes, ''] }));
  };

  const handleInquiryNodeChange = (index, value) => {
    const newNodes = [...scaleForm.inquiryNodes];
    newNodes[index] = value;
    setScaleForm(prev => ({ ...prev, inquiryNodes: newNodes }));
  };

  const handleRemoveInquiryNode = (index) => {
    const newNodes = scaleForm.inquiryNodes.filter((_, i) => i !== index);
    setScaleForm(prev => ({ ...prev, inquiryNodes: newNodes.length ? newNodes : [''] }));
  };

  // Subsections Handlers
  const handleAddSubsection = () => {
    setScaleForm(prev => ({ ...prev, subsections: [...(prev.subsections || []), { heading: '', explanation: '' }] }));
  };

  const handleSubsectionChange = (index, field, value) => {
    const newSubsections = [...(scaleForm.subsections || [])];
    newSubsections[index][field] = value;
    setScaleForm(prev => ({ ...prev, subsections: newSubsections }));
  };

  const handleRemoveSubsection = (index) => {
    const newSubsections = (scaleForm.subsections || []).filter((_, i) => i !== index);
    setScaleForm(prev => ({ ...prev, subsections: newSubsections }));
  };

  const handleSaveScale = async () => {
    if (!scaleForm.title || !scaleForm.orderNumber || !scaleForm.mappingRationale) {
      showToast("Title, Order Number, and Detailed Explanation are required.", false);
      return;
    }

    try {
      const cleanInquiryNodes = scaleForm.inquiryNodes.filter(n => n.trim() !== '');
      const cleanSubsections = (scaleForm.subsections || []).filter(sub => sub.heading.trim() !== '' || sub.explanation.trim() !== '');

      const payload = {
        title: scaleForm.title,
        description: scaleForm.description,
        orderNumber: Number(scaleForm.orderNumber),
        mappingRationale: scaleForm.mappingRationale,
        inquiryNodes: cleanInquiryNodes,
        subsections: cleanSubsections
      };

      if (editingScaleId) {
        await updateDoc(doc(db, 'framework_scales', editingScaleId), payload);
        showToast("Page updated successfully.");
      } else {
        await addDoc(collection(db, 'framework_scales'), payload);
        showToast("Page added successfully.");
      }

      setEditingScaleId(null);
      setScaleForm({ title: '', description: '', orderNumber: '', mappingRationale: '', inquiryNodes: [''], subsections: [] });
    } catch (error) {
      console.error("Error saving page:", error);
      showToast("Error saving page.", false);
    }
  };

  const handleDeleteScale = async (scaleId) => {
    if (window.confirm("Are you sure you want to delete this entire page?")) {
      try {
        await deleteDoc(doc(db, 'framework_scales', scaleId));
        showToast("Page deleted.");
      } catch (error) {
        console.error("Error deleting page:", error);
        showToast("Error deleting page.", false);
      }
    }
  };

  const handleEditScale = (scale) => {
    setEditingScaleId(scale.id);
    setScaleForm({ 
      title: scale.title, 
      description: scale.description || '', 
      orderNumber: scale.orderNumber,
      mappingRationale: scale.mappingRationale || '',
      inquiryNodes: scale.inquiryNodes?.length ? scale.inquiryNodes : [''],
      subsections: scale.subsections || []
    });
  };

  const cancelEditScale = () => {
    setEditingScaleId(null);
    setScaleForm({ title: '', description: '', orderNumber: '', mappingRationale: '', inquiryNodes: [''], subsections: [] });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-8 w-8 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* 🌟 1. Global Intro Form 🌟 */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
          <i className="fa-solid fa-book-open text-teal-600"></i> Book Cover & Intro
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative z-10">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Top Label</label>
            <input 
              type="text" value={introForm.pageLabel} onChange={e => setIntroForm({...introForm, pageLabel: e.target.value})} 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Main Title</label>
            <input 
              type="text" value={introForm.pageTitle} onChange={e => setIntroForm({...introForm, pageTitle: e.target.value})} 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 outline-none font-serif"
            />
          </div>
        </div>

        <div className="mb-4 relative z-10">
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Short Description (Italics)</label>
          <textarea 
            value={introForm.shortDescription} onChange={e => setIntroForm({...introForm, shortDescription: e.target.value})} 
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 outline-none h-16"
          />
        </div>

        <div className="mb-4 relative z-10">
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Main Body Paragraphs</label>
          <textarea 
            value={introForm.mainBody} onChange={e => setIntroForm({...introForm, mainBody: e.target.value})} 
            className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-teal-500 focus:ring-1 outline-none h-32 leading-relaxed"
            placeholder="Type your main introduction paragraphs here. Use 'Enter' to create new paragraphs."
          />
        </div>

        <div className="mb-6 relative z-10">
          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide text-teal-700">
            <i className="fa-solid fa-quote-left mr-1"></i> Core Thesis / Highlight Quote
          </label>
          <textarea 
            value={introForm.coreThesis} onChange={e => setIntroForm({...introForm, coreThesis: e.target.value})} 
            className="w-full border-2 border-teal-200 bg-teal-50 rounded-lg p-3 text-sm focus:border-teal-500 outline-none h-24 font-serif italic"
            placeholder="Core Thesis: The separation between the observer..."
          />
        </div>

        <button 
          onClick={handleSaveIntro} disabled={isSavingIntro}
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
        >
          {isSavingIntro ? 'Saving...' : 'Save Intro & Cover'}
        </button>
      </div>

      {/* Add / Edit Page Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">{editingScaleId ? 'Edit Page' : 'Add New Page'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Page Title (Chapter)</label>
            <input 
              type="text" value={scaleForm.title} onChange={e => setScaleForm({...scaleForm, title: e.target.value})} 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
              placeholder="e.g. The Outer World"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Display Order (Number)</label>
            <input 
              type="number" value={scaleForm.orderNumber} onChange={e => setScaleForm({...scaleForm, orderNumber: e.target.value})} 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
              placeholder="e.g. 1"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
          <textarea 
            value={scaleForm.description} onChange={e => setScaleForm({...scaleForm, description: e.target.value})} 
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none h-16"
            placeholder="Brief intro for the page..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Explanation (Philosophy)</label>
          <textarea 
            value={scaleForm.mappingRationale} onChange={e => setScaleForm({...scaleForm, mappingRationale: e.target.value})} 
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none h-32"
            placeholder="Main text content for this page..."
          />
        </div>

        {/* Optional Subsections */}
        <div className="mb-6 border border-slate-200 rounded-lg p-4 bg-slate-50">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-bold text-slate-700">Sub Points / Subsections (Optional)</label>
            <button onClick={handleAddSubsection} className="text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center gap-1">
              <i className="fa-solid fa-plus text-xs"></i> Add Sub Point
            </button>
          </div>
          
          {(!scaleForm.subsections || scaleForm.subsections.length === 0) && (
            <p className="text-sm text-slate-400 italic">No sub points added. Add one if you need sections like 1.1, 1.2, etc.</p>
          )}

          <div className="space-y-4">
            {(scaleForm.subsections || []).map((sub, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded p-3 relative">
                <button 
                  onClick={() => handleRemoveSubsection(index)} 
                  className="absolute top-3 right-3 text-rose-500 hover:text-rose-700"
                  title="Remove Sub Point"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                <div className="mb-2 pr-8">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Sub Heading (e.g. 1.1 The Illusion of Separation)</label>
                  <input 
                    type="text" value={sub.heading} onChange={e => handleSubsectionChange(index, 'heading', e.target.value)} 
                    className="w-full border border-slate-300 rounded p-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                    placeholder="Enter sub heading..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Explanation</label>
                  <textarea 
                    value={sub.explanation} onChange={e => handleSubsectionChange(index, 'explanation', e.target.value)} 
                    className="w-full border border-slate-300 rounded p-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none h-20"
                    placeholder="Enter explanation for this sub point..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-700">Lines of Inquiry (Bullet Points)</label>
            <button onClick={handleAddInquiryNode} className="text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center gap-1">
              <i className="fa-solid fa-plus text-xs"></i> Add Question
            </button>
          </div>
          <div className="space-y-3">
            {scaleForm.inquiryNodes.map((node, index) => (
              <div key={index} className="flex gap-2">
                <input 
                  type="text" value={node} onChange={e => handleInquiryNodeChange(index, e.target.value)} 
                  className="flex-1 border border-slate-300 rounded-lg p-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                  placeholder="e.g. How does this apply to consciousness?"
                />
                <button onClick={() => handleRemoveInquiryNode(index)} className="text-rose-500 hover:bg-rose-50 px-3 rounded-lg border border-transparent transition-colors">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSaveScale} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            {editingScaleId ? 'Update Page' : 'Add Page'}
          </button>
          {editingScaleId && (
            <button onClick={cancelEditScale} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Pages List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">All Pages</h3>
        {scales.map(scale => (
          <div key={scale.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {Number(scale.orderNumber) > 0 && (
                    <span className="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded">Order: {scale.orderNumber}</span>
                  )}
                  <h3 className="text-lg font-bold text-slate-800">{scale.title}</h3>
                </div>
                <p className="text-sm text-slate-600 mb-2 italic">{scale.description}</p>
                <p className="text-sm text-slate-700 line-clamp-3 mb-3">{scale.mappingRationale}</p>
                
                {scale.subsections && scale.subsections.length > 0 && (
                  <div className="mb-3 pl-4 border-l-2 border-slate-200">
                    <p className="text-xs font-bold text-slate-400 mb-1">SUB POINTS ({scale.subsections.length}):</p>
                    <ul className="list-disc pl-4 text-sm text-slate-600">
                      {scale.subsections.map((sub, i) => (
                        <li key={i} className="line-clamp-1">{sub.heading || 'Untitled Sub Point'}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {scale.inquiryNodes && scale.inquiryNodes.length > 0 && (
                  <div className="pl-4 border-l-2 border-slate-200">
                    <p className="text-xs font-bold text-slate-400 mb-1">INQUIRY NODES:</p>
                    <ul className="list-disc pl-4 text-sm text-slate-600">
                      {scale.inquiryNodes.map((node, i) => (
                        <li key={i}>{node}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEditScale(scale)} className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-blue-200">
                  <i className="fa-solid fa-pen mr-1.5"></i> Edit
                </button>
                <button onClick={() => handleDeleteScale(scale.id)} className="text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-rose-200">
                  <i className="fa-solid fa-trash mr-1.5"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {scales.length === 0 && (
          <p className="text-slate-500 italic">No pages created yet.</p>
        )}
      </div>

    </div>
  );
}