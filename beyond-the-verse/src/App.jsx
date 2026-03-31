import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore'; // 🌟 setDoc hata diya!
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { auth, db } from './firebase'; 

import Header from './components/Layout/Header';
import Toast from './components/Toast';
import AdminModal from './components/AdminModal'; 

import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/Home/HomePage';
import DonationPage from './pages/Donate/DonationPage';
import AboutPage from './pages/About/AboutPage';

// 🍪 COOKIES (रिफ्रेश पर फ्लैश रोकने के लिए)
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return JSON.parse(match[2]);
  return null;
};

const eraseCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const savedUser = getCookie('btv_user');
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!savedUser);
  const [isAdmin, setIsAdmin] = useState(savedUser?.role === 'admin');
  const [userName, setUserName] = useState(savedUser?.name || ""); 
  
  const [isCheckingAuth, setIsCheckingAuth] = useState(!savedUser); 

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [targetAmount, setTargetAmount] = useState(50000);

  // 🌟 PURE FIREBASE AUTH (No Fake Names, No Refresh Logouts) 🌟
  useEffect(() => {
    // Firebase Auth apne aap refresh handle karta hai
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            // 1. अगर डेटाबेस में असली डेटा है, तो उसे यूज़ करो
            const role = userDoc.data().role || 'client';
            const realName = userDoc.data().name || user.displayName || ""; 
            
            setIsAuthenticated(true);
            setIsAdmin(role === 'admin');
            setUserName(realName); 
            setCookie('btv_user', { uid: user.uid, role, name: realName }, 30);
          } else {
            // 2. अगर डेटाबेस में नहीं है (जैसे अभी-अभी Signup किया है)
            // 🚨 FAKE DATA SAVE NAHI KARENGE 🚨
            // बस फायरबेस से जो नाम मिला है (या खाली) उसे दिखाएंगे, Logout नहीं करेंगे।
            const tempName = user.displayName || ""; 
            
            setIsAuthenticated(true);
            setIsAdmin(false);
            setUserName(tempName);
            setCookie('btv_user', { uid: user.uid, role: 'client', name: tempName }, 30);
          }
        } catch (error) {
          // 3. इंटरनेट स्लो होने पर एरर आए, तो भी Logout मत करो!
          console.error("Database connection delayed, keeping session alive...");
          setIsAuthenticated(true); 
          setUserName(user.displayName || getCookie('btv_user')?.name || "");
        }
      } else {
        // 4. जब यूज़र सच में Logout बटन दबाए
        eraseCookie('btv_user');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserName("");
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // Live Donations Fetch
  useEffect(() => {
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
  }, []); 

  const showToast = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => setToast({ show: false, message: '', isSuccess: true }), 3500);
  };

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
    navigate('/');
  };

  const handleLogout = async () => {
    await signOut(auth);
    eraseCookie('btv_user');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserName(""); 
    navigate('/login');
    showToast("Logged out successfully!");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-4 animate-pulse shadow-inner border border-teal-100">
          <i className="fa-solid fa-atom text-4xl text-teal-600"></i>
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm tracking-wide uppercase">
          <i className="fa-solid fa-circle-notch fa-spin text-teal-600"></i> Securing session
        </div>
      </div>
    );
  }

  const isPublicPage = location.pathname === '/' || location.pathname === '/donate' || location.pathname === '/about';

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      {location.pathname !== '/login' && (
        <Header 
          isAdmin={isAdmin} 
          userName={userName} 
          isAuthenticated={isAuthenticated} 
          onAdminClick={() => setIsAdminModalOpen(true)} 
          onLogout={handleLogout}
          onLoginClick={() => navigate('/login')}
        />
      )}

      <main className={`relative z-10 ${isPublicPage ? 'max-w-7xl mx-auto px-2 sm:px-4 py-6 md:py-10' : ''}`}>
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? <LoginPage onLogin={handleLogin} showToast={showToast} /> : <Navigate to="/" />
          } />

          <Route path="/" element={
            <HomePage 
              isAdmin={isAdmin} 
              isAuthenticated={isAuthenticated} 
              userName={userName} 
              donations={donations} 
              totalRaised={totalRaised} 
              targetAmount={targetAmount} 
              onNavigateToDonate={() => navigate('/donate')} 
            />
          } />

          <Route path="/about" element={<AboutPage />} />
          
          <Route path="/donate" element={
            <DonationPage showToast={showToast} onBack={() => navigate('/')} />
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
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
