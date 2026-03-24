import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, deleteDoc, collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore"; // Naye imports jode hain
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
  const [newTarget, setNewTarget] = useState(targetAmount);
  
  // Scholarship Link ke state
  const [scholarshipAmount, setScholarshipAmount] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  // 🌟 NAYA: Subject Manager ke state 🌟
  const [newSubject, setNewSubject] = useState("");
  const [subjectsList, setSubjectsList] = useState([]); 
  const [isFetchingDef, setIsFetchingDef] = useState(false);

  // Authentication check
  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email) {
      setIsLoggedIn(true);
    }
  }, []);

  // 🌟 NAYA: Database se live subjects lana (Delete/View karne ke liye) 🌟
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

  // 🌟 NAYA: Smart Double-Engine Fetch Logic 🌟
  const handleAddSubject = async () => {
    if (!newSubject.trim()) {
      showToast("Please enter a subject name!");
      return;
    }
    
    setIsFetchingDef(true);
    let definition = "";
    let term = newSubject.trim();

    try {
      // 1. Pehle Hindi Wikipedia par try karega
      let resHi = await fetch(`https://hi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`);
      let dataHi = await resHi.json();
      
      if (dataHi.extract) {
        definition = dataHi.extract;
      } else {
        // 2. Agar Hindi mein nahi mila, toh English Wikipedia par try karega
        let resEn = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`);
        let dataEn = await resEn.json();
        
        if (dataEn.extract) {
          definition = dataEn.extract;
        } else {
          // 3. Agar dono jagah fail hua, toh custom message
          definition = "इस विषय की सटीक परिभाषा Wikipedia पर नहीं मिली। कृपया नाम सही से लिखें (जैसे: Psychology या मनोविज्ञान)।";
        }
      }

      // Firebase mein save karna
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

  // 🌟 NAYA: Subject Delete karna 🌟
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-5xl relative shadow-2xl flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 z-10">
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>

        {!isLoggedIn ? (
          <div className="p-10 text-center">
            <i className="fa-solid fa-shield-halved text-4xl text-teal-600 mb-4"></i>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">Secure Admin Login</h3>
            <p className="text-sm text-slate-500 mb-6">Enter your Firebase Admin Credentials</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email" className="w-full max-w-xs mx-auto block px-4 py-3 border border-slate-200 rounded-xl mb-3 outline-none focus:ring-2 focus:ring-teal-500"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full max-w-xs mx-auto block px-4 py-3 border border-slate-200 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-teal-500"/>
            <button onClick={handleLogin} disabled={isLoading} className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 w-full max-w-xs mx-auto flex justify-center items-center gap-2 transition">
              {isLoading ? "Checking..." : "Login securely"} <i className="fa-solid fa-arrow-right"></i>
            </button>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </div>
        ) : (
          <div className="flex-col h-full overflow-hidden flex">
            
            {/* Header Area */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 rounded-t-2xl flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800"><i className="fa-solid fa-list-check text-teal-600 mr-2"></i> Admin Dashboard</h3>
                <p className="text-sm text-slate-500 mt-1">Total Collections: ₹<span className="font-bold text-teal-700">{totalRaised.toLocaleString("en-IN")}</span></p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleExportCsv} className="bg-slate-800 hover:bg-slate-900 text-white text-sm px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm transition"><i className="fa-solid fa-download"></i> CSV</button>
                <button onClick={handleLogout} className="bg-red-50 hover:bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition"><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
              </div>
            </div>

            {/* CONTROL PANEL 1: Goal Target + Scholarship Link */}
            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold text-slate-700">Goal Target (₹):</label>
                <input type="number" value={newTarget} onChange={(e) => setNewTarget(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-1.5 w-32 outline-none focus:border-teal-500 font-semibold text-slate-700"/>
                <button onClick={handleSaveTarget} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition">Save</button>
              </div>
              <div className="flex items-center gap-3 bg-teal-50/50 p-2 rounded-lg border border-teal-100">
                <label className="text-sm font-bold text-teal-800">Special Link (₹):</label>
                <input type="number" value={scholarshipAmount} onChange={(e) => setScholarshipAmount(e.target.value)} placeholder="Amt" className="border border-teal-200 rounded-lg px-3 py-1.5 w-24 outline-none focus:border-teal-500 font-semibold text-teal-900 bg-white"/>
                <button onClick={handleCreateLink} className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition"><i className="fa-solid fa-link"></i> Create</button>
                {generatedLink && <span className="text-xs font-bold text-teal-600 bg-teal-100 px-2 py-1 rounded max-w-[150px] truncate" title={generatedLink}>Copied!</span>}
              </div>
            </div>

            {/* 🌟 NAYA CONTROL PANEL 2: Auto-Fetch Subject Manager 🌟 */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-slate-800"><i className="fa-solid fa-book-journal-whills text-teal-600 mr-1"></i> Add Learning Subjects</h4>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type subject (e.g. मनोविज्ञान, Physics)"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="border border-slate-200 bg-white rounded-lg px-3 py-2 flex-1 outline-none focus:border-teal-500 text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                />
                <button
                  onClick={handleAddSubject}
                  disabled={isFetchingDef}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap disabled:bg-slate-400"
                >
                  {isFetchingDef ? "Fetching Definition..." : "Add Subject"}
                </button>
              </div>
              {/* Active Subjects List with Delete option */}
              {subjectsList.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {subjectsList.map(sub => (
                    <span key={sub.id} className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-2 py-1.5 rounded-md flex items-center gap-2 shadow-sm">
                      {sub.name}
                      <button onClick={() => handleDeleteSubject(sub.id, sub.name)} className="text-red-400 hover:text-red-600 transition-colors" title="Remove Subject">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Donation Table */}
            <div className="overflow-y-auto p-0 flex-1 min-h-[30vh]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white sticky top-0 border-b border-slate-100 shadow-sm z-10">
                  <tr>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Donor Details</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">UTR Number</th>
                    <th className="p-4 text-xs font-semibold text-teal-600 uppercase text-right">Amount</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {donations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50 border-b border-slate-50">
                      <td className="p-4 text-sm text-slate-500">
                        {new Date(d.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-slate-800">{d.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{d.phone}</div>
                        {d.message && <div className="text-[10px] text-slate-500 italic mt-1 leading-tight"><i className="fa-solid fa-quote-left mr-1"></i>{d.message}</div>}
                      </td>
                      <td className="p-4 text-sm text-slate-600 font-mono font-bold tracking-wider">
                        {d.utr || <span className="text-slate-300 italic">No UTR</span>}
                      </td>
                      <td className="p-4 text-sm font-bold text-teal-700 text-right">
                        ₹{Number(d.amount).toLocaleString("en-IN")}
                      </td>
                      <td className="p-4 text-center flex justify-center gap-2">
                        {/* WhatsApp Thank You Button */}
                        <a href={`https://wa.me/91${d.phone}?text=Hello ${encodeURIComponent(d.name)} ji, %0A%0A*Beyond The Verse* ko support karne ke liye Dhanyawad! 🙏%0A%0AAapka ₹${d.amount} ka yogdan hume prapt ho gaya hai. (UTR: ${d.utr})`} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors p-2 rounded" title="Send Thank You on WhatsApp">
                          <i className="fa-brands fa-whatsapp text-lg"></i>
                        </a>
                        {/* Delete Button */}
                        <button onClick={() => handleDelete(d.id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors p-2 rounded" title="Delete Record">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
    }
