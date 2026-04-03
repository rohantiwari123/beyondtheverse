import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import PostCard from '../../components/Community/PostCard';

export default function CommunityPage({ showToast }) {
  const { isAuthenticated, userName, userId, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [category, setCategory] = useState("Philosophy");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🌟 NEW STATES FOR DYNAMIC CATEGORIES
  const [categories, setCategories] = useState(["Philosophy", "Science", "Quantum", "Spirituality", "Reflection"]);
  const [isEditingCategories, setIsEditingCategories] = useState(false);
  const [newCatText, setNewCatText] = useState("");

  // 🌟 FETCH POSTS & CATEGORIES FROM FIREBASE
  useEffect(() => {
    const catRef = doc(db, "settings", "categories");
    const unsubCat = onSnapshot(catRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().items) {
        const fetchedCats = docSnap.data().items;
        setCategories(fetchedCats);
        setCategory(prev => fetchedCats.includes(prev) ? prev : (fetchedCats[0] || "General"));
      } else {
        setDoc(catRef, { items: ["Philosophy", "Science", "Quantum", "Spirituality", "Reflection"] });
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

  // 🌟 ADMIN ACTION: ADD CATEGORY
  const handleAddCategory = async () => {
    if (!newCatText.trim()) return;
    const updatedCats = [...categories, newCatText.trim()];
    try {
      await setDoc(doc(db, "settings", "categories"), { items: updatedCats });
      setNewCatText("");
      showToast("Category Added! ✅");
    } catch (e) {
      showToast("Failed to add category.", false);
    }
  };

  // 🌟 ADMIN ACTION: DELETE CATEGORY
  const handleDeleteCategory = async (catToDelete) => {
    const updatedCats = categories.filter(c => c !== catToDelete);
    try {
      await setDoc(doc(db, "settings", "categories"), { items: updatedCats });
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
      await addDoc(collection(db, "posts"), {
        text: newPost.trim(),
        category: category, 
        userName: userName || "Explorer", 
        userId: userId,
        isAdminPost: isAdmin, // 🌟 YAHAN ADD HUA HAI: Agar Admin post kar raha hai, to Flag true ho jayega
        isPinned: false, 
        createdAt: serverTimestamp(), 
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
    <div className="min-h-screen bg-slate-50 pt-0 md:pt-8 pb-20">
      <div className="max-w-3xl mx-auto w-full grid grid-cols-1 gap-0 md:gap-6 px-0 md:px-6 lg:px-0">
        
        {/* 🌟 POST COMPOSER */}
        {isAuthenticated ? (
          <div className="bg-white md:rounded-2xl border-b md:border border-slate-200 p-4 md:p-6 md:shadow-sm relative z-10 w-full">
            <form onSubmit={handlePostSubmit}>
              
              {/* TEXTAREA SECTION */}
              <div className="flex gap-3 md:gap-4 mb-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0 mt-1">
                  {userName?.charAt(0).toUpperCase() || "U"}
                </div>
                
                <div className="flex-1 verse-thought-serif">
                  <textarea 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts, logic, or reflections..."
                    className="w-full bg-transparent border-0 outline-none focus:ring-0 focus:outline-none focus:border-transparent p-0 pt-2 md:pt-3 text-lg md:text-xl text-slate-900 placeholder:text-slate-400 resize-y min-h-[120px] md:min-h-[160px] overflow-y-auto leading-[1.7]"
                  />
                </div>
              </div>
              
              {/* 🌟 LAYOUT: CATEGORIES ROW */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                
                <div className="flex items-center justify-between gap-3">
                  {/* Category Scrollable List */}
                  <div className="flex-1 overflow-x-auto no-scrollbar pb-2 -mb-2">
                    <div className="flex gap-2 w-max">
                      {categories.map(cat => (
                        <div 
                          key={cat} 
                          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-wide transition-all shrink-0 ${
                            category === cat 
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                              : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <button 
                            type="button" 
                            onClick={() => !isEditingCategories && setCategory(cat)}
                            className="focus:outline-none"
                          >
                            {cat}
                          </button>
                          
                          {/* Admin Delete Icon inline with category text */}
                          {isAdmin && isEditingCategories && (
                            <button 
                              type="button" 
                              onClick={() => handleDeleteCategory(cat)}
                              className="ml-1 text-rose-400 hover:text-rose-600 transition-colors"
                            >
                              <i className="fa-solid fa-xmark text-[10px]"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin Edit Toggle Button */}
                  {isAdmin && (
                    <button 
                      type="button" 
                      onClick={() => setIsEditingCategories(!isEditingCategories)} 
                      className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center transition-colors border ${
                        isEditingCategories ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                      }`}
                      title="Manage Categories"
                    >
                      <i className={`fa-solid ${isEditingCategories ? 'fa-check' : 'fa-pen'} text-[10px]`}></i>
                    </button>
                  )}
                </div>

                {/* 🌟 ADMIN ADD CATEGORY INPUT */}
                {isAdmin && isEditingCategories && (
                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 animate-fade-in">
                    <input
                      type="text"
                      value={newCatText}
                      onChange={(e) => setNewCatText(e.target.value)}
                      placeholder="Add new category..."
                      className="bg-transparent flex-1 text-xs font-bold outline-none px-2 text-slate-700 placeholder:text-slate-400"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                    />
                    <button 
                      type="button" 
                      onClick={handleAddCategory} 
                      disabled={!newCatText.trim()}
                      className="bg-teal-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-teal-700 disabled:opacity-50 transition-colors"
                    >
                      ADD
                    </button>
                  </div>
                )}

                {/* 🌟 POST BUTTON ROW */}
                <div className="flex justify-end pt-2">
                  <button 
                    type="submit" disabled={!newPost.trim() || isSubmitting || isEditingCategories}
                    className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-10 py-3 rounded-full text-sm font-bold tracking-widest uppercase disabled:bg-slate-200 disabled:text-slate-400 transition-colors shadow-sm"
                  >
                    {isSubmitting ? "POSTING..." : "POST"}
                  </button>
                </div>

              </div>
            </form>
          </div>
        ) : (
          /* Login Banner */
          <div className="bg-white md:bg-slate-50 border-b md:border border-slate-200 p-8 md:rounded-2xl flex flex-col items-center justify-center text-center md:shadow-sm relative z-10 w-full">
            <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
              <i className="fa-solid fa-feather-pointed text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Join the Verse</h3>
            <p className="text-sm text-slate-500 mb-5 max-w-sm">Log in to share your reflections, debate with logic, and become a part of the community.</p>
            <button onClick={() => navigate('/login')} className="bg-slate-900 text-white rounded-full px-8 py-2.5 text-sm font-bold transition-colors hover:bg-slate-800 shadow-sm">
              Log in to post
            </button>
          </div>
        )}

        {/* 🌟 POSTS FEED */}
        <div className="grid grid-cols-1 gap-0 md:gap-6 w-full">
          {posts.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <div className="h-8 w-8 border-4 border-slate-200 border-t-slate-500 rounded-full animate-spin mb-4"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Loading Feed</span>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white border-b md:border border-slate-200 md:rounded-2xl md:shadow-sm overflow-hidden w-full">
                <PostCard post={post} showToast={showToast} />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
      }
