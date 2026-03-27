import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import { db } from './firebase'; // Check kijiye firebase.js isi folder me hai na

// Global Components
import Header from './components/Header';
import AdminModal from './components/AdminModal';
import Toast from './components/Toast';

// Pages - Paths ekdum dhyan se check kijiye
import HomePage from './components/HomePage/HomePage';
import DonationPage from './components/DonationPage/DonationPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  // 🌟 Admin Dashboard ke liye Data yahin fetch hoga 🌟
  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [targetAmount, setTargetAmount] = useState(50000);

  useEffect(() => {
    // 1. Live Donations fetch karna
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

    // 2. Goal Target fetch karna
    const unsubConfig = onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      if (docSnap.exists()) setTargetAmount(docSnap.data().targetAmount);
    });

    return () => { unsubDonations(); unsubConfig(); };
  }, []);

  const showToast = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => setToast({ show: false, message: '', isSuccess: true }), 3500);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <Header onAdminClick={() => setIsAdminModalOpen(true)} />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {currentPage === 'home' ? (
          <HomePage onNavigateToDonate={() => setCurrentPage('donate')} />
        ) : (
          <DonationPage showToast={showToast} onBack={() => setCurrentPage('home')} />
        )}
      </main>

      {/* 🌟 AdminModal ko saare data props de rahe hain 🌟 */}
      {isAdminModalOpen && (
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
