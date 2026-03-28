
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // ध्यान दें: पथ सही होना चाहिए

export default function LoginPage({ onLogin, showToast }) {
  const [activeTab, setActiveTab] = useState('client'); // 'client' या 'admin'
  
  // Admin Login के लिए State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 🌟 Admin Login Logic 🌟
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast("Please enter email and password", false);
      return;
    }

    setIsLoading(true);
    try {
      // Firebase से असली ऑथेंटिकेशन
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Admin Logged In Successfully!");
      onLogin('admin'); // App.jsx को सिग्नल भेज रहे हैं कि 'Admin' आ गया
    } catch (error) {
      showToast("Invalid Email or Password!", false);
    } finally {
      setIsLoading(false);
    }
  };

  // 🌟 Client Entry Logic 🌟
  const handleClientEntry = () => {
    showToast("Welcome to Beyond The Verse!");
    onLogin('client'); // App.jsx को सिग्नल भेज रहे हैं कि 'Client' आ गया
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 relative z-10">
      
      {/* 🎨 Premium Glassmorphism Card */}
      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-teal-500/10 max-w-md w-full border border-white/60 relative animate-fade-in-up">
        
        {/* Decorative corner shape */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-[100px] pointer-events-none opacity-60"></div>

        {/* Logo & Title */}
        <div className="flex flex-col items-center justify-center mb-8 relative">
          <div className="h-16 w-16 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner border border-teal-100/50">
            <i className="fa-solid fa-atom text-4xl text-teal-600"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight text-center">
            Beyond The <span className="text-teal-600">Verse</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mt-2">Access Portal</p>
        </div>

        {/* 🌟 TABS (Client vs Admin) 🌟 */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl mb-8 relative z-10">
          <button 
            onClick={() => setActiveTab('client')}
            className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'client' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            <i className="fa-solid fa-users mr-1.5"></i> Supporter
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'admin' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            <i className="fa-solid fa-shield-halved mr-1.5"></i> Admin
          </button>
        </div>

        {/* 🌟 TAB CONTENT 🌟 */}
        <div className="relative min-h-[200px]">
          {activeTab === 'client' ? (
            
            // --- CLIENT VIEW ---
            <div className="text-center space-y-6 animate-fade-in absolute inset-0">
              <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-4">
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Welcome to our open platform. Join us in breaking the boundaries between science and philosophy.
                </p>
              </div>
              <button 
                onClick={handleClientEntry}
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 outline-none group"
              >
                Enter Platform <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>

          ) : (
            
            // --- ADMIN VIEW ---
            <form onSubmit={handleAdminLogin} className="space-y-4 animate-fade-in absolute inset-0 w-full">
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="email" 
                  required 
                  placeholder="Admin Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
              
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="password" 
                  required 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-extrabold py-4 px-6 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-slate-800/20 flex items-center justify-center gap-2 outline-none disabled:bg-slate-600 mt-2"
              >
                {isLoading ? (
                  <><i className="fa-solid fa-circle-notch fa-spin"></i> Verifying...</>
                ) : (
                  <>Secure Login <i className="fa-solid fa-shield-check"></i></>
                )}
              </button>
            </form>

          )}
        </div>

      </div>
    </div>
  );
        }
