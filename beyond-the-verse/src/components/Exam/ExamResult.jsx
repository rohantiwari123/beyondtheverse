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
              <div key={q.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                
                {/* Question Header Status Bar */}
                <div className={`px-5 py-3 border-b flex justify-between items-center ${
                  !isAttempted ? 'bg-slate-100 border-slate-200' :
                  isCorrectlyAnswered ? 'bg-teal-50 border-teal-100' : 'bg-rose-50 border-rose-100'
                }`}>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Question {index + 1}
                  </span>
                  
                  {!isAttempted ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded">Unattempted</span>
                  ) : isCorrectlyAnswered ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-white border border-teal-200 px-2.5 py-1 rounded flex items-center gap-1.5">
                      <i className="fa-solid fa-check"></i> Correct
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-white border border-rose-200 px-2.5 py-1 rounded flex items-center gap-1.5">
                      <i className="fa-solid fa-xmark"></i> Incorrect
                    </span>
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
                    {q.options.map((opt) => {
                      const isCorrectOption = q.correctOptionIds.includes(opt.id);
                      const isSelectedByUser = selectedOptionIds.includes(opt.id);

                      // Style Logic
                      let optionStyle = "border-slate-200 bg-white text-slate-600"; 
                      let icon = null;

                      if (isCorrectOption && isSelectedByUser) {
                        optionStyle = "border-teal-500 bg-teal-50 text-teal-900 ring-1 ring-teal-500/20";
                        icon = <i className="fa-solid fa-circle-check text-teal-600 text-lg"></i>;
                      } else if (!isCorrectOption && isSelectedByUser) {
                        optionStyle = "border-rose-400 bg-rose-50 text-rose-900 ring-1 ring-rose-400/20";
                        icon = <i className="fa-solid fa-circle-xmark text-rose-500 text-lg"></i>;
                      } else if (isCorrectOption && !isSelectedByUser) {
                        optionStyle = "border-teal-400 border-dashed bg-teal-50/40 text-teal-800";
                        icon = <i className="fa-solid fa-arrow-right text-teal-500 text-sm"></i>;
                      }

                      return (
                        <div 
                          key={opt.id} 
                          className={`relative p-3 sm:p-4 rounded-xl border flex items-start sm:items-center gap-4 transition-all ${optionStyle}`}
                        >
                          <div className="w-6 mt-1 sm:mt-0 shrink-0 flex justify-center">
                            {icon || <div className="h-4 w-4 rounded-full border-2 border-slate-300"></div>}
                          </div>

                          <div 
                            className="flex-1 text-sm sm:text-base verse-thought-serif leading-snug [&>p]:m-0 break-words overflow-hidden"
                            dangerouslySetInnerHTML={{ __html: opt.text }}
                          />

                          {isCorrectOption && !isSelectedByUser && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-100 border border-teal-200 px-2 py-1 rounded shrink-0">
                              Correct Answer
                            </span>
                          )}
                          {!isCorrectOption && isSelectedByUser && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-100 border border-rose-200 px-2 py-1 rounded shrink-0">
                              Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
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