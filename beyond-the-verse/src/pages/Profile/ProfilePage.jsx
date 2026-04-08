import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserExamResults } from '../../services/firebaseServices';
import { formatDateTime } from '../../utils/dateFormatter';
import BackButton from '../../components/common/BackButton';

export default function ProfilePage({ showToast }) {
  const { isAuthenticated, userName, userId, userEmail, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Security Check: Agar user login nahi hai, to Home par bhej do
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch User's Exam History (Vault)
  useEffect(() => {
    const fetchMyResults = async () => {
      if (userId) {
        try {
          const data = await getUserExamResults(userId);
          setResults(data);
        } catch (error) {
          console.error("Error fetching results:", error);
          if (showToast) showToast("Failed to load your history.", false);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMyResults();
  }, [userId, showToast]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Calculate Total Knowledge Points
  const totalScore = results.reduce((sum, res) => sum + (res.totalScore || 0), 0);

  if (!isAuthenticated) return null;

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20 pt-6 sm:pt-10">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
        
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8">
          <BackButton />
        </div>

        {/* 🌟 1. PROFILE HEADER CARD (Edge-to-edge on mobile) */}
        <div className="px-0 sm:px-6 lg:px-8">
          <div className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left transition-colors">
            
            {/* Avatar */}
            <div className="h-24 w-24 sm:h-28 sm:w-28 bg-teal-50 text-teal-600 border border-teal-100 rounded-full flex items-center justify-center text-4xl sm:text-5xl shrink-0">
              {userName?.charAt(0).toUpperCase() || <i className="fa-solid fa-user"></i>}
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-slate-800">{userName}</h1>
                <p className="text-[13px] sm:text-sm text-slate-400 mt-1">{userEmail || "No email provided"}</p>
              </div>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs border ${isAdmin ? 'bg-slate-900 text-white border-slate-800' : 'bg-teal-50 text-teal-700 border-teal-200'}`}>
                  {isAdmin ? 'Admin' : 'Citizen'}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-[10px] sm:text-xs border bg-slate-50 text-slate-500 border-slate-200">
                  ID: {userId?.substring(0, 8)}...
                </span>
              </div>
            </div>

            {/* Logout Button (Desktop) */}
            <button onClick={handleLogout} className="hidden sm:flex bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 px-6 py-2.5 rounded-xl text-[13px] transition-colors items-center gap-2">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
            </button>
          </div>
        </div>

        {/* 🌟 2. STATS OVERVIEW */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center transition-colors hover:border-slate-300">
              <i className="fa-solid fa-file-signature text-xl sm:text-2xl text-slate-300 mb-2 sm:mb-3"></i>
              <p className="text-[10px] sm:text-xs text-slate-400">Assessments</p>
              <p className="text-2xl sm:text-3xl text-slate-800 mt-1">{results.length}</p>
            </div>
            <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center transition-colors hover:border-slate-300">
              <i className="fa-solid fa-bolt text-xl sm:text-2xl text-teal-500 mb-2 sm:mb-3"></i>
              <p className="text-[10px] sm:text-xs text-slate-400">Total Score</p>
              <p className={`text-2xl sm:text-3xl mt-1 ${totalScore >= 0 ? 'text-teal-600' : 'text-rose-500'}`}>
                {totalScore > 0 ? '+' : ''}{totalScore}
              </p>
            </div>
          </div>
        </div>

        {/* 🌟 3. EXAM HISTORY (VAULT) - Edge-to-edge on mobile */}
        <div className="px-0 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="mb-4 px-4 sm:px-0">
            <h2 className="text-xl sm:text-2xl text-slate-800">My Activity Vault</h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Past Assessments</p>
          </div>

          {loading ? (
            <div className="text-center py-16 bg-white border-y sm:border border-slate-200 sm:rounded-2xl">
              <i className="fa-solid fa-circle-notch fa-spin text-2xl text-teal-500 mb-3"></i>
              <p className="text-[10px] sm:text-xs text-slate-400">Loading Records...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16 bg-white border-y sm:border border-slate-200 sm:rounded-2xl px-4">
              <i className="fa-solid fa-ghost text-4xl mb-4 text-slate-300"></i>
              <p className="text-[13px] sm:text-sm text-slate-500">Your vault is empty. Take an assessment to see your history here.</p>
              <button onClick={() => navigate('/exam')} className="mt-6 bg-slate-900 text-white px-6 py-3 rounded-xl text-[11px] sm:text-xs transition-transform active:scale-95">
                Go to Assessments
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {results.map((res) => (
                <div key={res.id} className={`bg-white p-5 sm:p-6 border-y sm:border border-slate-200 sm:rounded-2xl flex flex-row items-center justify-between gap-4 hover:border-slate-300 transition-colors border-l-4 sm:border-l-[6px] ${res.totalScore >= 0 ? 'border-l-emerald-500' : 'border-l-rose-500'}`}>
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-[15px] sm:text-lg text-slate-800 line-clamp-1">{res.examTitle}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1.5">
                      <i className="fa-regular fa-calendar"></i> {formatDateTime(res.submittedAt)}
                    </p>
                  </div>
                  <div className="bg-slate-50 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl border border-slate-200 flex flex-col items-center justify-center shrink-0">
                    <div className="text-[8px] sm:text-[10px] text-slate-400 mb-0.5">Score</div>
                    <div className={`text-[17px] sm:text-xl ${res.totalScore >= 0 ? 'text-slate-800' : 'text-rose-600'}`}>
                      {res.totalScore > 0 ? '+' : ''}{res.totalScore}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout Button (Mobile Only) */}
        <div className="px-4 sm:hidden mt-8 pb-12">
          <button onClick={handleLogout} className="w-full bg-white hover:bg-rose-50 text-slate-500 border border-slate-200 px-5 py-4 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-colors">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out from Verse
          </button>
        </div>

      </div>
    </div>
  );
}