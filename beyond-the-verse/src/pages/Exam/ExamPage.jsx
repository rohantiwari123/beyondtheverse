import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { getAllExams, getUserExamResults, deleteExam, getResultsReleaseStatus, getExamById } from '../../services/firebaseServices'; 
import BackButton from '../../components/common/BackButton';
import LoginOverlay from '../../components/common/LoginOverlay';
import ExamAgreement from '../../components/Exam/ExamAgreement';

// ==========================================
// 🌟 CUSTOM MODAL (Ultra Flat & Minimal)
// ==========================================
function CustomModal({ config, onClose }) {
  if (!config.isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 w-full max-w-sm relative z-10 animate-fade-in-up rounded-2xl shadow-xl transition-colors">
        <div className="flex items-start gap-4 mb-6">
          <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center shrink-0 ${config.type === 'confirm' ? 'bg-red-50 text-red-500' : 'bg-zinc-100 text-zinc-600'}`}>
            <i className={`fa-solid ${config.type === 'confirm' ? 'fa-trash-can' : 'fa-circle-info'} text-lg`}></i>
          </div>
          <div className="pt-0.5">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-1 tracking-tight">
              {config.type === 'confirm' ? 'Delete Test?' : 'Notice'}
            </h3>
            <p className="text-[13px] sm:text-sm text-zinc-500 leading-relaxed font-medium transition-colors">{config.message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2.5 mt-2">
          {config.type === 'confirm' && (
            <button onClick={onClose} className="px-4 sm:px-5 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:bg-zinc-100 transition-colors duration-200">
              Cancel
            </button>
          )}
          <button 
            onClick={() => { config.onConfirm && config.onConfirm(); onClose(); }} 
            className={`px-5 sm:px-6 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-widest text-white transition-all active:scale-95 shadow-lg ${config.type === 'confirm' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-slate-900 hover:bg-slate-800 shadow-teal-500/10'}`}
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
      color: 'bg-rose-50 text-rose-600 border border-rose-200 font-bold uppercase tracking-widest text-[11px] sm:text-xs'
    };
  }

  // 1. COMPLETED: High contrast bold mono text
  if (userResult) {
    // 🌟 DOUBLE LOCK: Global status AND specific exam status must be released
    const isActuallyReleased = resultsReleased && exam.isResultPublished;

    if (!isActuallyReleased && !isAdmin) {
      return {
        type: 'PENDING',
        label: 'Pending',
        color: 'bg-yellow-50 text-yellow-800 border border-yellow-200 font-bold uppercase tracking-widest text-[11px] sm:text-xs'
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
      color: 'bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200 font-bold uppercase tracking-widest text-[11px] sm:text-xs' 
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
      color: 'bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200 font-bold uppercase tracking-widest text-[11px] sm:text-xs' 
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
  const [globalAgreed, setGlobalAgreed] = useState(false); // 🌟 New State for Checkbox
  const [lang, setLang] = useState('en'); // 🌟 New State for Language ('en' or 'hi')
  const [fullExamDataMap, setFullExamDataMap] = useState({}); // Store prefetched data by ID

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', message: '', onConfirm: null });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

  // 🌟 TRANSLATION CONTENT
  const protocolContent = {
    en: {
      title: "Assessment Protocol & Rules",
      switch: "हिन्दी में पढ़ें",
      sections: [
        {
          title: "Exam Pattern",
          icon: "fa-solid fa-list-check",
          items: [
            { icon: "fa-solid fa-clipboard-question", text: "Total 50 MCQ questions." },
            { icon: "fa-solid fa-check-double", text: "4 options per question with only 1 correct answer." },
            { icon: "fa-solid fa-shuffle", text: "Questions and options are randomized for each student." }
          ]
        },
        {
          title: "Marking Scheme",
          icon: "fa-solid fa-calculator",
          items: [
            { icon: "fa-solid fa-circle-check", label: "Correct Answer", value: "+1 Mark", color: "text-teal-600" },
            { icon: "fa-solid fa-circle-xmark", label: "Wrong Answer", value: "-1 Mark (Penalty)", color: "text-rose-600" },
            { icon: "fa-solid fa-circle-minus", label: "Unattempted", value: "-1 Mark (Penalty)", color: "text-amber-600" }
          ]
        },
        {
          title: "Technical Security",
          icon: "fa-solid fa-shield-halved",
          items: [
            { icon: "fa-solid fa-expand", text: "Fullscreen mode is mandatory." },
            { icon: "fa-solid fa-window-restore", text: "Tab switching / Minimizing is prohibited." },
            { icon: "fa-solid fa-ban", text: "Right-click, Copy, & Paste are disabled." }
          ]
        },
        {
          title: "Disqualification",
          icon: "fa-solid fa-gavel",
          items: [
            { icon: "fa-solid fa-triangle-exclamation", text: "3 Warnings will lead to auto-submission.", color: "text-rose-600" },
            { icon: "fa-solid fa-code", text: "Opening DevTools will terminate session.", color: "text-rose-600" }
          ]
        }
      ],
      checkbox: "I have read and understood all the protocols. I agree to maintain assessment integrity and abide by these rules.",
      noteTitle: "Final Note",
      noteText: "The system will auto-submit responses when the timer ends. Results are pending until released by Admin."
    },
    hi: {
      title: "परीक्षा प्रोटोकॉल और नियम",
      switch: "Read in English",
      sections: [
        {
          title: "परीक्षा का प्रारूप",
          icon: "fa-solid fa-list-check",
          items: [
            { icon: "fa-solid fa-clipboard-question", text: "कुल 50 बहुविकल्पीय (MCQ) प्रश्न।" },
            { icon: "fa-solid fa-check-double", text: "प्रत्येक प्रश्न के 4 विकल्प हैं और केवल 1 सही उत्तर है।" },
            { icon: "fa-solid fa-shuffle", text: "प्रश्न और विकल्प प्रत्येक छात्र के लिए रैंडम (Random) होंगे।" }
          ]
        },
        {
          title: "अंक योजना",
          icon: "fa-solid fa-calculator",
          items: [
            { icon: "fa-solid fa-circle-check", label: "सही उत्तर", value: "+1 अंक", color: "text-teal-600" },
            { icon: "fa-solid fa-circle-xmark", label: "गलत उत्तर", value: "-1 अंक (Penalty)", color: "text-rose-600" },
            { icon: "fa-solid fa-circle-minus", label: "अनुत्तरित प्रश्न", value: "-1 अंक (Penalty)", color: "text-amber-600" }
          ]
        },
        {
          title: "तकनीकी सुरक्षा",
          icon: "fa-solid fa-shield-halved",
          items: [
            { icon: "fa-solid fa-expand", text: "फुलस्क्रीन मोड अनिवार्य है।" },
            { icon: "fa-solid fa-window-restore", text: "टैब स्विचिंग / मिनिमाइज करना वर्जित है।" },
            { icon: "fa-solid fa-ban", text: "राइट-क्लिक, कॉपी और पेस्ट डिसेबल हैं।" }
          ]
        },
        {
          title: "अयोग्यता",
          icon: "fa-solid fa-gavel",
          items: [
            { icon: "fa-solid fa-triangle-exclamation", text: "3 चेतावनियों के बाद परीक्षा अपने आप सबमिट हो जाएगी।", color: "text-rose-600" },
            { icon: "fa-solid fa-code", text: "DevTools खोलने पर सत्र समाप्त हो जाएगा।", color: "text-rose-600" }
          ]
        }
      ],
      checkbox: "मैंने सभी प्रोटोकॉल पढ़ और समझ लिए हैं। मैं परीक्षा की सत्यनिष्ठा बनाए रखने और इन नियमों का पालन करने के लिए सहमत हूँ।",
      noteTitle: "अंतिम सूचना",
      noteText: "समय समाप्त होने पर सिस्टम उत्तर सबमिट कर देगा। परिणाम एडमिन द्वारा जारी किए जाने तक लंबित रहेंगे।"
    }
  };

  const t = protocolContent[lang];

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

        // Prefetch all active exam data
        const activeExams = filteredExams.filter(e => {
            const start = new Date(`${e.date} ${e.time}`);
            const end = new Date(start.getTime() + 30 * 60000);
            return new Date() >= start && new Date() <= end;
        });

        const dataMap = {};
        await Promise.all(activeExams.map(async (e) => {
            const data = await getExamById(e.id);
            dataMap[e.id] = data;
        }));
        setFullExamDataMap(dataMap);

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

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 pb-24 pt-4 sm:pt-10 selection:bg-zinc-200 selection:text-zinc-900 font-sans relative transition-colors duration-300">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-1.5 transition-colors">Assessments</h1>
          <p className="text-[13px] sm:text-sm font-medium text-zinc-500 transition-colors">Manage your schedules and track your performance.</p>
        </div>

        {/* 🌟 CLEAN & NORMAL RULES SECTION */}
        <div className="mx-4 sm:mx-0 mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 text-slate-900">
              <i className="fa-solid fa-scale-balanced text-xl text-teal-600"></i>
              <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${lang === 'hi' ? 'font-hindi' : ''}`}>
                {t.title}
              </h2>
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              <i className="fa-solid fa-language text-teal-600"></i>
              <span className={`text-xs font-bold uppercase tracking-wide text-slate-700 ${lang === 'hi' ? 'font-hindi text-sm' : ''}`}>
                {t.switch}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {t.sections.map((section, sIdx) => (
                <div key={sIdx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-300 transition-colors">
                  <div className="flex items-center gap-3 mb-5 border-b border-slate-50 pb-3">
                    <i className={`${section.icon} text-teal-600 text-base`}></i>
                    <h4 className={`font-bold text-slate-800 ${lang === 'hi' ? 'font-hindi text-lg' : 'text-xs uppercase tracking-widest'}`}>
                      {section.title}
                    </h4>
                  </div>

                  <ul className="space-y-3">
                    {section.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-3">
                        <i className={`${item.icon} mt-1 text-[12px] ${item.color || 'text-slate-400'}`}></i>
                        <div className={`flex flex-col ${lang === 'hi' ? 'font-hindi leading-relaxed' : ''}`}>
                          {item.label && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {item.label}
                            </span>
                          )}
                          <span className={`text-[13px] sm:text-sm font-semibold ${item.color || 'text-slate-700'}`}>
                            {item.value || item.text}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
             ))}
          </div>

          <div className="mt-6 bg-teal-50/50 border border-teal-100 rounded-2xl p-6 sm:p-8">
             <div className="flex flex-col gap-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1 shrink-0">
                    <input 
                      type="checkbox" 
                      checked={globalAgreed} 
                      onChange={(e) => setGlobalAgreed(e.target.checked)}
                      className="peer h-6 w-6 appearance-none rounded-lg border-2 border-slate-300 bg-white checked:bg-teal-600 checked:border-teal-600 transition-all cursor-pointer"
                    />
                    <i className="fa-solid fa-check absolute text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity"></i>
                  </div>
                  <p className={`text-sm sm:text-[15px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed ${lang === 'hi' ? 'font-hindi text-lg' : ''}`}>
                    {t.checkbox}
                  </p>
                </label>

                <div className="flex items-center gap-3 pt-4 border-t border-teal-100/50">
                  <i className="fa-solid fa-circle-info text-teal-600"></i>
                  <p className={`text-xs font-bold text-slate-500 ${lang === 'hi' ? 'font-hindi text-sm' : ''}`}>
                    <span className="text-teal-700 uppercase tracking-widest mr-2">{t.noteTitle}:</span>
                    {t.noteText}
                  </p>
                </div>
             </div>
          </div>
        </div>

        {/* 🌟 SINGLE LIST CONTAINER */}
        <div className="w-full">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center bg-white border-y sm:border border-zinc-200 sm:rounded-2xl mx-0 sm:mx-0 shadow-sm transition-colors">
              <div className="h-6 w-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mb-4"></div>
            </div>
          ) : exams.length === 0 ? (
             <div className="text-center py-20 bg-white border-y sm:border border-zinc-200 sm:rounded-2xl mx-0 sm:mx-0 shadow-sm transition-colors">
               <i className="fa-solid fa-calendar-xmark text-3xl mb-4 opacity-20 text-slate-400"></i>
               <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">No assessments scheduled.</p>
             </div>
          ) : (
            <div className="bg-white border-y sm:border border-zinc-200 sm:rounded-2xl flex flex-col shadow-sm transition-colors">

              {/* TABLE LIST */}
              <div className="divide-y divide-zinc-100">
                {exams.map((exam) => {
                  const userResult = results.find(r => r.examId === exam.id);
                  const statusBox = getExamStatusBox(exam, userResult, now, resultsReleased, isAdmin);

                  return (
                    <div key={exam.id} className="flex items-center justify-between py-5 px-4 sm:px-8 hover:bg-zinc-50/80 transition-all duration-200 group">

                      {/* LEFT: INFO */}
                      <div className="flex flex-col justify-center pr-4 overflow-hidden">

                        {/* Category & Delete */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest truncate">
                            {exam.category || 'General'}
                          </span>
                          {exam.isDraft && (
                            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded transition-colors">
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
                        <h3 className="text-[15px] sm:text-base font-bold text-zinc-900 leading-snug truncate tracking-tight transition-colors">
                          {exam.title}
                        </h3>

                        {/* Date & Time */}
                        <div className="text-[11px] sm:text-xs font-medium text-zinc-500 mt-1 truncate transition-colors">
                          {exam.date} <span className="mx-1.5 opacity-40">•</span> {exam.time}
                        </div>

                      </div>

                      {/* RIGHT: EXACT STATUS / ACTION BOX */}
                      <div className="shrink-0 flex justify-end gap-2">

                        {/* COMPLETED: Show Results Button / Locked Notice */}
                        {statusBox.type === 'COMPLETED' || statusBox.type === 'PENDING' ? (
                          <>
                            <div className={`flex items-center justify-center h-8 sm:h-9 px-3 sm:px-4 rounded-lg transition-colors ${statusBox.color}`}>
                              {statusBox.label}
                            </div>
                            {statusBox.type === 'COMPLETED' ? (
                              <button 
                                onClick={() => navigate(`/exam/result/${exam.id}`)}
                                className="flex items-center justify-center h-8 sm:h-9 px-4 sm:px-5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-teal-500/10"
                                title={resultsReleased ? "View detailed results" : "View detailed results (Admin Only)"}
                              >
                                <i className="fa-solid fa-eye mr-1.5"></i> View
                              </button>
                            ) : (
                              <div className="flex items-center justify-center h-8 sm:h-9 px-3 sm:px-4 rounded-lg bg-zinc-100 text-zinc-500 border border-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-colors">
                                Pending
                              </div>
                            )}
                          </>
                        ) : (
                          /* ACTIVE BUTTON (Clickable) */
                          statusBox.type === 'ACTIVE' ? (
                            <button 
                              onClick={() => {
                                if (!globalAgreed) {
                                    showToast("Please agree to the assessment protocols first.", false);
                                    return;
                                }
                                enterFullscreen();
                                navigate(`/exam/engine/${exam.id}`, { 
                                    state: { 
                                        prefetchedExam: fullExamDataMap[exam.id], 
                                        agreed: true 
                                    } 
                                });
                              }} 
                              disabled={!globalAgreed}
                              className={`flex items-center justify-center h-8 sm:h-9 px-4 sm:px-5 rounded-lg active:scale-95 transition-all shadow-lg ${!globalAgreed ? 'opacity-30 cursor-not-allowed bg-zinc-200 text-zinc-400' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
                            >
                              {statusBox.label}
                            </button>
                          ) : (
                            /* OTHER STATUSES (Unclickable Div) */
                            <div className={`flex items-center justify-center h-8 sm:h-9 px-3 sm:px-4 rounded-lg transition-colors ${statusBox.color}`}>
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