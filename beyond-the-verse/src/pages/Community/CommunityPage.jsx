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
        isPinned: false,
        createdAt: serverTimestamp(),
        interactions: [] 
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
    <div className="min-h-screen bg-white md:bg-[#f8fafc] pb-20">
      
      {/* 🌟 HERO SECTION: Minimal for Mobile, Bold for Desktop */}
      <div className="bg-white border-b border-slate-100 pt-8 pb-6 md:pt-16 md:pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-[900] text-slate-900 tracking-tighter">
            The Thought <span className="text-teal-600 italic">Verse</span>
          </h1>
          <p className="mt-1 text-[10px] md:text-sm text-slate-400 font-black uppercase tracking-[0.3em]">
            Science • Philosophy • Logic
          </p>
        </div>
      </div>

      {/* 🌟 MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-10 items-start">
        
        {/* LEFT COLUMN: Feed (Edge-to-Edge on Mobile) */}
        <div className="lg:col-span-8 space-y-0 md:space-y-8">
          
          {/* Post Creation Box: Edge-to-edge on mobile */}
          <div className="bg-white md:rounded-[2rem] md:shadow-xl md:shadow-slate-200/50 border-b md:border border-slate-100 relative">
            {!isAuthenticated && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-6">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-slate-900 text-white px-8 py-3 rounded-full font-black text-[10px] tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  LOGIN TO POST
                </button>
              </div>
            )}

            <form onSubmit={handlePostSubmit} className={`p-4 md:p-8 space-y-4 ${!isAuthenticated ? 'opacity-20 blur-sm pointer-events-none' : ''}`}>
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share a scientific reflection..."
                className="w-full bg-slate-50 md:bg-white border-none md:border-2 border-transparent md:focus:border-teal-500/20 rounded-2xl p-0 md:p-4 text-lg md:text-xl text-slate-800 font-semibold placeholder:text-slate-300 focus:ring-0 resize-none min-h-[120px] md:min-h-[160px] transition-all"
                maxLength="300"
              />
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                {/* Horizontal Scrollable Categories */}
                <div className="flex w-full sm:w-auto gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${category === cat ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30' : 'bg-slate-100 text-slate-400'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-teal-600 text-white px-8 py-3.5 rounded-full font-black text-xs tracking-widest hover:bg-slate-900 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-teal-600/20"
                >
                  {isSubmitting ? "..." : "POST THOUGHT"}
                </button>
              </div>
            </form>
          </div>

          {/* Posts Feed: No side margins on mobile */}
          <div className="space-y-0 md:space-y-6">
            {posts.length === 0 ? (
              <div className="py-20 text-center text-slate-200 uppercase font-black tracking-widest text-xs">Verses Loading...</div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="border-b md:border-none border-slate-50">
                  <PostCard post={post} showToast={showToast} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Hidden on Mobile) */}
        <div className="hidden lg:block lg:col-span-4 space-y-6 sticky top-28 px-4 md:px-0">
          
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 text-9xl text-white/5 font-black rotate-12 transition-transform group-hover:rotate-0">
              <i className="fa-solid fa-microscope"></i>
            </div>
            
            <h3 className="text-xl font-black mb-4 relative z-10">The Explorer's Guide</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6 relative z-10">
              This is a sanctuary for those who seek truth through logic and science. Keep the discourse elevated.
            </p>
            
            <ul className="space-y-4 relative z-10">
              <li className="flex items-center gap-3 text-xs font-black text-teal-400 tracking-widest uppercase">
                <i className="fa-solid fa-circle-check"></i> Logic Over Emotion
              </li>
              <li className="flex items-center gap-3 text-xs font-black text-teal-400 tracking-widest uppercase">
                <i className="fa-solid fa-circle-check"></i> Support with Facts
              </li>
              <li className="flex items-center gap-3 text-xs font-black text-teal-400 tracking-widest uppercase">
                <i className="fa-solid fa-circle-check"></i> Respect the Verse
              </li>
            </ul>
          </div>

          {isAuthenticated && (
             <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center font-black">
                  {userName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-tighter leading-none">Logged In As</p>
                  <p className="font-bold text-slate-800 mt-1">{userName}</p>
                </div>
             </div>
          )}

        </div>

      </div>
    </div>
  );
}