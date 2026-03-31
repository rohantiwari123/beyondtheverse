import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, doc } from 'firebase/firestore'; 
import { db } from './firebase'; 

// 🌟 NAYA: Context hook import kiya (Saara login logic yahan se aayega)
import { useAuth } from './context/AuthContext';

// Components & Pages
import Header from './components/Layout/Header';
import Toast from './components/Toast';
import AdminModal from './components/AdminModal'; 

import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/Home/HomePage';
import DonationPage from './pages/Donate/DonationPage';
import AboutPage from './pages/About/AboutPage';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation(); 

  // 🌟 JADOO: Ab sirf 1 line me saara auth data mil gaya!
  const { isAuthenticated, isAdmin, userName, logout } = useAuth();

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [targetAmount, setTargetAmount] = useState(50000);

  // Live Donations & Goal Fetch (Sirf UI ke liye)
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

  const handleLogout = async () => {
    await logout(); // Context wala logout call kiya
    navigate('/login');
    showToast("Logged out successfully!");
  };

  const isPublicPage = location.pathname === '/' || location.pathname === '/donate' || location.pathname === '/about';

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header Sirf Login Page pe Hide Hoga */}
      {location.pathname !== '/login' && (
        <Header onAdminClick={() => setIsAdminModalOpen(true)} />
      )}   {/* 🌟 YAHAN PAR YE )} LAGANA HAI 🌟 */}

      <main className={`relative z-10 ${isPublicPage ? 'max-w-7xl mx-auto px-2 sm:px-4 py-6 md:py-10' : ''}`}>
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? <LoginPage showToast={showToast} /> : <Navigate to="/" />
          } />

          <Route path="/" element={
            <HomePage 
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
