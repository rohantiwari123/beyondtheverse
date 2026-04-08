import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 🌟 1. Firebase se doc aur onSnapshot import karein
import { doc, onSnapshot } from 'firebase/firestore'; 
import { db } from '../../firebase'; // Apne firebase.js ka sahi path check kar lein

import PostCard from '../../components/Community/PostCard';
import BackButton from '../../components/common/BackButton';

export default function SinglePostPage({ showToast }) {
  const { postId } = useParams(); 
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    // 🌟 2. NAYA LOGIC: Real-time Listener lagaya hai (ab comments turant aayenge)
    const postRef = doc(db, 'posts', postId);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        if(showToast) showToast("This post has been deleted or does not exist.", false);
        navigate('/community'); 
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching single post:", error);
      if(showToast) showToast("Error loading post.", false);
      navigate('/community');
      setLoading(false);
    });

    // Clean up memory
    return () => unsubscribe();
  }, [postId, navigate, showToast]);

  const handleBackIntercept = (e) => {
    e.stopPropagation();     
    e.preventDefault();      
    navigate('/community');  
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20 pt-6 sm:pt-10">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
        
        <div className="px-4 sm:px-6 lg:px-8">
          <div 
            onClickCapture={handleBackIntercept} 
            className="inline-block cursor-pointer w-max"
          >
            <BackButton />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-500 mb-4"></i>
            <span className="text-[10px] text-slate-400">Loading Thought...</span>
          </div>
        ) : post ? (
          <div className="px-0 sm:px-6 lg:px-8 animate-fade-in-up">
            {/* 🌟 3. isSinglePost={true} pass kiya taaki comments auto-open ho sakein */}
            <PostCard post={post} showToast={showToast} isSinglePost={true} />
          </div>
        ) : null}

      </div>
    </div>
  );
}