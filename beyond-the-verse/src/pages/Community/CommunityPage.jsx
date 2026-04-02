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
  const [category, setCategory] = useState("Philosophy");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Philosophy", "Science", "Quantum", "Spirituality", "Reflection"];

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("isPinned", "desc"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      const simpleQ = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      onSnapshot(simpleQ, (s) => setPosts(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    });
    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    if (!isAuthenticated || !userId) return showToast("Please login first.", false);
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        text: newPost, category: category, userName: userName || "Explorer", userId: userId,
        isPinned: false, createdAt: serverTimestamp(), interactions: [], bookmarks: []
      });
      setNewPost("");
      showToast("Post published!");
    } catch (error) {
      showToast("Failed to post.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white md:bg-slate-50 pb-20">
      
      {/* 🌟 FULL WIDTH CONTAINER, NO EXTRA MARGINS */}
      <div className="max-w-2xl mx-auto w-full">
        
        <div className="space-y-0 md:space-y-4">
          
          {/* POST COMPOSER */}
          {isAuthenticated ? (
            <div className="bg-white md:rounded-b-2xl border-b md:border md:border-t-0 border-slate-200 p-4 md:p-6 shadow-sm relative z-10">
              <form onSubmit={handlePostSubmit}>
                
                <div className="flex gap-3 md:gap-4 mb-3">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0 mt-1">
                    {userName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  
                  <textarea 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full bg-transparent border-0 outline-none focus:ring-0 focus:outline-none focus:border-transparent p-0 pt-2 md:pt-3 text-lg md:text-xl text-slate-900 placeholder:text-slate-400 resize-none min-h-[80px]"
                    maxLength="500"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
                  <div className="flex w-full sm:w-auto gap-2 overflow-x-auto no-scrollbar py-1">
                    {categories.map(cat => (
                      <button
                        key={cat} type="button" onClick={() => setCategory(cat)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-colors border ${
                          category === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <button 
                    type="submit" disabled={!newPost.trim() || isSubmitting}
                    className="w-full sm:w-auto bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide disabled:bg-slate-200 disabled:text-slate-400 transition-colors shrink-0"
                  >
                    {isSubmitting ? "Posting..." : "Post"}
                  </button>
                </div>

              </form>
            </div>
          ) : (
            /* Login Banner */
            <div className="bg-slate-50 border-b md:border md:border-t-0 border-slate-200 p-8 md:rounded-b-2xl flex flex-col items-center justify-center text-center shadow-sm relative z-10">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-feather-pointed text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Join the Verse</h3>
              <p className="text-sm text-slate-500 mb-5 max-w-sm">Log in to share your reflections, debate with logic, and become a part of the community.</p>
              <button onClick={() => navigate('/login')} className="bg-slate-900 text-white rounded-full px-8 py-2.5 text-sm font-bold transition-colors hover:bg-slate-800">
                Log in to post
              </button>
            </div>
          )}

          {/* POSTS FEED */}
          <div className="space-y-0 md:space-y-4">
            {posts.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-300">
                <div className="h-8 w-8 border-4 border-slate-200 border-t-slate-400 rounded-full animate-spin mb-4"></div>
                <span className="text-xs font-bold uppercase tracking-widest">Loading Feed</span>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="md:rounded-2xl md:border border-slate-200 overflow-hidden bg-white shadow-sm">
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
