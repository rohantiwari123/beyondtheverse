import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, query, doc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { auth, db } from '../../firebase'; // Path updated

// Components Imports
import Header from '../../components/Header';
import StorySection from '../../components/StorySection';
import ProgressSection from '../../components/ProgressSection';
import DonationForm from '../../components/DonationForm';
import PaymentModal from '../../components/PaymentModal';
import AdminModal from '../../components/AdminModal';
import Toast from '../../components/Toast';

export default function HomePage() {
  // States
  const [targetAmount, setTargetAmount] = useState(50000);
  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  
  // UI States
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  // Firebase Live Data Listeners
  useEffect(() => {
    signInAnonymously(auth).catch(console.error);

    const unsubConfig = onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().targetAmount) {
        setTargetAmount(docSnap.data().targetAmount);
      }
    });

    const unsubDonations = onSnapshot(query(collection(db, 'donations')), (snapshot) => {
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

    return () => {
      unsubConfig();
      unsubDonations();
    };
  }, []);

  const showToast = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => setToast({ show: false, message: '', isSuccess: true }), 3500);
  };

  const handleInitiateDonation = (data) => {
    setPendingDonation(data);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      
      {/* 🌟 PREMIUN BACKGROUND GLOW EFFECTS 🌟 */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-32 -right-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <Header onAdminClick={() => setIsAdminModalOpen(true)} />

      {/* Main Layout Grid */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* ================= LEFT COLUMN (Content) ================= */}
        <div className="lg:col-span-7 space-y-10">
          <StorySection />
        </div>

        {/* ================= RIGHT COLUMN (Action Panel) ================= */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-teal-500/10 border border-white/80 p-1.5 ring-1 ring-slate-900/5">
              <div className="bg-white rounded-[1.75rem] p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[100px] -z-10"></div>
                
                <ProgressSection totalRaised={totalRaised} targetAmount={targetAmount} donorCount={donations.length} />
                
                <div className="relative flex items-center py-8">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <i className="fa-solid fa-bolt text-amber-400"></i> Support the Setup
                  </span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>
                
                <DonationForm onInitiate={handleInitiateDonation} />
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Modals & Toasts */}
      {isPaymentModalOpen && (
        <PaymentModal pendingDonation={pendingDonation} onClose={() => setIsPaymentModalOpen(false)} showToast={showToast} />
      )}
      {isAdminModalOpen && (
        <AdminModal onClose={() => setIsAdminModalOpen(false)} donations={donations} totalRaised={totalRaised} targetAmount={targetAmount} showToast={showToast} />
      )}
      <Toast toast={toast} />
    </div>
  );
    }
