import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// 🌟 MERA UPDATE 1: Yahan getUserExamResults ko import kiya hai
import { getExamById, submitExamResult, getUserExamResults } from '../../services/firebaseServices';
import BackButton from '../common/BackButton';
import ExamAgreement from './ExamAgreement';

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
// 🌟 UTILS
// ==========================================
const shuffleArray = (array) => {
  if (!array || array.length === 0) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const enterFullscreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
};

function FullscreenListener({ onExit }) {
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        onExit();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, [onExit]);
  return null;
}

function SplitScreenBlocker({ onResolve }) {
  return (
    <div className="fixed inset-0 z-[110] bg-slate-900 flex items-center justify-center p-6 text-center">
      <div className="max-w-sm animate-fade-in">
        <div className="h-20 w-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-rose-500/20">
          <i className="fa-solid fa-layer-group text-3xl text-rose-500 animate-pulse"></i>
        </div>
        <h2 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">Split-Screen Detected</h2>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
          Multi-window mode is strictly prohibited. To continue your assessment, please close all other applications and exit split-screen mode.
        </p>
        <button 
          onClick={onResolve}
          className="w-full bg-white text-slate-900 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all border-b-4 border-slate-300 active:border-b-0 active:translate-y-1"
        >
          I have closed other apps
        </button>
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
  const { userId, userName, userUsername } = useAuth();
  
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({}); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isSplitScreen, setIsSplitScreen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', message: '', onConfirm: null });

  const [timeLeft, setTimeLeft] = useState(30 * 60); // Default 30 Minutes
  const [warnings, setWarnings] = useState(0); // 🌟 Anti-cheating state
  
  // 🌟 FIX: Prevent showing "already submitted" toast immediately after submission
  const isInitialLoad = React.useRef(true);

  const showAlert = (message, onConfirm = null) => setModalConfig({ isOpen: true, type: 'alert', message, onConfirm });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

  const calculateTimeLeft = (endDateStr, endTimeStr) => {
    if (!endDateStr || !endTimeStr) return 30 * 60;
    try {
      const dateParts = endDateStr.trim().split(' ');
      const timeParts = endTimeStr.trim().split(' ');
      
      if (dateParts.length !== 3 || timeParts.length < 2) return 30 * 60;
      
      const [day, month, year] = dateParts;
      const [time, modifier] = timeParts;
      let [hours, minutes] = time.split(':');
      
      hours = parseInt(hours, 10);
      if (isNaN(hours)) return 30 * 60;

      if (hours === 12) {
        hours = modifier === 'AM' ? 0 : 12;
      } else if (modifier === 'PM') {
        hours += 12;
      }
      
      const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
      
      const parsedMonth = monthMap[month];
      if (parsedMonth === undefined) return 30 * 60;
      
      const endDateTime = new Date(parseInt(year, 10), parsedMonth, parseInt(day, 10), hours, parseInt(minutes, 10), 0).getTime();
      
      if (isNaN(endDateTime)) return 30 * 60;

      const now = new Date().getTime();
      const diff = Math.floor((endDateTime - now) / 1000);
      
      return diff > 0 ? diff : 0;
    } catch (e) {
      return 30 * 60;
    }
  };

  // 1. Fetch Exam
  useEffect(() => {
    const fetchExamAndVerify = async () => {
      try {
        // 🌟 MERA UPDATE 2: SECURITY CHECK - Kya user ne exam de diya hai? (Only on initial load)
        if (userId && isInitialLoad.current) {
          const pastResults = await getUserExamResults(userId);
          const alreadyTaken = pastResults.find(r => r.examId === examId);
          
          if (alreadyTaken) {
            if (showToast) showToast("You have already completed this evaluation. Multiple attempts are restricted.", false);
            navigate('/exam'); // Bahar fek do!
            return;
          }
        }
        
        isInitialLoad.current = false;

        // 🌟 Agar nahi diya hai, tabhi paper load karo
        const examData = await getExamById(examId);
        if (examData) {
          // 🌟 SHUFFLING LOGIC: Shuffle Questions AND their internal options
          const shuffledQuestions = shuffleArray(examData.questions).map(q => ({
            ...q,
            options: shuffleArray(q.options)
          }));

          const finalizedExam = { ...examData, questions: shuffledQuestions };
          setExam(finalizedExam);
          
          let initialAnswers = {};
          finalizedExam.questions.forEach(q => { initialAnswers[q.id] = []; });
          setAnswers(initialAnswers);
          
          const initialTime = calculateTimeLeft(examData.endDate, examData.endTime);
          if (initialTime <= 0) {
            if (showToast) showToast("This assessment's deadline has passed. You can no longer attempt it.", false);
            navigate('/exam');
            return;
          }
          setTimeLeft(initialTime);
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
  }, [examId, userId, navigate]);

  // 🌟 NAYA: Auto-Submit Timer & Anti-Cheating Execution
  useEffect(() => {
    if (!exam || isSubmitting) return;

    if (timeLeft <= 0) {
      if (showToast) showToast("⏳ Time has elapsed. Securely submitting your responses...", false);
      executeSubmit();
      return;
    }

    if (warnings >= 2) {
      if (showToast) showToast("🚨 Multiple tab switches detected. Auto-submitting exam.", false);
      executeSubmit();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, exam, isSubmitting, warnings]);

  // 🌟 NAYA: Tab Switching Detection
  useEffect(() => {
    if (!exam || isSubmitting || warnings >= 2) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings(prev => {
          const newWarnings = prev + 1;
          if (newWarnings < 2) {
            showAlert(`🚨 Anti-Cheating Warning: Tab switching or minimizing is not allowed. Warning ${newWarnings}/2. Next time, your exam will be automatically submitted.`);
          }
          return newWarnings;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [exam, isSubmitting, warnings]);

  // 🌟 NAYA: Split-Screen / Resize Detection (Mobile)
  useEffect(() => {
    if (!exam || isSubmitting || warnings >= 2) return;

    // Record initial height
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      // If height decreases by more than 30% (indicates split screen)
      if (currentHeight < initialHeight * 0.7) {
        setIsSplitScreen(true);
        setWarnings(prev => {
          if (prev >= 2) return prev;
          const newWarnings = prev + 1;
          if (newWarnings < 2) {
            showAlert(`🚨 Anti-Cheating Warning: Split-screen or significant window resizing is not allowed. Warning ${newWarnings}/2.`);
          }
          return newWarnings;
        });
      } else {
        setIsSplitScreen(false);
      }
    };

    // Use a small timeout to avoid rapid firing
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 500);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [exam, isSubmitting, warnings]);

  // Format time for display
  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (d > 0) return `${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m`;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
    const { totalScore, maxScore } = calculateScore(); 

    try {
      await submitExamResult({
        userId,
        userName: userName || userUsername || 'Student',
        userUsername: userUsername || userName || '',
        examId,
        examTitle: exam.title,
        totalScore: totalScore,
        maxScore: maxScore,
        answers // 🌟 Zaroori: DB me answers save ho rahe hain
      });

      if(showToast) showToast("✅ Your assessment is submitted. Results will be visible once admin releases them.");
      
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

  if (!hasAgreed) {
    return (
      <ExamAgreement 
        exam={exam} 
        onAccept={() => {
          setHasAgreed(true);
          enterFullscreen();
        }} 
        onCancel={() => navigate('/exam')} 
      />
    );
  }

  return (
    <div 
      className="w-full min-h-screen bg-slate-50 pb-28 md:py-10 sm:px-6 lg:px-8 relative select-none"
      onContextMenu={(e) => { e.preventDefault(); if (showToast) showToast("⚠️ Right-click is disabled during the assessment."); }}
      onCopy={(e) => { e.preventDefault(); if (showToast) showToast("⚠️ Copying text is disabled."); }}
      onPaste={(e) => { e.preventDefault(); if (showToast) showToast("⚠️ Pasting is disabled."); }}
    >
      {isSplitScreen && <SplitScreenBlocker onResolve={enterFullscreen} />}
      <FullscreenListener onExit={() => {
        setWarnings(prev => {
          const newWarnings = prev + 1;
          if (newWarnings < 2) {
            showAlert(
              `🚨 Security Warning: Fullscreen mode was exited. Please stay in fullscreen to avoid disqualification. Warning ${newWarnings}/2.`,
              enterFullscreen
            );
          }
          return newWarnings;
        });
      }} />
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />

      {/* 🌟 STICKY TIMER FOR MOBILE */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center sm:hidden shadow-sm">
        <span className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">Time Remaining</span>
        <div className={`text-xl font-bold font-mono tracking-tight transition-colors ${timeLeft <= 300 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 animate-fade-in pt-4 sm:pt-0">
        
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
                className="prose prose-slate max-w-none mb-8 text-[15px] md:text-[16px] text-slate-800 verse-thought-serif leading-relaxed break-words overflow-hidden"
                dangerouslySetInnerHTML={{ __html: q.text }}
              />
              
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt, optIndex) => {
                  const isSelected = answers[q.id]?.includes(opt.id);
                  const optionLetter = String.fromCharCode(65 + optIndex);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => toggleOption(q.id, opt.id)}
                      className={`flex items-center gap-3 sm:gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.99] ${isSelected ? 'border-teal-500 bg-teal-50/30 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-colors ${isSelected ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {optionLetter}
                      </div>
                      
                      <div 
                        className={`prose prose-sm w-full transition-colors break-words overflow-hidden ${isSelected ? 'text-teal-950 font-bold' : 'text-slate-700 font-medium'}`} 
                        dangerouslySetInnerHTML={{ __html: opt.text }} 
                      />

                      <div className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-teal-500 bg-teal-500 text-white' : 'border-slate-300'}`}>
                        {isSelected && <i className="fa-solid fa-check text-[10px]"></i>}
                      </div>
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
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
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