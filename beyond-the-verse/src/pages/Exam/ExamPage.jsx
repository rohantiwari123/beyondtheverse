import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { getAllExams, getUserExamResults, deleteExam, getResultsReleaseStatus } from '../../services/firebaseServices'; 
import BackButton from '../../components/common/BackButton';
import LoginOverlay from '../../components/common/LoginOverlay';

// ==========================================
// 🌟 CUSTOM MODAL (Ultra Flat & Minimal)
// ==========================================
function CustomModal({ config, onClose }) {
  if (!config.isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 w-full max-w-sm relative z-10 animate-fade-in-up rounded-2xl">
        <div className="flex items-start gap-4 mb-6">
          <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center shrink-0 ${config.type === 'confirm' ? 'bg-red-50 text-red-500' : 'bg-zinc-100 text-zinc-600'}`}>
            <i className={`fa-solid ${config.type === 'confirm' ? 'fa-trash-can' : 'fa-circle-info'} text-lg`}></i>
          </div>
          <div className="pt-0.5">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-1">
              {config.type === 'confirm' ? 'Delete Test?' : 'Notice'}
            </h3>
            <p className="text-[13px] sm:text-sm text-zinc-500 leading-relaxed font-medium">{config.message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2.5 mt-2">
          {config.type === 'confirm' && (
            <button onClick={onClose} className="px-4 sm:px-5 py-2.5 rounded-xl text-[13px] font-semibold text-zinc-500 hover:bg-zinc-100 transition-colors duration-200">
              Cancel
            </button>
          )}
          <button 
            onClick={() => { config.onConfirm && config.onConfirm(); onClose(); }} 
            className={`px-5 sm:px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all active:scale-95 ${config.type === 'confirm' ? 'bg-red-500 hover:bg-red-600' : 'bg-zinc-900 hover:bg-zinc-800'}`}
          >
            {config.type === 'confirm' ? 'Delete' : 'Okay'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 🌟 MASTER LOGIC: Clean Box Logic with Refined Typography
const getExamStatusBox = (exam, userResult, currentTime, resultsReleased, isAdmin) => {
  if (exam.isDraft) {
    return {
      type: 'DRAFT',
      label: 'Draft',
      color: 'bg-rose-50 text-rose-600 border border-rose-200 font-semibold text-[13px] sm:text-sm'
    };
  }

  // 1. COMPLETED: High contrast bold mono text
  if (userResult) {
    if (!resultsReleased && !isAdmin) {
      return {
        type: 'PENDING',
        label: 'Pending',
        color: 'bg-yellow-50 text-yellow-800 border border-yellow-200 font-semibold text-[13px] sm:text-sm'
      };
    }

    let displayScore = "0%";
    if (userResult.maxScore) {
      const percent = Math.round((userResult.totalScore / userResult.maxScore) * 100);
      displayScore = `${percent > 0 ? '+' : ''}${percent}%`; 
    } else {
      displayScore = `${userResult.totalScore > 0 ? '+' : ''}${userResult.totalScore}`;
    }
    return { 
      type: 'COMPLETED', 
      label: displayScore, 
      color: 'bg-zinc-50 text-zinc-900 border border-zinc-200 font-mono font-bold text-[13px] sm:text-sm' 
    };
  }

  const startDateTime = new Date(`${exam.date} ${exam.time}`);
  
  // No Valid Date -> Default Active
  if (isNaN(startDateTime.getTime())) {
    return { 
      type: 'ACTIVE', 
      label: 'Enter', 
      color: 'bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200 font-semibold text-[11px] sm:text-xs' 
    };
  }

  const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); 
  const diffMs = startDateTime - currentTime;

  // Case A: UPCOMING (Live Timer with tight tracking mono font)
  if (diffMs > 0) {
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    
    let timerStr = "";
    if (days > 0) timerStr = `${days}d ${hours}h`;
    else timerStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return { 
      type: 'UPCOMING', 
      label: timerStr, 
      color: 'bg-transparent text-zinc-500 font-mono tracking-tight border border-zinc-200 font-medium text-[11px] sm:text-xs' 
    };
  }

  // Case B: ACTIVE (Dark button)
  if (currentTime >= startDateTime && currentTime <= endDateTime) {
    return { 
      type: 'ACTIVE', 
      label: 'Enter', 
      color: 'bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200 font-semibold text-[11px] sm:text-xs' 
    };
  }

  // Case C: ABSENT (Subtle red text, spaced out uppercase)
  return { 
    type: 'ABSENT', 
    label: 'Absent', 
    color: 'bg-transparent text-red-500 border border-red-200 uppercase tracking-widest font-bold text-[10px] sm:text-[11px]' 
  };
};

// ==========================================
// 🌟 MAIN PAGE COMPONENT
// ==========================================
export default function ExamPage({ showToast }) {
  const { userId, isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultsReleased, setResultsReleased] = useState(false);
  const [now, setNow] = useState(new Date());
  
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', message: '', onConfirm: null });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

  // 1 Second Ticker
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const examsData = await getAllExams();
        // Filter out draft exams for non-admins
        const filteredExams = isAdmin ? examsData : examsData.filter(exam => !exam.isDraft);
        setExams(filteredExams);
        const releaseStatus = await getResultsReleaseStatus();
        setResultsReleased(releaseStatus);
        if (userId) {
          const resultsData = await getUserExamResults(userId);
          setResults(resultsData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleDeleteExam = (examId, examTitle) => {
    showConfirm(`This will permanently delete "${examTitle}". You cannot undo this.`, async () => {
      try {
        await deleteExam(examId);
        setExams(prev => prev.filter(e => e.id !== examId));
        if(showToast) showToast("Test deleted.");
      } catch (error) { if(showToast) showToast("Failed to delete.", false); }
    });
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 pb-24 pt-4 sm:pt-10 selection:bg-zinc-200 selection:text-zinc-900 font-sans relative">
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />

      {!isAuthenticated && (
        <LoginOverlay 
          icon="fa-solid fa-file-signature" 
          title="Join the Verse" 
          description="Log in to access your assessments, track your progress, and verify your knowledge." 
        />
      )}

      {/* Main Wrapper */}
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in transition-all duration-300 ${!isAuthenticated ? "pointer-events-none opacity-30 select-none" : ""}`}>
        <div className="w-full max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="px-4 sm:px-0 mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6"><BackButton label="Back" /></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-1.5">Assessments</h1>
          <p className="text-[13px] sm:text-sm font-medium text-zinc-500">Manage your schedules and track your performance.</p>
        </div>

        {/* RULES BANNER */}
        <div className="mx-4 sm:mx-0 mb-6 sm:mb-8 bg-zinc-100 text-zinc-600 p-5 sm:p-6 rounded-2xl border border-zinc-200">
          <div className="flex items-center gap-3 mb-3 text-zinc-800">
            <i className="fa-solid fa-scale-balanced text-lg"></i>
            <h3 className="text-base sm:text-lg font-bold tracking-tight">Assessment Rules & Marking Scheme</h3>
          </div>
          <ul className="space-y-2.5 text-[13px] sm:text-sm font-medium leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-teal-600 mt-0.5"><i className="fa-solid fa-circle-check text-[10px]"></i></span>
              <span><strong className="text-teal-700 font-semibold">+1 Mark</strong> for every correct option you select.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 mt-0.5"><i className="fa-solid fa-circle-xmark text-[10px]"></i></span>
              <span><strong className="text-rose-600 font-semibold">-1 Mark (Penalty)</strong> for selecting an incorrect option or missing a correct option.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-amber-500 mt-0.5"><i className="fa-solid fa-triangle-exclamation text-[10px]"></i></span>
              <span><strong className="text-amber-600 font-semibold">-1 Mark (Penalty)</strong> if a question is left completely unattempted (blank).</span>
            </li>
          </ul>
        </div>

        {/* 🌟 SINGLE LIST CONTAINER */}
        <div className="w-full">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center bg-white border-y sm:border border-zinc-200 sm:rounded-2xl mx-0 sm:mx-0">
              <div className="h-6 w-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mb-4"></div>
            </div>
          ) : exams.length === 0 ? (
             <div className="text-center py-20 bg-white border-y sm:border border-zinc-200 sm:rounded-2xl mx-0 sm:mx-0">
               <p className="text-sm font-medium text-zinc-400">No assessments scheduled.</p>
             </div>
          ) : (
            <div className="bg-white border-y sm:border border-zinc-200 sm:rounded-2xl flex flex-col">
              
              {/* TABLE LIST */}
              <div className="divide-y divide-zinc-100">
                {exams.map((exam) => {
                  const userResult = results.find(r => r.examId === exam.id);
                  const statusBox = getExamStatusBox(exam, userResult, now, resultsReleased, isAdmin);

                  return (
                    <div key={exam.id} className="flex items-center justify-between py-4 px-4 sm:px-6 hover:bg-zinc-50/80 transition-colors duration-200 group">
                      
                      {/* LEFT: INFO */}
                      <div className="flex flex-col justify-center pr-4 overflow-hidden">
                        
                        {/* Category & Delete */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest truncate">
                            {exam.category || 'General'}
                          </span>
                          {exam.isDraft && (
                            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                              DRAFT
                            </span>
                          )}
                          {isAdmin && (
                            <button onClick={() => handleDeleteExam(exam.id, exam.title)} className="text-zinc-300 hover:text-red-500 transition-colors duration-200 ml-1">
                              <i className="fa-solid fa-trash-can text-[11px]"></i>
                            </button>
                          )}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-[15px] sm:text-base font-semibold text-zinc-900 leading-snug truncate">
                          {exam.title}
                        </h3>
                        
                        {/* Date & Time */}
                        <div className="text-[11px] sm:text-xs font-medium text-zinc-500 mt-1 truncate">
                          {exam.date} <span className="mx-1.5 opacity-40">•</span> {exam.time}
                        </div>

                      </div>

                      {/* RIGHT: EXACT STATUS / ACTION BOX */}
                      <div className="shrink-0 flex justify-end gap-2">
                        
                        {/* COMPLETED: Show Results Button / Locked Notice */}
                                {statusBox.type === 'COMPLETED' || statusBox.type === 'PENDING' ? (
                          <>
                            <div className={`flex items-center justify-center h-8 sm:h-9 px-3 sm:px-4 rounded-lg ${statusBox.color}`}>
                              {statusBox.label}
                            </div>
                            {statusBox.type === 'COMPLETED' ? (
                              <button 
                                onClick={() => navigate(`/exam/result/${exam.id}`)}
                                className="flex items-center justify-center h-8 sm:h-9 px-4 sm:px-5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-all active:scale-95"
                                title={resultsReleased ? "View detailed results" : "View detailed results (Admin Only)"}
                              >
                                <i className="fa-solid fa-eye mr-1.5"></i> View
                              </button>
                            ) : (
                              <div className="flex items-center justify-center h-8 sm:h-9 px-3 sm:px-4 rounded-lg bg-zinc-100 text-zinc-500 border border-zinc-200 text-[11px] font-semibold">
                                Results Pending
                              </div>
                            )}
                          </>
                        ) : (
                          /* ACTIVE BUTTON (Clickable) */
                          statusBox.type === 'ACTIVE' ? (
                            <button 
                              onClick={() => navigate(`/exam/engine/${exam.id}`)} 
                              className={`flex items-center justify-center h-8 sm:h-9 px-4 sm:px-5 rounded-lg active:scale-95 ${statusBox.color}`}
                            >
                              {statusBox.label}
                            </button>
                          ) : (
                            /* OTHER STATUSES (Unclickable Div) */
                            <div className={`flex items-center justify-center h-8 sm:h-9 px-3 sm:px-4 rounded-lg ${statusBox.color}`}>
                              {statusBox.label}
                            </div>
                          )
                        )}

                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

        </div>
      </div>
    </div>
  );
}