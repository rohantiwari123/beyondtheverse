import React, { useState, useEffect } from 'react';

// 🌟 React Quill Library
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 

// Services
import { saveExamToDb, updateExamInDb, getAllExams, getAdminCategories, saveAdminCategories } from '../../services/firebaseServices';

// ==========================================
// 🎨 GLOBAL UI THEME (Reusable Styles)
// ==========================================
const UI_THEME = {
  label: "block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5",
  input: "w-full bg-white border border-slate-300 rounded-xl py-3 px-4 outline-none  focus:border-teal-500 text-slate-900 font-medium transition-all",
  card: "bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-5 sm:p-8",
  
  // Buttons
  btnPrimary: "bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wide transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2",
  btnDark: "bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm",
  btnDangerText: "text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-center",
  
  // Modals
  modalOverlay: "fixed inset-0 z-[100] flex items-center justify-center p-4",
  modalBackdrop: "absolute inset-0 bg-slate-900/40 backdrop-blur-sm",
  modalContainer: "bg-white rounded-2xl border border-slate-200 w-full relative z-10 animate-fade-in-up"
};

// ==========================================
// 🌟 CUSTOM NATIVE COMPONENTS
// ==========================================

// 1. Custom Dropdown
function CustomDropdown({ options, value, onChange, placeholder, widthClass = "w-full" }) {
  const [isOpen, setIsOpen] = useState(false);
  const displayLabel = value || placeholder;

  return (
    <div className={`relative ${widthClass}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white border ${isOpen ? 'border-teal-500' : 'border-slate-300 hover:border-slate-400'} rounded-xl py-3 px-4 flex justify-between items-center cursor-pointer transition-all`}
      >
        <span className={`text-[13px] font-medium ${!value ? 'text-slate-400' : 'text-slate-800'} truncate`}>{displayLabel}</span>
        <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`}></i>
      </div>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-300 rounded-xl z-50 max-h-56 overflow-y-auto animate-fade-in py-1 shadow-lg shadow-slate-200/50">
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`px-4 py-2.5 text-[13px] font-medium cursor-pointer transition-colors ${opt === value ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// 2. Custom Modal (Alert & Confirm)
function CustomModal({ config, onClose }) {
  if (!config.isOpen) return null;
  return (
    <div className={UI_THEME.modalOverlay}>
      <div className={UI_THEME.modalBackdrop} onClick={onClose}></div>
      <div className={`${UI_THEME.modalContainer} p-6 sm:p-8 max-w-sm`}>
        <div className="flex items-start gap-4 mb-5">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${config.type === 'confirm' ? 'bg-rose-50 text-rose-600' : 'bg-teal-50 text-teal-600'}`}>
            <i className={`fa-solid ${config.type === 'confirm' ? 'fa-triangle-exclamation' : 'fa-circle-info'} text-xl`}></i>
          </div>
          <div className="pt-1">
            <h3 className="text-lg font-bold text-slate-900 mb-1">{config.type === 'confirm' ? 'Are you sure?' : 'Notice'}</h3>
            <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">{config.message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          {config.type === 'confirm' && (
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 border border-transparent transition-colors">Cancel</button>
          )}
          <button 
            onClick={() => { config.onConfirm && config.onConfirm(); onClose(); }} 
            className={`px-6 py-2.5 ${config.type === 'confirm' ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'} rounded-xl text-xs font-bold transition-all active:scale-95`}
          >
            {config.type === 'confirm' ? 'Delete' : 'Okay'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. Category Manager Modal
function CategoryManager({ isOpen, onClose, categories, setCategories, onSelect }) {
  const [newCat, setNewCat] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (newCat.trim() && !categories.includes(newCat.trim())) {
      setCategories([...categories, newCat.trim()]);
      setNewCat("");
    }
  };

  const handleDelete = (cat) => {
    setCategories(categories.filter(c => c !== cat));
  };

  return (
    <div className={UI_THEME.modalOverlay}>
      <div className={UI_THEME.modalBackdrop} onClick={onClose}></div>
      <div className={`${UI_THEME.modalContainer} max-w-md flex flex-col max-h-[80vh]`}>
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><i className="fa-solid fa-tags text-teal-600"></i> Manage Categories</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex gap-2 mb-6">
            <input 
              type="text" value={newCat} onChange={(e)=>setNewCat(e.target.value)} 
              placeholder="Enter new category name..." 
              className={UI_THEME.input}
            />
            <button onClick={handleAdd} className={`${UI_THEME.btnDark} px-5`}>Add</button>
          </div>
          
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 bg-white border border-slate-200 rounded-xl group hover:border-slate-300 transition-all">
                <span className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">{cat}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { onSelect(cat); onClose(); }} className="text-[10px] font-bold uppercase tracking-wider text-teal-600 border border-teal-200 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-md transition-colors">Select</button>
                  <button onClick={() => handleDelete(cat)} className={`${UI_THEME.btnDangerText} h-7 w-7`}><i className="fa-solid fa-trash-can text-xs"></i></button>
                </div>
              </div>
            ))}
            {categories.length === 0 && <p className="text-xs font-medium text-slate-400 text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-300">No categories added yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Drafts Manager Modal
function DraftManager({ isOpen, onClose, drafts, onLoadDraft }) {
  if (!isOpen) return null;

  return (
    <div className={UI_THEME.modalOverlay}>
      <div className={UI_THEME.modalBackdrop} onClick={onClose}></div>
      <div className={`${UI_THEME.modalContainer} max-w-lg flex flex-col max-h-[80vh]`}>
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><i className="fa-solid fa-file-pen text-rose-600"></i> Load Draft</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-3">
            {drafts.map((draft, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-xl group hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer" onClick={() => onLoadDraft(draft)}>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{draft.title || "Untitled Draft"}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-widest">{draft.category || "Uncategorized"} • {draft.questions?.length || 0} Questions</p>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-wider text-teal-600 border border-teal-200 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">Load</button>
              </div>
            ))}
            {drafts.length === 0 && (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <i className="fa-solid fa-folder-open text-3xl text-slate-300 mb-3"></i>
                <p className="text-sm font-medium text-slate-500">No saved drafts found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🌟 MAIN COMPONENT
// ==========================================

export default function AdminExamEditor({ showToast }) {
  const [examTitle, setExamTitle] = useState("");
  const [examCategory, setExamCategory] = useState("");
  
  const [examDay, setExamDay] = useState("");
  const [examMonth, setExamMonth] = useState("");
  const [examYear, setExamYear] = useState("");
  
  const [examHour, setExamHour] = useState("");
  const [examMinute, setExamMinute] = useState("");
  const [examAmPm, setExamAmPm] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [editingExamId, setEditingExamId] = useState(null);
  const [isDraftsModalOpen, setIsDraftsModalOpen] = useState(false);

  useEffect(() => {
    const loadCategoriesAndDrafts = async () => {
      const fetchedCats = await getAdminCategories();
      setCategories(fetchedCats);
      const fetchedExams = await getAllExams();
      setDrafts(fetchedExams.filter(exam => exam.isDraft));
    };
    loadCategoriesAndDrafts();
  }, []);

  const loadDraftIntoEditor = (draft) => {
    setEditingExamId(draft.id);
    setExamTitle(draft.title || "");
    setExamCategory(draft.category || "");
    if (draft.date) {
      const parts = draft.date.split(" ");
      if (parts.length === 3) {
        setExamDay(parts[0]); setExamMonth(parts[1]); setExamYear(parts[2]);
      }
    }
    if (draft.time) {
      const parts = draft.time.split(" ");
      if (parts.length === 2) {
        const timeParts = parts[0].split(":");
        if (timeParts.length === 2) {
          setExamHour(timeParts[0]); setExamMinute(timeParts[1]);
        }
        setExamAmPm(parts[1]);
      }
    }
    setQuestions(draft.questions && draft.questions.length > 0 ? draft.questions : [{ id: `q_${Date.now()}`, text: "", options: [{ id: `opt_${Date.now()}_1`, text: "" }, { id: `opt_${Date.now()}_2`, text: "" }], correctOptionIds: [] }]);
    setIsDraftsModalOpen(false);
    showToast("Draft loaded into editor");
  };

  const updateAndSaveCategories = async (newCatsArray) => {
    setCategories(newCatsArray); 
    await saveAdminCategories(newCatsArray); 
  };

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', message: '', onConfirm: null });

  const [questions, setQuestions] = useState([
    {
      id: `q_${Date.now()}`,
      text: "",
      options: [
        { id: `opt_${Date.now()}_1`, text: "" },
        { id: `opt_${Date.now()}_2`, text: "" }
      ],
      correctOptionIds: [] 
    }
  ]);

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const years = ["2026", "2027", "2028", "2029", "2030"];
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
  const ampm = ["AM", "PM"];

  // 🌟 React Quill Toolbar Modules
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };
  const simpleQuillModules = { toolbar: false };

  const showAlert = (message) => setModalConfig({ isOpen: true, type: 'alert', message, onConfirm: null });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

  const handleAddQuestion = () => setQuestions([...questions, { id: `q_${Date.now()}`, text: "", options: [{ id: `opt_${Date.now()}_1`, text: "" }, { id: `opt_${Date.now()}_2`, text: "" }], correctOptionIds: [] }]);
  
  const handleRemoveQuestion = (qId) => {
    if (questions.length === 1) return showAlert("You must have at least 1 question in the assessment.");
    showConfirm("Are you sure you want to delete this question?", () => setQuestions(prev => prev.filter(q => q.id !== qId)));
  };
  
  const handleQuestionTextChange = (qId, newText) => setQuestions(questions.map(q => q.id === qId ? { ...q, text: newText } : q));
  const handleAddOption = (qId) => setQuestions(questions.map(q => q.id === qId ? { ...q, options: [...q.options, { id: `opt_${Date.now()}`, text: "" }] } : q));
  
  const handleRemoveOption = (qId, optId) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        if (q.options.length <= 2) { showAlert("A question must have at least 2 options."); return q; }
        return { ...q, options: q.options.filter(opt => opt.id !== optId), correctOptionIds: q.correctOptionIds.filter(id => id !== optId) };
      }
      return q;
    }));
  };
  
  const handleOptionTextChange = (qId, optId, newText) => setQuestions(questions.map(q => q.id === qId ? { ...q, options: q.options.map(opt => opt.id === optId ? { ...opt, text: newText } : opt) } : q));
  
  const toggleCorrectOption = (qId, optId) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const isAlreadyCorrect = q.correctOptionIds.includes(optId);
        return { ...q, correctOptionIds: isAlreadyCorrect ? q.correctOptionIds.filter(id => id !== optId) : [...q.correctOptionIds, optId] };
      }
      return q;
    }));
  };

  const handleSaveExam = async (isDraft = false) => {
    if (!examTitle.trim()) return showAlert("Please enter an Assessment Title.");
    if (!examCategory) return showAlert("Please select a Category.");
    
    // Only enforce date/time if not saving as draft (or enforce anyway if needed, let's enforce anyway for consistency, or maybe skip for drafts? Let's keep enforcing to ensure data integrity unless specifically asked otherwise)
    if (!examDay || !examMonth || !examYear) return showAlert("Please select a complete Date.");
    if (!examHour || !examMinute || !examAmPm) return showAlert("Please select a complete Time.");

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctOptionIds.length === 0) return showAlert(`Question ${i + 1} needs at least one correct answer.`);
      const rawText = questions[i].text.replace(/<[^>]*>?/gm, '').trim();
      if (!rawText) return showAlert(`Question ${i + 1} cannot be empty.`);
    }

    setIsSaving(true);
    try {
      const formattedDate = `${examDay} ${examMonth} ${examYear}`;
      const formattedTime = `${examHour}:${examMinute} ${examAmPm}`;

      const examData = { 
        title: examTitle, 
        category: examCategory, 
        date: formattedDate, 
        time: formattedTime, 
        questions: questions,
        isDraft: isDraft 
      };

      if (editingExamId) {
        await updateExamInDb(editingExamId, examData);
      } else {
        await saveExamToDb(examData);
      }
      
      showToast(isDraft ? "Draft Saved Successfully!" : "Assessment Published Successfully!");
      
      // refresh drafts list
      const fetchedExams = await getAllExams();
      setDrafts(fetchedExams.filter(exam => exam.isDraft));

      setExamTitle(""); setExamCategory("");
      setExamDay(""); setExamMonth(""); setExamYear("");
      setExamHour(""); setExamMinute(""); setExamAmPm("");
      setQuestions([{ id: `q_${Date.now()}`, text: "", options: [{ id: `opt_${Date.now()}_1`, text: "" }, { id: `opt_${Date.now()}_2`, text: "" }], correctOptionIds: [] }]);
      setEditingExamId(null);
    } catch (error) {
      showAlert("Failed to save. Please check your internet connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-28 pt-4 sm:pt-10 selection:bg-teal-100 selection:text-teal-900 ">
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />
      
      <CategoryManager 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)} 
        categories={categories} 
        setCategories={updateAndSaveCategories} 
        onSelect={setExamCategory} 
      />

      <DraftManager 
        isOpen={isDraftsModalOpen} 
        onClose={() => setIsDraftsModalOpen(false)} 
        drafts={drafts} 
        onLoadDraft={loadDraftIntoEditor} 
      />

      <div className="max-w-3xl mx-auto px-0 sm:px-6 lg:px-8 animate-fade-in">
        
        {/* 1. HEADER SECTION */}
        <div className={`${UI_THEME.card} relative mb-6`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-teal-500 sm:rounded-t-2xl"></div>
          
          <div className="flex justify-end p-4 pb-0">
            <button onClick={() => setIsDraftsModalOpen(true)} className="text-[10px] font-bold uppercase tracking-widest text-rose-600 hover:text-rose-700 transition-colors bg-rose-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-rose-100">
              <i className="fa-solid fa-file-pen"></i> Load Draft
            </button>
          </div>
          
          <div className="space-y-5 px-5 sm:px-8 pb-5 sm:pb-8 pt-2">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
              <div className="flex-[2]">
                <label className={UI_THEME.label}>Assessment Title *</label>
                <input type="text" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} placeholder="e.g. Fundamental Physics Test" className={UI_THEME.input} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-1.5">
                  <label className={UI_THEME.label}>Category *</label>
                  <button onClick={() => setIsCategoryModalOpen(true)} className="text-[10px] font-bold uppercase tracking-widest text-teal-600 hover:text-teal-700 transition-colors bg-teal-50 px-2 py-0.5 rounded">Manage</button>
                </div>
                <CustomDropdown options={categories} value={examCategory} onChange={setExamCategory} placeholder="Select Category" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
              <div className="flex-1">
                <label className={UI_THEME.label}>Exam Date *</label>
                <div className="flex gap-2">
                  <CustomDropdown options={days} value={examDay} onChange={setExamDay} placeholder="DD" widthClass="w-1/3" />
                  <CustomDropdown options={months} value={examMonth} onChange={setExamMonth} placeholder="MM" widthClass="w-1/3" />
                  <CustomDropdown options={years} value={examYear} onChange={setExamYear} placeholder="YYYY" widthClass="w-1/3" />
                </div>
              </div>
              <div className="flex-1">
                <label className={UI_THEME.label}>Exam Time *</label>
                <div className="flex gap-2">
                  <CustomDropdown options={hours} value={examHour} onChange={setExamHour} placeholder="HH" widthClass="w-1/3" />
                  <span className="flex items-center text-slate-400 font-bold">:</span>
                  <CustomDropdown options={minutes} value={examMinute} onChange={setExamMinute} placeholder="MM" widthClass="w-1/3" />
                  <CustomDropdown options={ampm} value={examAmPm} onChange={setExamAmPm} placeholder="AM/PM" widthClass="w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. QUESTIONS LIST */}
        <div className="space-y-4 sm:space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className={`${UI_THEME.card} transition-colors hover:border-slate-300`}>
              
              <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
                <h3 className="text-slate-800 font-bold text-base sm:text-lg flex items-center gap-2.5">
                  <span className="bg-slate-100 text-slate-600 h-6 w-6 rounded flex items-center justify-center text-xs border border-slate-200">
                    {index + 1}
                  </span> 
                </h3>
                <button onClick={() => handleRemoveQuestion(q.id)} className={`${UI_THEME.btnDangerText} px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide gap-2`}>
                  <i className="fa-solid fa-trash-can"></i> <span className="hidden sm:inline">Delete</span>
                </button>
              </div>

              <div className="mb-6 quill-custom-container">
                <ReactQuill 
                  theme="snow" 
                  value={q.text} 
                  onChange={(val) => handleQuestionTextChange(q.id, val)} 
                  modules={quillModules}
                  placeholder="Draft your question here..."
                  className="bg-white rounded-xl overflow-hidden"
                />
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt, optIndex) => {
                    const isCorrect = q.correctOptionIds.includes(opt.id);
                    return (
                      <div key={opt.id} className={`relative p-2.5 sm:p-3 rounded-xl border transition-all flex flex-col sm:flex-row gap-3 items-start sm:items-center ${isCorrect ? 'border-teal-500 bg-teal-50/30' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'}`}>
                        
                        <div className="w-full sm:w-auto shrink-0 pr-8 sm:pr-0">
                          <button type="button" onClick={() => toggleCorrectOption(q.id, opt.id)} className={`w-full sm:w-10 h-10 rounded-lg flex items-center justify-center text-xs transition-all active:scale-95 border ${isCorrect ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-slate-300 text-slate-400 hover:border-teal-400 hover:text-teal-600'}`} title="Mark as Correct">
                            <i className="fa-solid fa-check"></i>
                            <span className="ml-2 sm:hidden font-bold text-xs">{isCorrect ? 'Correct Answer' : 'Mark Correct'}</span>
                          </button>
                        </div>

                        <div className="flex-1 w-full min-w-0 quill-custom-container-simple">
                           <ReactQuill 
                             theme="snow"
                             value={opt.text}
                             onChange={(val) => handleOptionTextChange(q.id, opt.id, val)}
                             modules={simpleQuillModules}
                             placeholder={`Option ${optIndex + 1}`}
                           />
                        </div>

                        <button onClick={() => handleRemoveOption(q.id, opt.id)} className={`${UI_THEME.btnDangerText} absolute top-2 right-2 sm:static sm:w-10 sm:h-10`} title="Remove Option">
                          <i className="fa-solid fa-xmark text-base"></i>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => handleAddOption(q.id)} className="mt-3 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-plus"></i> Add Option
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 px-4 sm:px-0">
          <button onClick={handleAddQuestion} className={`${UI_THEME.btnDark} px-8 py-3.5`}>
            <i className="fa-solid fa-plus"></i> Add New Question
          </button>
        </div>
      </div>

      {/* 3. SOLID FIXED FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 sm:p-5 z-50">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[11px] sm:text-xs font-medium text-slate-500 text-center sm:text-left flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-check-double text-[10px]"></i>
            </div>
            Review all questions and valid targets before saving.
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleSaveExam(true)} disabled={isSaving} className={`${UI_THEME.btnDark} px-6 py-3.5`}>
              {isSaving ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Saving...</>
              ) : (
                <><i className="fa-solid fa-floppy-disk"></i> Save Draft</>
              )}
            </button>
            <button onClick={() => handleSaveExam(false)} disabled={isSaving} className={`${UI_THEME.btnPrimary} px-8 py-3.5`}>
              {isSaving ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Publishing...</>
              ) : (
                <><i className="fa-solid fa-paper-plane"></i> Publish</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🎨 GLOBAL STYLES FOR QUILL OVERRIDES */}
      <style>{`
        .quill-custom-container .ql-toolbar {
          border: 1px solid #cbd5e1 !important;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          background: #f8fafc;
          padding: 8px !important;
        }
        .quill-custom-container .ql-container {
          border: 1px solid #cbd5e1 !important;
          border-top: none !important;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          font-family: inherit;
          font-size: 14px;
        }
        .quill-custom-container .ql-editor {
          min-height: 120px;
          padding: 16px;
        }
        .quill-custom-container-simple .ql-toolbar {
          display: none !important;
        }
        .quill-custom-container-simple .ql-container {
          border: 1px solid transparent !important;
          font-family: inherit;
          font-size: 14px;
        }
        .quill-custom-container-simple .ql-editor {
          padding: 8px 0;
          min-height: 40px;
        }
        .quill-custom-container-simple .ql-editor.ql-blank::before {
          left: 0;
          font-style: normal;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}