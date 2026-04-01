import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import PostCard from '../../components/Community/PostCard';

export default function CommunityPage({ showToast }) {
  const { isAuthenticated, userName, userId } = useAuth();
  const navigate = useNavigate();
  
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
    if (!isAuthenticated || !userId) {
      showToast("🔐 Please login to share your thoughts!", false);
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        text: newPost,
        category: category,
        userName: userName || "Explorer",
        userId: userId,
        createdAt: serverTimestamp(),
        likes: []
      });
      setNewPost("");
      showToast("Thought shared successfully! 🚀");
    } catch (error) {
      showToast("Post failed. Try again.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-0 sm:px-4 py-4 md:py-10 space-y-6 md:space-y-10">
      
      {/* 🌟 Header - Responsive Text */}
      <div className="text-center space-y-2 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
          The Thought <span className="text-teal-600">Verse</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-500 font-bold uppercase tracking-widest opacity-80">
          Explore Science & Philosophy
        </p>
      </div>

      {/* 🌟 Post Creation Box (With Lock for Guests) */}
      <div className="bg-white sm:rounded-3xl shadow-xl shadow-slate-200/50 border-y sm:border border-slate-100 relative overflow-hidden">
        
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-center p-6">
            <div className="h-12 w-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <i className="fa-solid fa-lock text-lg"></i>
            </div>
            <h3 className="font-black text-slate-800 text-sm sm:text-base uppercase">Community Locked</h3>
            <p className="text-slate-500 text-[10px] sm:text-xs font-bold mb-4">Login to join the discussion</p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-teal-600 text-white px-8 py-2 rounded-xl font-black text-xs shadow-lg shadow-teal-500/30 active:scale-95"
            >
              JOIN US
            </button>
          </div>
        )}

        <form onSubmit={handlePostSubmit} className={`p-4 sm:p-6 space-y-4 ${!isAuthenticated ? 'opacity-20 blur-sm pointer-events-none select-none' : ''}`}>
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's your scientific or philosophical reflection?"
            className="w-full bg-slate-50 border-none rounded-2xl p-4 text-base md:text-lg text-slate-700 font-medium focus:ring-2 focus:ring-teal-500/20 resize-none min-h-[120px]"
            maxLength="300"
          />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex w-full sm:w-auto gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${category === cat ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-slate-900 text-white px-10 py-3 rounded-xl font-black text-sm tracking-wide hover:bg-slate-800 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "POSTING..." : "SHARE THOUGHT"}
            </button>
          </div>
        </form>
      </div>

      {/* 🌟 Posts Feed */}
      <div className="space-y-1 sm:space-y-6 pb-24">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-slate-300 italic font-medium">Waiting for reflections...</div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} showToast={showToast} />
          ))
        )}
      </div>
    </div>
  );
}
