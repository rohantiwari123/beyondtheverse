import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export default function LoginPage({ onLogin, showToast }) {
  const [activeTab, setActiveTab] = useState('client'); // 'client' या 'admin'
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgot'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 🌟 Authentication (Login & Signup) Logic 🌟
  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email) return showToast("Please enter your email!", false);
    if (authMode !== 'forgot' && !password) return showToast("Please enter your password!", false);

    setIsLoading(true);

    try {
      if (authMode === 'signup') {
        // 1. नया अकाउंट बनाना
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // 2. डेटाबेस में रोल (Role) सेव करना
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: activeTab, // जिस टैब से अकाउंट बनाया, वही रोल मिलेगा
          createdAt: Date.now()
        });
        
        showToast(`Account created successfully as ${activeTab.toUpperCase()}!`);
        onLogin(activeTab);

      } else if (authMode === 'login') {
        // 1. लॉगिन करना
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. चेक करना कि क्या यह सही पोर्टल (टैब) है?
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          
          if (userRole !== activeTab) {
            // गलत टैब से लॉगिन किया है! उसे बाहर निकालो (Sign Out)
            await signOut(auth);
            showToast(`Error: You are registered as ${userRole.toUpperCase()}, not ${activeTab.toUpperCase()}!`, false);
            setIsLoading(false);
            return;
          }
          
          showToast(`Logged in successfully as ${activeTab.toUpperCase()}!`);
          onLogin(activeTab);
        } else {
          showToast("User role not found! Contact support.", false);
        }
      } else if (authMode === 'forgot') {
        // पासवर्ड रिसेट करना
        await sendPasswordResetEmail(auth, email);
        showToast("Password reset email sent! Check your inbox.");
        setAuthMode('login');
      }
    } catch (error) {
      // Firebase के एरर मैसेज को सुंदर बनाना
      let msg = "Authentication failed!";
      if (error.code === 'auth/email-already-in-use') msg = "Email already registered!";
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') msg = "Invalid Email or Password!";
      if (error.code === 'auth/weak-password') msg = "Password must be at least 6 characters!";
      showToast(msg, false);
    } finally {
      setIsLoading(false);
    }
  };

  // टैब बदलते वक़्त फॉर्म रिसेट करें
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setAuthMode('login');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 relative z-10">
      
      {/* 🎨 Premium Glassmorphism Card */}
      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-teal-500/10 max-w-md w-full border border-white/60 relative animate-fade-in-up">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-[100px] pointer-events-none opacity-60"></div>

        {/* Logo & Title */}
        <div className="flex flex-col items-center justify-center mb-8 relative">
          <div className="h-16 w-16 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner border border-teal-100/50">
            <i className="fa-solid fa-atom text-4xl text-teal-600"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight text-center">
            Beyond The <span className="text-teal-600">Verse</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mt-2">Secure Portal</p>
        </div>

        {/* 🌟 TABS (Client vs Admin) 🌟 */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl mb-8 relative z-10">
          <button 
            onClick={() => handleTabChange('client')}
            className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'client' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            <i className="fa-solid fa-users mr-1.5"></i> Client Portal
          </button>
          <button 
            onClick={() => handleTabChange('admin')}
            className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'admin' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            <i className="fa-solid fa-shield-halved mr-1.5"></i> Admin Portal
          </button>
        </div>

        {/* 🌟 DYNAMIC FORM 🌟 */}
        <form onSubmit={handleAuth} className="space-y-4 animate-fade-in relative z-10">
          
          {/* Header Text */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              {authMode === 'login' && `Login to ${activeTab.toUpperCase()}`}
              {authMode === 'signup' && `Create ${activeTab.toUpperCase()} Account`}
              {authMode === 'forgot' && `Reset Password`}
            </h2>
          </div>

          <div className="relative">
            <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="email" required placeholder="Email Address" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
          
          {authMode !== 'forgot' && (
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="password" required placeholder="Password" 
                value={password} onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
          )}

          {authMode === 'login' && (
            <div className="text-right">
              <button type="button" onClick={() => setAuthMode('forgot')} className="text-xs font-bold text-teal-600 hover:text-teal-700">
                Forgot Password?
              </button>
            </div>
          )}
          
          <button 
            type="submit" disabled={isLoading}
            className={`w-full text-white font-extrabold py-4 px-6 rounded-xl transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 outline-none disabled:opacity-70 mt-2 ${activeTab === 'admin' ? 'bg-slate-800 hover:bg-slate-900 shadow-slate-800/20' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/30'}`}
          >
            {isLoading ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
            ) : (
              <>
                {authMode === 'login' && 'Secure Login'}
                {authMode === 'signup' && 'Create Account'}
                {authMode === 'forgot' && 'Send Reset Link'}
                <i className={`fa-solid ${authMode === 'forgot' ? 'fa-paper-plane' : 'fa-arrow-right'}`}></i>
              </>
            )}
          </button>
        </form>

        {/* 🌟 TOGGLE LOGIN / SIGNUP 🌟 */}
        {authMode !== 'forgot' ? (
          <div className="text-center mt-6 text-sm font-medium text-slate-500 relative z-10">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-teal-600 font-bold hover:underline"
            >
              {authMode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </div>
        ) : (
          <div className="text-center mt-6 text-sm font-medium text-slate-500 relative z-10">
            Remember your password? <button onClick={() => setAuthMode('login')} className="text-teal-600 font-bold hover:underline">Back to Login</button>
          </div>
        )}

      </div>
    </div>
  );
        }
