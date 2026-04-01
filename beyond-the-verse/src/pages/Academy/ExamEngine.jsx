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
  const [answers, setAnswers] = useState({}); // { q1: ['optA', 'optC'], q2: [] }
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      const docRef = doc(db, "exams", examId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setExam({ id: docSnap.id, ...data });
        
        // Initialize empty answers for all questions
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

  // Handle Checkbox Selection
  const toggleOption = (questionId, optionId) => {
    setAnswers(prev => {
      const currentSelections = prev[questionId] || [];
      if (currentSelections.includes(optionId)) {
        // Remove if already selected
        return { ...prev, [questionId]: currentSelections.filter(id => id !== optionId) };
      } else {
        // Add if not selected
        return { ...prev, [questionId]: [...currentSelections, optionId] };
      }
    });
  };

  // 🌟 THE HARDCORE GRADING ALGORITHM 🌟
  const calculateScore = () => {
    let totalScore = 0;
    
    exam.questions.forEach(q => {
      const selected = answers[q.id] || [];
      const correct = q.correctOptionIds || [];
      let qScore = 0;

      // Rule: पूरी तरह छोड़ने पर -2
      if (selected.length === 0) {
        qScore -= 2;
      } else {
        // Check selected options
        selected.forEach(opt => {
          if (correct.includes(opt)) qScore += 1; // सही विकल्प चुनने पर +1
          else qScore -= 2; // गलत विकल्प चुनने पर -2
        });

        // Check missed correct options
        correct.forEach(opt => {
          if (!selected.includes(opt)) qScore -= 2; // सही विकल्प न चुनने पर -2
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
      // 🌟 Save Result to Database
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
      navigate('/vault'); // Submit ke baad Vault/Profile par bhej do
    } catch (error) {
      showToast("Submission failed. Try again.", false);
      setIsSubmitting(false);
    }
  };

  if (!exam) return <div className="text-center py-20">Loading Trial...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Exam Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center sticky top-4 z-10">
          <div>
            <h1 className="text-2xl font-black text-slate-800">{exam.title}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{exam.category}</p>
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-xl transition-colors shadow-md shadow-teal-500/30"
          >
            {isSubmitting ? "Submitting..." : "Submit Exam"}
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-8 pb-20">
          {exam.questions.map((q, index) => (
            <div key={q.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              
              {/* Question Number */}
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Question {index + 1}
              </div>

              {/* 🌟 Rich Text Question (HTML Injection) */}
              <div 
                className="prose prose-slate max-w-none mb-6 text-slate-800 font-medium"
                dangerouslySetInnerHTML={{ __html: q.text }}
              />

              {/* Options (Checkboxes) */}
              <div className="space-y-3">
                {q.options.map(opt => {
                  const isSelected = answers[q.id]?.includes(opt.id);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => toggleOption(q.id, opt.id)}
                      className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? 'border-teal-500 bg-teal-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
                    >
                      {/* Custom Checkbox UI */}
                      <div className={`mt-1 h-5 w-5 rounded shrink-0 flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-teal-500 border-teal-500' : 'border-slate-300 bg-white'}`}>
                        {isSelected && <i className="fa-solid fa-check text-white text-xs"></i>}
                      </div>

                      {/* 🌟 Rich Text Option (HTML Injection) */}
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
    </div>
  );
                 }
