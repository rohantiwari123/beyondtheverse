import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// 🌟 MERA UPDATE 1: Yahan getUserExamResults ko import kiya hai
import { getExamById, submitExamResult, getUserExamResults } from '../../services/firebaseServices';
import BackButton from '../common/BackButton';

// ==========================================
// 🌟 CUSTOM COMPONENTS (Upgraded Professional UI)
// ==========================================

function CustomModal({ config, onClose }) {
  if (!config.isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 w-full max-w-sm relative z-10 animate-fade-in-up shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${config.type === 'confirm' ? 'bg-amber-50 text-amber-500' : 'bg-teal-50 text-teal-600'}`}>
            <i className={`fa-solid ${config.type === 'confirm' ? 'fa-shield-halved' : 'fa-circle-info'} text-lg`}></i>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            {config.type === 'confirm' ? 'Final Confirmation' : 'System Notice'}
          </h3>
        </div>
        <p className="text-[13px] sm:text-sm text-slate-600 mb-8 pl-14 leading-relaxed">{config.message}</p>
        <div className="flex justify-end gap-3">
          {config.type === 'confirm' && (
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100 transition-colors">
              Return to Exam
            </button>
          )}
          <button 
            onClick={() => { config.onConfirm && config.onConfirm(); onClose(); }} 
            className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 ${config.type === 'confirm' ? 'bg-slate-900 hover:bg-black' : 'bg-teal-600 hover:bg-teal-700'}`}
          >
            {config.type === 'confirm' ? 'Submit Assessment' : 'Acknowledge'}
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

  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 Minutes

  const showAlert = (message) => setModalConfig({ isOpen: true, type: 'alert', message, onConfirm: null });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

  // 1. Fetch Exam
  useEffect(() => {
    const fetchExamAndVerify = async () => {
      try {
        // 🌟 MERA UPDATE 2: SECURITY CHECK - Kya user ne exam de diya hai?
        if (userId) {
          const pastResults = await getUserExamResults(userId);
          const alreadyTaken = pastResults.find(r => r.examId === examId);
          
          if (alreadyTaken) {
            if (showToast) showToast("You have already completed this evaluation. Multiple attempts are restricted.", false);
            navigate('/exam'); // Bahar fek do!
            return;
          }
        }

        // 🌟 Agar nahi diya hai, tabhi paper load karo
        const examData = await getExamById(examId);
        if (examData) {
          setExam(examData);
          let initialAnswers = {};
          examData.questions.forEach(q => { initialAnswers[q.id] = []; });
          setAnswers(initialAnswers);
          // if(examData.duration) setTimeLeft(examData.duration * 60);
        } else {
          showToast("Assessment module unavailable.", false);
          navigate('/exam'); 
        }
      } catch (error) {
        showToast("Failed to initialize the assessment. Please retry.", false);
        navigate('/exam');
      }
    };
    
    fetchExamAndVerify();
  }, [examId, userId, navigate, showToast]);

  // 🌟 NAYA: Auto-Submit Timer Logic
  useEffect(() => {
    if (!exam || isSubmitting) return;

    if (timeLeft <= 0) {
      if (showToast) showToast("⏳ Time has elapsed. Securely submitting your responses...", false);
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
   let maxScore = 0;

   exam.questions.forEach((q) => {
     const selected = answers[q.id] || []; // User ne jo chuna
     const correct = q.correctOptionIds || []; // Asli sahi jawab (Array)

     // 🌟 1. DYNAMIC MAX SCORE CALCULATION
     maxScore += correct.length;

     if (selected.length === 0) {
       // 🌟 2. UNANSWERED PENALTY
       totalScore -= 1;
     } else {
       // 🌟 3. ACCURACY CHECKING
       let questionPenalty = 0;
       let questionGain = 0;

       selected.forEach((optId) => {
         if (correct.includes(optId)) {
           questionGain += 1;
         } else {
           questionPenalty += 1;
         }
       });

       // 🌟 4. MISSING CORRECT ANSWERS PENALTY
       let missingCorrect = 0;
       correct.forEach((correctId) => {
         if (!selected.includes(correctId)) {
           missingCorrect += 1;
         }
       });

       // Final calculation for this question
       totalScore += (questionGain - (questionPenalty + missingCorrect));
     }
   });

   return { totalScore, maxScore };
  };

  const handlePreSubmit = () => {
    showConfirm(
      "You are about to submit your assessment. Please be advised that negative marking applies for any incorrect or omitted answers. Do you wish to proceed?", 
      executeSubmit
    );
  };

  const executeSubmit = async () => {
    setIsSubmitting(true);
    // 🌟 Yahan humne dono scores nikal liye
    const { totalScore, maxScore } = calculateScore(); 

    try {
      await submitExamResult({
        userId,
        examId,
        examTitle: exam.title,
        totalScore: totalScore,
        maxScore: maxScore, // 🌟 Isko ab DB me save kar rahe hain
        answers
      });

      showToast("✅ Assessment successfully submitted and recorded.");
      navigate('/exam'); 
    } catch (error) {
      showAlert("Submission interrupted. Please check your network connection and try again.");
      setIsSubmitting(false);
    }
  };
  
  if (!exam) return (
    <div className="min-h-screen py-20 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
      <div className="h-8 w-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-4"></div>
      <span className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">Configuring Assessment Workspace...</span>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-28 md:py-10 sm:px-6 lg:px-8 relative selection:bg-teal-100 selection:text-teal-900">
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />

      {/* 🌟 STICKY TIMER FOR MOBILE */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center sm:hidden shadow-sm">
        <span className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">Time Remaining</span>
        <div className={`text-xl font-bold font-mono tracking-tight transition-colors ${timeLeft <= 300 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in pt-4 sm:pt-0">
        
        {/* Back Button (Safe Exit) */}
        <div className="px-4 sm:px-0">
          <BackButton to="/exam" label="Leave Workspace" />
        </div>

        {/* 1. HEADER SECTION */}
        <div className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2">{exam.category || 'Evaluation Module'}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{exam.title}</h1>
          </div>
          
          {/* 🌟 DESKTOP TIMER */}
          <div className="hidden sm:flex flex-col items-end bg-slate-50 border border-slate-200 px-6 py-3.5 rounded-2xl min-w-[150px]">
            <span className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase mb-1">Time Remaining</span>
            <div className={`text-3xl font-bold font-mono tracking-tight transition-colors ${timeLeft <= 300 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* 2. QUESTIONS LIST */}
        <div className="space-y-4 sm:space-y-6">
          {exam.questions.map((q, index) => (
            <div key={q.id} className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-6 sm:p-8 lg:p-10">
              
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-slate-900 text-white h-7 w-7 rounded-md flex items-center justify-center text-xs font-bold shadow-sm">
                    {index + 1}
                  </span> 
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Question</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">ID: {q.id.slice(0,6)}</span>
              </div>
              
              <div 
                className="prose prose-slate max-w-none mb-8 text-[15px] md:text-[16px] text-slate-800 verse-thought-serif leading-relaxed"
                dangerouslySetInnerHTML={{ __html: q.text }}
              />
              
              <div className="grid grid-cols-1 gap-3">
                {q.options.map(opt => {
                  const isSelected = answers[q.id]?.includes(opt.id);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => toggleOption(q.id, opt.id)}
                      className={`flex items-start gap-3 sm:gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.99] ${isSelected ? 'border-teal-500 bg-teal-50/30' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      <div className={`mt-0.5 h-5 w-5 rounded-md shrink-0 flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-teal-500 border-teal-500 text-white shadow-sm shadow-teal-200' : 'border-slate-300 bg-slate-50'}`}>
                        {isSelected && <i className="fa-solid fa-check text-[10px]"></i>}
                      </div>
                      
                      <div 
                        className={`prose prose-sm w-full transition-colors ${isSelected ? 'text-teal-950 font-medium' : 'text-slate-700'}`} 
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
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 sm:p-5 z-50 shadow-[0_-4px_20px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[11px] sm:text-xs text-slate-500 text-center sm:text-left flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <i className="fa-solid fa-lock text-[10px]"></i>
            </div>
            <span>
              <strong className="text-slate-700 font-semibold">Proctored Session:</strong> The system will automatically secure and submit your responses when the timer concludes.
            </span>
          </div>
          <button 
            onClick={handlePreSubmit} 
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white px-10 py-3 rounded-xl text-xs font-bold transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
            ) : (
              <><i className="fa-solid fa-paper-plane"></i> Finalize & Submit</>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}