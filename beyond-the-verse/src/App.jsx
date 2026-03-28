import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// 🌟 NAYA: getDoc और Firebase Auth के फंक्शन इम्पोर्ट किये
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { auth, db } from './firebase'; // ध्यान दें: auth भी इम्पोर्ट होना चाहिए

// Global Components
import Header from './components/Header';
import AdminModal from './components/AdminModal';
import Toast from './components/Toast';

// Pages
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import DonationPage from './components/DonationPage/DonationPage';

export default function App() {
  const navigate = useNavigate();
  
  // 🌟 NAYA: Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // 🌟 NAYA: Loading State (ताकि लॉगिन चेक होते वक़्त पेज फ्लैश न हो)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  // Admin Dashboard & Progress Bar Data
  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [targetAmount, setTargetAmount] = useState(50000);

  // 🌟 JADOO: Auto-Login Check (जब भी वेबसाइट खुलेगी, ये चलेगा) 🌟
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // यूज़र लॉगिन है, अब उसका रोल (Role) पता करो
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            setIsAuthenticated(true);
            setIsAdmin(role === 'admin'); // अगर role 'admin' है, तो Admin Dashboard दिखेगा
          } else {
            // अगर डेटाबेस में रोल नहीं मिला, तो बाहर निकाल दो
            setIsAuthenticated(false);
            setIsAdmin(false);
            await signOut(auth);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setIsAuthenticated(false);
        }
      } else {
        // कोई लॉगिन नहीं है
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setIsCheckingAuth(false); // लोडिंग खत्म
    });

    return () => unsubscribeAuth();
  }, []);

  // Live Donations & Goal Fetch (पुराना वाला)
  useEffect(() => {
    if (!isAuthenticated) return; // जब तक लॉगिन न हो, डेटा फेच मत करो (डेटा बचाने के लिए)

    const unsubDonations = onSnapshot(collection(db, 'donations'), (snapshot) => {
      let total = 0; let list = [];
      snapshot.forEach(doc => { total += (Number(doc.data().amount) || 0); list.push({ id: doc.id, ...doc.data() }); });
      list.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
      setDonations(list); setTotalRaised(total);
    });

    const unsubConfig = onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      if (docSnap.exists()) setTargetAmount(docSnap.data().targetAmount);
    });

    return () => { unsubDonations(); unsubConfig(); };
  }, [isAuthenticated]);

  const showToast = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => setToast({ show: false, message: '', isSuccess: true }), 3500);
  };

  // Login Handler (अब इसे LoginPage से सीधा कॉल किया जाएगा)
  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
    navigate('/');
  };

  // 🌟 NAYA: Logout Handler (Firebase से भी लॉगआउट करेगा) 🌟
  const handleLogout = async () => {
    await signOut(auth); // Firebase को बोलो लॉगआउट कर दे
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
    showToast("Logged out successfully!");
  };

  // 🌟 NAYA: अगर अभी Firebase चेक कर रहा है, तो लोडिंग स्क्रीन दिखाओ 🌟
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
          <i className="fa-solid fa-atom text-4xl text-teal-600"></i>
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
          <i className="fa-solid fa-circle-notch fa-spin text-teal-600"></i> Securely connecting...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      
      {/* Premium Background Glow */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      {isAuthenticated && (
        <Header 
          isAdmin={isAdmin} 
          onAdminClick={() => setIsAdminModalOpen(true)} 
          onLogout={handleLogout}
        />
      )}

      <main className={`relative z-10 ${isAuthenticated ? 'max-w-6xl mx-auto px-4 py-8 md:py-12' : ''}`}>
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? <LoginPage onLogin={handleLogin} showToast={showToast} /> : <Navigate to="/" />
          } />

          <Route path="/" element={
            isAuthenticated ? <HomePage onNavigateToDonate={() => navigate('/donate')} /> : <Navigate to="/login" />
          } />
          
          <Route path="/donate" element={
            isAuthenticated ? <DonationPage showToast={showToast} onBack={() => navigate('/')} /> : <Navigate to="/login" />
          } />
          
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </main>

      {isAdmin && isAdminModalOpen && (
        <AdminModal 
          onClose={() => setIsAdminModalOpen(false)} 
          showToast={showToast}
          donations={donations}
          totalRaised={totalRaised}
          targetAmount={targetAmount}
        />
      )}
      
      <Toast toast={toast} />
    </div>
  );
                                                 }
