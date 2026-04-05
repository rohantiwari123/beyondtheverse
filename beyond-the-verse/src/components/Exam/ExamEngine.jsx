import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// 🌟 JADOO: Firebase direct imports ki jagah Services bula li
import { getExamById, submitExamResult } from '../../services/firebaseServices';

export default function ExamEngine({ showToast }) {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();
  
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({}); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 📖 Fetch Exam (Using Service)
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const examData = await getExamById(examId);
        if (examData) {
          setExam(examData);
          let initialAnswers = {};
          examData.questions.forEach(q => { initialAnswers[q.id] = []; });
          setAnswers(initialAnswers);
        } else {
          showToast("Exam not found!", false);
          navigate('/academy');
        }
      } catch (error) {
        showToast("Error loading trial.", false);
      }
    };
    fetchExam();
  }, [examId, navigate, showToast]);

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

  // 🚀 Submit Answers (Using Service)
  const handleSubmit = async () => {
    if (!window.confirm("Are you sure? Negative marking (-2) will apply!")) return;
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

      showToast("Trial Completed! 🚀");
      navigate('/vault'); 
    } catch (error) {
      showToast("Submission failed.", false);
      setIsSubmitting(false);
    }
  };

  if (!exam) return (
    <div className="py-20 flex flex-col items-center justify-center text-slate-400">
      <div className="h-8 w-8 border-4 border-slate-200 border-t-slate-500 rounded-full animate-spin mb-4"></div>
      <span className="text-[10px] font-bold uppercase tracking-widest">Initialising Trial...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-0 md:px-4 relative">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Exam Header */}
        <div className="bg-white p-6 md:rounded-2xl border-y md:border border-slate-200">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">{exam.title}</h1>
          <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mt-1">{exam.category}</p>
        </div>

        {/* Questions List */}
        <div className="space-y-4 md:space-y-8 pb-40">
          {exam.questions.map((q, index) => (
            <div key={q.id} className="bg-white p-6 md:p-10 md:rounded-[2rem] border-y md:border border-slate-200">
              
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Challenge {index + 1}
              </div>

              <div 
                className="prose prose-slate max-w-none mb-8 text-lg md:text-xl text-slate-800 font-medium leading-relaxed verse-thought-serif"
                dangerouslySetInnerHTML={{ __html: q.text }}
              />

              <div className="grid grid-cols-1 gap-3">
                {q.options.map(opt => {
                  const isSelected = answers[q.id]?.includes(opt.id);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => toggleOption(q.id, opt.id)}
                      className={`flex items-start gap-4 p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? 'border-teal-500 bg-teal-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                    >
                      <div className={`mt-1 h-5 w-5 rounded shrink-0 flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-teal-500 border-teal-500' : 'border-slate-300 bg-white'}`}>
                        {isSelected && <i className="fa-solid fa-check text-white text-[10px]"></i>}
                      </div>

                      <div 
                        className="prose prose-sm text-slate-700 w-full font-bold"
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

      {/* Floating Bottom Submit Bar (Flat UI) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 sm:p-6 z-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left">
            <span className="text-rose-500 mr-1"><i className="fa-solid fa-triangle-exclamation"></i> Logic Warning:</span> 
            Negative marking (-2) for errors or omissions.
          </div>
          
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white font-black py-4 px-12 rounded-full transition-all active:scale-95 text-sm tracking-widest uppercase disabled:bg-slate-200 disabled:text-slate-400"
          >
            {isSubmitting ? "Processing..." : "Submit Trial"}
          </button>
        </div>
      </div>
      
    </div>
  );
}