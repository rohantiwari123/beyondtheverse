import React, { useState, useEffect } from 'react';
// 🌟 NAYA: Navigate import किया ताकि बिना लॉगिन के कोई आए तो उसे वापस भेज सकें
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import { db } from './firebase';

// Global Components
import Header from './components/Header';
import AdminModal from './components/AdminModal';
import Toast from './components/Toast';

// Pages
import LoginPage from './components/LoginPage/LoginPage'; // 🌟 NAYA IMPORT
import HomePage from './components/HomePage/HomePage';
import DonationPage from './components/DonationPage/DonationPage';

export default function App() {
  const navigate = useNavigate();
  
  // 🌟 NAYA: Authentication States (कौन है और लॉगिन है या नहीं) 🌟
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  // Admin Dashboard & Progress Bar Data
  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [targetAmount, setTargetAmount] = useState(50000);

  useEffect(() => {
    // Fetch Live Donations
    const unsubDonations = onSnapshot(collection(db, 'donations'), (snapshot) => {
      let total = 0;
      let list = [];
      snapshot.forEach(doc => {
        let data = doc.data();
        total += (Number(data.amount) || 0);
        list.push({ id: doc.id, ...data });
      });
      list.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
      setDonations(list);
      setTotalRaised(total);
    });

    // Fetch Goal Target
    const unsubConfig = onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      if (docSnap.exists()) setTargetAmount(docSnap.data().targetAmount);
    });

    return () => { unsubDonations(); unsubConfig(); };
  }, []);

  const showToast = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => setToast({ show: false, message: '', isSuccess: true }), 3500);
  };

  // 🌟 NAYA: Login और Logout Handlers 🌟
  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin'); // अगर role admin है, तो true, वरना false
    navigate('/'); // लॉगिन होते ही Home Page पर भेज दो
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login'); // लॉगआउट होते ही वापस Login Page पर भेज दो
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      
      {/* Premium Background Glow */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* 🌟 NAYA: Header सिर्फ तब दिखेगा जब यूजर Logged In हो 🌟 */}
      {isAuthenticated && (
        <Header 
          isAdmin={isAdmin} 
          onAdminClick={() => setIsAdminModalOpen(true)} 
          onLogout={handleLogout}
        />
      )}

      {/* Main Content Area */}
      <main className={`relative z-10 ${isAuthenticated ? 'max-w-6xl mx-auto px-4 py-8 md:py-12' : ''}`}>
        <Routes>
          
          {/* 🌟 NAYA: Login Route 🌟 */}
          <Route path="/login" element={
            !isAuthenticated ? <LoginPage onLogin={handleLogin} showToast={showToast} /> : <Navigate to="/" />
          } />

          {/* 🌟 NAYA: Protected Home Route 🌟 */}
          <Route path="/" element={
            isAuthenticated ? <HomePage onNavigateToDonate={() => navigate('/donate')} /> : <Navigate to="/login" />
          } />
          
          {/* 🌟 NAYA: Protected Donate Route 🌟 */}
          <Route path="/donate" element={
            isAuthenticated ? <DonationPage showToast={showToast} onBack={() => navigate('/')} /> : <Navigate to="/login" />
          } />
          
          {/* 🌟 CATCH-ALL ROUTE 🌟 */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </main>

      {/* 🌟 NAYA: Admin Dashboard सिर्फ तब खुलेगा जब यूजर सच में Admin हो 🌟 */}
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
