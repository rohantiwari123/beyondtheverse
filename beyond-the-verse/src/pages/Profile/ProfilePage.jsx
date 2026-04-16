import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // 🌟 URL se ID padhne ke liye
import { useAuth } from "../../context/AuthContext";
import {
  getUserPosts,
  getUserBookmarkedPosts,
  getUserExamResults,
  getUserProfile, // 🌟 Dusre user ka data laane ke liye
} from "../../services/firebaseServices";

// Components
import ProfileHeader from "../../components/Profile/ProfileHeader";
import PostCard from "../../components/Community/PostCard";
import BackButton from "../../components/common/BackButton";

export default function ProfilePage() {
  const { id } = useParams(); // URL me jo ID hogi
  const { currentUser, userId } = useAuth();

  // 🌟 LOGIC: Check karo ki apni profile hai ya dusre ki
  const isMyProfile = !id || id === userId;
  const targetUserId = isMyProfile ? userId : id;

  const [activeTab, setActiveTab] = useState("posts");
  const [publicUserData, setPublicUserData] = useState(null); // 🌟 Dusre user ka data

  // Data States
  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!targetUserId) return;

    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        // Agar dusre ki profile hai, to uska naam aur DP lao
        if (!isMyProfile) {
          const pData = await getUserProfile(targetUserId);
          setPublicUserData(pData);
        } else {
          setPublicUserData(null);
        }

        // Posts sabke aayenge (chahe apne ho ya public)
        const posts = await getUserPosts(targetUserId);
        setMyPosts(posts);

        // 🌟 Saved aur Exams sirf Tabhi aayenge jab apni khud ki profile ho
        if (isMyProfile) {
          const [bookmarks, exams] = await Promise.all([
            getUserBookmarkedPosts(userId),
            getUserExamResults(userId),
          ]);
          setSavedPosts(bookmarks);
          setExamResults(exams);
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
        <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-600"></i>
      </div>
    );
  }

  // 🌟 Agar public profile URL galat hai
  if (!isMyProfile && !isLoading && !publicUserData) {
    return (
      <div className="text-center py-20 text-slate-500 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2">Explorer Not Found</h2>
        <p className="mb-6">This user does not exist in the verse.</p>
        <BackButton to={-1} label="Go Back" />
      </div>
    );
  }

  return (
    // 🌟 Yahan se 'px-4' hata diya gaya hai taaki Posts edge-to-edge jaa sakein
    <section className="w-full max-w-4xl mx-auto py-4 sm:py-12 animate-fade-in">

      {/* 🌟 BackButton, Header aur Tabs ko alag se padding di gayi hai */}
      <div className="px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <BackButton to={-1} label="Back" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {/* 🌟 publicUser data pass kar diya */}
        {/* 🌟 FIX 3: isMyProfile prop pass kiya */}
        <ProfileHeader publicUser={publicUserData} isMyProfile={isMyProfile} />      </div>

      {/* PROFILE TABS */}
      <div className="mt-6 sm:mt-8 mb-4 sm:mb-6 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === "posts" ? "text-teal-600" : "text-slate-400 hover:text-slate-800"}`}
          >
            <i className="fa-solid fa-pen-nib mr-2"></i>{isMyProfile ? "My Thoughts" : "Thoughts"}
            {activeTab === "posts" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-t-full"></div>
            )}
          </button>

          {/* 🌟 Private Tabs: Sirf khud ki profile par dikhenge */}
          {isMyProfile && (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="min-h-[300px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-slate-300">
            <i className="fa-solid fa-circle-notch fa-spin text-3xl"></i>
          </div>
        ) : (
          <>
            {activeTab === "posts" && (
              // 🌟 Yahan 'gap-3 sm:gap-6' lagaya hai aur mobile par padding hata di (Edge-to-Edge)
              <div className="flex flex-col gap-3 sm:gap-6 sm:px-6 lg:px-8 animate-fade-in-up">
                {myPosts.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-3xl mx-4 sm:mx-0">
                    <i className="fa-solid fa-feather-pointed text-4xl text-slate-300 mb-3"></i>
                    <h3 className="text-slate-500 font-medium">
                      {isMyProfile ? "You haven't shared any thoughts yet." : "No thoughts shared yet."}
                    </h3>
                  </div>
                ) : (
                  myPosts.map((post) => (
                    <PostCard key={post.id} post={post} showToast={showToast} />
                  ))
                )}
              </div>
            )}

            {isMyProfile && activeTab === "saved" && (
              // 🌟 Same Edge-to-Edge for Saved Posts
              <div className="flex flex-col gap-3 sm:gap-6 sm:px-6 lg:px-8 animate-fade-in-up">
                {savedPosts.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 border border-slate-100 rounded-3xl mx-4 sm:mx-0">
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

            {isMyProfile && activeTab === "exams" && (
              // 🌟 Exams chote cards hain, inme thodi padding theek lagegi
              <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
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