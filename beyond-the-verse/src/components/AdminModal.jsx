import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, deleteDoc, collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function AdminModal({
  onClose,
  donations,
  totalRaised,
  targetAmount,
  showToast,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Naye UI States
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, subjects, settings
  const [searchTerm, setSearchTerm] = useState("");

  const [newTarget, setNewTarget] = useState(targetAmount);
  const [scholarshipAmount, setScholarshipAmount] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const [newSubject, setNewSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState([]); 
  const [isFetchingDef, setIsFetchingDef] = useState(false);

  // Authentication check
  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email) {
      setIsLoggedIn(true);
    }
  }, []);

  // Database se live subjects lana
  useEffect(() => {
    if (!isLoggedIn) return;
    const q = query(collection(db, "subjects"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubjectsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [isLoggedIn]);

  // Login/Logout Handlers
  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      showToast("Admin Logged In Securely");
    } catch (err) {
      setError("Invalid Email or Password!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
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

// 🌟 NAYA: FORCE ENGLISH ENGINE 🌟
  const handleAddSubject = async () => {
    if (!newSubject.trim()) {
      showToast("Please enter a subject name!");
      return;
    }
    
    setIsFetchingDef(true);
    let definition = "";
    let term = newSubject.trim();

    // Wikipedia ka Engine (Jo English par force kiya gaya hai)
    const getWikiDef = async (searchWord) => {
      try {
        // Step 1: Hum default ENGLISH ('en') Wikipedia mein hi search karenge
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchWord)}&utf8=&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (searchData.query && searchData.query.search.length > 0) {
          const exactTitle = searchData.query.search[0].title; 
          
          // Step 2: English Title ka Extract Nikalo
          const summaryUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&redirects=1&titles=${encodeURIComponent(exactTitle)}&format=json&origin=*`;
          const summaryRes = await fetch(summaryUrl);
          const summaryData = await summaryRes.json();
          
          const pages = summaryData.query.pages;
          const pageId = Object.keys(pages)[0];
          
          if (pageId !== "-1" && pages[pageId].extract) {
            let text = pages[pageId].extract.replace(/\n/g, ' ').trim();
            if (text.length > 250) {
              text = text.substring(0, 250) + "...";
            }
            return text;
          }
        }
        return null;
      } catch (error) {
        return null;
      }
    };

    try {
      // Direct call karo, sirf aur sirf English api par
      definition = await getWikiDef(term);
      
      // Agar fail hua, toh ek basic English line de do
      if (!definition) {
        definition = `${term} is a significant field of study. (Detailed definition currently unavailable on Wikipedia).`;
      }

      // Firebase mein save karna
      await addDoc(collection(db, "subjects"), {
        name: term, // Button pe wahi aayega jo aapne type kiya hai
        definition: definition, // Tooltip mein hamesha English aayegi
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
  // Subject Delete karna
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

  // NAYA: Search Filter Logic
  const filteredDonations = donations.filter(d => 
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.utr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.phone?.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm transition-opacity">
      <div className="bg-slate-50 rounded-2xl w-full max-w-5xl relative shadow-2xl flex flex-col h-[90vh] overflow-hidden border border-slate-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors z-20">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        {!isLoggedIn ? (
          // ================= LOGIN SCREEN =================
          <div className="flex-1 flex flex-col justify-center items-center p-10 bg-white">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-xl w-full max-w-md text-center">
              <div className="h-16 w-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <i className="fa-solid fa-shield-halved text-3xl"></i>
              </div>
              <h3 className="text-2xl font-black mb-2 text-slate-800 tracking-tight">Admin Portal</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">Verify your identity to access the dashboard</p>
              
              <div className="space-y-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email" className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white transition-all"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white transition-all"/>
                <button onClick={handleLogin} disabled={isLoading} className="w-full bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-900 flex justify-center items-center gap-2 transition-all shadow-md active:scale-[0.98]">
                  {isLoading ? "Verifying..." : "Access Dashboard"} <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-4 font-medium bg-red-50 py-2 rounded-lg border border-red-100"><i className="fa-solid fa-triangle-exclamation mr-1"></i>{error}</p>}
            </div>
          </div>
        ) : (
          // ================= MAIN DASHBOARD =================
          <div className="flex flex-col h-full">
            
            {/* Top Navigation Bar */}
            <div className="bg-white px-6 pt-6 pb-0 border-b border-slate-200 shrink-0">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-teal-600 text-white rounded-xl flex items-center justify-center shadow-md">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 leading-none">Admin Center</h2>
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Beyond The Verse</span>
                  </div>
                </div>
                <button onClick={handleLogout} className="bg-red-50 hover:bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors border border-red-100">
                  <i className="fa-solid fa-right-from-bracket"></i> <span className="hidden sm:inline">Logout</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 overflow-x-auto no-scrollbar">
                {[
                  { id: 'dashboard', icon: 'fa-chart-pie', label: 'Donations' },
                  { id: 'subjects', icon: 'fa-book-open', label: 'Manage Subjects' },
                  { id: 'settings', icon: 'fa-sliders', label: 'Settings & Links' }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    <i className={`fa-solid ${tab.icon}`}></i> {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
              
              {/* =========== TAB 1: DONATIONS DASHBOARD =========== */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6 h-full flex flex-col">
                  {/* Analytics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-xl"><i className="fa-solid fa-wallet"></i></div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Total Raised</p>
                        <p className="text-2xl font-black text-slate-800">₹{totalRaised.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl"><i className="fa-solid fa-users"></i></div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Total Donors</p>
                        <p className="text-2xl font-black text-slate-800">{donations.length}</p>
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xl"><i className="fa-solid fa-bullseye"></i></div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Goal Progress</p>
                        <p className="text-2xl font-black text-slate-800">{Math.min(100, Math.round((totalRaised / targetAmount) * 100))}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Table Toolbar */}
                  <div className="flex flex-wrap gap-3 justify-between items-center bg-white p-2 pl-4 rounded-xl border border-slate-200 shadow-sm shrink-0">
                    <div className="flex-1 min-w-[200px] relative">
                      <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      <input 
                        type="text" 
                        placeholder="Search by name, UTR or phone..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none outline-none py-2 pl-9 pr-4 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
                      />
                    </div>
                    <button onClick={handleExportCsv} className="bg-slate-800 hover:bg-slate-900 text-white text-sm px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap">
                      <i className="fa-solid fa-download"></i> Export CSV
                    </button>
                  </div>

                  {/* Enhanced Table */}
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-y-auto flex-1">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 z-10">
                          <tr>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Donor Info</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">UTR Number</th>
                            <th className="p-4 text-xs font-bold text-teal-600 uppercase tracking-wider text-right">Amount</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredDonations.length === 0 ? (
                            <tr><td colSpan="5" className="p-8 text-center text-slate-400 font-medium">No records found.</td></tr>
                          ) : (
                            filteredDonations.map((d) => (
                              <tr key={d.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="p-4 text-sm text-slate-500 whitespace-nowrap">
                                  {new Date(d.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                </td>
                                <td className="p-4">
                                  <div className="text-sm font-bold text-slate-800">{d.name}</div>
                                  <div className="text-xs text-slate-500 font-mono mt-0.5">{d.phone}</div>
                                  {d.message && <div className="text-[11px] text-slate-500 bg-slate-100 p-1.5 rounded mt-1.5 line-clamp-2" title={d.message}><i className="fa-solid fa-quote-left mr-1 text-slate-400"></i>{d.message}</div>}
                                </td>
                                <td className="p-4 text-sm text-slate-600 font-mono font-bold tracking-wider">
                                  {d.utr ? <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{d.utr}</span> : <span className="text-slate-300 italic">N/A</span>}
                                </td>
                                <td className="p-4 text-sm font-black text-teal-700 text-right text-lg">
                                  ₹{Number(d.amount).toLocaleString("en-IN")}
                                </td>
                                <td className="p-4 text-center flex justify-center gap-2 opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity">
                                  <a href={`https://wa.me/91${d.phone}?text=Hello ${encodeURIComponent(d.name)} ji, %0A%0A*Beyond The Verse* ko support karne ke liye Dhanyawad! 🙏%0A%0AAapka ₹${d.amount} ka yogdan hume prapt ho gaya hai. (UTR: ${d.utr})`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all shadow-sm" title="Send WhatsApp Thanks">
                                    <i className="fa-brands fa-whatsapp text-lg"></i>
                                  </a>
                                  <button onClick={() => handleDelete(d.id)} className="h-8 w-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shadow-sm" title="Delete Record">
                                    <i className="fa-solid fa-trash text-sm"></i>
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

              {/* =========== TAB 2: SUBJECTS =========== */}
              {activeTab === 'subjects' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800 mb-1"><i className="fa-solid fa-book-journal-whills text-teal-600 mr-2"></i> Add Learning Subjects</h3>
                    <p className="text-sm text-slate-500 mb-5">Enter a topic, and our Smart Engine will automatically fetch its definition from Wikipedia.</p>
                    
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input
                          type="text"
                          placeholder="Type subject (e.g. Psychology, Quantum Physics)"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          className="w-full border-2 border-slate-200 bg-slate-50 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-teal-500 focus:bg-white transition-all font-medium"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                        />
                      </div>
                      <button
                        onClick={handleAddSubject}
                        disabled={isFetchingDef}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap disabled:bg-slate-300 disabled:text-slate-500 transition-colors shadow-md"
                      >
                        {isFetchingDef ? <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Fetching</> : <><i className="fa-solid fa-plus mr-2"></i> Add</>}
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Active Subjects on Website ({subjectsList.length})</h4>
                    {subjectsList.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 font-medium bg-slate-50 rounded-xl border border-dashed border-slate-200">No subjects added yet.</div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {subjectsList.map(sub => (
                          <div key={sub.id} className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex justify-between items-start group hover:border-teal-300 transition-colors">
                            <div className="flex-1 pr-3">
                              <h5 className="font-bold text-slate-800 text-sm mb-1">{sub.name}</h5>
                              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{sub.definition}</p>
                            </div>
                            <button onClick={() => handleDeleteSubject(sub.id, sub.name)} className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all" title="Remove Subject">
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* =========== TAB 3: SETTINGS & LINKS =========== */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  
                  {/* Goal Settings */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><i className="fa-solid fa-bullseye text-amber-500"></i> Financial Goal Target</h3>
                      <p className="text-sm text-slate-500 mt-1">Set the total amount you are aiming to raise.</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                        <input type="number" value={newTarget} onChange={(e) => setNewTarget(e.target.value)} className="w-full sm:w-32 border-2 border-slate-200 rounded-xl py-2.5 pl-7 pr-3 outline-none focus:border-teal-500 font-bold text-slate-800"/>
                      </div>
                      <button onClick={handleSaveTarget} className="bg-slate-800 hover:bg-slate-900 text-white px-5 rounded-xl font-bold transition-colors shadow-md">Save</button>
                    </div>
                  </div>

                  {/* Scholarship Generator */}
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100 shadow-sm relative overflow-hidden">
                    <i className="fa-solid fa-gift absolute -bottom-6 -right-6 text-9xl text-teal-600/5 rotate-12"></i>
                    <div className="relative z-10">
                      <h3 className="text-lg font-black text-teal-900 flex items-center gap-2"><i className="fa-solid fa-link text-teal-600"></i> Secret Scholarship Links</h3>
                      <p className="text-sm text-teal-700/80 mt-1 mb-5">Generate a special link with a lower minimum donation limit for specific students.</p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1 max-w-[200px]">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 font-bold">₹</span>
                          <input type="number" value={scholarshipAmount} onChange={(e) => setScholarshipAmount(e.target.value)} placeholder="Amount (e.g. 50)" className="w-full border-2 border-teal-200/60 bg-white rounded-xl py-3 pl-8 pr-4 outline-none focus:border-teal-500 font-bold text-teal-900"/>
                        </div>
                        <button onClick={handleCreateLink} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 active:scale-95">
                          Generate Link <i className="fa-solid fa-wand-magic-sparkles"></i>
                        </button>
                      </div>

                      {generatedLink && (
                        <div className="mt-4 p-3 bg-white border border-teal-200 rounded-xl flex justify-between items-center gap-4 animate-fade-in-up">
                          <code className="text-xs text-teal-800 truncate font-bold bg-teal-50 px-2 py-1 rounded">{generatedLink}</code>
                          <span className="text-xs font-black text-emerald-600 whitespace-nowrap bg-emerald-100 px-3 py-1 rounded-full"><i className="fa-solid fa-check"></i> Copied</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
      }
