import React, { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc, collection, addDoc, onSnapshot, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
// 🌟 NAYA IMPORT: AdminAcademy ko import kiya
import AdminAcademy from "./Academy/AdminAcademy"; 

export default function AdminModal({
  onClose,
  donations,
  totalRaised,
  targetAmount,
  showToast,
}) {
  const { logout } = useAuth();

  // UI States
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, users, subjects, academy, settings
  const [searchTerm, setSearchTerm] = useState("");

  const [newTarget, setNewTarget] = useState(targetAmount);
  const [scholarshipAmount, setScholarshipAmount] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const [newSubject, setNewSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState([]); 
  const [isFetchingDef, setIsFetchingDef] = useState(false);

  // Users Data State
  const [usersList, setUsersList] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);

  // Database se live subjects lana
  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubjectsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Database se Users lana
  useEffect(() => {
    if (activeTab === 'users') {
      const fetchUsers = async () => {
        setIsFetchingUsers(true);
        try {
          const q = query(collection(db, "users"));
          const snapshot = await getDocs(q);
          setUsersList(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching users:", error);
          showToast("Failed to load users.", false);
        } finally {
          setIsFetchingUsers(false);
        }
      };
      fetchUsers();
    }
  }, [activeTab, showToast]);

  // Secure Logout
  const handleLogout = async () => {
    await logout();
    showToast("Logged out successfully");
    onClose();
  };

  // Target Settings
  const handleSaveTarget = async () => {
    if (newTarget > 0) {
      try {
        await setDoc(doc(db, "settings", "config"), { targetAmount: Number(newTarget) }, { merge: true });
        showToast("Goal target updated successfully!");
      } catch (e) {
        alert("Permission Denied!");
      }
    }
  };

  // Donation Delete
  const handleDelete = async (id) => {
    if (window.confirm("Is this a fake record? Deleting it will reduce the total amount.")) {
      try {
        await deleteDoc(doc(db, "donations", id));
        showToast("Record Deleted Successfully");
      } catch (err) {
        alert("Permission Denied.");
      }
    }
  };

  // Scholarship Link Generator
  const handleCreateLink = async () => {
    if (!scholarshipAmount || scholarshipAmount < 1) {
      showToast("Please enter a valid amount!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "special_links"), {
        amount: Number(scholarshipAmount),
        active: true,
        createdAt: Date.now()
      });
      const baseUrl = window.location.href.split('?')[0]; 
      const link = `${baseUrl}?scholarship=${docRef.id}`;
      setGeneratedLink(link); 
      try {
        await navigator.clipboard.writeText(link);
        showToast("Special Link Copied to Clipboard!");
      } catch (clipboardError) {
        showToast("Link Generated! (Please copy it manually)");
      }
    } catch (err) {
      alert("Database Error: " + err.message);
    }
  };

  // FORCE ENGLISH ENGINE
  const handleAddSubject = async () => {
    if (!newSubject.trim()) {
      showToast("Please enter a subject name!");
      return;
    }
    
    setIsFetchingDef(true);
    let definition = "";
    let term = newSubject.trim();

    const getWikiDef = async (searchWord) => {
      try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchWord)}&utf8=&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (searchData.query && searchData.query.search.length > 0) {
          const exactTitle = searchData.query.search[0].title; 
          const summaryUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&redirects=1&titles=${encodeURIComponent(exactTitle)}&format=json&origin=*`;
          const summaryRes = await fetch(summaryUrl);
          const summaryData = await summaryRes.json();
          
          const pages = summaryData.query.pages;
          const pageId = Object.keys(pages)[0];
          
          if (pageId !== "-1" && pages[pageId].extract) {
            let text = pages[pageId].extract.replace(/\n/g, ' ').trim();
            return text;
          }
        }
        return null;
      } catch (error) {
        return null;
      }
    };

    try {
      definition = await getWikiDef(term);
      if (!definition) {
        definition = `${term} is a significant field of study. (Detailed definition currently unavailable on Wikipedia).`;
      }
      await addDoc(collection(db, "subjects"), {
        name: term,
        definition: definition,
        timestamp: Date.now()
      });
      showToast(`Subject Added: ${term}`);
      setNewSubject("");
    } catch (err) {
      alert("Error saving subject! Database error.");
    } finally {
      setIsFetchingDef(false);
    }
  };

  const handleDeleteSubject = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete '${name}'?`)) {
      try {
        await deleteDoc(doc(db, "subjects", id));
        showToast("Subject removed!");
      } catch (err) {
        alert("Error deleting subject.");
      }
    }
  };

  const handleExportCsv = () => {
    if (donations.length === 0) return alert("No donations to export!");
    let csvContent = "Date,Name,Phone,UTR Number,Amount (INR),Message\n";
    donations.forEach((d) => {
      let safeName = d.name ? `"${d.name.replace(/"/g, '""')}"` : '"Unknown"';
      let dateStr = d.timestamp ? new Date(d.timestamp).toLocaleDateString("en-IN") : "N/A";
      let cleanMsg = d.message ? `"${d.message.replace(/"/g, '""')}"` : "None";
      let utr = d.utr ? `"${d.utr}"` : "N/A";
      let amount = d.amount || 0;
      csvContent += `${dateStr},${safeName},${d.phone || ""},${utr},${amount},${cleanMsg}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "BeyondTheVerse_Donations.csv";
    link.click();
  };

  const filteredDonations = donations.filter(d => 
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.utr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.phone?.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-sm transition-opacity animate-fade-in">
      
      {/* 🌟 RESPONSIVE MODAL WRAPPER (Full screen on mobile, rounded box on tablet/desktop) */}
      <div className="bg-slate-50 w-full h-[100dvh] sm:h-[90vh] sm:rounded-[2rem] lg:max-w-6xl relative shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 sm:p-2.5 rounded-full transition-colors z-20 shadow-sm sm:shadow-none bg-white sm:bg-transparent">
          <i className="fa-solid fa-xmark text-lg sm:text-xl"></i>
        </button>

        {/* ================= MAIN DASHBOARD ================= */}
        <div className="flex flex-col h-full">
          
          {/* Top Navigation Bar */}
          <div className="bg-white px-4 sm:px-6 md:px-8 pt-5 sm:pt-6 md:pt-8 pb-0 border-b border-slate-200 shrink-0">
            <div className="flex justify-between items-center mb-5 sm:mb-6 pr-10 sm:pr-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30 shrink-0">
                  <i className="fa-solid fa-user-tie text-lg sm:text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-none">Admin Center</h2>
                  <span className="text-[9px] sm:text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mt-1 block">Beyond The Verse</span>
                </div>
              </div>
              <button onClick={handleLogout} className="hidden sm:flex bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-sm px-4 py-2 rounded-xl font-bold items-center gap-2 transition-all border border-rose-100 shadow-sm active:scale-95">
                <i className="fa-solid fa-right-from-bracket"></i> <span>Logout Admin</span>
              </button>
            </div>

            {/* Tabs (Horizontal Scrollable on Mobile) */}
            <div className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                { id: 'dashboard', icon: 'fa-chart-pie', label: 'Donations' },
                { id: 'users', icon: 'fa-users', label: 'Citizens' },
                { id: 'subjects', icon: 'fa-book-open', label: 'Subjects' },
                { id: 'academy', icon: 'fa-brain', label: 'Exams' }, 
                { id: 'settings', icon: 'fa-sliders', label: 'Settings' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-xs sm:text-sm lg:text-base font-bold border-b-[3px] transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'border-teal-500 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}`}
                >
                  <i className={`fa-solid ${tab.icon} ${activeTab === tab.id ? 'text-teal-500' : 'opacity-70'}`}></i> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            
            {/* =========== TAB 1: DONATIONS DASHBOARD =========== */}
            {activeTab === 'dashboard' && (
              <div className="space-y-4 sm:space-y-6 h-full flex flex-col animate-fade-in-up">
                
                {/* Analytics Cards (Stack on mobile, grid on desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 shrink-0">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-xl shrink-0"><i className="fa-solid fa-wallet"></i></div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Raised</p>
                      <p className="text-xl sm:text-2xl font-black text-slate-800">₹{totalRaised.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl shrink-0"><i className="fa-solid fa-hand-holding-heart"></i></div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Donors</p>
                      <p className="text-xl sm:text-2xl font-black text-slate-800">{donations.length}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 sm:col-span-2 md:col-span-1">
                    <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xl shrink-0"><i className="fa-solid fa-bullseye"></i></div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Goal Progress</p>
                      <p className="text-xl sm:text-2xl font-black text-slate-800">{Math.min(100, Math.round((totalRaised / targetAmount) * 100))}%</p>
                    </div>
                  </div>
                </div>

                {/* Table Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-3 sm:px-4 sm:py-3 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                  <div className="flex-1 relative w-full sm:max-w-xs md:max-w-sm">
                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input 
                      type="text" 
                      placeholder="Search name, UTR or phone..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 outline-none py-2.5 pl-10 pr-4 rounded-xl text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                    />
                  </div>
                  <button onClick={handleExportCsv} className="bg-slate-900 hover:bg-black text-white text-sm px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 w-full sm:w-auto shrink-0">
                    <i className="fa-solid fa-file-csv"></i> Export Data
                  </button>
                </div>

                {/* 🌟 RESPONSIVE TABLE WRAPPER */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex-1 flex flex-col">
                  <div className="overflow-x-auto overflow-y-auto flex-1">
                    <table className="w-full min-w-[700px] text-left border-collapse">
                      <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 z-10">
                        <tr>
                          <th className="p-3 sm:p-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                          <th className="p-3 sm:p-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Donor Info</th>
                          <th className="p-3 sm:p-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">UTR Ref</th>
                          <th className="p-3 sm:p-4 text-[10px] sm:text-xs font-black text-teal-600 uppercase tracking-widest text-right">Amount</th>
                          <th className="p-3 sm:p-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredDonations.length === 0 ? (
                          <tr><td colSpan="5" className="p-8 text-center text-slate-400 font-medium">No records found.</td></tr>
                        ) : (
                          filteredDonations.map((d) => (
                            <tr key={d.id} className="hover:bg-slate-50 transition-colors group">
                              <td className="p-3 sm:p-4 text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                                {new Date(d.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                              </td>
                              <td className="p-3 sm:p-4">
                                <div className="text-sm font-bold text-slate-800">{d.name}</div>
                                <div className="text-[10px] sm:text-xs text-slate-400 font-mono mt-0.5">{d.phone}</div>
                                {d.message && <div className="text-[10px] sm:text-[11px] text-slate-500 bg-white border border-slate-100 p-1.5 sm:p-2 rounded-lg mt-1.5 line-clamp-2" title={d.message}><i className="fa-solid fa-quote-left mr-1 text-slate-300"></i>{d.message}</div>}
                              </td>
                              <td className="p-3 sm:p-4 text-[10px] sm:text-xs text-slate-600 font-mono font-bold tracking-wider">
                                {d.utr ? <span className="bg-slate-100 px-2 py-1 rounded-md border border-slate-200">{d.utr}</span> : <span className="text-slate-300 italic">N/A</span>}
                              </td>
                              <td className="p-3 sm:p-4 text-sm sm:text-lg font-black text-teal-700 text-right">
                                ₹{Number(d.amount).toLocaleString("en-IN")}
                              </td>
                              <td className="p-3 sm:p-4 text-center flex justify-center gap-1.5 sm:gap-2">
                                <a href={`https://wa.me/91${d.phone}?text=Hello ${encodeURIComponent(d.name)} ji, %0A%0A*Beyond The Verse* ko support karne ke liye Dhanyawad! 🙏%0A%0AAapka ₹${d.amount} ka yogdan hume prapt ho gaya hai. (UTR: ${d.utr})`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all shadow-sm" title="Send WhatsApp Thanks">
                                  <i className="fa-brands fa-whatsapp text-sm sm:text-base"></i>
                                </a>
                                <button onClick={() => handleDelete(d.id)} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all shadow-sm" title="Delete Record">
                                  <i className="fa-solid fa-trash text-xs sm:text-sm"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =========== TAB 2: USERS (CITIZENS) =========== */}
            {activeTab === 'users' && (
              <div className="h-full flex flex-col animate-fade-in-up">
                
                {/* Stats Header */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 shrink-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-lg sm:text-xl shrink-0">
                    <i className="fa-solid fa-users-viewfinder"></i>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-base sm:text-lg">Registered Citizens</h3>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Accounts: {usersList.length}</p>
                  </div>
                </div>

                {/* 🌟 RESPONSIVE USERS TABLE */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex-1 flex flex-col">
                  {isFetchingUsers ? (
                     <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                       <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-500 mb-3"></i>
                       <p className="font-bold text-[10px] sm:text-xs uppercase tracking-widest">Scanning Database...</p>
                     </div>
                  ) : (
                    <div className="overflow-x-auto overflow-y-auto flex-1">
                      <table className="w-full min-w-[500px] text-left border-collapse">
                        <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 z-10">
                          <tr>
                            <th className="p-3 sm:p-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Citizen Info</th>
                            <th className="p-3 sm:p-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest text-center">Role</th>
                            <th className="p-3 sm:p-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest text-right">Unique ID</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {usersList.length === 0 ? (
                            <tr><td colSpan="3" className="p-8 text-center text-slate-400 font-medium">No users found.</td></tr>
                          ) : (
                            usersList.map((user) => (
                              <tr key={user.uid} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3 sm:p-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center font-black text-white shadow-sm shrink-0 ${user.role === 'admin' ? 'bg-slate-800' : 'bg-teal-500'}`}>
                                      {user.name?.charAt(0).toUpperCase() || "?"}
                                    </div>
                                    <div>
                                      <p className="font-bold text-slate-800 text-sm leading-tight">{user.name || "Unknown"}</p>
                                      <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 mt-0.5">{user.email || "No Email"}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3 sm:p-4 text-center">
                                  <span className={`px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-widest border ${
                                    user.role === 'admin' 
                                      ? 'bg-slate-900 text-white border-slate-800 shadow-sm' 
                                      : 'bg-teal-50 text-teal-600 border-teal-100'
                                  }`}>
                                    {user.role || 'client'}
                                  </span>
                                </td>
                                <td className="p-3 sm:p-4 text-right">
                                  <code className="text-[9px] sm:text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md border border-slate-200 font-bold tracking-wider">
                                    {user.uid}
                                  </code>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =========== TAB 3: SUBJECTS =========== */}
            {activeTab === 'subjects' && (
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in-up pb-10">
                
                {/* Add Subject Card */}
                <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-1 sm:mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-book-journal-whills text-teal-500"></i> Knowledge Base
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">Enter a topic. Our engine fetches its scientific definition directly from Wikipedia.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      <input
                        type="text"
                        placeholder="e.g. Quantum Mechanics, Psychology"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl sm:rounded-2xl py-3 sm:py-3.5 pl-11 pr-4 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-medium text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                      />
                    </div>
                    <button
                      onClick={handleAddSubject}
                      disabled={isFetchingDef}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold whitespace-nowrap disabled:bg-slate-300 disabled:text-slate-500 transition-all shadow-md active:scale-95 w-full sm:w-auto flex justify-center items-center gap-2 text-sm sm:text-base"
                    >
                      {isFetchingDef ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Fetching...</> : <><i className="fa-solid fa-plus"></i> Add Subject</>}
                    </button>
                  </div>
                </div>

                {/* Active Subjects List */}
                <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center justify-between text-sm sm:text-base">
                    <span>Active Topics</span>
                    <span className="bg-slate-100 text-slate-500 text-[10px] sm:text-xs px-2.5 py-1 rounded-lg">{subjectsList.length} Total</span>
                  </h4>
                  
                  {subjectsList.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-sm">No topics added yet.</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {subjectsList.map(sub => (
                        <div key={sub.id} className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl flex justify-between items-start group hover:border-teal-300 hover:shadow-md transition-all">
                          <div className="flex-1 pr-4">
                            <h5 className="font-black text-slate-800 text-sm sm:text-base mb-1.5">{sub.name}</h5>
                            <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-3 leading-relaxed">{sub.definition}</p>
                          </div>
                          <button onClick={() => handleDeleteSubject(sub.id, sub.name)} className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-colors shrink-0" title="Remove Subject">
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =========== 🌟 TAB 4: ACADEMY EXAM CREATOR =========== */}
            {activeTab === 'academy' && (
              <div className="animate-fade-in-up h-full pb-10">
                <AdminAcademy showToast={showToast} />
              </div>
            )}

            {/* =========== TAB 5: SETTINGS & LINKS =========== */}
            {activeTab === 'settings' && (
              <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 animate-fade-in-up pb-10">
                
                {/* Goal Settings */}
                <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg lg:text-xl font-black text-slate-800 flex items-center gap-2 mb-1">
                      <div className="h-8 w-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-sm"><i className="fa-solid fa-bullseye"></i></div>
                      Financial Target
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:ml-10">Set the overarching goal amount for the campaign.</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="relative flex-1 sm:w-40">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                      <input 
                        type="number" 
                        value={newTarget} 
                        onChange={(e) => setNewTarget(e.target.value)} 
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl py-2.5 pl-7 pr-3 outline-none focus:border-teal-500 focus:bg-white transition-colors font-black text-slate-800 text-sm sm:text-base"
                      />
                    </div>
                    <button onClick={handleSaveTarget} className="bg-slate-900 hover:bg-black text-white px-5 sm:px-6 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm shrink-0">Save</button>
                  </div>
                </div>

                {/* Scholarship Generator */}
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-teal-100 shadow-sm relative overflow-hidden">
                  <i className="fa-solid fa-gift absolute -bottom-8 -right-8 text-[120px] text-teal-600/5 rotate-12 pointer-events-none"></i>
                  
                  <div className="relative z-10">
                    <h3 className="text-base sm:text-lg lg:text-xl font-black text-teal-900 flex items-center gap-2 mb-1">
                      <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm"><i className="fa-solid fa-link"></i></div>
                      Secret Links
                    </h3>
                    <p className="text-xs sm:text-sm text-teal-700/80 mt-1 sm:ml-10 mb-5 sm:mb-6">Generate custom donation links to bypass the standard minimum limit for specific students.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:ml-10">
                      <div className="relative flex-1 sm:max-w-xs">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 font-bold text-sm">₹</span>
                        <input 
                          type="number" 
                          value={scholarshipAmount} 
                          onChange={(e) => setScholarshipAmount(e.target.value)} 
                          placeholder="Min Amount (e.g. 50)" 
                          className="w-full border border-teal-200/60 bg-white rounded-xl py-3 pl-8 pr-4 outline-none focus:border-teal-500 font-bold text-teal-900 text-sm sm:text-base transition-colors"
                        />
                      </div>
                      <button onClick={handleCreateLink} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 active:scale-95 w-full sm:w-auto shrink-0 text-sm sm:text-base">
                        Generate Magic Link <i className="fa-solid fa-wand-magic-sparkles"></i>
                      </button>
                    </div>

                    {generatedLink && (
                      <div className="mt-5 sm:ml-10 p-3 sm:p-4 bg-white border border-teal-200 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 animate-fade-in-up">
                        <div className="w-full overflow-x-auto no-scrollbar">
                          <code className="text-[10px] sm:text-xs text-teal-800 font-mono font-bold bg-teal-50 px-2 sm:px-3 py-1.5 rounded-lg border border-teal-100 whitespace-nowrap block">
                            {generatedLink}
                          </code>
                        </div>
                        <span className="text-[10px] sm:text-xs font-black text-emerald-600 whitespace-nowrap bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center justify-center gap-1 w-full sm:w-auto shrink-0">
                          <i className="fa-solid fa-check"></i> Copied to Clipboard
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
        
        {/* Mobile Log out button (only visible on mobile at the very bottom) */}
        <div className="sm:hidden bg-white border-t border-slate-200 p-4 shrink-0">
           <button onClick={handleLogout} className="w-full bg-rose-50 text-rose-600 text-sm py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95">
             <i className="fa-solid fa-right-from-bracket"></i> Logout Admin
           </button>
        </div>

      </div>
    </div>
  );
}