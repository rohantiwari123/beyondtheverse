import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 🌟 Context aur Services ka path wahi rahega (../../)
import { useAuth } from '../../context/AuthContext';
import { getExamById, getUserExamResults, getResultsReleaseStatus } from '../../services/firebaseServices';

// 🌟 FIX: BackButton ab sirf ek level upar (../) hai kyunki tum pehle se components folder me ho
import BackButton from '../common/BackButton';

export default function ExamResult({ showToast }) {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { userId, isAdmin } = useAuth();
  
  const [exam, setExam] = useState(null);
  const [userResult, setUserResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resultsReleased, setResultsReleased] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  // Fetch Exam Data & User's Result Data
  useEffect(() => {
    const fetchResultData = async () => {
      if (!userId) {
        if (showToast) showToast("Please log in to view results.", false);
        navigate('/login');
        return;
      }

      try {
        const examData = await getExamById(examId);
        const resultsReleasedStatus = await getResultsReleaseStatus();
        const pastResults = await getUserExamResults(userId);
        const specificResult = pastResults.find(r => r.examId === examId);

        if (!examData || !specificResult) {
          if (showToast) showToast("Result not found. Please complete the exam first.", false);
          navigate('/exam');
          return;
        }

        setExam(examData);
        setResultsReleased(resultsReleasedStatus);

        if (!resultsReleasedStatus && !isAdmin) {
          setIsBlocked(true);
          setUserResult(null);
        } else {
          setUserResult(specificResult);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
        if (showToast) showToast("Failed to load results. Please try again.", false);
        navigate('/exam');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResultData();
  }, [examId, userId, navigate, isAdmin, showToast]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
        <div className="h-8 w-8 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
        <span className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">Analyzing Performance...</span>
      </div>
    );
  }

  const userAnswers = userResult?.answers || {}; // DB se aayi hui answer sheet
  const resultLabel = isBlocked
    ? 'Pending'
    : userResult?.maxScore
      ? `${Math.round((userResult.totalScore / userResult.maxScore) * 100)}%`
      : userResult
        ? `${userResult.totalScore > 0 ? '+' : ''}${userResult.totalScore}`
        : '0%';

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20 pt-4 sm:pt-10 selection:bg-teal-100 selection:text-teal-900 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        
        <div className="mb-6">
          <BackButton to="/exam" label="Back to Dashboard" />
        </div>

        {/* 1. REVIEW HEADER */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mb-6 sm:mb-8 border border-slate-800">
          <div>
            <span className="bg-teal-500/20 text-teal-400 border border-teal-500/30 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-3 inline-block">
              Performance Report
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {exam?.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Review your answers and learn from your mistakes.</p>
          </div>
          
          {/* Score Badge */}
          <div className={`border p-5 rounded-2xl text-center shrink-0 w-full sm:w-auto shadow-inner ${isBlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-800 border-slate-700'}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isBlocked ? 'text-yellow-700' : 'text-slate-400'}`}>
              Final Percentage
            </p>
            <p className={`text-4xl font-black ${isBlocked ? 'text-yellow-700' : 'text-teal-400'}`}>
              {resultLabel}
            </p>
          </div>
        </div>

        {/* 2. RELEASED RESULTS CHECK */}
        {isBlocked ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-base sm:text-lg font-semibold text-slate-900 mb-3">Results are not released yet.</p>
            <p className="text-sm text-slate-500 mb-6">Your score will be available here once the admin publishes the final results.</p>
            <button
              onClick={() => navigate('/exam')}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all"
            >
              Back to Assessments
            </button>
          </div>
        ) : (
          <div className="space-y-5 sm:space-y-6">
            {exam?.questions?.map((q, index) => {
              const selectedOptionIds = userAnswers[q.id] || [];
              const isAttempted = selectedOptionIds.length > 0;
            
            // Check Accuracy
            const isCorrectlyAnswered = 
              isAttempted && 
              q.correctOptionIds.length === selectedOptionIds.length &&
              q.correctOptionIds.every(id => selectedOptionIds.includes(id));

            return (
              <div key={q.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                
                {/* Question Header Status Bar */}
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Question {index + 1}
                  </span>
                  
                  {!isAttempted && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded">Unattempted</span>
                  )}
                </div>

                <div className="p-5 sm:p-8">
                  {/* Question Text */}
                  <div 
                    className="text-base sm:text-lg text-slate-900 font-medium mb-6 verse-thought-serif leading-relaxed break-words overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: q.text }}
                  />

                  {/* Options List */}
                  <div className="space-y-3">
                    {q.options.map((opt, optIndex) => {
                      const isCorrectOption = q.correctOptionIds.includes(opt.id);
                      const optionLetter = String.fromCharCode(65 + optIndex); // A, B, C, D...

                      let optionStyle = "";
                      let badge = null;

                      if (isCorrectOption) {
                        optionStyle = "border-teal-500 bg-teal-50 text-teal-900";
                        badge = (
                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-check text-teal-600 text-sm sm:text-base"></i>
                          </div>
                        );
                      } else {
                        optionStyle = "border-rose-400 bg-rose-50 text-rose-900";
                        badge = (
                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-xmark text-rose-600 text-sm sm:text-base"></i>
                          </div>
                        );
                      }

                      return (
                        <div 
                          key={opt.id} 
                          className={`relative p-3 sm:p-4 rounded-xl border flex items-start sm:items-center gap-3 sm:gap-4 transition-all ${optionStyle}`}
                        >
                          <div className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-black shrink-0 ${
                            isCorrectOption ? 'bg-teal-200 text-teal-800' : 'bg-rose-200 text-rose-800'
                          }`}>
                            {optionLetter}
                          </div>

                          <div 
                            className="flex-1 text-sm sm:text-base verse-thought-serif leading-snug [&>p]:m-0 break-words overflow-hidden"
                            dangerouslySetInnerHTML={{ __html: opt.text }}
                          />

                          {badge}
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Box */}
                  <div className="mt-6 p-4 sm:p-5 bg-slate-50 rounded-xl flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-between border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">You Selected:</span>
                      <span className={`text-base sm:text-lg font-black ${
                        !isAttempted ? 'text-slate-400' : isCorrectlyAnswered ? 'text-teal-600' : 'text-rose-500'
                      }`}>
                        {(() => {
                          const selectedLetters = q.options
                            .map((o, i) => selectedOptionIds.includes(o.id) ? String.fromCharCode(65 + i) : null)
                            .filter(Boolean);
                          return selectedLetters.length > 0 ? selectedLetters.join(', ') : 'None (Unattempted)';
                        })()}
                      </span>
                    </div>
                    <div className="hidden sm:block h-8 w-px bg-slate-200 shrink-0"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 sm:justify-end">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Correct Answer:</span>
                      <span className="text-base sm:text-lg font-black text-teal-600">
                        {(() => {
                          return q.options
                            .map((o, i) => q.correctOptionIds.includes(o.id) ? String.fromCharCode(65 + i) : null)
                            .filter(Boolean)
                            .join(', ');
                        })()}
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}