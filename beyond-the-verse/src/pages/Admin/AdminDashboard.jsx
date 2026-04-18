import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { collection, doc, setDoc, deleteDoc, addDoc, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import AdminExamEditor from '../../components/Exam/AdminExamEditor';

// 🌟 NAYA: Q&A Functions Import
import { getPendingQuestions, publishQuestionToFAQ, deleteUserQuestion, getAllExamResults, getResultsReleaseStatus, setResultsReleaseStatus } from '../../services/firebaseServices';

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

  // 🌟 EXAM RESULTS STATES
  const [allExamResults, setAllExamResults] = useState([]);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [resultsReleased, setResultsReleased] = useState(false);
  const [isFetchingReleaseStatus, setIsFetchingReleaseStatus] = useState(false);

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

  // 🌟 NAYA: Fetch All Exam Results
  useEffect(() => {
    if (activeTab === 'results') {
      const fetchResults = async () => {
        setIsFetchingResults(true);
        try {
          const data = await getAllExamResults();
          setAllExamResults(data);
        } catch (error) {
          console.error("Error fetching exam results:", error);
          showToast("Failed to load exam results.", false);
        } finally {
          setIsFetchingResults(false);
        }
      };
      fetchResults();
    }
  }, [activeTab, showToast]);

  // 🌟 NAYA: Fetch Result Release Status
  useEffect(() => {
    const fetchReleaseStatus = async () => {
      setIsFetchingReleaseStatus(true);
      try {
        const status = await getResultsReleaseStatus();
        setResultsReleased(status);
      } catch (error) {
        console.error('Error loading release status:', error);
        showToast('Unable to load results release state.', false);
      } finally {
        setIsFetchingReleaseStatus(false);
      }
    };

    fetchReleaseStatus();
  }, [showToast]);

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

  // Release Results Toggle
  const handleToggleResultsRelease = async () => {
    try {
      await setResultsReleaseStatus(!resultsReleased);
      setResultsReleased(prev => !prev);
      showToast(`Results successfully ${!resultsReleased ? 'released' : 'hidden'}.`);
    } catch (error) {
      showToast('Failed to update results release state.', false);
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
    <div className="w-full min-h-screen bg-slate-50">
      <CustomModal config={modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />

      <div className="max-w-full min-h-screen flex flex-col">
        
        {/* 🌟 HORIZONTAL NAVBAR (Desktop) / TABS (Mobile) */}
        <div className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            
            {/* Desktop Navbar - Horizontal */}
            <nav className="hidden lg:flex items-center h-20 gap-1 overflow-x-auto">
              <div className="flex items-center gap-2 mr-8 shrink-0">
                <i className="fa-solid fa-shield-halved text-teal-600 text-lg"></i>
                <span className="text-slate-900 font-semibold text-sm">Admin Workspace</span>
              </div>
              
              <div className="flex items-center gap-2">
                {[
                  { id: 'academy', icon: 'fa-brain', label: 'Assessments' },
                  { id: 'results', icon: 'fa-chart-column', label: 'Results' },
                  { id: 'dashboard', icon: 'fa-wallet', label: 'Donations' },
                  { id: 'qna', icon: 'fa-clipboard-question', label: 'Q&A Inbox' },
                  { id: 'users', icon: 'fa-users', label: 'Citizens' },
                  { id: 'subjects', icon: 'fa-book-open', label: 'Subjects' },
                  { id: 'settings', icon: 'fa-sliders', label: 'Settings' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap border ${
                      activeTab === tab.id 
                        ? 'bg-teal-50 text-teal-700 border-teal-200' 
                        : 'text-slate-600 hover:bg-slate-50 border-transparent'
                    }`}
                  >
                    <i className={`fa-solid ${tab.icon} w-4`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile/Tablet Tabs - Vertical Scrollable */}
            <div className="lg:hidden overflow-x-auto -mx-4 px-4 hide-scrollbar">
              <nav className="flex gap-2 py-3 min-w-max">
                {[
                  { id: 'academy', icon: 'fa-brain', label: 'Assessments' },
                  { id: 'results', icon: 'fa-chart-column', label: 'Results' },
                  { id: 'dashboard', icon: 'fa-wallet', label: 'Donations' },
                  { id: 'qna', icon: 'fa-clipboard-question', label: 'Q&A' },
                  { id: 'users', icon: 'fa-users', label: 'Citizens' },
                  { id: 'subjects', icon: 'fa-book-open', label: 'Subjects' },
                  { id: 'settings', icon: 'fa-sliders', label: 'Settings' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs sm:text-sm whitespace-nowrap border ${
                      activeTab === tab.id 
                        ? 'bg-teal-50 text-teal-700 border-teal-200' 
                        : 'text-slate-600 hover:bg-slate-50 border-transparent'
                    }`}
                  >
                    <i className={`fa-solid ${tab.icon}`}></i>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* 🌟 MAIN CONTENT AREA */}
        <div className="flex-1 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 animate-fade-in">

          {/* TAB: ACADEMY */}
          {activeTab === 'academy' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <i className="fa-solid fa-file-signature text-teal-600"></i>
                  Exam Editor
                </h1>
                <p className="text-sm text-slate-600 mt-1">Create and manage assessment materials</p>
              </div>
              <AdminExamEditor showToast={showToast} />
            </div>
          )}

          {/* TAB: DONATIONS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Financial Overview</h1>
                <p className="text-sm text-slate-600">Track and manage all donations</p>
              </div>

              {/* 🌟 Stats Cards - Fully Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 hover:border-teal-300 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mb-2">Total Raised</p>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900">₹{totalRaised.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 text-xl shrink-0">
                      <i className="fa-solid fa-wallet"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mb-2">Total Donors</p>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900">{donations.length}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xl shrink-0">
                      <i className="fa-solid fa-hand-holding-heart"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 hover:border-amber-300 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mb-2">Goal Progress</p>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900">{Math.min(100, Math.round((totalRaised / targetAmount) * 100))}%</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 text-xl shrink-0">
                      <i className="fa-solid fa-bullseye"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* 🌟 Search & Export - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                  <input 
                    type="text" 
                    placeholder="Search by name, UTR or phone..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full bg-white border border-slate-200 py-3 pl-10 pr-4 rounded-lg text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={handleExportCsv} 
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-sm px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all font-medium"
                >
                  <i className="fa-solid fa-download"></i> Export CSV
                </button>
              </div>

              {/* 🌟 Donations Table - Fully Responsive */}
              <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-slate-600 whitespace-nowrap">Date</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-slate-600 whitespace-nowrap">Donor Info</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-slate-600 whitespace-nowrap">UTR Number</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-teal-600 text-right whitespace-nowrap">Amount</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-slate-600 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDonations.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 sm:px-6 text-center">
                            <i className="fa-solid fa-inbox text-3xl text-slate-300 mb-3 block"></i>
                            <p className="text-sm text-slate-400">No records found</p>
                          </td>
                        </tr>
                      ) : (
                        filteredDonations.map((d) => (
                          <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-slate-600 whitespace-nowrap">
                              {new Date(d.timestamp).toLocaleDateString("en-IN")}
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                              <div className="text-xs sm:text-sm font-medium text-slate-900">{d.name}</div>
                              <div className="text-xs text-slate-500 mt-1">{d.phone}</div>
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                                {d.utr || "N/A"}
                              </span>
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-right">
                              <span className="text-xs sm:text-sm font-semibold text-teal-700">
                                ₹{Number(d.amount).toLocaleString("en-IN")}
                              </span>
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-center">
                              <button 
                                onClick={() => handleDeleteDonation(d.id)} 
                                className="h-9 w-9 rounded-lg bg-white border border-slate-200 text-slate-400 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 flex items-center justify-center mx-auto transition-all"
                                title="Delete"
                              >
                                <i className="fa-solid fa-trash-can text-sm"></i>
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
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Q&A Inbox</h1>
                <p className="text-sm text-slate-600">{pendingQuestions.length} Pending Questions</p>
              </div>

              {pendingQuestions.length === 0 ? (
                <div className="text-center py-16 sm:py-20 bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl">
                  <i className="fa-solid fa-inbox text-4xl sm:text-5xl text-slate-300 mb-4 block"></i>
                  <p className="text-sm text-slate-500">Inbox is empty. No new questions from users.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingQuestions.map((q) => (
                    <div key={q.id} className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 hover:border-slate-300 transition-all">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-5">
                        <div className="flex-1">
                          <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-medium">Pending</span>
                          <p className="text-xs sm:text-sm text-slate-500 mt-3">Asked by <span className="font-medium text-slate-700">{q.userName}</span></p>
                        </div>
                        <button 
                          onClick={() => handleTrashQuestion(q.id)} 
                          className="h-10 w-10 bg-white border border-slate-200 text-slate-400 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 rounded-lg flex items-center justify-center transition-all shrink-0"
                          title="Delete"
                        >
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </div>

                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-5 leading-relaxed">"{q.question}"</h3>

                      <div className="space-y-4">
                        <textarea
                          value={answerInputs[q.id] || ""}
                          onChange={(e) => setAnswerInputs({ ...answerInputs, [q.id]: e.target.value })}
                          placeholder="Write your answer here..."
                          rows="4"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 resize-none transition-all"
                        />
                        <button
                          onClick={() => handlePublishAnswer(q.id, q.question)}
                          disabled={isPublishing}
                          className="w-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isPublishing ? (
                            <>
                              <i className="fa-solid fa-spinner fa-spin"></i>
                              Publishing...
                            </>
                          ) : (
                            <>
                              Publish to FAQ <i className="fa-solid fa-check"></i>
                            </>
                          )}
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
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Citizen Database</h1>
                <p className="text-sm text-slate-600">{usersList.length} Registered Users</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden">
                {isFetchingUsers ? (
                  <div className="p-12 sm:p-16 text-center">
                    <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-500 mb-4 block"></i>
                    <p className="text-sm text-slate-500">Loading users...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-slate-600">Citizen Info</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-slate-600 text-center">Role</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-slate-600 hidden lg:table-cell">Unique ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {usersList.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-4 py-8 sm:px-6 text-center">
                              <i className="fa-solid fa-users text-3xl text-slate-300 mb-3 block"></i>
                              <p className="text-sm text-slate-400">No users found</p>
                            </td>
                          </tr>
                        ) : (
                          usersList.map((user) => (
                            <tr key={user.uid} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3 sm:px-6 sm:py-4">
                                <div className="flex items-center gap-3">
                                  <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-lg flex items-center justify-center text-white font-semibold text-sm ${user.role === 'admin' ? 'bg-slate-900' : 'bg-teal-600'}`}>
                                    {user.name?.charAt(0).toUpperCase() || "?"}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-900 truncate">{user.name || "Unknown"}</p>
                                    <p className="text-xs text-slate-500 truncate mt-0.5">{user.email || "No Email"}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 sm:px-6 sm:py-4 text-center">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                                  user.role === 'admin' 
                                    ? 'bg-slate-900 text-white border-slate-800' 
                                    : 'bg-teal-50 text-teal-700 border-teal-200'
                                }`}>
                                  {user.role || 'client'}
                                </span>
                              </td>
                              <td className="px-4 py-3 sm:px-6 sm:py-4 hidden lg:table-cell">
                                <code className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 font-mono">
                                  {user.uid.substring(0, 12)}...
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

          {/* TAB: EXAM RESULTS (ADMIN ONLY) */}
          {activeTab === 'results' && (
            <div className="animate-fade-in space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Exam Results</h1>
                  <p className="text-sm text-slate-600">View all student exam submissions and performance metrics</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleResultsRelease}
                    disabled={isFetchingReleaseStatus}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${resultsReleased ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                  >
                    {isFetchingReleaseStatus ? 'Loading...' : resultsReleased ? 'Hide Results' : 'Release Results'}
                  </button>
                  <span className={`text-xs font-medium ${resultsReleased ? 'text-teal-600' : 'text-slate-500'}`}>
                    {resultsReleased ? 'Students can now view their scores' : 'Results hidden from students'}
                  </span>
                </div>
              </div>

              {isFetchingResults ? (
                <div className="py-20 flex flex-col items-center justify-center bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl">
                  <div className="h-8 w-8 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-sm text-slate-500">Loading exam results...</p>
                </div>
              ) : allExamResults.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl">
                  <i className="fa-solid fa-chart-line text-4xl text-slate-300 mb-3"></i>
                  <p className="text-sm text-slate-500">No exam results available yet.</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700">Student ID</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700">Exam Title</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700">Percentage</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700">Submitted</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {allExamResults.map((result) => {
                          const percentage = result.maxScore ? Math.round((result.totalScore / result.maxScore) * 100) : 0;
                          const submittedDate = result.submittedAt ? new Date(result.submittedAt.toMillis?.() || result.submittedAt).toLocaleDateString() : 'N/A';
                          
                          return (
                            <tr key={result.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3 text-slate-900 font-mono text-xs">{result.userId.slice(0, 8)}</td>
                              <td className="px-4 py-3 text-slate-900 font-medium">{result.examTitle}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                  percentage >= 70 ? 'bg-teal-50 text-teal-700' :
                                  percentage >= 50 ? 'bg-yellow-50 text-yellow-700' :
                                  'bg-rose-50 text-rose-700'
                                }`}>
                                  {percentage}%
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-600 text-xs">{submittedDate}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <span><strong>{allExamResults.length}</strong> total submissions</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: SUBJECTS */}
          {activeTab === 'subjects' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Learning Subjects</h1>
                <p className="text-sm text-slate-600">Manage and organize course materials</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8">
                <p className="text-xs sm:text-sm text-slate-600 mb-4">Enter a topic and the system will fetch its definition automatically from Wikipedia.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    placeholder="Type subject (e.g. Quantum Physics)" 
                    value={newSubject} 
                    onChange={(e) => setNewSubject(e.target.value)} 
                    className="flex-1 border border-slate-300 bg-white rounded-lg py-3 px-4 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                  />
                  <button 
                    onClick={handleAddSubject} 
                    disabled={isFetchingDef} 
                    className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 active:scale-95 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isFetchingDef ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span className="hidden sm:inline">Fetching...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-plus"></i>
                        Add Subject
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectsList.length === 0 ? (
                  <div className="col-span-full text-center py-12 bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl">
                    <i className="fa-solid fa-book text-4xl text-slate-300 mb-3 block"></i>
                    <p className="text-sm text-slate-500">No subjects added yet. Start by adding one.</p>
                  </div>
                ) : (
                  subjectsList.map(sub => (
                    <div 
                      key={sub.id} 
                      className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 hover:border-teal-300 hover:shadow-md transition-all group flex flex-col"
                    >
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <h5 className="text-sm sm:text-base font-semibold text-slate-900 flex-1">{sub.name}</h5>
                        <button 
                          onClick={() => handleDeleteSubject(sub.id, sub.name)}
                          className="h-9 w-9 bg-white border border-slate-200 text-slate-400 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 rounded-lg flex items-center justify-center transition-all shrink-0 opacity-0 group-hover:opacity-100"
                          title="Delete"
                        >
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-4 flex-1 leading-relaxed">{sub.definition}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Platform Settings</h1>
                <p className="text-sm text-slate-600">Configure platform behavior and features</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">Financial Goal Target</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">Set the total amount aiming to raise.</p>
                  </div>
                  <div className="flex gap-3 flex-col sm:flex-row">
                    <div className="relative flex-1 sm:flex-none">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">₹</span>
                      <input 
                        type="number" 
                        value={newTarget} 
                        onChange={(e) => setNewTarget(e.target.value)} 
                        className="w-full sm:w-40 border border-slate-300 rounded-lg py-3 pl-8 pr-4 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                      />
                    </div>
                    <button 
                      onClick={handleSaveTarget} 
                      className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all w-full sm:w-auto"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-50/50 border border-teal-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8">
                <h3 className="text-base sm:text-lg font-semibold text-teal-900 mb-2">Secret Scholarship Links</h3>
                <p className="text-xs sm:text-sm text-teal-800 mb-6">Generate a unique link with a lower minimum donation limit for scholarship recipients.</p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 text-sm font-medium">₹</span>
                    <input 
                      type="number" 
                      value={scholarshipAmount} 
                      onChange={(e) => setScholarshipAmount(e.target.value)} 
                      placeholder="Minimum amount" 
                      className="w-full border border-teal-300 bg-white rounded-lg py-3 pl-8 pr-4 text-sm text-teal-900 placeholder-teal-600/60 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    />
                  </div>
                  <button 
                    onClick={handleCreateLink} 
                    className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-link"></i>
                    Generate Link
                  </button>
                </div>

                {generatedLink && (
                  <div className="bg-white border border-teal-300 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <code className="text-xs sm:text-sm text-teal-800 font-mono flex-1 break-all bg-teal-50 px-3 py-2 rounded">
                      {generatedLink}
                    </code>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLink);
                        showToast("Link copied!");
                      }}
                      className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all"
                    >
                      <i className="fa-solid fa-copy mr-1"></i>Copy
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          </div>
        </div>

      </div>
    </div>
  );
}