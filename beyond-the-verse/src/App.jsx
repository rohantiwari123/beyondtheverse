import React, { useState, useEffect } from 'react';
// 🌟 NAYA: useLocation import kiya gaya hai
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, doc, getDoc, setDoc } from 'firebase/firestore';
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

export default function App() {
  const navigate = useNavigate();
  const location = useLocation(); // 🌟 करंट पेज चेक करने के लिए
  
  // 🌟 Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState(""); 
  
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [targetAmount, setTargetAmount] = useState(50000);

  // 🌟 Auto-Login Check & Name Fetching (With AUTO-HEAL 🪄) 🌟
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
          } else {
            await setDoc(doc(db, 'users', user.uid), {
              name: "User", 
              email: user.email,
              role: 'client', 
              createdAt: Date.now()
            });
            
            setIsAuthenticated(true);
            setIsAdmin(false);
            setUserName("User");
          }
        } catch (error) {
          console.error("Database or Auth Error:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserName("");
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // Live Donations & Goal Fetch (Ab ye bina login ke bhi chalega taaki donation page par live goal dikhe)
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
  }, []); // 🌟 NAYA: Yahan se [isAuthenticated] hata diya taaki public page par bhi graph chale

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
          userName={userName} 
          onAdminClick={() => setIsAdminModalOpen(true)} 
          onLogout={handleLogout}
        />
      )}

      {/* 🌟 NAYA: Donation page par styling set karne ka logic */}
      <main className={`relative z-10 ${isAuthenticated || location.pathname === '/donate' ? 'max-w-6xl mx-auto px-4 py-8 md:py-12' : ''}`}>
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? <LoginPage onLogin={handleLogin} showToast={showToast} /> : <Navigate to="/" />
          } />

          <Route path="/" element={
            isAuthenticated ? (
              <HomePage 
                isAdmin={isAdmin} 
                donations={donations} 
                totalRaised={totalRaised} 
                targetAmount={targetAmount} 
                onNavigateToDonate={() => navigate('/donate')} 
              />
            ) : <Navigate to="/login" />
          } />
          
          {/* 🔓 🌟 MASTER UNLOCK: Donation Page sabke liye Public kar diya! 🌟 🔓 */}
          <Route path="/donate" element={
            <DonationPage showToast={showToast} onBack={() => navigate('/')} />
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
