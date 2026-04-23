import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";
import {
  getUserPosts,
  getUserBookmarkedPosts,
  getUserExamResults,
  getUserProfile,
  getAllExams, // 🌟 NAYA IMPORT: Absent exams calculate karne ke liye
  getResultsReleaseStatus
} from "../../services/firebaseServices";

// Components
import ProfileHeader from "../../components/Profile/ProfileHeader";
import PostCard from "../../components/Community/PostCard";
import BackButton from "../../components/common/BackButton";

export default function ProfilePage() {
  const { id } = useParams(); 
  const { currentUser, userId } = useAuth();

  const isMyProfile = !id || id === userId;
  const targetUserId = isMyProfile ? userId : id;

  const [activeTab, setActiveTab] = useState("posts");
  const [profileData, setProfileData] = useState(null); 

  // Data States
  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [allExams, setAllExams] = useState([]); 
  const [resultsReleased, setResultsReleased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!targetUserId) return;

    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const pData = await getUserProfile(targetUserId);
        setProfileData(pData);

        const posts = await getUserPosts(targetUserId);
        setMyPosts(posts);

        if (isMyProfile) {
          const [bookmarks, exams, allExamsData, releaseStatus] = await Promise.all([
            getUserBookmarkedPosts(userId),
            getUserExamResults(userId),
            getAllExams(),
            getResultsReleaseStatus()
          ]);
          setSavedPosts(bookmarks);
          setExamResults(exams);
          setAllExams(allExamsData);
          setResultsReleased(releaseStatus);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [targetUserId, isMyProfile, userId]);

  const showToast = (msg) => alert(msg);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-8 w-8 border-[3px] border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isMyProfile && !isLoading && !profileData) {
    return (
      <div className="text-center py-20 text-zinc-500 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2 text-zinc-900">Explorer Not Found</h2>
        <p className="mb-6">This user does not exist in the verse.</p>
        <BackButton to={-1} label="Go Back" />
      </div>
    );
  }

  // 🌟 FILTER LOGIC: Sirf Past Exams (Report Card ke liye)
  const now = new Date();
  const pastExams = allExams.filter(exam => {
      const hasResult = examResults.some(r => r.examId === exam.id);
      if (hasResult) return true;

      const startDateTime = new Date(`${exam.date} ${exam.time}`);
      if (isNaN(startDateTime.getTime())) return false; 
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);
      return now > endDateTime; 
  });

  return (
    <section className="w-full max-w-4xl mx-auto py-4 sm:py-12 animate-fade-in font-sans">

      <div className="px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <BackButton to={-1} label="Back" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <ProfileHeader profileData={profileData} isMyProfile={isMyProfile} />      
      </div>

      {/* PROFILE TABS */}
      <div className="mt-6 sm:mt-8 mb-4 sm:mb-6 border-b border-zinc-200 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${activeTab === "posts" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-600"}`}
          >
            {isMyProfile ? "My Thoughts" : "Thoughts"}
          </button>

          {isMyProfile && (
            <>
              <button
                onClick={() => setActiveTab("saved")}
                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${activeTab === "saved" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-600"}`}
              >
                Saved
              </button>

              <button
                onClick={() => setActiveTab("exams")}
                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${activeTab === "exams" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-600"}`}
              >
                Vault
              </button>
            </>
          )}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="min-h-[300px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-6 w-6 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* POSTS TAB */}
            {activeTab === "posts" && (
              <div className="flex flex-col gap-3 sm:gap-6 sm:px-6 lg:px-8 animate-fade-in-up">
                {myPosts.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-slate-200 sm:rounded-3xl mx-0 sm:mx-0 border-x-0 sm:border-x shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <i className="fa-solid fa-feather-pointed text-2xl"></i>
                    </div>
                    <h3 className="text-slate-600 font-bold text-base">
                      {isMyProfile ? "You haven't shared any thoughts yet." : "No thoughts shared yet."}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">When you share a thought, it will appear here.</p>
                  </div>
                ) : (
                  myPosts.map((post) => (
                    <PostCard key={post.id} post={post} showToast={showToast} />
                  ))
                )}
              </div>
            )}

            {/* SAVED TAB */}
            {isMyProfile && activeTab === "saved" && (
              <div className="flex flex-col gap-3 sm:gap-6 sm:px-6 lg:px-8 animate-fade-in-up">
                {savedPosts.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-slate-200 sm:rounded-3xl mx-0 sm:mx-0 border-x-0 sm:border-x shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <i className="fa-regular fa-bookmark text-2xl"></i>
                    </div>
                    <h3 className="text-slate-600 font-bold text-base">
                      No saved posts in your vault.
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">Bookmark posts to read them later.</p>
                  </div>
                ) : (
                  savedPosts.map((post) => (
                    <PostCard key={post.id} post={post} showToast={showToast} />
                  ))
                )}
              </div>
            )}

            {/* 🌟 NEW VAULT TAB (Premium Minimalist Table) */}
            {isMyProfile && activeTab === "exams" && (
              <div className="px-0 sm:px-6 lg:px-8 animate-fade-in-up">
                <div className="bg-white border-y sm:border border-slate-200 sm:rounded-3xl flex flex-col overflow-hidden shadow-sm">
                  
                  <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 flex items-center gap-2">
                      <i className="fa-solid fa-file-lines text-teal-600 text-lg"></i> Assessment Records
                    </h3>
                  </div>
                  
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[300px]">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                          <th className="py-4 px-5 sm:px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">Test Name</th>
                          <th className="py-4 px-5 sm:px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right font-sans">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pastExams.length === 0 ? (
                          <tr>
                            <td colSpan="2" className="py-16 text-center">
                              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">No past records found.</p>
                            </td>
                          </tr>
                        ) : (
                          pastExams.map(exam => {
                            const userResult = examResults.find(r => r.examId === exam.id);
                            
                            let scoreDisplay;
                            if (userResult) {
                              if (!resultsReleased) {
                                scoreDisplay = (
                                  <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-amber-100">
                                    Pending
                                  </span>
                                );
                              } else if (userResult.maxScore) {
                                const percent = Math.round((userResult.totalScore / userResult.maxScore) * 100);
                                scoreDisplay = (
                                  <span className={`font-mono font-black text-sm sm:text-base ${userResult.totalScore >= 0 ? 'text-teal-600' : 'text-rose-600'}`}>
                                    {percent > 0 ? '+' : ''}{percent}%
                                  </span>
                                );
                              } else {
                                scoreDisplay = (
                                  <span className={`font-mono font-black text-sm sm:text-base ${userResult.totalScore >= 0 ? 'text-teal-600' : 'text-rose-600'}`}>
                                    {userResult.totalScore > 0 ? '+' : ''}{userResult.totalScore}
                                  </span>
                                );
                              }
                            } else {
                              scoreDisplay = (
                                <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-rose-100">
                                  Absent
                                </span>
                              );
                            }

                            return (
                              <tr key={exam.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors">
                                <td className="py-4 px-5 sm:px-6 text-sm font-bold text-slate-700">
                                  {exam.title}
                                </td>
                                <td className="py-4 px-5 sm:px-6 text-right">
                                  {scoreDisplay}
                                </td>
                              </tr>
                            )
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}