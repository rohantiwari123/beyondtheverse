import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { collection, doc, setDoc, deleteDoc, addDoc, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import AdminExamEditor from '../../components/Exam/AdminExamEditor';

// 🌟 NAYA: Q&A Functions Import
import { getPendingQuestions, publishQuestionToFAQ, deleteUserQuestion } from '../../services/firebaseServices';

// ==========================================
// 🌟 CUSTOM MODAL (For Safe Actions)
// ==========================================
function CustomModal({ config, onClose }) {
  if (!config.isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose}></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 w-full max-w-sm relative z-10 animate-fade-in-up shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${config.type === 'confirm' ? 'bg-rose-50 text-rose-500' : 'bg-teal-50 text-teal-500'}`}>
            <i className={`fa-solid ${config.type === 'confirm' ? 'fa-triangle-exclamation' : 'fa-circle-info'} text-lg`}></i>
          </div>
          <h3 className="text-lg text-slate-800">{config.type === 'confirm' ? 'Confirm Action' : 'Notice'}</h3>
        </div>
        <p className="text-sm text-slate-600 mb-8 pl-14">{config.message}</p>
        <div className="flex justify-end gap-3">
          {config.type === 'confirm' && (
            <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-xs text-slate-500 hover:bg-slate-100 transition-colors">Cancel</button>
          )}
          <button
            onClick={() => { config.onConfirm && config.onConfirm(); onClose(); }}
            className={`px-6 py-2.5 rounded-lg text-xs text-white transition-colors ${config.type === 'confirm' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-teal-600 hover:bg-teal-700'}`}
          >
            {config.type === 'confirm' ? 'Confirm' : 'Okay'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🌟 MAIN DASHBOARD COMPONENT
// ==========================================
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

  // 🌟 Q&A States
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [answerInputs, setAnswerInputs] = useState({});
  const [isPublishing, setIsPublishing] = useState(false);

  // Modal State
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', message: '', onConfirm: null });
  const showAlert = (message) => setModalConfig({ isOpen: true, type: 'alert', message, onConfirm: null });
  const showConfirm = (message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', message, onConfirm });

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

  // 🌟 Fetch Pending Questions
  useEffect(() => {
    if (activeTab === 'qna') {
      const fetchQnA = async () => {
        const data = await getPendingQuestions();
        setPendingQuestions(data);
      };
      fetchQnA();
    }
  }, [activeTab]);

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

  // Donation Delete (Custom Modal)
  const handleDeleteDonation = (id) => {
    showConfirm("Are you sure this is an invalid record? Deleting it will reduce the total amount raised.", async () => {
      try {
        await deleteDoc(doc(db, "donations", id));
        showToast("Record Deleted Successfully");
      } catch (err) {
        showToast("Permission Denied.", false);
      }
    });
  };

  // Scholarship Link
  const handleCreateLink = async () => {
    if (!scholarshipAmount || scholarshipAmount < 1) {
      showToast("Please enter a valid amount.", false);
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
        showToast("Link Copied to Clipboard!");
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
      showToast("Please enter a subject name.", false);
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
      showToast("Error saving subject.", false);
    } finally {
      setIsFetchingDef(false);
    }
  };

  // Delete Subject (Custom Modal)
  const handleDeleteSubject = (id, name) => {
    showConfirm(`Are you sure you want to remove '${name}' from the subjects list?`, async () => {
      try {
        await deleteDoc(doc(db, "subjects", id));
        showToast("Subject removed.");
      } catch (err) {
        showToast("Error deleting subject.", false);
      }
    });
  };

  // Export CSV (Custom Alert)
  const handleExportCsv = () => {
    if (donations.length === 0) return showAlert("No donation records available to export.");

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

  // 🌟 Q&A Handlers
  const handlePublishAnswer = async (questionId, questionText) => {
    const answerText = answerInputs[questionId];
    if (!answerText || !answerText.trim()) {
      showToast("Please write an answer before publishing.", false);
      return;
    }
    setIsPublishing(true);
    try {
      await publishQuestionToFAQ(questionId, questionText, answerText.trim());
      showToast("Published to FAQ successfully!");
      setPendingQuestions(prev => prev.filter(q => q.id !== questionId));
      setAnswerInputs(prev => { const newInputs = { ...prev }; delete newInputs[questionId]; return newInputs; });
    } catch (error) {
      showToast("Failed to publish.", false);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleTrashQuestion = async (questionId) => {
    showConfirm("Delete this question? It will be removed permanently.", async () => {
      await deleteUserQuestion(questionId);
      setPendingQuestions(prev => prev.filter(q => q.id !== questionId));
      showToast("Question deleted.");
    });
  };

  const filteredDonations = donations.filter(d =>
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.utr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.phone?.includes(searchTerm)
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20 pt-4 sm:pt-10">
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-8 px-0 sm:px-6 lg:px-8 animate-fade-in-up">

        {/* 🌟 1. SIDEBAR / MOBILE TABS */}
        <div className="w-full md:w-64 shrink-0 px-4 sm:px-0">
          <div className="bg-white p-3 sm:p-5 sm:rounded-2xl border-b sm:border border-slate-200 md:sticky md:top-24 overflow-x-auto hide-scrollbar">
            <h2 className="hidden md:flex text-lg text-slate-800 mb-6 px-2 items-center gap-2">
              <i className="fa-solid fa-shield-halved text-teal-600"></i> Workspace
            </h2>
            <nav className="flex md:flex-col gap-2 min-w-max md:min-w-0">
              {[
                { id: 'academy', icon: 'fa-brain', label: 'Assessments' },
                { id: 'dashboard', icon: 'fa-wallet', label: 'Donations' },
                { id: 'qna', icon: 'fa-clipboard-question', label: 'Q&A Inbox' }, // 🌟 NAYA TAB
                { id: 'users', icon: 'fa-users', label: 'Citizens' },
                { id: 'subjects', icon: 'fa-book-open', label: 'Subjects' },
                { id: 'settings', icon: 'fa-sliders', label: 'Settings' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm text-left whitespace-nowrap ${activeTab === tab.id ? 'bg-teal-50 text-teal-700 border border-teal-100/50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}
                >
                  <i className={`fa-solid ${tab.icon} w-4 sm:w-5 text-center`}></i> {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 🌟 2. MAIN CONTENT AREA */}
        <div className="flex-1 max-w-full overflow-hidden">

          {/* TAB: ACADEMY */}
          {activeTab === 'academy' && (
            <div className="animate-fade-in">
              <div className="mb-4 sm:mb-6 px-4 sm:px-0">
                <h1 className="text-2xl sm:text-3xl text-slate-800">Assessment Editor</h1>
                <p className="text-xs text-slate-500 mt-1">Create & Manage</p>
              </div>
              <AdminExamEditor showToast={showToast} />
            </div>
          )}

          {/* TAB: DONATIONS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <div className="px-4 sm:px-0">
                <h1 className="text-2xl sm:text-3xl text-slate-800">Financial Overview</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4 border-y sm:border border-slate-200 sm:rounded-2xl overflow-hidden bg-white">
                <div className="p-5 border-b sm:border-b-0 sm:border-r border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 text-lg sm:text-xl"><i className="fa-solid fa-wallet"></i></div>
                  <div>
                    <p className="text-[10px] text-slate-400">Total Raised</p>
                    <p className="text-xl sm:text-2xl text-slate-800">₹{totalRaised.toLocaleString("en-IN")}</p>
                  </div>
                </div>
                <div className="p-5 border-b sm:border-b-0 sm:border-r border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-lg sm:text-xl"><i className="fa-solid fa-hand-holding-heart"></i></div>
                  <div>
                    <p className="text-[10px] text-slate-400">Total Donors</p>
                    <p className="text-xl sm:text-2xl text-slate-800">{donations.length}</p>
                  </div>
                </div>
                <div className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 text-lg sm:text-xl"><i className="fa-solid fa-bullseye"></i></div>
                  <div>
                    <p className="text-[10px] text-slate-400">Goal Progress</p>
                    <p className="text-xl sm:text-2xl text-slate-800">{Math.min(100, Math.round((totalRaised / targetAmount) * 100))}%</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-3 border-y sm:border border-slate-200 sm:rounded-xl">
                <div className="w-full sm:flex-1 relative">
                  <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                  <input type="text" placeholder="Search by name, UTR or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 rounded-lg text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all" />
                </div>
                <button onClick={handleExportCsv} className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white text-sm px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <i className="fa-solid fa-download"></i> Export CSV
                </button>
              </div>

              <div className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-4 text-[10px] text-slate-500 whitespace-nowrap">Date</th>
                        <th className="p-4 text-[10px] text-slate-500 whitespace-nowrap">Donor Info</th>
                        <th className="p-4 text-[10px] text-slate-500 whitespace-nowrap">UTR Number</th>
                        <th className="p-4 text-[10px] text-teal-600 text-right whitespace-nowrap">Amount</th>
                        <th className="p-4 text-[10px] text-slate-500 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDonations.length === 0 ? (
                        <tr><td colSpan="5" className="p-8 text-center text-sm text-slate-400">No records found.</td></tr>
                      ) : (
                        filteredDonations.map((d) => (
                          <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 text-xs text-slate-500 whitespace-nowrap">{new Date(d.timestamp).toLocaleDateString("en-IN")}</td>
                            <td className="p-4">
                              <div className="text-sm text-slate-800">{d.name}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{d.phone}</div>
                            </td>
                            <td className="p-4"><span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">{d.utr || "N/A"}</span></td>
                            <td className="p-4 text-sm text-teal-700 text-right">₹{Number(d.amount).toLocaleString("en-IN")}</td>
                            <td className="p-4 text-center">
                              <button onClick={() => handleDeleteDonation(d.id)} className="h-8 w-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 flex items-center justify-center mx-auto transition-colors" title="Delete">
                                <i className="fa-solid fa-trash-can text-xs"></i>
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

          {/* 🌟 TAB: Q&A INBOX */}
          {activeTab === 'qna' && (
            <div className="animate-fade-in space-y-4 sm:space-y-6">
              <div className="px-4 sm:px-0">
                <h1 className="text-2xl sm:text-3xl text-slate-800">Q&A Inbox</h1>
                <p className="text-xs text-slate-500 mt-1">{pendingQuestions.length} Pending Questions</p>
              </div>

              {pendingQuestions.length === 0 ? (
                <div className="text-center py-20 bg-white border-y sm:border border-slate-200 sm:rounded-2xl">
                  <i className="fa-solid fa-inbox text-4xl mb-4 text-slate-300"></i>
                  <p className="text-sm text-slate-500">Inbox is empty. No new questions from users.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingQuestions.map((q) => (
                    <div key={q.id} className="bg-white p-5 sm:p-6 border-y sm:border border-slate-200 sm:rounded-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="bg-amber-50 text-amber-600 border border-amber-200 px-2 py-1 rounded text-[10px]">Pending</span>
                          <p className="text-xs text-slate-400 mt-2">Asked by <span className="text-slate-600">{q.userName}</span></p>
                        </div>
                        <button onClick={() => handleTrashQuestion(q.id)} className="h-8 w-8 bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg flex items-center justify-center transition-colors">
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </div>

                      <h3 className="text-base sm:text-lg text-slate-800 mb-4">"{q.question}"</h3>

                      <div className="space-y-3">
                        <textarea
                          value={answerInputs[q.id] || ""}
                          onChange={(e) => setAnswerInputs({ ...answerInputs, [q.id]: e.target.value })}
                          placeholder="Write your answer here..."
                          rows="3"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                        ></textarea>
                        <button
                          onClick={() => handlePublishAnswer(q.id, q.question)}
                          disabled={isPublishing}
                          className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
                        >
                          Publish to FAQ <i className="fa-solid fa-check ml-1"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: USERS */}
          {activeTab === 'users' && (
            <div className="animate-fade-in space-y-4 sm:space-y-6">
              <div className="px-4 sm:px-0">
                <h1 className="text-2xl sm:text-3xl text-slate-800">Citizen Database</h1>
                <p className="text-xs text-slate-500 mt-1">{usersList.length} Registered</p>
              </div>
              <div className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl overflow-hidden">
                {isFetchingUsers ? (
                  <div className="p-16 text-center text-slate-400">
                    <i className="fa-solid fa-circle-notch fa-spin text-2xl text-teal-500 mb-3"></i>
                    <p className="text-xs">Scanning...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="p-4 text-[10px] text-slate-500">Citizen Info</th>
                          <th className="p-4 text-[10px] text-slate-500 text-center">Role</th>
                          <th className="p-4 text-[10px] text-slate-500 hidden sm:table-cell">Unique ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {usersList.length === 0 ? (
                          <tr><td colSpan="3" className="p-8 text-center text-sm text-slate-400">No users found.</td></tr>
                        ) : (
                          usersList.map((user) => (
                            <tr key={user.uid} className="hover:bg-slate-50 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-white ${user.role === 'admin' ? 'bg-slate-800' : 'bg-teal-500'}`}>{user.name?.charAt(0).toUpperCase() || "?"}</div>
                                  <div>
                                    <p className="text-slate-800 text-sm leading-tight">{user.name || "Unknown"}</p>
                                    <p className="text-[11px] text-slate-500 mt-0.5">{user.email || "No Email"}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-center"><span className={`px-2.5 py-1 rounded text-[9px] border ${user.role === 'admin' ? 'bg-slate-900 text-white border-slate-800' : 'bg-teal-50 text-teal-700 border-teal-200'}`}>{user.role || 'client'}</span></td>
                              <td className="p-4 hidden sm:table-cell"><code className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200 font-mono">{user.uid}</code></td>
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
            <div className="animate-fade-in space-y-4 sm:space-y-6 max-w-3xl">
              <div className="px-4 sm:px-0">
                <h1 className="text-2xl sm:text-3xl text-slate-800">Learning Subjects</h1>
              </div>
              <div className="bg-white p-5 sm:p-6 border-y sm:border border-slate-200 sm:rounded-2xl">
                <p className="text-xs text-slate-500 mb-4">Enter a topic, and the engine will fetch its definition automatically.</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input type="text" placeholder="Type subject (e.g. Quantum Physics)" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} className="w-full border border-slate-300 bg-white rounded-lg py-2.5 px-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()} />
                  <button onClick={handleAddSubject} disabled={isFetchingDef} className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-lg disabled:bg-slate-300 transition-colors flex items-center justify-center">
                    {isFetchingDef ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4 border-y sm:border-0 border-slate-200">
                {subjectsList.map(sub => (
                  <div key={sub.id} className="bg-white border-b sm:border border-slate-200 p-5 sm:rounded-2xl flex justify-between items-start group hover:border-slate-300 transition-colors">
                    <div className="pr-4">
                      <h5 className="text-slate-800 text-sm mb-1.5">{sub.name}</h5>
                      <p className="text-[11px] text-slate-500 line-clamp-3">{sub.definition}</p>
                    </div>
                    <button onClick={() => handleDeleteSubject(sub.id, sub.name)} className="text-slate-300 hover:text-rose-500 bg-white border border-transparent hover:border-rose-100 hover:bg-rose-50 h-8 w-8 rounded-lg flex items-center justify-center transition-colors shrink-0">
                      <i className="fa-solid fa-trash-can text-xs"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="animate-fade-in space-y-4 sm:space-y-6 max-w-2xl">
              <div className="px-4 sm:px-0">
                <h1 className="text-2xl sm:text-3xl text-slate-800">Platform Settings</h1>
              </div>

              <div className="bg-white p-5 sm:p-6 border-y sm:border border-slate-200 sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base text-slate-800">Financial Goal Target</h3>
                  <p className="text-xs text-slate-500 mt-1">Set the total amount aiming to raise.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                    <input type="number" value={newTarget} onChange={(e) => setNewTarget(e.target.value)} className="w-full sm:w-32 border border-slate-300 rounded-lg py-2 pl-7 pr-3 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all" />
                  </div>
                  <button onClick={handleSaveTarget} className="bg-slate-800 hover:bg-slate-900 text-white px-5 rounded-lg text-sm transition-colors shrink-0">Save</button>
                </div>
              </div>

              <div className="bg-teal-50 p-5 sm:p-6 border-y sm:border border-teal-100 sm:rounded-2xl">
                <h3 className="text-base text-teal-900 mb-1">Secret Scholarship Links</h3>
                <p className="text-xs text-teal-700/80 mb-4">Generate link with a lower minimum donation limit.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 text-sm">₹</span>
                    <input type="number" value={scholarshipAmount} onChange={(e) => setScholarshipAmount(e.target.value)} placeholder="Amount" className="w-full border border-teal-200 bg-white rounded-lg py-2.5 pl-8 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-teal-900 transition-all" />
                  </div>
                  <button onClick={handleCreateLink} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm transition-colors">Generate</button>
                </div>
                {generatedLink && (
                  <div className="mt-4 p-3 bg-white border border-teal-200 rounded-lg flex items-center justify-between gap-3">
                    <code className="text-[10px] sm:text-xs text-teal-800 font-mono truncate">{generatedLink}</code>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}