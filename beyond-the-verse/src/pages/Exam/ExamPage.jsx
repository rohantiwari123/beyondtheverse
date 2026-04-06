import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { getAllExams, getUserExamResults, deleteExam } from '../../services/firebaseServices'; 
import { formatDateTime } from '../../utils/dateFormatter';
import BackButton from '../../components/common/BackButton';

// ==========================================
// 🌟 CUSTOM MODAL (Flat Style - No Shadow)
// ==========================================
function CustomModal({ config, onClose }) {
  if (!config.isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="flex items-start gap-5 mb-6">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${config.type === 'confirm' ? 'bg-rose-50 text-rose-500' : 'bg-teal-50 text-teal-500'}`}>
            <i className={`fa-solid ${config.type === 'confirm' ? 'fa-triangle-exclamation' : 'fa-circle-info'} text-xl`}></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{config.type === 'confirm' ? 'Confirm Deletion' : 'Notice'}</h3>
            <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed">{config.message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          {config.type === 'confirm' && (
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors uppercase tracking-widest">Cancel</button>
          )}
          <button 
            onClick={() => { config.onConfirm && config.onConfirm(); onClose(); }} 
            className={`px-8 py-2.5 rounded-xl text-xs font-bold text-white uppercase tracking-widest transition-colors ${config.type === 'confirm' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-teal-600 hover:bg-teal-700'}`}
          >
            {config.type === 'confirm' ? 'Delete' : 'Okay'}
          </button>
        </div>
      </div>
    </div>
  );
}

const getRemainingTime = (dateStr, timeStr, currentTime) => {
  if (!dateStr || !timeStr) return "AVAILABLE";
  const targetDate = new Date(`${dateStr} ${timeStr}`);
  if (isNaN(targetDate.getTime())) return "AVAILABLE";
  const diff = targetDate - currentTime;
  if (diff <= 0) return "AVAILABLE";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  if (days > 0) return `Opens in ${days}d ${hours}h`;
  if (hours > 0) return `Opens in ${hours}h ${minutes}m`;
  return `Opens in ${minutes > 0 ? minutes : 1}m`;
};

export default function ExamPage({ showToast }) {
  const { userId, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', message: '', onConfirm: null });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

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
          const resultsData = await getUserExamResults(userId);
          setResults(resultsData);
        }
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, [userId]);

  const handleDeleteExam = (examId, examTitle) => {
    showConfirm(`Are you sure you want to permanently delete "${examTitle}"?`, async () => {
      try {
        await deleteExam(examId);
        setExams(prev => prev.filter(e => e.id !== examId));
        if(showToast) showToast("Assessment deleted!");
      } catch (error) { if(showToast) showToast("Failed to delete.", false); }
    });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-24 pt-6 sm:pt-12 font-sans relative overflow-x-hidden">
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16 animate-fade-in">
        
        {/* 1. BACK BUTTON (Padding adjusted for edge-to-edge feel) */}
        <div className="px-4 sm:px-6 lg:px-8">
          <BackButton />
        </div>

        {/* 2. PAGE HEADER & TABS */}
        <div className="px-0 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4 border-b border-slate-200 pb-10 px-4 sm:px-0">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">Assessments</h1>
              <p className="text-[15px] sm:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">Evaluate your understanding of logic and track your progress in the Verse.</p>
            </div>

            {/* Flat Tabs (Shadow removed) */}
            <div className="flex bg-slate-200/60 p-1.5 rounded-2xl border border-slate-200 w-full md:w-max">
              <button
                onClick={() => setActiveTab('active')}
                className={`flex-1 md:w-48 text-xs sm:text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2.5 transition-all ${
                  activeTab === 'active' ? "bg-white text-teal-700 border border-slate-200" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <i className="fa-solid fa-file-signature"></i> Active
              </button>
              <button
                onClick={() => setActiveTab('vault')}
                className={`flex-1 md:w-48 text-xs sm:text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2.5 transition-all ${
                  activeTab === 'vault' ? "bg-white text-teal-700 border border-slate-200" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <i className="fa-solid fa-chart-simple"></i> My Vault
              </button>
            </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT AREA */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400">
            <div className="h-10 w-10 border-[3px] border-slate-200 border-t-teal-500 rounded-full animate-spin mb-5"></div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Synchronizing Records...</span>
          </div>
        ) : (
          <div className="px-0 sm:px-6 lg:px-8">
            
            {/* TAB: ACTIVE ASSESSMENTS */}
            {activeTab === 'active' && (
              <div className="animate-fade-in">
                {exams.length === 0 ? (
                  <div className="text-center py-24 mx-4 sm:mx-0 text-slate-400 bg-white sm:rounded-3xl border border-slate-200">
                    <i className="fa-solid fa-folder-open text-5xl mb-5 opacity-20"></i>
                    <p className="font-bold text-base">No assessments available at this moment.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 lg:gap-8">
                    {exams.map((exam) => {
                      const timeStatus = getRemainingTime(exam.date, exam.time, now);
                      const isAvailable = timeStatus === "AVAILABLE";

                      return (
                        <div key={exam.id} className={`p-6 sm:p-10 border-y sm:border border-slate-200 sm:rounded-3xl flex flex-col justify-between transition-all group mb-4 sm:mb-0 ${isAvailable ? 'bg-white hover:border-teal-400' : 'bg-slate-50/50'}`}>
                          <div>
                            <div className="flex justify-between items-start mb-6">
                              <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-slate-200">
                                {exam.category}
                              </span>
                              {isAdmin && (
                                <button onClick={() => handleDeleteExam(exam.id, exam.title)} className="text-slate-300 hover:text-rose-500 transition-colors h-8 w-8 flex items-center justify-center rounded-lg hover:bg-rose-50">
                                  <i className="fa-solid fa-trash-can text-sm"></i>
                                </button>
                              )}
                            </div>
                            <h3 className={`text-[19px] sm:text-2xl font-bold mb-6 leading-tight transition-colors ${isAvailable ? 'text-slate-800' : 'text-slate-400'}`}>
                              {exam.title}
                            </h3>
                            <div className="space-y-3 mb-8">
                              <div className="flex items-center gap-3 text-[13px] font-bold text-slate-500">
                                <i className="fa-solid fa-circle-nodes text-slate-300 w-4 text-center"></i> {exam.questions?.length || 0} Modules
                              </div>
                              <div className="flex items-center gap-3 text-[13px] font-bold text-slate-500">
                                <i className="fa-regular fa-clock text-slate-300 w-4 text-center"></i> {exam.date || 'Open Access'}
                              </div>
                            </div>
                          </div>

                          {isAvailable ? (
                            <button onClick={() => navigate(`/exam/engine/${exam.id}`)} className="w-full bg-slate-900 hover:bg-teal-600 text-white font-black py-4 rounded-xl transition-all flex justify-center items-center gap-3 text-[11px] uppercase tracking-widest active:scale-95">
                              Start Assessment <i className="fa-solid fa-arrow-right"></i>
                            </button>
                          ) : (
                            <div className="w-full bg-slate-100 text-slate-400 font-bold py-4 rounded-xl flex justify-center items-center gap-3 text-[11px] uppercase tracking-widest border border-slate-200 cursor-not-allowed">
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

            {/* TAB: MY RESULTS (VAULT) */}
            {activeTab === 'vault' && (
              <div className="animate-fade-in max-w-5xl mx-auto space-y-4">
                {!userId ? (
                  <div className="text-center py-24 mx-4 sm:mx-0 bg-white sm:rounded-3xl border border-slate-200">
                    <p className="font-bold text-slate-400">Please log in to access your vault.</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="text-center py-24 mx-4 sm:mx-0 bg-white sm:rounded-3xl border border-slate-200">
                    <p className="font-bold text-slate-400 text-sm tracking-wide">No completed records found in your archive.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {results.map((res) => (
                      <div key={res.id} className={`bg-white p-6 sm:p-10 border-y sm:border border-slate-200 sm:rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-8 transition-colors border-l-[6px] ${res.totalScore >= 0 ? 'border-l-teal-500' : 'border-l-rose-500'}`}>
                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">{res.examTitle}</h3>
                          <p className="text-[13px] text-slate-400 font-bold flex items-center gap-2">
                            <i className="fa-regular fa-calendar-check"></i> {formatDateTime(res.submittedAt)}
                          </p>
                        </div>
                        <div className="bg-slate-50 px-8 py-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-center min-w-[140px] shrink-0">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score Gained</span>
                          <span className={`text-3xl font-black ${res.totalScore >= 0 ? 'text-slate-800' : 'text-rose-600'}`}>
                            {res.totalScore > 0 ? '+' : ''}{res.totalScore}
                          </span>
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
