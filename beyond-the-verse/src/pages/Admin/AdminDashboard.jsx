import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { collection, doc, setDoc, deleteDoc, addDoc, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import AdminAcademy from '../../components/Exam/AdminExamEditor';

export default function AdminDashboard({ showToast, donations, totalRaised, targetAmount }) {
  const { isAdmin } = useAuth();
  
  const [activeTab, setActiveTab] = useState('academy');
  const [searchTerm, setSearchTerm] = useState("");

  const [newTarget, setNewTarget] = useState(targetAmount || 50000);
  const [scholarshipAmount, setScholarshipAmount] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const [newSubject, setNewSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState([]); 
  const [isFetchingDef, setIsFetchingDef] = useState(false);

  const [usersList, setUsersList] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);

  // Redirect non-admins
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Fetch Subjects
  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubjectsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Fetch Users
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

  // Target Update
  const handleSaveTarget = async () => {
    if (newTarget > 0) {
      try {
        await setDoc(doc(db, "settings", "config"), { targetAmount: Number(newTarget) }, { merge: true });
        showToast("Goal target updated successfully!");
      } catch (e) {
        showToast("Permission Denied!", false);
      }
    }
  };

  // Donation Delete
  const handleDeleteDonation = async (id) => {
    if (window.confirm("Is this a fake record? Deleting it will reduce the total amount.")) {
      try {
        await deleteDoc(doc(db, "donations", id));
        showToast("Record Deleted Successfully");
      } catch (err) {
        showToast("Permission Denied.", false);
      }
    }
  };

  // Scholarship Link
  const handleCreateLink = async () => {
    if (!scholarshipAmount || scholarshipAmount < 1) {
      showToast("Please enter a valid amount!", false);
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "special_links"), {
        amount: Number(scholarshipAmount),
        active: true,
        createdAt: Date.now()
      });
      const baseUrl = window.location.href.split('?')[0].replace('/admin', '/donate'); 
      const link = `${baseUrl}?scholarship=${docRef.id}`;
      setGeneratedLink(link); 
      try {
        await navigator.clipboard.writeText(link);
        showToast("Special Link Copied to Clipboard!");
      } catch (clipboardError) {
        showToast("Link Generated! (Please copy manually)");
      }
    } catch (err) {
      showToast("Database Error: " + err.message, false);
    }
  };

  // Add Subject (Wikipedia Fetch)
  const handleAddSubject = async () => {
    if (!newSubject.trim()) {
      showToast("Please enter a subject name!", false);
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
            return pages[pageId].extract.replace(/\n/g, ' ').trim();
          }
        }
        return null;
      } catch (error) {
        return null;
      }
    };

    try {
      definition = await getWikiDef(term);
      if (!definition) definition = `${term} is a significant field of study. (Definition unavailable).`;
      
      await addDoc(collection(db, "subjects"), { name: term, definition: definition, timestamp: Date.now() });
      showToast(`Subject Added: ${term}`);
      setNewSubject("");
    } catch (err) {
      showToast("Error saving subject!", false);
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
        showToast("Error deleting subject.", false);
      }
    }
  };

  // Export CSV
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
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Menu */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h2 className="text-lg font-black text-slate-800 mb-6 px-2 flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-teal-600"></i> Admin Panel
            </h2>
            <nav className="flex flex-col gap-2">
              {[
                { id: 'academy', icon: 'fa-brain', label: 'Academy / Exams' },
                { id: 'dashboard', icon: 'fa-wallet', label: 'Donations Data' },
                { id: 'users', icon: 'fa-users', label: 'Manage Citizens' },
                { id: 'subjects', icon: 'fa-book-open', label: 'Learning Subjects' },
                { id: 'settings', icon: 'fa-sliders', label: 'Settings & Links' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm text-left ${activeTab === tab.id ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <i className={`fa-solid ${tab.icon} w-5 text-center`}></i> {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-full overflow-hidden">
          
          {/* TAB: ACADEMY */}
          {activeTab === 'academy' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-black text-slate-800">Academy Dashboard</h1>
                <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Create & Manage Exams</p>
              </div>
              <AdminAcademy showToast={showToast} />
            </div>
          )}

          {/* TAB: DONATIONS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-3xl font-black text-slate-800">Donations Overview</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-xl"><i className="fa-solid fa-wallet"></i></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Total Raised</p>
                    <p className="text-2xl font-black text-slate-800">₹{totalRaised.toLocaleString("en-IN")}</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl"><i className="fa-solid fa-hand-holding-heart"></i></div>
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

              <div className="flex flex-wrap gap-3 justify-between items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex-1 min-w-[200px] relative">
                  <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input type="text" placeholder="Search by name, UTR or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-50 border-none outline-none py-2.5 pl-10 pr-4 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 transition-all" />
                </div>
                <button onClick={handleExportCsv} className="bg-slate-800 hover:bg-slate-900 text-white text-sm px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors">
                  <i className="fa-solid fa-download"></i> Export CSV
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
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
                          <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-4 text-sm text-slate-500 whitespace-nowrap">{new Date(d.timestamp).toLocaleDateString("en-IN")}</td>
                            <td className="p-4">
                              <div className="text-sm font-bold text-slate-800">{d.name}</div>
                              <div className="text-xs text-slate-500 font-mono mt-0.5">{d.phone}</div>
                            </td>
                            <td className="p-4 text-sm text-slate-600 font-mono font-bold"><span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{d.utr || "N/A"}</span></td>
                            <td className="p-4 text-sm font-black text-teal-700 text-right text-lg">₹{Number(d.amount).toLocaleString("en-IN")}</td>
                            <td className="p-4 flex justify-center gap-2">
                              <button onClick={() => handleDeleteDonation(d.id)} className="h-8 w-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all" title="Delete"><i className="fa-solid fa-trash text-sm"></i></button>
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

          {/* TAB: USERS */}
          {activeTab === 'users' && (
            <div className="animate-fade-in-up">
              <h1 className="text-3xl font-black text-slate-800 mb-6">Registered Citizens ({usersList.length})</h1>
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                {isFetchingUsers ? (
                  <div className="p-10 text-center text-slate-400"><i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-500 mb-3"></i><p className="font-bold">Scanning...</p></div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Citizen Info</th>
                          <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-center">Role</th>
                          <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest hidden sm:table-cell">Unique ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {usersList.length === 0 ? (
                          <tr><td colSpan="3" className="p-8 text-center text-slate-400">No users found.</td></tr>
                        ) : (
                          usersList.map((user) => (
                            <tr key={user.uid} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-white ${user.role === 'admin' ? 'bg-slate-800' : 'bg-teal-500'}`}>{user.name?.charAt(0).toUpperCase() || "?"}</div>
                                  <div>
                                    <p className="font-bold text-slate-800 text-sm leading-tight">{user.name || "Unknown"}</p>
                                    <p className="text-[11px] font-bold text-slate-400">{user.email || "No Email"}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-center"><span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${user.role === 'admin' ? 'bg-slate-900 text-white border-slate-800' : 'bg-teal-50 text-teal-600 border-teal-100'}`}>{user.role || 'client'}</span></td>
                              <td className="p-4 hidden sm:table-cell"><code className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200 font-bold">{user.uid}</code></td>
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

          {/* TAB: SUBJECTS */}
          {activeTab === 'subjects' && (
            <div className="animate-fade-in-up max-w-3xl">
              <h1 className="text-3xl font-black text-slate-800 mb-6">Learning Subjects</h1>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-6">
                <p className="text-sm text-slate-500 mb-4">Enter a topic, and our Smart Engine will fetch its definition from Wikipedia.</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Type subject (e.g. Quantum Physics)" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} className="w-full border-2 border-slate-200 bg-slate-50 rounded-xl py-3 px-4 outline-none focus:border-teal-500" onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}/>
                  <button onClick={handleAddSubject} disabled={isFetchingDef} className="bg-teal-600 hover:bg-teal-700 text-white px-6 rounded-xl font-bold disabled:bg-slate-300 transition-colors">
                    {isFetchingDef ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add"}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subjectsList.map(sub => (
                  <div key={sub.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex justify-between items-start group">
                    <div className="pr-3">
                      <h5 className="font-bold text-slate-800 text-sm mb-1">{sub.name}</h5>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{sub.definition}</p>
                    </div>
                    <button onClick={() => handleDeleteSubject(sub.id, sub.name)} className="text-slate-300 hover:text-red-500 transition-all"><i className="fa-solid fa-trash-can"></i></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="animate-fade-in-up max-w-2xl space-y-6">
              <h1 className="text-3xl font-black text-slate-800 mb-6">Settings & Links</h1>
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-800">Financial Goal Target</h3>
                  <p className="text-sm text-slate-500">Set the total amount aiming to raise.</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span><input type="number" value={newTarget} onChange={(e) => setNewTarget(e.target.value)} className="w-32 border-2 border-slate-200 rounded-xl py-2 pl-7 pr-3 outline-none focus:border-teal-500 font-bold"/></div>
                  <button onClick={handleSaveTarget} className="bg-slate-800 text-white px-5 rounded-xl font-bold">Save</button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-3xl border border-teal-100 shadow-sm">
                <h3 className="text-lg font-black text-teal-900 mb-2">Secret Scholarship Links</h3>
                <p className="text-sm text-teal-700/80 mb-4">Generate link with lower minimum donation limit.</p>
                <div className="flex gap-3">
                  <div className="relative flex-1"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 font-bold">₹</span><input type="number" value={scholarshipAmount} onChange={(e) => setScholarshipAmount(e.target.value)} placeholder="Amount" className="w-full border-2 border-teal-200/60 bg-white rounded-xl py-3 pl-8 pr-4 outline-none focus:border-teal-500 font-bold text-teal-900"/></div>
                  <button onClick={handleCreateLink} className="bg-teal-600 hover:bg-teal-700 text-white px-6 rounded-xl font-bold">Generate</button>
                </div>
                {generatedLink && <div className="mt-4 p-3 bg-white border border-teal-200 rounded-xl"><code className="text-xs text-teal-800 break-all font-bold">{generatedLink}</code></div>}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}