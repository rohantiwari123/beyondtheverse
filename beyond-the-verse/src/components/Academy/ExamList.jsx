import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase'; // Apna sahi firebase path check kar lein

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase se data mangwane ka function
    const fetchExams = async () => {
      try {
        // Exams collection se data laao, naye exams sabse upar (descending order)
        const q = query(collection(db, "exams"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const examsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setExams(examsData);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <i className="fa-solid fa-box-open text-4xl mb-4 text-slate-300"></i>
        <p className="font-bold text-lg">Abhi tak koi exam create nahi hua hai.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
        <i className="fa-solid fa-book-open text-teal-600"></i> Available Mind Trials
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl z-10">
              {exam.category}
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">
                {exam.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm font-bold text-slate-400 mt-4">
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-list-ol"></i> 
                  {exam.questions?.length || 0} Questions
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full mt-6 bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-700 font-bold py-3 rounded-xl border-2 border-slate-100 hover:border-teal-200 transition-colors flex justify-center items-center gap-2">
              Start Exam <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
                                                 }
