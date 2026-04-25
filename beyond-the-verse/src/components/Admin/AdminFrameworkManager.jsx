import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AdminFrameworkManager({ showToast }) {
  const [scales, setScales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states for Category (Database me abhi bhi 'scale' hi rahega taaki code break na ho)
  const [editingScaleId, setEditingScaleId] = useState(null);
  const [scaleForm, setScaleForm] = useState({ title: '', description: '', orderNumber: '' });

  // Form states for Subject
  const [editingSubjectScaleId, setEditingSubjectScaleId] = useState(null);
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [subjectForm, setSubjectForm] = useState({ subjectName: '', mappingRationale: '', inquiryNodes: [''] });

  useEffect(() => {
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

  // --- Category (Scale) Handlers ---
  const handleSaveScale = async () => {
    if (!scaleForm.title || !scaleForm.orderNumber) {
      showToast("Title and Order Number are required.", false);
      return;
    }

    try {
      const payload = {
        title: scaleForm.title,
        description: scaleForm.description,
        orderNumber: Number(scaleForm.orderNumber),
      };

      if (editingScaleId) {
        await updateDoc(doc(db, 'framework_scales', editingScaleId), payload);
        showToast("Category updated successfully.");
      } else {
        payload.subjects = [];
        await addDoc(collection(db, 'framework_scales'), payload);
        showToast("Category added successfully.");
      }

      setEditingScaleId(null);
      setScaleForm({ title: '', description: '', orderNumber: '' });
    } catch (error) {
      console.error("Error saving category:", error);
      showToast("Error saving category.", false);
    }
  };

  const handleDeleteScale = async (scaleId) => {
    if (window.confirm("Are you sure you want to delete this entire category?")) {
      try {
        await deleteDoc(doc(db, 'framework_scales', scaleId));
        showToast("Category deleted.");
      } catch (error) {
        console.error("Error deleting category:", error);
        showToast("Error deleting category.", false);
      }
    }
  };

  const handleEditScale = (scale) => {
    setEditingScaleId(scale.id);
    setScaleForm({ title: scale.title, description: scale.description || '', orderNumber: scale.orderNumber });
  };

  const cancelEditScale = () => {
    setEditingScaleId(null);
    setScaleForm({ title: '', description: '', orderNumber: '' });
  };

  // --- Subject Handlers ---
  const openSubjectForm = (scaleId, subject = null) => {
    setEditingSubjectScaleId(scaleId);
    if (subject) {
      setEditingSubjectId(subject.id);
      setSubjectForm({ ...subject });
    } else {
      setEditingSubjectId(null);
      setSubjectForm({ subjectName: '', mappingRationale: '', inquiryNodes: [''] });
    }
  };

  const cancelSubjectForm = () => {
    setEditingSubjectScaleId(null);
    setEditingSubjectId(null);
    setSubjectForm({ subjectName: '', mappingRationale: '', inquiryNodes: [''] });
  };

  const handleAddInquiryNode = () => {
    setSubjectForm(prev => ({ ...prev, inquiryNodes: [...prev.inquiryNodes, ''] }));
  };

  const handleInquiryNodeChange = (index, value) => {
    const newNodes = [...subjectForm.inquiryNodes];
    newNodes[index] = value;
    setSubjectForm(prev => ({ ...prev, inquiryNodes: newNodes }));
  };

  const handleRemoveInquiryNode = (index) => {
    const newNodes = subjectForm.inquiryNodes.filter((_, i) => i !== index);
    setSubjectForm(prev => ({ ...prev, inquiryNodes: newNodes.length ? newNodes : [''] }));
  };

  const handleSaveSubject = async () => {
    if (!subjectForm.subjectName || !subjectForm.mappingRationale) {
      showToast("Subject Name and Explanation are required.", false);
      return;
    }

    try {
      const scaleRef = doc(db, 'framework_scales', editingSubjectScaleId);
      const scaleToUpdate = scales.find(s => s.id === editingSubjectScaleId);
      let newSubjects = [...(scaleToUpdate.subjects || [])];

      const cleanInquiryNodes = subjectForm.inquiryNodes.filter(n => n.trim() !== '');

      const subjectData = {
        id: editingSubjectId || Date.now().toString(),
        subjectName: subjectForm.subjectName,
        mappingRationale: subjectForm.mappingRationale,
        inquiryNodes: cleanInquiryNodes
      };

      if (editingSubjectId) {
        newSubjects = newSubjects.map(sub => sub.id === editingSubjectId ? subjectData : sub);
      } else {
        newSubjects.push(subjectData);
      }

      await updateDoc(scaleRef, { subjects: newSubjects });
      showToast(editingSubjectId ? "Subject updated." : "Subject added.");
      cancelSubjectForm();
    } catch (error) {
      console.error("Error saving subject:", error);
      showToast("Error saving subject.", false);
    }
  };

  const handleDeleteSubject = async (scaleId, subjectId) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        const scaleRef = doc(db, 'framework_scales', scaleId);
        const scaleToUpdate = scales.find(s => s.id === scaleId);
        const newSubjects = scaleToUpdate.subjects.filter(sub => sub.id !== subjectId);
        await updateDoc(scaleRef, { subjects: newSubjects });
        showToast("Subject deleted.");
      } catch (error) {
        console.error("Error deleting subject:", error);
        showToast("Error deleting subject.", false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-8 w-8 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add / Edit Category Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">{editingScaleId ? 'Edit Category' : 'Add New Category'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category Title (e.g. Chapter 1: The Physical World)</label>
            <input 
              type="text" 
              value={scaleForm.title} 
              onChange={e => setScaleForm({...scaleForm, title: e.target.value})} 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
              placeholder="Category Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Display Order (Number)</label>
            <input 
              type="number" 
              value={scaleForm.orderNumber} 
              onChange={e => setScaleForm({...scaleForm, orderNumber: e.target.value})} 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
              placeholder="e.g. 1"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
          <textarea 
            value={scaleForm.description} 
            onChange={e => setScaleForm({...scaleForm, description: e.target.value})} 
            className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none h-24"
            placeholder="What is this category about?"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={handleSaveScale} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            {editingScaleId ? 'Update Category' : 'Add Category'}
          </button>
          {editingScaleId && (
            <button onClick={cancelEditScale} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-6">
        {scales.map(scale => (
          <div key={scale.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 border-b border-slate-200 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded">Order: {scale.orderNumber}</span>
                  <h3 className="text-lg font-bold text-slate-800">{scale.title}</h3>
                </div>
                <p className="text-sm text-slate-600">{scale.description}</p>
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

            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-base font-semibold text-slate-700">Subjects ({scale.subjects?.length || 0})</h4>
                <button onClick={() => openSubjectForm(scale.id)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-plus"></i> Add Subject
                </button>
              </div>

              {/* Subjects List */}
              <div className="space-y-3">
                {scale.subjects && scale.subjects.map(subject => (
                  <div key={subject.id} className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h5 className="font-bold text-slate-800 mb-1">{subject.subjectName}</h5>
                        <p className="text-sm text-slate-600 line-clamp-2">{subject.mappingRationale}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => openSubjectForm(scale.id, subject)} className="text-slate-400 hover:text-blue-600 transition-colors">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button onClick={() => handleDeleteSubject(scale.id, subject.id)} className="text-slate-400 hover:text-rose-600 transition-colors">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {(!scale.subjects || scale.subjects.length === 0) && (
                  <p className="text-sm text-slate-400 italic">No subjects added to this category yet.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subject Modal/Overlay */}
      {editingSubjectScaleId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">{editingSubjectId ? 'Edit Subject' : 'Add New Subject'}</h3>
              <button onClick={cancelSubjectForm} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject Name</label>
                <input 
                  type="text" 
                  value={subjectForm.subjectName} 
                  onChange={e => setSubjectForm({...subjectForm, subjectName: e.target.value})} 
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                  placeholder="e.g. Physics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Explanation (Philosophy)</label>
                <textarea 
                  value={subjectForm.mappingRationale} 
                  onChange={e => setSubjectForm({...subjectForm, mappingRationale: e.target.value})} 
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none h-24"
                  placeholder="Explain how this subject fits into the Beyond the Verse concept..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-700">Key Questions / Topics to Explore</label>
                  <button onClick={handleAddInquiryNode} className="text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center gap-1">
                    <i className="fa-solid fa-plus text-xs"></i> Add Question
                  </button>
                </div>
                <div className="space-y-3">
                  {subjectForm.inquiryNodes.map((node, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={node} 
                        onChange={e => handleInquiryNodeChange(index, e.target.value)} 
                        className="flex-1 border border-slate-300 rounded-lg p-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
                        placeholder={`Question or Topic ${index + 1}`}
                      />
                      <button onClick={() => handleRemoveInquiryNode(index)} className="text-rose-500 hover:bg-rose-50 px-3 rounded-lg border border-transparent transition-colors">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button onClick={cancelSubjectForm} className="px-5 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={handleSaveSubject} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                Save Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}