import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import PostCard from '../../components/Community/PostCard';

export default function CommunityPage({ showToast }) {
  // 🌟 userId ab sahi se destructure hoga
  const { isAuthenticated, userName, userId } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [category, setCategory] = useState("#Philosophy");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["#Philosophy", "#Science", "#Quantum", "#Spirituality", "#Reflection"];

  // Fetch Live Feed
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    // Auth Check
    if (!isAuthenticated || !userId) {
      showToast("Please login first to share thoughts!", false);
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        text: newPost,
        category: category,
        userName: userName || "Explorer",
        userId: userId, // Firebase UID
        createdAt: serverTimestamp(),
        likes: []
      });
      setNewPost("");
      showToast("Thought shared successfully! 🚀");
    } catch (error) {
      console.error("Post Error:", error);
      showToast("Failed to post. Check connection.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
      
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">The Thought <span className="text-teal-600">Verse</span></h1>
        <p className="text-slate-500 font-medium">Share your reflections and scientific theories.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?..."
            className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-700 font-medium focus:ring-2 focus:ring-teal-500/20 resize-none min-h-[120px]"
          />
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${category === cat ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-black hover:bg-slate-800 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post Thought"}
            </button>
          </div>
        </form>
      </div>

      {/* 🌟 FIXED: Syntax ekdam clean hai build ke liye */}
      <div className="space-y-6 pb-20">
        {posts.length === 0 ? (
          <div className="text-center py-20 opacity-40 italic">
            Waiting for the first spark of thought...
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
    }
