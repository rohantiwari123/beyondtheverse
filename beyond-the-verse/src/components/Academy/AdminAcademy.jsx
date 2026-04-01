import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AdminAcademy({ showToast }) {
  const [examTitle, setExamTitle] = useState("");
  const [examCategory, setExamCategory] = useState("Quantum Physics");
  
  // Date, Time aur Location ke liye states
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [examLocation, setExamLocation] = useState(""); 
  
  const [isSaving, setIsSaving] = useState(false);

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

  const categories = ["Quantum Physics", "Philosophy", "Psychology", "Astrophysics", "Logic & Paradox"];

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      id: `q_${Date.now()}`,
      text: "",
      options: [{ id: `opt_${Date.now()}_1`, text: "" }, { id: `opt_${Date.now()}_2`, text: "" }],
      correctOptionIds: []
    }]);
  };

  const handleRemoveQuestion = (qId) => {
    if (questions.length === 1) return alert("Kam se kam 1 question toh hona chahiye!");
    setQuestions(questions.filter(q => q.id !== qId));
  };

  const handleQuestionTextChange = (qId, newText) => {
    setQuestions(questions.map(q => q.id === qId ? { ...q, text: newText } : q));
  };

  const handleAddOption = (qId) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return { ...q, options: [...q.options, { id: `opt_${Date.now()}`, text: "" }] };
      }
      return q;
    }));
  };

  const handleRemoveOption = (qId, optId) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        if (q.options.length <= 2) {
          alert("Kam se kam 2 options zaroori hain!");
          return q;
        }
        return { 
          ...q, 
          options: q.options.filter(opt => opt.id !== optId),
          correctOptionIds: q.correctOptionIds.filter(id => id !== optId) 
        };
      }
      return q;
    }));
  };

  const handleOptionTextChange = (qId, optId, newText) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.map(opt => opt.id === optId ? { ...opt, text: newText } : opt)
        };
      }
      return q;
    }));
  };

  const toggleCorrectOption = (qId, optId) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const isAlreadyCorrect = q.correctOptionIds.includes(optId);
        return {
          ...q,
          correctOptionIds: isAlreadyCorrect 
            ? q.correctOptionIds.filter(id => id !== optId) 
            : [...q.correctOptionIds, optId] 
        };
      }
      return q;
    }));
  };

  const handleSaveExam = async () => {
    if (!examTitle.trim()) return showToast("Exam ka Title zaroori hai!", false);
    if (!examLocation.trim()) return showToast("Exam ki Location (kahan hoga) zaroori hai!", false);
    if (!examDate) return showToast("Exam ki Date zaroori hai!", false);
    if (!examTime) return showToast("Exam ka Time zaroori hai!", false);

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctOptionIds.length === 0) {
        return showToast(`Question ${i + 1} mein koi ek option 'Correct' mark karein!`, false);
      }
      const qText = questions[i].text.replace(/<[^>]*>?/gm, '').trim();
      if (!qText) {
        return showToast(`Question ${i + 1} khali nahi ho sakta!`, false);
      }
    }

    setIsSaving(true);
    try {
      const docRef = await addDoc(collection(db, "exams"), {
        title: examTitle,
        category: examCategory,
        date: examDate,
        time: examTime,
        location: examLocation,
        isResultPublished: false, 
        questions: questions,
        createdAt: serverTimestamp()
      });
      
      console.log("Document written with ID: ", docRef.id);
      showToast("Exam Created Successfully! 🚀");
      
      setExamTitle("");
      setExamDate("");
      setExamTime("");
      setExamLocation("");
      setQuestions([{ 
        id: `q_${Date.now()}`, 
        text: "", 
        options: [{ id: `opt_${Date.now()}_1`, text: "" }, { id: `opt_${Date.now()}_2`, text: "" }], 
        correctOptionIds: [] 
      }]);

    } catch (error) {
      alert("🔥 Firebase Error Aa Gaya!\n\nReason: " + error.message);
      console.error("Full Database Error:", error);
      showToast("Save Failed! Check Alert.", false);
    } finally {
      setIsSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      
      ['clean']                                         
    ],
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-20">
      
      <div className="bg-white p-5 sm:p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <i className="fa-solid fa-brain text-teal-600"></i> Create Mind Trial
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-6">
          <div className="flex-1">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Exam Title</label>
            <input 
              type="text" 
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              placeholder="e.g. The Schrödinger Paradox Test" 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-teal-500 font-bold text-slate-800 transition-colors"
            />
          </div>
          <div className="md:w-1/3">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
            <select 
              value={examCategory}
              onChange={(e) => setExamCategory(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-teal-500 font-bold text-slate-800 transition-colors"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="md:w-1/4">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Date</label>
            <input 
              type="date" 
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-teal-500 font-bold text-slate-800 transition-colors"
            />
          </div>
          <div className="md:w-1/4">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Time</label>
            <input 
              type="time" 
              value={examTime}
              onChange={(e) => setExamTime(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-teal-500 font-bold text-slate-800 transition-colors"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Location / Platform</label>
            <input 
              type="text" 
              value={examLocation}
              onChange={(e) => setExamLocation(e.target.value)}
              placeholder="e.g. Online Platform, ya Room 101" 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-teal-500 font-bold text-slate-800 transition-colors"
            />
          </div>
        </div>

      </div>

      <div className="space-y-6 sm:space-y-8">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative group">
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-slate-800 text-base sm:text-lg">Question {index + 1}</h3>
              <button 
                onClick={() => handleRemoveQuestion(q.id)}
                className="h-8 w-8 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-full flex items-center justify-center transition-colors"
                title="Delete Question"
              >
                <i className="fa-solid fa-trash-can text-sm"></i>
              </button>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Problem Statement</label>
              
              {/* 🌟 NAYA: Question Editor Wrapper (Height Fix) */}
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200 [&_.ql-editor]:min-h-[150px] sm:[&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-base [&_.ql-toolbar]:flex [&_.ql-toolbar]:flex-wrap">
                <ReactQuill 
                  theme="snow" 
                  value={q.text} 
                  onChange={(content) => handleQuestionTextChange(q.id, content)} 
                  modules={quillModules}
                  className="bg-white border-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Options (Select the correct ones)</label>
              </div>

              {q.options.map((opt) => {
                const isCorrect = q.correctOptionIds.includes(opt.id);
                
                return (
                  <div key={opt.id} className={`p-3 sm:p-4 rounded-2xl border-2 transition-all ${isCorrect ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-100 bg-slate-50'}`}>
                    
                    {/* 🌟 NAYA: Responsive Layout for Mobile vs Desktop */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      
                      {/* Checkbox and Mobile Delete Button Row */}
                      <div className="flex justify-between items-center sm:items-start sm:flex-col gap-2 shrink-0 sm:pt-1">
                        <button 
                          onClick={() => toggleCorrectOption(q.id, opt.id)}
                          className={`h-8 w-8 sm:h-7 sm:w-7 rounded flex items-center justify-center border-2 transition-colors ${isCorrect ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-300 hover:border-emerald-400'}`}
                          title="Mark as Correct Answer"
                        >
                          {isCorrect && <i className="fa-solid fa-check text-sm"></i>}
                        </button>

                        <button 
                          onClick={() => handleRemoveOption(q.id, opt.id)}
                          className="sm:hidden text-rose-500 hover:text-rose-600 font-bold text-xs flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100"
                        >
                          <i className="fa-solid fa-trash-can"></i> Remove
                        </button>
                      </div>

                      {/* 🌟 NAYA: Option Editor Wrapper (Height & Width Fix) */}
                      <div className="flex-1 w-full min-w-0 bg-white rounded-xl overflow-hidden border border-slate-200 [&_.ql-editor]:min-h-[80px] sm:[&_.ql-editor]:min-h-[100px] [&_.ql-toolbar]:flex [&_.ql-toolbar]:flex-wrap">
                         <ReactQuill 
                          theme="snow" 
                          value={opt.text} 
                          onChange={(content) => handleOptionTextChange(q.id, opt.id, content)} 
                          modules={{ toolbar: [['bold', 'italic', 'code-block', 'clean']] }} 
                          className="bg-white border-none"
                        />
                      </div>

                      {/* Desktop Delete Button */}
                      <button 
                        onClick={() => handleRemoveOption(q.id, opt.id)}
                        className="hidden sm:block mt-1 text-slate-300 hover:text-rose-500 transition-colors px-2 shrink-0"
                        title="Remove Option"
                      >
                        <i className="fa-solid fa-xmark text-2xl"></i>
                      </button>

                    </div>
                  </div>
                );
              })}

              <button 
                onClick={() => handleAddOption(q.id)}
                className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center justify-center sm:justify-start gap-2 mt-4 w-full sm:w-auto bg-teal-50 sm:bg-transparent py-3 sm:py-0 rounded-xl"
              >
                <i className="fa-solid fa-plus"></i> Add Another Option
              </button>

            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center sticky bottom-4 sm:bottom-6 bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-700 shadow-2xl z-50 gap-3 sm:gap-0 mx-2 sm:mx-0">
        <button 
          onClick={handleAddQuestion}
          className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-slate-600"
        >
          <i className="fa-solid fa-plus"></i> New Question
        </button>
        
        <button 
          onClick={handleSaveExam}
          disabled={isSaving}
          className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-900 px-8 py-3 rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSaving ? "Saving to Database..." : "Save & Publish Later"}
        </button>
      </div>

    </div>
  );
}