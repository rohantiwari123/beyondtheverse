import React, { useState, useEffect } from 'react';
import BackButton from '../../components/common/BackButton'; // 👈 इम्पोर्ट करें

// Services
import { subscribeToTargetAmount, subscribeToDonations } from '../../services/firebaseServices';

// Components
import ProgressSection from '../../components/Donation/ProgressSection';
import DonationForm from '../../components/Donation/DonationForm';
import SupportersList from '../../components/Donation/SupportersList';
import PaymentModal from '../../components/Donation/PaymentModal';

export default function DonationPage({ showToast }) {
  const [targetAmount, setTargetAmount] = useState(50000); 
  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null);

  // 🌟 NAYA: Live Listeners using Services 🌟
  useEffect(() => {
    // 1. Goal Amount
    const unsubConfig = subscribeToTargetAmount((amount) => {
      setTargetAmount(amount);
    });

    // 2. Live Donations
    const unsubDonations = subscribeToDonations(({ list, total }) => {
      setDonations(list);
      setTotalRaised(total);
    });

    return () => {
      unsubConfig();
      unsubDonations();
    };
  }, []);

  const handleInitiateDonation = (data) => {
    setPendingDonation(data);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 pb-24 pt-4 sm:pt-10 selection:bg-zinc-200 selection:text-zinc-900 font-sans relative">
      
      {/* Main Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in transition-all duration-300">
        
        {/* HEADER */}
        <div className="px-4 sm:px-0 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="mb-4 sm:mb-6"><BackButton label="Back" /></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-1.5">Support Our Mission</h1>
            <p className="text-[13px] sm:text-sm font-medium text-zinc-500">Help us break boundaries between science and philosophy.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-zinc-400 bg-white border border-zinc-200 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm">
            <i className="fa-solid fa-shield-halved"></i> Secure & Encrypted
          </div>
        </div>

        {/* NEW UNIFIED LAYOUT CONTAINER */}
        <div className="w-full flex flex-col gap-6 sm:gap-8">
          
          {/* Top Progress Dashboard Card */}
          <div className="bg-white border-y sm:border border-zinc-200 sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
            {/* Subtle Top Background Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>
            
            <ProgressSection 
              totalRaised={totalRaised} 
              targetAmount={targetAmount} 
              donorCount={donations.length} 
            />
          </div>

          {/* Split Content: Form and Supporters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Donation Form Column */}
            <div className="lg:col-span-7 bg-white border-y sm:border border-zinc-200 sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                  <i className="fa-solid fa-bolt text-teal-500"></i> Make a Contribution
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-500">Fill in your details and choose an amount to generate your secure payment QR.</p>
              </div>
              
              <DonationForm onInitiate={handleInitiateDonation} />
            </div>

            {/* Supporters List Column */}
            <div className="lg:col-span-5 bg-white border-y sm:border border-zinc-200 sm:rounded-2xl shadow-sm lg:sticky lg:top-24 overflow-hidden flex flex-col lg:max-h-[600px]">
              <div className="p-6 sm:p-8 pb-0 sm:pb-0 mb-6 shrink-0">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-1.5 flex items-center gap-2">
                    <i className="fa-solid fa-users text-teal-600"></i> Supporters
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-500">The amazing people who believe in us.</p>
                </div>
              </div>
              
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex-1 overflow-y-auto no-scrollbar">
                <SupportersList donations={donations} />
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* PAYMENT MODAL */}
      {isPaymentModalOpen && (
        <PaymentModal 
          pendingDonation={pendingDonation} 
          onClose={() => setIsPaymentModalOpen(false)}
          showToast={showToast}
        />
      )}
    </div>
  );
}