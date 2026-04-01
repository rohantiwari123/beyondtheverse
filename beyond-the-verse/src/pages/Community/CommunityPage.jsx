import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import PostCard from '../../components/Community/PostCard';

export default function CommunityPage({ showToast }) {
  const { isAuthenticated, userName, userId } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [category, setCategory] = useState("#Philosophy");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["#Philosophy", "#Science", "#Quantum", "#Spirituality", "#Reflection"];

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !isAuthenticated || !userId) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        text: newPost, category, userName: userName || "Explorer", userId,
        createdAt: serverTimestamp(), likes: []
      });
      setNewPost("");
      showToast("Thought shared! 🚀");
    } catch (error) {
      showToast("Post failed", false);
    } finally { setIsSubmitting(false); }
  };

  return (
    // px-0 (Mobile edge-to-edge) | sm:px-4 (Tablet) | md:py-10 (Desktop)
    <div className="w-full max-w-4xl mx-auto px-0 sm:px-4 py-4 md:py-10 space-y-6 md:space-y-10">
      
      {/* Header - Responsive Font Sizes */}
      <div className="text-center space-y-2 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
          The Thought <span className="text-teal-600">Verse</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-medium italic">
          "Where deep reflections meet scientific curiosity."
        </p>
      </div>

      {/* Create Post Box - Rounded-none on mobile for edge-to-edge look */}
      <div className="bg-white sm:rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-200/50 border-y sm:border border-slate-100">
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share a reflection..."
            className="w-full bg-slate-50 border-none rounded-xl p-4 text-base md:text-lg text-slate-700 font-medium focus:ring-2 focus:ring-teal-500/20 resize-none min-h-[100px] md:min-h-[140px]"
            maxLength="300"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category Pills - Horizontal Scroll on Mobile */}
            <div className="flex w-full sm:w-auto gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar px-2 sm:px-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${category === cat ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-slate-900 text-white px-10 py-3 rounded-xl font-black hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post Thought"}
            </button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-1 sm:space-y-6 pb-20">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
    }
