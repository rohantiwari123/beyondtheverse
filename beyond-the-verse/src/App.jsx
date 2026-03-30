import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore'; // 🌟 setDoc हटा दिया (Auto-heal gone)
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { auth, db } from './firebase'; 

// Global Components
import Header from './components/Header';
import AdminModal from './components/AdminModal';
import Toast from './components/Toast';

// Pages
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import DonationPage from './components/DonationPage/DonationPage';
import AboutPage from './components/AboutPage/AboutPage';

// 🍪 COOKIE HELPERS (डेटा को फोन में परमानेंट सेव रखने के लिए)
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

  // 🌟 INITIALIZE FROM COOKIE (ताकि रिफ्रेश करते ही तुरंत नाम दिखे, कोई लोडिंग नहीं!)
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

  // 🌟 FIREBASE CHECKER (बैकग्राउंड में चुपचाप कुकी को अपडेट करेगा)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            const name = userDoc.data().name || "User"; 
            
            setIsAuthenticated(true);
            setIsAdmin(role === 'admin');
            setUserName(name); 

            // 🍪 कुकी को 30 दिन के लिए अपडेट कर दो
            setCookie('btv_user', { uid: user.uid, role, name }, 30);
          } else {
            // 🚨 AUTO-HEAL REMOVED! अगर डेटाबेस में नहीं है, तो तुरंत बाहर फेंको
            await signOut(auth);
            eraseCookie('btv_user');
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUserName("");
          }
        } catch (error) {
          console.error("Database or Auth Error:", error);
        }
      } else {
        // अगर फायरबेस लॉगआउट है, तो कुकी उड़ा दो
        eraseCookie('btv_user');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserName("");
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // Live Donations & Goal Fetch (Public)
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
    // कुकी बैकग्राउंड में useEffect बना लेगा, बस UI अपडेट कर दो
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
    navigate('/');
  };

  const handleLogout = async () => {
    await signOut(auth);
    eraseCookie('btv_user'); // 🍪 कुकी भी उड़ाओ
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserName(""); 
    navigate('/login');
    showToast("Logged out successfully!");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
          <i className="fa-solid fa-atom text-4xl text-teal-600"></i>
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
          <i className="fa-solid fa-circle-notch fa-spin text-teal-600"></i> Securing session...
        </div>
      </div>
    );
  }

  // Header ko public pages par bhi show karo (agar chahein to), par abhi ke liye auth par chhod dete hain
  const isPublicPage = location.pathname === '/' || location.pathname === '/donate';

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      
      {/* Premium Background Glow */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 🌟 NAYA: Agar user '/login' page par hai, to Header hide kar do! 🌟 */}
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

      <main className={`relative z-10 ${isPublicPage ? 'max-w-6xl mx-auto px-4 py-8 md:py-12' : ''}`}>
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? <LoginPage onLogin={handleLogin} showToast={showToast} /> : <Navigate to="/" />
          } />

          {/* 🔓 1. MASTER UNLOCK: Home Page Public kar diya gaya hai! */}
          <Route path="/" element={
            <HomePage 
              isAdmin={isAdmin} 
              isAuthenticated={isAuthenticated} // 🌟 NAYA: Isse pata chalega client logged in hai ya nahi
              userName={userName} // 🌟 NAYA: User ka naam dikhane ke liye
              donations={donations} 
              totalRaised={totalRaised} 
              targetAmount={targetAmount} 
              onNavigateToDonate={() => navigate('/donate')} 
            />
          } />

          <Route path="/about" element={<AboutPage />} />
          {/* 🔓 2. Donation Page Public */}
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
