import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ExamPage({ showToast }) {
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const q = query(collection(db, "exams"));
        const snapshot = await getDocs(q);
        const examData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExams(examData);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExams();
  }, []);

  const handleStartExam = (examId) => {
    if (!isAuthenticated) {
      showToast("🔐 Pehle login karein tabhi Mind Trial de sakte hain!", false);
      return navigate('/login');
    }
    navigate(`/academy/exam/${examId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            The <span className="text-teal-600">Academy</span>
          </h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Test Your Intellect • Mind Trials
          </p>
        </div>

        {/* Rules Warning Box */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-800 shadow-sm">
          <h3 className="font-black text-lg mb-2 flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i> Warning: Hardcore Grading
          </h3>
          <ul className="list-disc pl-5 text-sm font-medium space-y-1">
            <li>1 या उससे अधिक विकल्प सही हो सकते हैं।</li>
            <li>सही विकल्प चुनने पर <b>+1 अंक</b>।</li>
            <li>गलत विकल्प चुनने पर <b>-2 अंक</b>।</li>
            <li>सही विकल्प न चुनने पर (Miss करने पर) <b>-2 अंक</b>।</li>
            <li>प्रश्न को पूरी तरह छोड़ने पर <b>-2 अंक</b>।</li>
          </ul>
        </div>

        {/* Exams Grid */}
        {isLoading ? (
          <div className="text-center py-20"><i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-500"></i></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map(exam => (
              <div key={exam.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-widest">
                  {exam.category}
                </span>
                <h2 className="text-xl font-black text-slate-800 mt-4 mb-2">{exam.title}</h2>
                <p className="text-sm text-slate-500 font-medium mb-6">
                  {exam.questions?.length || 0} Questions • Multiple Correct Options
                </p>
                <button 
                  onClick={() => handleStartExam(exam.id)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors active:scale-95"
                >
                  Start Trial <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
                                                    }
