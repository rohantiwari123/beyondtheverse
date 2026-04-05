import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// 🌟 JADOO: Direct Firebase imports hata kar Service bula li
import { getAllExams } from '../../services/firebaseServices';

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examsData = await getAllExams();
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
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="h-8 w-8 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin mb-4"></div>
        <span className="text-[10px] font-bold uppercase tracking-widest">Loading Trials...</span>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="text-center py-24 text-slate-400">
        <i className="fa-solid fa-box-open text-5xl mb-6 opacity-20"></i>
        <p className="font-bold text-sm uppercase tracking-widest">No trials available yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 md:px-0">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
          <i className="fa-solid fa-book-open text-teal-600"></i> Available Mind Trials
        </h2>
        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {exams.length} Active
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-3xl border border-slate-200 transition-all flex flex-col justify-between hover:border-teal-200">
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-teal-50 text-teal-600 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-teal-100">
                  {exam.category}
                </span>
                {/* Visual Indicator for new exams (Optional) */}
                <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-6 leading-snug line-clamp-2">
                {exam.title}
              </h3>
              
              <div className="space-y-3">
                {(exam.date || exam.time) && (
                  <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    {exam.date && (
                      <span className="flex items-center gap-1.5">
                        <i className="fa-regular fa-calendar text-slate-400"></i> {exam.date}
                      </span>
                    )}
                    {exam.time && (
                      <span className="flex items-center gap-1.5">
                        <i className="fa-regular fa-clock text-slate-400"></i> {exam.time}
                      </span>
                    )}
                  </div>
                )}

                {exam.location && (
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 truncate uppercase tracking-widest">
                    <i className="fa-solid fa-location-dot"></i> {exam.location}
                  </div>
                )}

                <div className="flex items-center gap-2 text-[11px] font-bold text-teal-600 uppercase tracking-widest">
                  <i className="fa-solid fa-layer-group"></i> 
                  {exam.questions?.length || 0} Logical Challenges
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/academy/exam/${exam.id}`)} 
              className="w-full mt-8 bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all flex justify-center items-center gap-2 text-xs uppercase tracking-[0.2em] active:scale-95"
            >
              Start Trial <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}