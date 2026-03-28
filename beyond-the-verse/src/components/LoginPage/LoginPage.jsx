import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  sendEmailVerification, // 🌟 NAYA: Email Verification के लिए
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export default function LoginPage({ onLogin, showToast }) {
  const [activeTab, setActiveTab] = useState('client'); 
  const [authMode, setAuthMode] = useState('login'); 
  
  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Password Validate
  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pass)) return "Must contain at least one uppercase letter (A-Z).";
    if (!/[0-9]/.test(pass)) return "Must contain at least one number (0-9).";
    return ""; 
  };

  const handleAuth = async (e) => {
    e.preventDefault(); 
    
    if (authMode === 'signup' && !fullName.trim()) return showToast("Please enter your Full Name!", false);
    if (!email.trim()) return showToast("Please enter your Email Address!", false);
    
    if (authMode !== 'forgot') {
      if (!password) return showToast("Please enter your Password!", false);
      if (authMode === 'signup') {
        const errorMsg = validatePassword(password);
        if (errorMsg) {
          setPasswordError(errorMsg);
          return;
        }
      }
    }

    setPasswordError(''); 
    setIsLoading(true);

    try {
      if (authMode === 'signup') {
        // 1. नया अकाउंट बनाना
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // 2. डेटाबेस में डेटा सेव करना
        await setDoc(doc(db, 'users', user.uid), {
          name: fullName,
          email: user.email,
          role: activeTab, 
          createdAt: Date.now()
        });

        // 🌟 JADOO: 3. वेरिफिकेशन ईमेल भेजना 🌟
        await sendEmailVerification(user);
        
        // 4. सिक्योरिटी के लिए तुरंत लॉगआउट कर देना ताकि वो बिना वेरीफाई किये अंदर न जा पाए
        await signOut(auth);
        
        showToast(`Success! A verification link has been sent to ${email}. Please check your inbox/spam folder.`);
        
        // फॉर्म को वापस लॉगिन मोड में डाल दो
        setAuthMode('login');
        setPassword(''); 

      } else if (authMode === 'login') {
        // 1. लॉगिन करना
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 🌟 JADOO: 2. चेक करना कि क्या ईमेल वेरीफाई हो गया है? 🌟
        if (!user.emailVerified) {
          await signOut(auth); // अगर नहीं, तो बाहर निकाल दो
          showToast("Access Denied! Please verify your email first. Check your inbox/spam folder.", false);
          setIsLoading(false);
          return;
        }

        // 3. रोल चेक करना (Admin/Client)
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          
          if (userRole !== activeTab) {
            await signOut(auth);
            showToast(`Access Denied! You are registered as ${userRole.toUpperCase()}.`, false);
            setIsLoading(false);
            return;
          }
          showToast(`Logged in successfully!`);
          onLogin(activeTab);
        } else {
          showToast("User role not found in database!", false);
          await signOut(auth);
        }
      } else if (authMode === 'forgot') {
        await sendPasswordResetEmail(auth, email);
        showToast("Password reset link sent to your email!");
        setAuthMode('login');
      }
    } catch (error) {
      let msg = "Authentication failed!";
      if (error.code === 'auth/email-already-in-use') msg = "This email is already registered!";
      else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') msg = "Invalid Email or Password!";
      else if (error.code === 'auth/too-many-requests') msg = "Too many attempts. Try again later.";
      showToast(msg, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setAuthMode('login');
    setFullName('');
    setEmail('');
    setPassword('');
    setPasswordError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 relative z-10">
      <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-teal-500/10 max-w-md w-full border border-white relative animate-fade-in-up">
        
        <div className="flex flex-col items-center justify-center mb-6 relative">
          <div className="h-14 w-14 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl flex items-center justify-center mb-3 shadow-inner border border-teal-100/50">
            <i className="fa-solid fa-atom text-3xl text-teal-600"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight text-center">
            Beyond The <span className="text-teal-600">Verse</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl mb-6 relative z-10">
          <button 
            onClick={() => handleTabChange('client')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'client' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <i className="fa-solid fa-users mr-1.5"></i> Client
          </button>
          <button 
            onClick={() => handleTabChange('admin')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'admin' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <i className="fa-solid fa-shield-halved mr-1.5"></i> Admin
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4 animate-fade-in" noValidate>
          
          <div className="text-center mb-4">
            <h2 className="text-lg font-extrabold text-slate-800">
              {authMode === 'login' && `Login to ${activeTab === 'admin' ? 'Admin Portal' : 'Client Portal'}`}
              {authMode === 'signup' && `Create ${activeTab === 'admin' ? 'Admin' : 'Client'} Account`}
              {authMode === 'forgot' && `Reset Password`}
            </h2>
          </div>

          {authMode === 'signup' && (
            <div className="relative animate-fade-in">
              <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" placeholder="Full Name" 
                value={fullName} onChange={(e) => setFullName(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
          )}

          <div className="relative">
            <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="email" placeholder="Email Address" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
          
          {authMode !== 'forgot' && (
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value);
                  if(passwordError) setPasswordError(''); 
                }} 
                className={`w-full bg-slate-50 border ${passwordError ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/20'} pl-11 pr-12 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 transition-all`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          )}

          {passwordError && authMode === 'signup' && (
            <p className="text-xs font-bold text-rose-500 animate-fade-in flex items-start gap-1">
              <i className="fa-solid fa-circle-exclamation mt-0.5"></i> {passwordError}
            </p>
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
            className={`w-full text-white font-extrabold py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 outline-none disabled:opacity-70 mt-2 ${activeTab === 'admin' ? 'bg-slate-800 hover:bg-slate-900 shadow-slate-800/20' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/30'}`}
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

        {authMode !== 'forgot' ? (
          <div className="text-center mt-6 text-sm font-medium text-slate-500">
            {authMode === 'login' ? "New here? " : "Already have an account? "}
            <button 
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-teal-600 font-bold hover:underline"
            >
              {authMode === 'login' ? 'Create an Account' : 'Login'}
            </button>
          </div>
        ) : (
          <div className="text-center mt-6 text-sm font-medium text-slate-500">
            Remember your password? <button onClick={() => setAuthMode('login')} className="text-teal-600 font-bold hover:underline">Back to Login</button>
          </div>
        )}

      </div>
    </div>
  );
          }
