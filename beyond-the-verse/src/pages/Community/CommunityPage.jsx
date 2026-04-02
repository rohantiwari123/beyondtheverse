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

  // Fetching Posts with real-time updates
  useEffect(() => {
    const q = query(
      collection(db, "posts"), 
      orderBy("isPinned", "desc"), 
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Firestore Error:", error);
      const simpleQ = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      onSnapshot(simpleQ, (s) => setPosts(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    });
    
    return () => unsubscribe();
  }, []);

  // Submit Thought
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    if (!isAuthenticated || !userId) {
      showToast("🔐 Please login first!", false);
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        text: newPost,
        category: category,
        userName: userName || "Explorer",
        userId: userId,
        isPinned: false,
        createdAt: serverTimestamp(),
        interactions: [] 
      });
      setNewPost("");
      showToast("Shared! 🚀");
    } catch (error) {
      showToast("Failed to post.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white md:bg-[#f8fafc] pb-20">
      
      {/* 🌟 SIMPLE HEADER: Clean & Flat */}
      <div className="bg-white border-b border-slate-100 py-6 md:py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            The Verse <span className="text-teal-600">Feed</span>
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        
        {/* Main Feed Container */}
        <div className="space-y-0 md:space-y-6">
          
          {/* Post Creation Box: Edge-to-edge mobile */}
          <div className="bg-white md:rounded-2xl border-b md:border border-slate-100 relative overflow-hidden">
            {!isAuthenticated && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-30 flex items-center justify-center">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-slate-900 text-white px-6 py-2 rounded-full font-black text-[10px] tracking-widest active:scale-95 transition-all"
                >
                  LOGIN TO SHARE A THOUGHT
                </button>
              </div>
            )}

            <form onSubmit={handlePostSubmit} className={`p-4 md:p-6 ${!isAuthenticated ? 'opacity-10 pointer-events-none' : ''}`}>
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What are you reflecting on?"
                className="w-full bg-transparent border-none p-0 text-lg md:text-xl text-slate-800 font-medium placeholder:text-slate-300 focus:ring-0 resize-none min-h-[100px] md:min-h-[120px]"
                maxLength="300"
              />
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-50">
                
                {/* Horizontal Categories: NO SCROLLBAR */}
                <div className="flex w-full sm:w-auto gap-2 overflow-x-auto no-scrollbar py-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`whitespace-nowrap px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-tighter transition-all ${
                        category === cat 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-teal-600 text-white px-8 py-2 rounded-full font-black text-[10px] tracking-widest hover:bg-slate-900 active:scale-95 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? "..." : "SHARE"}
                </button>
              </div>
            </form>
          </div>

          {/* Posts Feed: Edge-to-edge mobile */}
          <div className="space-y-0 md:space-y-4">
            {posts.length === 0 ? (
              <div className="py-20 text-center text-slate-200 text-[10px] font-black uppercase tracking-[0.3em]">
                Loading Verses...
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="md:rounded-2xl md:border border-slate-100 overflow-hidden">
                  <PostCard post={post} showToast={showToast} />
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
    }
