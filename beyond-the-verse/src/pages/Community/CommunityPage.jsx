import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import PostCard from '../../components/Community/PostCard';

import { createPost, saveCategories } from '../../services/firebaseServices';
// 🌟 1. YAHAN LOGIN OVERLAY IMPORT KIYA HAI (Path check kar lena)
import LoginOverlay from '../../components/common/LoginOverlay'; 
import UserAvatar from '../../components/common/UserAvatar'; // 🌟 2. UserAvatar Import kiya

export default function CommunityPage({ showToast }) {
  const { isAuthenticated, userName, userId, isAdmin, currentUser } = useAuth(); // currentUser bhi nikal liya
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [category, setCategory] = useState("Philosophy");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState(["Philosophy", "Science", "Quantum", "Spirituality", "Reflection"]);
  const [isEditingCategories, setIsEditingCategories] = useState(false);
  const [newCatText, setNewCatText] = useState("");

  useEffect(() => {
    const catRef = doc(db, "settings", "categories");
    const unsubCat = onSnapshot(catRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().items) {
        const fetchedCats = docSnap.data().items;
        setCategories(fetchedCats);
        setCategory(prev => fetchedCats.includes(prev) ? prev : (fetchedCats[0] || "General"));
      }
    });

    const q = query(collection(db, "posts"), orderBy("isPinned", "desc"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      const simpleQ = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      onSnapshot(simpleQ, (s) => setPosts(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    });

    return () => {
      unsubscribe();
      unsubCat();
    };
  }, []);

  const handleAddCategory = async () => {
    if (!newCatText.trim()) return;
    const updatedCats = [...categories, newCatText.trim()];
    try {
      await saveCategories(updatedCats);
      setNewCatText("");
      showToast("Category Added! ✅");
    } catch (e) {
      showToast("Failed to add category.", false);
    }
  };

  const handleDeleteCategory = async (catToDelete) => {
    const updatedCats = categories.filter(c => c !== catToDelete);
    try {
      await saveCategories(updatedCats);
      showToast("Category Deleted. 🗑️");
    } catch (e) {
      showToast("Failed to delete category.", false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    if (!isAuthenticated || !userId) return showToast("Please login first.", false);
    
    setIsSubmitting(true);
    try {
      await createPost({
        text: newPost.trim(),
        category: category, 
        userName: userName || "Explorer", 
        userId: userId,
        photoURL: currentUser?.photoURL || null, // 🌟 Nayi post ke sath DP bhi jayegi
        isAdminPost: isAdmin, 
        isPinned: false, 
        interactions: [], 
        bookmarks: []
      });
      
      setNewPost("");
      showToast("Post published! 🚀");
    } catch (error) {
      showToast("Failed to post.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // 🌟 RELATIVE CLASS ADD KI TAQI OVERLAY PURE PAGE PAR LAGE
    <div className="min-h-screen bg-slate-50 pt-2 md:pt-8 pb-20 relative">
      
      {/* 🌟 NEW LOGIN OVERLAY (Agar user logged in nahi hai) */}
      {!isAuthenticated && (
        <LoginOverlay 
          icon="fa-solid fa-feather-pointed" 
          title="Join the Verse" 
          description="Log in to share your reflections, debate with logic, and become a part of the community." 
        />
      )}

      {/* 🌟 WRAPPER: Agar login nahi hai to page blur aur click disable ho jayega */}
      <div className={`max-w-3xl mx-auto w-full flex flex-col gap-3 sm:gap-4 md:gap-6 px-0 sm:px-4 md:px-6 lg:px-0 transition-all duration-300 ${!isAuthenticated ? "pointer-events-none opacity-30 select-none" : ""}`}>
        
        {/* POST COMPOSER (Sirf tab render hoga jab user logged in ho) */}
        {isAuthenticated && (
          <div className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-4 md:p-6 relative z-10 w-full">
            <form onSubmit={handlePostSubmit}>
              <div className="flex gap-3 md:gap-4 mb-4">
                
                {/* 🌟 Yahan purana div hata kar UserAvatar laga diya */}
                <div className="mt-1">
                  <UserAvatar 
                    showCurrentUser={true} 
                    size="md" 
                    isAdmin={isAdmin}
                  />
                </div>

                <div className="flex-1">
                  <textarea 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts, logic, or reflections..."
                    className="w-full bg-transparent border-0 outline-none focus:ring-0 focus:outline-none focus:border-transparent p-0 pt-2 md:pt-3 text-lg md:text-xl text-slate-900 placeholder:text-slate-400 resize-y min-h-[120px] md:min-h-[160px] overflow-y-auto leading-[1.7]"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 overflow-x-auto no-scrollbar pb-2 -mb-2">
                    <div className="flex gap-2 w-max">
                      {categories.map(cat => (
                        <div key={cat} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[11px] transition-all shrink-0 ${category === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>
                          <button type="button" onClick={() => !isEditingCategories && setCategory(cat)} className="focus:outline-none">{cat}</button>
                          {isAdmin && isEditingCategories && (
                            <button type="button" onClick={() => handleDeleteCategory(cat)} className="ml-1 text-rose-400 hover:text-rose-600 transition-colors">
                              <i className="fa-solid fa-xmark text-[10px]"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {isAdmin && (
                    <button type="button" onClick={() => setIsEditingCategories(!isEditingCategories)} className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center transition-colors border ${isEditingCategories ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'}`} title="Manage Categories">
                      <i className={`fa-solid ${isEditingCategories ? 'fa-check' : 'fa-pen'} text-[10px]`}></i>
                    </button>
                  )}
                </div>

                {isAdmin && isEditingCategories && (
                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 animate-fade-in">
                    <input type="text" value={newCatText} onChange={(e) => setNewCatText(e.target.value)} placeholder="Add new category..." className="bg-transparent flex-1 text-xs outline-none px-2 text-slate-700 placeholder:text-slate-400" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())} />
                    <button type="button" onClick={handleAddCategory} disabled={!newCatText.trim()} className="bg-teal-600 text-white px-4 py-1.5 rounded-lg text-[10px] hover:bg-teal-700 disabled:opacity-50 transition-colors">Add</button>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button type="submit" disabled={!newPost.trim() || isSubmitting || isEditingCategories} className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-10 py-3 rounded-full text-sm disabled:bg-slate-200 disabled:text-slate-400 transition-colors">
                    {isSubmitting ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* POSTS FEED */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-full">
          {posts.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <div className="h-8 w-8 border-4 border-slate-200 border-t-slate-500 rounded-full animate-spin mb-4"></div>
              <span className="text-[10px] text-slate-400">Loading Feed</span>
            </div>
          ) : posts.filter(post => post.category === category).length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <span className="text-[12px] text-slate-400">No posts in this category yet. Be the first to post!</span>
            </div>
          ) : (
            posts.filter(post => post.category === category).map((post) => (
              <div key={post.id} className="border-slate-200 overflow-hidden w-full">
                <PostCard post={post} showToast={showToast} />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}