import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export default function ForgotCredentialsPage({ showToast }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('password'); // 'password' or 'username'
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [recoveredUsername, setRecoveredUsername] = useState(null);

  const validateEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailStr.trim()) return "Email is required.";
    if (!emailRegex.test(emailStr)) return "Please enter a valid email format.";
    return "";
  };

  const handleRecover = async (e) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setIsLoading(true);
    setRecoveredUsername(null);
    setEmailError('');

    try {
      if (activeTab === 'password') {
        await sendPasswordResetEmail(auth, email.trim());
        showToast("Password reset link sent! Check your inbox.");
        navigate('/login');
      } else {
        // Recover Username
        const q = query(collection(db, 'users'), where('email', '==', email.trim().toLowerCase()));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setEmailError("No account found with this email.");
        } else {
          const userData = querySnapshot.docs[0].data();
          setRecoveredUsername(userData.username);
          showToast("Username found!");
        }
      }
    } catch (error) {
      console.error("Recovery Error:", error);
      let msg = "Recovery failed!";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        msg = "No account found with this email.";
        setEmailError(msg);
      } else {
        msg = error.message;
      }
      showToast(msg, false);
    } finally {
      setIsLoading(false);
    }
  };

  const designVars = {
    inputBase: "w-full bg-slate-50 border py-3 pl-10 rounded-xl text-sm sm:text-base outline-none focus:bg-white transition-colors",
    inputNormal: "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500 pr-4",
    inputError: "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 pr-4 bg-rose-50/30",
    iconBase: "absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors",
    iconNormal: "text-slate-400",
    iconError: "text-rose-500",
    errorMsg: "text-[10px] sm:text-[11px] text-rose-500 font-bold mt-1.5 ml-1 flex items-center gap-1.5 animate-fade-in-up"
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-0 sm:p-6 lg:p-8 relative z-10 bg-slate-50">
      <div className="bg-white sm:border border-slate-200 px-6 py-8 sm:p-10 rounded-none sm:rounded-[2.5rem] w-full max-w-[30rem] min-h-[100dvh] sm:min-h-fit flex flex-col justify-center relative shadow-none">
        
        <div className="flex justify-center mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-[24px] sm:text-[28px] text-slate-900 font-cabinet font-black tracking-tighter leading-none">Beyond</span>
            <span className="text-[18px] sm:text-[22px] lowercase tracking-tighter leading-[0.85] text-slate-400 font-serif italic font-bold">The</span>
            <span className="text-[22px] sm:text-[26px] text-teal-600 font-cabinet font-black tracking-tight leading-none">Verse</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Recover Credentials</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Lost access to your account?</p>
        </div>

        {/* RECOVERY TABS */}
        <div className="flex bg-slate-100 p-1 rounded-xl sm:rounded-2xl mb-8">
          <button
            onClick={() => { setActiveTab('password'); setRecoveredUsername(null); setEmailError(''); }}
            className={`flex-1 py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-all ${activeTab === 'password' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <i className="fa-solid fa-key mr-1.5 opacity-70"></i> Reset Password
          </button>
          <button
            onClick={() => { setActiveTab('username'); setRecoveredUsername(null); setEmailError(''); }}
            className={`flex-1 py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-all ${activeTab === 'username' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <i className="fa-solid fa-user-tag mr-1.5 opacity-70"></i> Find Username
          </button>
        </div>

        <form onSubmit={handleRecover} className="space-y-4" noValidate>
          <div className="flex flex-col">
            <div className="relative">
              <i className={`${designVars.iconBase} ${emailError ? designVars.iconError : designVars.iconNormal} fa-solid fa-envelope`}></i>
              <input
                type="email"
                placeholder="Registered Email Address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                className={`${designVars.inputBase} ${emailError ? designVars.inputError : designVars.inputNormal}`}
              />
            </div>
            {emailError && <span className={designVars.errorMsg}><i className="fa-solid fa-circle-exclamation"></i> {emailError}</span>}
          </div>

          {recoveredUsername && (
            <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl animate-fade-in-up">
              <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest mb-1">Your Registered Username</p>
              <p className="text-xl font-black text-teal-800 tracking-tight">@{recoveredUsername}</p>
              <p className="text-[10px] text-teal-600/70 mt-2">Use this to login alongside your password.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || (activeTab === 'username' && recoveredUsername)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base active:scale-[0.98] transition-all uppercase tracking-widest shadow-lg shadow-teal-600/10 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</> 
            : <>{activeTab === 'password' ? 'Send Reset Link' : 'Identify Account'}</>}
          </button>
        </form>

        <div className="text-center mt-10">
          <Link to="/login" className="text-xs sm:text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors">
            <i className="fa-solid fa-arrow-left mr-2"></i> Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
