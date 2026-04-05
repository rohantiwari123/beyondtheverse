import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// 🌟 JADOO: Services aur Utils bula liye
import { getUserExamResults } from '../../services/firebaseServices';
import { formatDateTime } from '../../utils/dateFormatter';

export default function ExamPage() {
  const { userId } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // 👨‍🍳 Chef (Service) se data maanga
        const list = await getUserExamResults(userId);
        setResults(list);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [userId]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="h-8 w-8 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin mb-4"></div>
        <span className="text-[10px] font-bold uppercase tracking-widest">Opening Vault...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-0">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
          <i className="fa-solid fa-vault text-teal-600"></i> Your Knowledge Vault
        </h1>
        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {results.length} Records
        </span>
      </div>

      {results.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-slate-200 text-center text-slate-400">
          <i className="fa-solid fa-ghost text-5xl mb-6 opacity-20"></i>
          <p className="font-bold text-sm uppercase tracking-widest">The vault is empty. Complete a trial first.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {results.map((res) => (
            <div key={res.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-teal-200 transition-all group">
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-teal-700 transition-colors">
                  {res.examTitle}
                </h3>
                
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-regular fa-calendar-check text-teal-500"></i>
                  {formatDateTime(res.submittedAt)}
                </p>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex-1 sm:flex-none text-center sm:text-right bg-slate-50 px-8 py-4 rounded-2xl border border-slate-100 group-hover:bg-teal-50/30 group-hover:border-teal-100 transition-all">
                  <div className={`text-4xl font-black ${res.totalScore >= 0 ? 'text-slate-900' : 'text-rose-500'}`}>
                    {res.totalScore}
                  </div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                    Knowledge Points
                  </div>
                </div>
                
                {/* Visual Arrow Icon */}
                <div className="hidden md:flex h-10 w-10 rounded-full border border-slate-100 items-center justify-center text-slate-300 group-hover:text-teal-500 group-hover:border-teal-200 transition-all">
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}