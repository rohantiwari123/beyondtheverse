import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getExamById, submitExamResult } from '../../services/firebaseServices';
import BackButton from '../common/BackButton';

// ==========================================
// 🌟 CUSTOM COMPONENTS (No Browser Defaults)
// ==========================================

function CustomModal({ config, onClose }) {
  if (!config.isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose}></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 w-full max-w-sm relative z-10 animate-fade-in-up shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${config.type === 'confirm' ? 'bg-rose-50 text-rose-500' : 'bg-teal-50 text-teal-500'}`}>
            <i className={`fa-solid ${config.type === 'confirm' ? 'fa-triangle-exclamation' : 'fa-circle-info'} text-lg`}></i>
          </div>
          <h3 className="text-lg font-bold text-slate-800">{config.type === 'confirm' ? 'Confirm Submission' : 'Notice'}</h3>
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
            {config.type === 'confirm' ? 'Submit' : 'Okay'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🌟 MAIN EXAM COMPONENT
// ==========================================

export default function ExamEngine({ showToast }) {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();
  
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({}); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', message: '', onConfirm: null });

  // 🌟 NAYA: Timer State (Default 30 Minutes = 1800 seconds)
  // Aap chahein toh backend se 'duration' fetch karke yahan set kar sakte hain
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const showAlert = (message) => setModalConfig({ isOpen: true, type: 'alert', message, onConfirm: null });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

  // 1. Fetch Exam
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const examData = await getExamById(examId);
        if (examData) {
          setExam(examData);
          let initialAnswers = {};
          examData.questions.forEach(q => { initialAnswers[q.id] = []; });
          setAnswers(initialAnswers);
          // Agar DB me duration hai toh yahan set karein: 
          // if(examData.duration) setTimeLeft(examData.duration * 60);
        } else {
          showToast("Assessment not found.", false);
          navigate('/exam'); 
        }
      } catch (error) {
        showToast("Error loading assessment.", false);
        navigate('/exam');
      }
    };
    fetchExam();
  }, [examId, navigate, showToast]);

  // 🌟 NAYA: Auto-Submit Timer Logic
  useEffect(() => {
    if (!exam || isSubmitting) return;

    if (timeLeft <= 0) {
      if (showToast) showToast("Time is up! Auto-submitting...", false);
      executeSubmit();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, exam, isSubmitting]);

  // Format time (MM:SS) for display
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleOption = (questionId, optionId) => {
    setAnswers(prev => {
      const currentSelections = prev[questionId] || [];
      if (currentSelections.includes(optionId)) {
        return { ...prev, [questionId]: currentSelections.filter(id => id !== optionId) };
      } else {
        return { ...prev, [questionId]: [...currentSelections, optionId] };
      }
    });
  };

  const calculateScore = () => {
    let totalScore = 0;
    exam.questions.forEach(q => {
      const selected = answers[q.id] || [];
      const correct = q.correctOptionIds || [];
      let qScore = 0;

      if (selected.length === 0) {
        qScore -= 2;
      } else {
        selected.forEach(opt => {
          if (correct.includes(opt)) qScore += 1; 
          else qScore -= 2; 
        });
        correct.forEach(opt => {
          if (!selected.includes(opt)) qScore -= 2; 
        });
      }
      totalScore += qScore;
    });
    return totalScore;
  };

  const handlePreSubmit = () => {
    showConfirm(
      "Are you sure you want to submit early? Negative marking (-2 points) applies for incorrect or omitted answers.", 
      executeSubmit
    );
  };

  const executeSubmit = async () => {
    setIsSubmitting(true);
    const finalScore = calculateScore();

    try {
      await submitExamResult({
        userId,
        examId,
        examTitle: exam.title,
        totalScore: finalScore,
        answers
      });

      showToast("Assessment Submitted Successfully!");
      navigate('/exam'); 
    } catch (error) {
      showAlert("Submission failed. Please check your connection.");
      setIsSubmitting(false);
    }
  };

  if (!exam) return (
    <div className="min-h-screen py-20 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
      <div className="h-8 w-8 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin mb-4"></div>
      <span className="text-[10px] font-bold uppercase tracking-widest">Loading Assessment...</span>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-28 md:py-10 sm:px-6 lg:px-8 font-sans relative">
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />

      {/* 🌟 STICKY TIMER FOR MOBILE */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3 flex justify-between items-center sm:hidden shadow-sm">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Time Remaining</span>
        <div className={`font-black text-xl tracking-wider transition-colors ${timeLeft <= 300 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in pt-4 sm:pt-0">
        
        {/* Back Button (Safe Exit) */}
        <div className="px-4 sm:px-0">
          <BackButton to="/exam" label="Exit Assessment" />
        </div>

        {/* 1. HEADER SECTION (Edge-to-edge on mobile) */}
        <div className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{exam.title}</h1>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mt-2">{exam.category}</p>
          </div>
          
          {/* 🌟 DESKTOP TIMER */}
          <div className="hidden sm:flex flex-col items-end bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl min-w-[140px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Remaining</span>
            <div className={`font-black text-2xl tracking-wider transition-colors ${timeLeft <= 300 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* 2. QUESTIONS LIST */}
        <div className="space-y-4 sm:space-y-6">
          {exam.questions.map((q, index) => (
            <div key={q.id} className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-6 sm:p-8 lg:p-10">
              
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <span className="bg-slate-100 text-slate-600 h-8 w-8 rounded-md flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span> 
                <span className="font-bold text-slate-500 text-sm uppercase tracking-widest">Question</span>
              </div>
              
              <div 
                className="prose prose-slate max-w-none mb-8 text-[15px] md:text-[16px] text-slate-800 font-medium leading-relaxed verse-thought-serif"
                dangerouslySetInnerHTML={{ __html: q.text }}
              />
              
              <div className="grid grid-cols-1 gap-3">
                {q.options.map(opt => {
                  const isSelected = answers[q.id]?.includes(opt.id);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => toggleOption(q.id, opt.id)}
                      className={`flex items-start gap-3 sm:gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.99] ${isSelected ? 'border-teal-500 bg-teal-50/50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                    >
                      <div className={`mt-0.5 h-5 w-5 rounded-md shrink-0 flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-teal-500 border-teal-500 text-white' : 'border-slate-300 bg-white'}`}>
                        {isSelected && <i className="fa-solid fa-check text-[10px]"></i>}
                      </div>
                      
                      <div 
                        className={`prose prose-sm w-full font-medium transition-colors ${isSelected ? 'text-teal-900' : 'text-slate-700'}`} 
                        dangerouslySetInnerHTML={{ __html: opt.text }} 
                      />
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 3. SOLID FIXED FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 sm:p-5 z-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center sm:text-left">
            <span className="text-rose-500 mr-1"><i className="fa-solid fa-triangle-exclamation"></i> Notice:</span> 
            Auto-submits when time expires.
          </div>
          <button 
            onClick={handlePreSubmit} 
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white px-10 py-3.5 rounded-lg font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs transition-all disabled:opacity-50 active:scale-95"
          >
            {isSubmitting ? "Processing..." : "Submit Assessment"}
          </button>
        </div>
      </div>

    </div>
  );
}