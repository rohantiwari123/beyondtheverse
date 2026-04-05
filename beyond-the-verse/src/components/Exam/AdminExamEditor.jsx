import React, { useState, useRef, useEffect } from 'react';

// Service
import { saveExamToDb } from '../../services/firebaseServices';

// ==========================================
// 🌟 CUSTOM NATIVE COMPONENTS (No Third-Party)
// ==========================================

// 1. Custom Native Rich Text Editor
function CustomRichInput({ value, onChange, placeholder, minHeight = "min-h-[100px]", isSimple = false }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command, arg = null) => {
    document.execCommand(command, false, arg);
    editorRef.current.focus();
    handleInput();
  };

  return (
    <div className="bg-white border border-slate-300 rounded-lg overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all flex flex-col">
      <div className="flex items-center gap-1 p-1.5 border-b border-slate-200 bg-slate-50 flex-wrap">
        <button type="button" onClick={() => executeCommand('bold')} className="h-7 w-7 rounded flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" title="Bold"><i className="fa-solid fa-bold text-xs"></i></button>
        <button type="button" onClick={() => executeCommand('italic')} className="h-7 w-7 rounded flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" title="Italic"><i className="fa-solid fa-italic text-xs"></i></button>
        <button type="button" onClick={() => executeCommand('underline')} className="h-7 w-7 rounded flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" title="Underline"><i className="fa-solid fa-underline text-xs"></i></button>
        
        {!isSimple && (
          <>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button type="button" onClick={() => executeCommand('insertUnorderedList')} className="h-7 w-7 rounded flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" title="Bullet List"><i className="fa-solid fa-list-ul text-xs"></i></button>
            <button type="button" onClick={() => executeCommand('insertOrderedList')} className="h-7 w-7 rounded flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" title="Numbered List"><i className="fa-solid fa-list-ol text-xs"></i></button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button type="button" onClick={() => executeCommand('superscript')} className="h-7 w-7 rounded flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" title="Superscript"><i className="fa-solid fa-superscript text-xs"></i></button>
            <button type="button" onClick={() => executeCommand('subscript')} className="h-7 w-7 rounded flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" title="Subscript"><i className="fa-solid fa-subscript text-xs"></i></button>
          </>
        )}
      </div>
      
      <div className="relative">
        {!value && (
          <div className="absolute top-3 left-3 text-slate-400 pointer-events-none text-sm font-medium">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className={`p-3 outline-none ${minHeight} text-sm sm:text-[15px] text-slate-800 leading-relaxed cursor-text`}
        />
      </div>
    </div>
  );
}

// 2. Custom Dropdown
function CustomDropdown({ options, value, onChange, placeholder, widthClass = "w-full" }) {
  const [isOpen, setIsOpen] = useState(false);
  const displayLabel = value || placeholder;

  return (
    <div className={`relative ${widthClass}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white border ${isOpen ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-slate-300'} rounded-lg py-2.5 px-4 flex justify-between items-center cursor-pointer transition-all`}
      >
        <span className={`text-sm ${!value ? 'text-slate-400' : 'text-slate-800'} truncate`}>{displayLabel}</span>
        <i className={`fa-solid fa-chevron-down text-[10px] text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-teal-600' : ''}`}></i>
      </div>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto animate-fade-in">
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${opt === value ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50 hover:text-teal-600'}`}
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

// 3. Custom Modal (Alert & Confirm)
function CustomModal({ config, onClose }) {
  if (!config.isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 w-full max-w-sm relative z-10 animate-fade-in-up shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${config.type === 'confirm' ? 'bg-rose-50 text-rose-500' : 'bg-teal-50 text-teal-500'}`}>
            <i className={`fa-solid ${config.type === 'confirm' ? 'fa-triangle-exclamation' : 'fa-circle-info'} text-lg`}></i>
          </div>
          <h3 className="text-lg font-bold text-slate-800">{config.type === 'confirm' ? 'Confirm Action' : 'Notice'}</h3>
        </div>
        <p className="text-sm text-slate-600 mb-8 leading-relaxed pl-14">{config.message}</p>
        <div className="flex justify-end gap-3">
          {config.type === 'confirm' && (
            <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors uppercase tracking-widest">Cancel</button>
          )}
          <button 
            onClick={() => { config.onConfirm && config.onConfirm(); onClose(); }} 
            className={`px-6 py-2.5 rounded-lg text-xs font-bold text-white uppercase tracking-widest transition-colors ${config.type === 'confirm' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-teal-600 hover:bg-teal-700'}`}
          >
            {config.type === 'confirm' ? 'Proceed' : 'Okay'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 4. Category Manager Modal
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md relative z-10 animate-fade-in-up shadow-xl flex flex-col max-h-[80vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><i className="fa-solid fa-tags text-teal-500"></i> Manage Categories</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex gap-2 mb-6">
            <input 
              type="text" value={newCat} onChange={(e)=>setNewCat(e.target.value)} 
              placeholder="New category name..." 
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            <button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-lg text-sm font-semibold transition-colors">Add</button>
          </div>
          
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-lg group hover:border-slate-200 transition-colors">
                <span className="text-sm font-semibold text-slate-700">{cat}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { onSelect(cat); onClose(); }} className="text-xs font-bold text-teal-600 hover:bg-teal-50 px-2 py-1 rounded">Select</button>
                  <button onClick={() => handleDelete(cat)} className="text-rose-400 hover:text-rose-600 px-2 py-1"><i className="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            ))}
            {categories.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No categories added.</p>}
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

  const [examLocation, setExamLocation] = useState(""); 
  const [isSaving, setIsSaving] = useState(false);

  const [categories, setCategories] = useState(["Quantum Physics", "Philosophy", "Psychology", "Astrophysics", "Logic & Paradox"]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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

  const showAlert = (message) => setModalConfig({ isOpen: true, type: 'alert', message, onConfirm: null });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

  const handleAddQuestion = () => setQuestions([...questions, { id: `q_${Date.now()}`, text: "", options: [{ id: `opt_${Date.now()}_1`, text: "" }, { id: `opt_${Date.now()}_2`, text: "" }], correctOptionIds: [] }]);
  
  const handleRemoveQuestion = (qId) => {
    if (questions.length === 1) return showAlert("An assessment must have at least 1 question.");
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

  const handleSaveExam = async () => {
    if (!examTitle.trim()) return showAlert("Please provide an Assessment Title.");
    if (!examCategory) return showAlert("Please select a Category.");
    if (!examDay || !examMonth || !examYear) return showAlert("Please select a complete Date.");
    if (!examHour || !examMinute || !examAmPm) return showAlert("Please select a complete Time.");
    if (!examLocation.trim()) return showAlert("Please provide a Location or Platform.");

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctOptionIds.length === 0) return showAlert(`Question ${i + 1} needs at least one correct option.`);
      if (!questions[i].text.replace(/<[^>]*>?/gm, '').trim()) return showAlert(`Question ${i + 1} prompt cannot be empty.`);
    }

    setIsSaving(true);
    try {
      const formattedDate = `${examDay} ${examMonth} ${examYear}`;
      const formattedTime = `${examHour}:${examMinute} ${examAmPm}`;

      await saveExamToDb({ 
        title: examTitle, 
        category: examCategory, 
        date: formattedDate, 
        time: formattedTime, 
        location: examLocation, 
        questions: questions 
      });
      
      showToast("Assessment Created Successfully!");
      
      setExamTitle(""); setExamLocation(""); setExamCategory("");
      setExamDay(""); setExamMonth(""); setExamYear("");
      setExamHour(""); setExamMinute(""); setExamAmPm("");
      setQuestions([{ id: `q_${Date.now()}`, text: "", options: [{ id: `opt_${Date.now()}_1`, text: "" }, { id: `opt_${Date.now()}_2`, text: "" }], correctOptionIds: [] }]);
    } catch (error) {
      showAlert("Failed to save the assessment. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-28 md:py-10 sm:px-6 lg:px-8 font-sans">
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />
      <CategoryManager isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} categories={categories} setCategories={setCategories} onSelect={setExamCategory} />

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
        
        {/* 1. HEADER SECTION */}
        <div className="bg-white border-b sm:border border-slate-200 sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8 flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center border border-teal-100 shrink-0">
              <i className="fa-solid fa-file-signature text-lg"></i>
            </div>
            Create Assessment
          </h2>
          
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-col md:flex-row gap-5 sm:gap-6">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Assessment Title *</label>
                <input type="text" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} placeholder="e.g. Midterm Assessment" className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-4 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800 transition-all text-sm sm:text-base appearance-none" />
              </div>
              <div className="md:w-1/3">
                <div className="flex justify-between items-end mb-1.5">
                  <label className="block text-xs font-semibold text-slate-500">Category *</label>
                  <button onClick={() => setIsCategoryModalOpen(true)} className="text-[10px] font-bold text-teal-600 hover:underline uppercase tracking-wider">Manage</button>
                </div>
                <CustomDropdown options={categories} value={examCategory} onChange={setExamCategory} placeholder="Select Category" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 sm:gap-6">
              <div className="md:w-1/3">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Date *</label>
                <div className="flex gap-2">
                  <CustomDropdown options={days} value={examDay} onChange={setExamDay} placeholder="DD" widthClass="w-1/3" />
                  <CustomDropdown options={months} value={examMonth} onChange={setExamMonth} placeholder="MM" widthClass="w-1/3" />
                  <CustomDropdown options={years} value={examYear} onChange={setExamYear} placeholder="YYYY" widthClass="w-1/3" />
                </div>
              </div>

              <div className="md:w-1/3">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Time *</label>
                <div className="flex gap-2">
                  <CustomDropdown options={hours} value={examHour} onChange={setExamHour} placeholder="HH" widthClass="w-1/3" />
                  <span className="flex items-center text-slate-400 font-bold">:</span>
                  <CustomDropdown options={minutes} value={examMinute} onChange={setExamMinute} placeholder="MM" widthClass="w-1/3" />
                  <CustomDropdown options={ampm} value={examAmPm} onChange={setExamAmPm} placeholder="AM/PM" widthClass="w-1/3" />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Location / Platform *</label>
                <input type="text" value={examLocation} onChange={(e) => setExamLocation(e.target.value)} placeholder="e.g. University Portal" className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-4 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800 transition-all text-sm sm:text-base appearance-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. QUESTIONS LIST */}
        <div className="space-y-4 sm:space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-sm transition-colors hover:border-slate-300">
              
              <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-3">
                  <span className="bg-slate-100 text-slate-600 h-8 w-8 rounded-md flex items-center justify-center text-sm font-semibold">{index + 1}</span> 
                  Question
                </h3>
                <button onClick={() => handleRemoveQuestion(q.id)} className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-trash-can"></i> <span className="hidden sm:inline">Delete</span>
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-500 mb-2">Question Prompt</label>
                <CustomRichInput value={q.text} onChange={(val) => handleQuestionTextChange(q.id, val)} placeholder="Type the question here..." minHeight="min-h-[120px]" />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-500 mb-2">Options (Select the correct answer)</label>
                
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt, optIndex) => {
                    const isCorrect = q.correctOptionIds.includes(opt.id);
                    return (
                      <div key={opt.id} className={`relative p-3 sm:p-3 rounded-xl border transition-all flex flex-col sm:flex-row gap-3 items-start sm:items-center ${isCorrect ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}>
                        
                        {/* 🌟 FIX: Added 'relative' to parent and adjusted layout for mobile close button */}
                        <div className="w-full sm:w-auto shrink-0 pr-8 sm:pr-0">
                          <button type="button" onClick={() => toggleCorrectOption(q.id, opt.id)} className={`w-full sm:w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-xs transition-all active:scale-95 border ${isCorrect ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm' : 'bg-white border-slate-300 text-slate-400 hover:border-emerald-400 hover:text-emerald-500'}`} title="Mark as Correct">
                            <i className="fa-solid fa-check"></i>
                            <span className="ml-2 sm:hidden">{isCorrect ? 'Correct Answer' : 'Mark Correct'}</span>
                          </button>
                        </div>

                        <div className="flex-1 w-full min-w-0">
                           <CustomRichInput value={opt.text} onChange={(val) => handleOptionTextChange(q.id, opt.id, val)} placeholder={`Option ${optIndex + 1}`} minHeight="min-h-[44px]" isSimple={true} />
                        </div>

                        <button onClick={() => handleRemoveOption(q.id, opt.id)} className="absolute top-3 right-3 sm:static sm:w-10 sm:h-10 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0 flex items-center justify-center" title="Remove Option">
                          <i className="fa-solid fa-xmark text-base"></i>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => handleAddOption(q.id)} className="mt-2 px-3 py-2 rounded-lg text-xs font-semibold text-teal-600 hover:bg-teal-50 transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-plus"></i> Add Option
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 px-4 sm:px-0">
          <button onClick={handleAddQuestion} className="w-full sm:w-auto bg-white border border-slate-300 hover:border-teal-500 hover:text-teal-600 text-slate-600 px-6 sm:px-8 py-3.5 sm:py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm">
            <i className="fa-solid fa-plus"></i> Add New Question
          </button>
        </div>
      </div>

      {/* 3. SOLID FIXED FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 sm:p-5 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs font-medium text-slate-500 text-center sm:text-left">
            Please review all questions and correct options before saving.
          </div>
          <button onClick={handleSaveExam} disabled={isSaving} className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 active:scale-95 shadow-sm">
            {isSaving ? "Saving..." : "Save Assessment"}
          </button>
        </div>
      </div>

    </div>
  );
}