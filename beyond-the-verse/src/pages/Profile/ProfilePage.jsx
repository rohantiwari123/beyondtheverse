import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getUserPosts,
  getUserBookmarkedPosts,
  getUserExamResults,
} from "../../services/firebaseServices";

// Components
import ProfileHeader from "../../components/Profile/ProfileHeader";
import PostCard from "../../components/Community/PostCard";
import BackButton from "../../components/common/BackButton";

export default function ProfilePage() {
  const { currentUser, userId } = useAuth();
  const [activeTab, setActiveTab] = useState("posts"); // 'posts', 'saved', 'exams'

  // Data States
  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const [posts, bookmarks, exams] = await Promise.all([
          getUserPosts(userId),
          getUserBookmarkedPosts(userId),
          getUserExamResults(userId),
        ]);

        setMyPosts(posts);
        setSavedPosts(bookmarks);
        setExamResults(exams);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const showToast = (msg) => alert(msg);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-600"></i>
      </div>
    );
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      <div className="mb-6">
        <BackButton to={-1} label="Back" />
      </div>

      {/* 🌟 Sirf Header dikhega, koi Signout button nahi */}
      <ProfileHeader />

      {/* 🌟 PROFILE TABS */}
      <div className="mt-8 mb-6 border-b border-slate-200">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === "posts" ? "text-teal-600" : "text-slate-400 hover:text-slate-800"}`}
          >
            <i className="fa-solid fa-pen-nib mr-2"></i>My Thoughts
            {activeTab === "posts" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-t-full"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === "saved" ? "text-teal-600" : "text-slate-400 hover:text-slate-800"}`}
          >
            <i className="fa-solid fa-bookmark mr-2"></i>Saved
            {activeTab === "saved" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-t-full"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("exams")}
            className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === "exams" ? "text-teal-600" : "text-slate-400 hover:text-slate-800"}`}
          >
            <i className="fa-solid fa-ranking-star mr-2"></i>Vault (Results)
            {activeTab === "exams" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-t-full"></div>
            )}
          </button>
        </div>
      </div>

      {/* 🌟 TAB CONTENT */}
      <div className="min-h-[300px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-slate-300">
            <i className="fa-solid fa-circle-notch fa-spin text-3xl"></i>
          </div>
        ) : (
          <>
            {activeTab === "posts" && (
              <div className="space-y-6 animate-fade-in-up">
                {myPosts.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-3xl">
                    <i className="fa-solid fa-feather-pointed text-4xl text-slate-300 mb-3"></i>
                    <h3 className="text-slate-500 font-medium">
                      You haven't shared any thoughts yet.
                    </h3>
                  </div>
                ) : (
                  myPosts.map((post) => (
                    <PostCard key={post.id} post={post} showToast={showToast} />
                  ))
                )}
              </div>
            )}

            {activeTab === "saved" && (
              <div className="space-y-6 animate-fade-in-up">
                {savedPosts.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-3xl">
                    <i className="fa-regular fa-bookmark text-4xl text-slate-300 mb-3"></i>
                    <h3 className="text-slate-500 font-medium">
                      No saved posts in your vault.
                    </h3>
                  </div>
                ) : (
                  savedPosts.map((post) => (
                    <PostCard key={post.id} post={post} showToast={showToast} />
                  ))
                )}
              </div>
            )}

            {activeTab === "exams" && (
              <div className="space-y-4 animate-fade-in-up">
                {examResults.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-3xl">
                    <i className="fa-solid fa-award text-4xl text-slate-300 mb-3"></i>
                    <h3 className="text-slate-500 font-medium">
                      No exam results available yet.
                    </h3>
                  </div>
                ) : (
                  examResults.map((result) => (
                    <div
                      key={result.id}
                      className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">
                          {result.examTitle || "Assessment Result"}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Submitted on:{" "}
                          {new Date(
                            result.submittedAt?.toDate(),
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-teal-50 border border-teal-100 px-4 py-2 rounded-xl text-center">
                        <span className="block text-[10px] uppercase font-bold text-teal-600 tracking-wider">
                          Score
                        </span>
                        <span className="text-xl font-black text-teal-700">
                          {result.score}{" "}
                          <span className="text-sm text-teal-500 font-medium">
                            / {result.totalMarks}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
