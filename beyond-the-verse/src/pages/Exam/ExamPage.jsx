import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { getAllExams, getUserExamResults, deleteExam } from '../../services/firebaseServices'; 
import { formatDateTime } from '../../utils/dateFormatter';
import BackButton from '../../components/common/BackButton';

// ==========================================
// 🌟 CUSTOM MODAL (For Safe Deletion)
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
          <h3 className="text-lg font-bold text-slate-800">{config.type === 'confirm' ? 'Confirm Deletion' : 'Notice'}</h3>
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
            {config.type === 'confirm' ? 'Delete' : 'Okay'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🌟 HELPER: Calculate Remaining Time
// ==========================================
const getRemainingTime = (dateStr, timeStr, currentTime) => {
  if (!dateStr || !timeStr) return "AVAILABLE";
  
  const targetDate = new Date(`${dateStr} ${timeStr}`);
  if (isNaN(targetDate.getTime())) return "AVAILABLE"; // Fallback if format is weird

  const diff = targetDate - currentTime;
  if (diff <= 0) return "AVAILABLE";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  if (days > 0) return `Opens in ${days}d ${hours}h`;
  if (hours > 0) return `Opens in ${hours}h ${minutes}m`;
  return `Opens in ${minutes > 0 ? minutes : 1}m`;
};

// ==========================================
// 🌟 MAIN COMPONENT
// ==========================================
export default function ExamPage({ showToast }) {
  const { userId, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('active');
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date()); // State to force re-render for countdown

  // Modal State
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', message: '', onConfirm: null });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

  // ⏱️ Update current time every minute for the countdown
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const examsData = await getAllExams();
        setExams(examsData);

        if (userId) {
          try {
            const resultsData = await getUserExamResults(userId);
            setResults(resultsData);
          } catch (resErr) {
            console.error("Results Fetch Error:", resErr);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  // Delete Exam Handler
  const handleDeleteExam = (examId, examTitle) => {
    showConfirm(`Are you sure you want to permanently delete "${examTitle}"? This action cannot be undone.`, async () => {
      try {
        await deleteExam(examId);
        setExams(prevExams => prevExams.filter(exam => exam.id !== examId));
        if(showToast) showToast("Assessment deleted successfully!");
      } catch (error) {
        if(showToast) showToast("Failed to delete assessment.", false);
        console.error(error);
      }
    });
  };

  return (
    <div className="w-full min-h-screen sm:px-6 lg:px-8 bg-slate-50 pb-20 pt-6 sm:pt-10 font-sans relative">
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
        
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8">
          <BackButton />
        </div>

        {/* PAGE HEADER & TABS */}
        <div className=" sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2 sm:mb-4 border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Assessments</h1>
              <p className="text-sm sm:text-base text-slate-500 font-medium mt-2">Evaluate your understanding and track your performance.</p>
            </div>

            {/* Flat Tabs */}
            <div className="flex bg-slate-200/50 p-1.5 rounded-xl border border-slate-200 w-full md:w-max">
              <button
                onClick={() => setActiveTab('active')}
                className={`flex-1 md:w-44 text-xs sm:text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'active' ? "bg-white text-teal-700 border border-slate-200 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                <i className="fa-solid fa-file-signature"></i> Active Assessments
              </button>
              <button
                onClick={() => setActiveTab('vault')}
                className={`flex-1 md:w-44 text-xs sm:text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'vault' ? "bg-white text-teal-700 border border-slate-200 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                <i className="fa-solid fa-chart-simple"></i> My Results
              </button>
            </div>
          </div>
        </div>

        {/* LOADER */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <div className="h-8 w-8 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin mb-4"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Loading Records...</span>
          </div>
        ) : (
          <div className="sm:px-6 lg:px-8">
            {/* ==============================================================
                TAB 1: ACTIVE ASSESSMENTS
            ============================================================== */}
            {activeTab === 'active' && (
              <div className="animate-fade-in">
                {exams.length === 0 ? (
                  <div className="text-center py-20 mx-4 sm:mx-0 text-slate-400 bg-white rounded-2xl border border-slate-200">
                    <i className="fa-solid fa-folder-open text-4xl mb-4 opacity-30"></i>
                    <p className="font-semibold text-sm">No assessments are currently available.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6">
                    {exams.map((exam) => {
                      
                      // 🌟 TIMER LOGIC
                      const timeStatus = getRemainingTime(exam.date, exam.time, now);
                      const isAvailable = timeStatus === "AVAILABLE";

                      return (
                        <div key={exam.id} className={`p-6 sm:p-8 border-y sm:border border-slate-200 sm:rounded-2xl flex flex-col justify-between transition-all group mb-4 sm:mb-0 relative ${isAvailable ? 'bg-white hover:border-teal-400' : 'bg-slate-50/80'}`}>
                          
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-slate-200">
                                {exam.category}
                              </span>
                              
                              {/* Action Buttons */}
                              <div className="flex items-center gap-3">
                                {isAdmin && (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteExam(exam.id, exam.title); }} 
                                    className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 h-7 w-7 rounded-md flex items-center justify-center transition-colors"
                                    title="Delete Assessment"
                                  >
                                    <i className="fa-solid fa-trash-can text-sm"></i>
                                  </button>
                                )}
                                {isAvailable && <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>}
                              </div>
                            </div>
                            
                            <h3 className={`text-lg sm:text-xl font-bold mb-6 leading-snug transition-colors ${isAvailable ? 'text-slate-800 group-hover:text-teal-700' : 'text-slate-500'}`}>
                              {exam.title}
                            </h3>
                            
                            <div className="space-y-2 mb-6">
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                <i className="fa-solid fa-list-ol w-4 text-center text-slate-400"></i> {exam.questions?.length || 0} Questions
                              </div>
                              {exam.date && (
                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                  <i className="fa-regular fa-calendar-day w-4 text-center text-slate-400"></i> {exam.date} at {exam.time}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 🌟 CONDITIONAL BUTTON */}
                          {isAvailable ? (
                            <button 
                              onClick={() => navigate(`/exam/engine/${exam.id}`)} 
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-colors flex justify-center items-center gap-2 text-xs uppercase tracking-widest active:scale-[0.98]"
                            >
                              Start Assessment <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </button>
                          ) : (
                            <div className="w-full bg-slate-200/50 text-slate-500 font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 text-xs uppercase tracking-widest border border-slate-200 cursor-not-allowed">
                              <i className="fa-solid fa-lock text-[10px]"></i> {timeStatus}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ==============================================================
                TAB 2: MY RESULTS
            ============================================================== */}
            {activeTab === 'vault' && (
              <div className="animate-fade-in">
                {!userId ? (
                  <div className="text-center py-20 mx-4 sm:mx-0 text-slate-400 bg-white rounded-2xl border border-slate-200">
                    <i className="fa-solid fa-lock text-4xl mb-4 opacity-30"></i>
                    <p className="font-semibold text-sm">Please log in to view your past results.</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="text-center py-20 mx-4 sm:mx-0 text-slate-400 bg-white rounded-2xl border border-slate-200">
                    <i className="fa-solid fa-clipboard-check text-4xl mb-4 opacity-30"></i>
                    <p className="font-semibold text-sm">You haven't completed any assessments yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-6">
                    {results.map((res) => (
                      <div key={res.id} className={`bg-white p-6 sm:p-8 border-y sm:border border-slate-200 sm:rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-slate-300 transition-colors border-l-[6px] ${res.totalScore >= 0 ? 'border-l-emerald-500' : 'border-l-rose-500'} mb-4 sm:mb-0`}>
                        
                        <div className="space-y-2">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
                            {res.examTitle}
                          </h3>
                          <p className="text-xs text-slate-500 font-semibold flex items-center gap-2">
                            <i className="fa-regular fa-calendar text-slate-400"></i>
                            Submitted on {formatDateTime(res.submittedAt)}
                          </p>
                        </div>
                        
                        <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-w-[120px] shrink-0">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Score
                          </div>
                          <div className={`text-2xl sm:text-3xl font-black ${res.totalScore >= 0 ? 'text-slate-800' : 'text-rose-600'}`}>
                            {res.totalScore > 0 ? '+' : ''}{res.totalScore}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
