import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

export default function ExamEngine({ showToast }) {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();
  
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({}); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      const docRef = doc(db, "exams", examId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setExam({ id: docSnap.id, ...data });
        
        let initialAnswers = {};
        data.questions.forEach(q => { initialAnswers[q.id] = []; });
        setAnswers(initialAnswers);
      } else {
        showToast("Exam not found!", false);
        navigate('/academy');
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

  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit? Negative marking apply hogi!")) return;
    setIsSubmitting(true);

    const finalScore = calculateScore();

    try {
      const resultId = `${userId}_${examId}`;
      await setDoc(doc(db, "exam_results", resultId), {
        userId: userId,
        examId: examId,
        examTitle: exam.title,
        totalScore: finalScore,
        answers: answers,
        submittedAt: serverTimestamp()
      });

      showToast("Exam Submitted Successfully! 🚀");
      navigate('/vault'); 
    } catch (error) {
      showToast("Submission failed. Try again.", false);
      setIsSubmitting(false);
    }
  };

  if (!exam) return <div className="text-center py-20">Loading Trial...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-8 relative">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Exam Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-black text-slate-800">{exam.title}</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{exam.category}</p>
        </div>

        {/* Questions List (pb-32 add kiya hai taaki bottom bar text cover na kare) */}
        <div className="space-y-8 pb-32">
          {exam.questions.map((q, index) => (
            <div key={q.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Question {index + 1}
              </div>

              <div 
                className="prose prose-slate max-w-none mb-6 text-slate-800 font-medium"
                dangerouslySetInnerHTML={{ __html: q.text }}
              />

              <div className="space-y-3">
                {q.options.map(opt => {
                  const isSelected = answers[q.id]?.includes(opt.id);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => toggleOption(q.id, opt.id)}
                      className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? 'border-teal-500 bg-teal-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
                    >
                      <div className={`mt-1 h-5 w-5 rounded shrink-0 flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-teal-500 border-teal-500' : 'border-slate-300 bg-white'}`}>
                        {isSelected && <i className="fa-solid fa-check text-white text-xs"></i>}
                      </div>

                      <div 
                        className="prose prose-sm text-slate-700 w-full"
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

      {/* 🌟 NAYA: Floating Bottom Submit Bar 🌟 */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 sm:p-5 shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm font-bold text-slate-500 text-center sm:text-left">
            <span className="text-rose-500 mr-2"><i className="fa-solid fa-circle-exclamation"></i> Warning:</span> 
            Negative marking (-2) will be applied for wrong/unattempted answers.
          </div>
          
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-black py-3 px-10 rounded-xl transition-all shadow-lg shadow-teal-500/30 active:scale-95 text-lg"
          >
            {isSubmitting ? "Submitting..." : "Submit Answers"}
          </button>
        </div>
      </div>
      
    </div>
  );
}