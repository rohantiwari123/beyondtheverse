import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import emailjs from '@emailjs/browser'; 

export default function LoginPage({ onLogin, showToast }) {
  const [activeTab, setActiveTab] = useState('client'); 
  const [authMode, setAuthMode] = useState('login'); 
  
  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // 🌟 Email OTP States 🌟
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState('');
  const [enteredEmailOtp, setEnteredEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  // --- EMAIL LOGIC ---
  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pass)) return "Must contain at least one uppercase letter (A-Z).";
    if (!/[0-9]/.test(pass)) return "Must contain at least one number (0-9).";
    return ""; 
  };

  // 🌟 Signup के लिए Email OTP भेजना 🌟
  const handleSendEmailOtp = async (e) => {
    e.preventDefault();
    
    // 🚨 MASTER SECURITY LOCK: कोई एडमिन साइनअप नहीं कर सकता 🚨
    if (activeTab === 'admin') {
      return showToast("Admin accounts cannot be created publicly!", false);
    }

    if (!fullName.trim() || !email.trim() || !password) return showToast("Please fill all fields!", false);
    
    const errorMsg = validatePassword(password);
    if (errorMsg) { setPasswordError(errorMsg); return; }
    
    setIsLoading(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedEmailOtp(newOtp);

    try {
      await emailjs.send(
        'service_wdi6gpu', // अपनी असली Service ID
        'template_2x68oex', // अपनी असली Template ID
        { to_name: fullName, to_email: email, otp_code: newOtp },
        'HZr8hKSA5jdTwvwVK' // अपनी असली Public Key
      );
      
      setEmailOtpSent(true);
      showToast("6-Digit OTP sent to your email! Check inbox/spam.");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("EmailJS Error: " + JSON.stringify(error));
      showToast("Failed to send OTP email. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  // 🌟 Email OTP वेरीफाई करना और अकाउंट बनाना 🌟
  const handleVerifyEmailAndSignup = async (e) => {
    e.preventDefault();
    if (enteredEmailOtp !== generatedEmailOtp) return showToast("Invalid OTP! Please check your email.", false);

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        name: fullName, 
        email: user.email, 
        role: 'client', // 🚨 SECURITY: अब हमेशा 'client' ही सेव होगा (ताकि हैकर्स भी एडमिन न बन पाएं)
        createdAt: Date.now()
      });
      
      showToast(`Welcome ${fullName}! Account created successfully.`);
      onLogin('client');
    } catch (error) {
      let msg = "Signup failed!";
      if (error.code === 'auth/email-already-in-use') msg = "This email is already registered!";
      showToast(msg, false);
    } finally {
      setIsLoading(false);
    }
  };

  // 🌟 Login और Forgot Password फंक्शन 🌟
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email.trim()) return showToast("Please enter your Email!", false);
    
    setIsLoading(true);
    try {
      if (authMode === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          if (userDoc.data().role !== activeTab) { 
            await signOut(auth); 
            showToast(`Access Denied! You are not registered as an ${activeTab.toUpperCase()}.`, false); 
            setIsLoading(false); 
            return; 
          }
          showToast(`Logged in successfully!`); 
          onLogin(activeTab);
        } else { 
          showToast("User role not found!", false); 
          await signOut(auth); 
        }
      } else if (authMode === 'forgot') {
        await sendPasswordResetEmail(auth, email); 
        showToast("Password reset link sent to your email!"); 
        setAuthMode('login');
      }
    } catch (error) {
      let msg = "Authentication failed!";
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        msg = "Invalid Email or Password!";
      }
      showToast(msg, false);
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); 
    setAuthMode('login'); // 🌟 हमेशा लॉगिन मोड में लाओ
    setFullName(''); setEmail(''); setPassword(''); setPasswordError(''); 
    setEmailOtpSent(false); setEnteredEmailOtp(''); 
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

        {/* 🌟 TABS (Client/Admin) 🌟 */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8 relative z-10">
          <button onClick={() => handleTabChange('client')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'client' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            <i className="fa-solid fa-users mr-1.5"></i> Client
          </button>
          <button onClick={() => handleTabChange('admin')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'admin' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            <i className="fa-solid fa-shield-halved mr-1.5"></i> Admin
          </button>
        </div>

        {/* ----------------- EMAIL FORM ----------------- */}
        <form onSubmit={authMode === 'signup' ? (emailOtpSent ? handleVerifyEmailAndSignup : handleSendEmailOtp) : handleEmailAuth} className="space-y-4 animate-fade-in" noValidate>
          <div className="text-center mb-4">
            <h2 className="text-lg font-extrabold text-slate-800">
              {authMode === 'login' && `Login to ${activeTab === 'admin' ? 'Admin' : 'Client'}`}
              {authMode === 'signup' && (emailOtpSent ? 'Verify Email OTP' : `Create Client Account`)}
              {authMode === 'forgot' && `Reset Password`}
            </h2>
          </div>

          {!emailOtpSent && (
            <>
              {authMode === 'signup' && (
                <div className="relative animate-fade-in">
                  <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20" />
                </div>
              )}
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20" />
              </div>
              
              {authMode !== 'forgot' && (
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); setPasswordError('');}} className={`w-full bg-slate-50 border ${passwordError ? 'border-rose-300' : 'border-slate-200'} pl-11 pr-12 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:border-teal-500`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600">
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              )}
              {passwordError && authMode === 'signup' && <p className="text-xs font-bold text-rose-500"><i className="fa-solid fa-circle-exclamation"></i> {passwordError}</p>}
            </>
          )}

          {emailOtpSent && authMode === 'signup' && (
            <div className="relative animate-fade-in">
              <i className="fa-solid fa-message absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="number" placeholder="Enter 6-digit Email OTP" value={enteredEmailOtp} onChange={(e) => setEnteredEmailOtp(e.target.value)} className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-lg tracking-widest font-bold outline-none focus:ring-2 focus:ring-teal-500/20 text-center" />
            </div>
          )}

          {authMode === 'login' && (
            <div className="text-right">
              <button type="button" onClick={() => setAuthMode('forgot')} className="text-xs font-bold text-teal-600 hover:text-teal-700">Forgot Password?</button>
            </div>
          )}
          
          <button type="submit" disabled={isLoading} className={`w-full text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2 ${activeTab === 'admin' ? 'bg-slate-800 hover:bg-slate-900' : 'bg-teal-600 hover:bg-teal-700'}`}>
            {isLoading ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</> 
            : <>{authMode === 'login' ? 'Secure Login' : authMode === 'signup' ? (emailOtpSent ? 'Verify OTP & Create Account' : 'Send OTP to Email') : 'Send Reset Link'}</>}
          </button>
        </form>

        {/* 🚨 UI SECURITY: Admin टैब में Signup का बटन ही मत दिखाओ 🚨 */}
        {authMode !== 'forgot' && activeTab === 'client' ? (
          <div className="text-center mt-6 text-sm font-medium text-slate-500">
            {authMode === 'login' ? "New here? " : "Already have an account? "}
            <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-teal-600 font-bold hover:underline">
              {authMode === 'login' ? 'Create an Account' : 'Login'}
            </button>
          </div>
        ) : authMode === 'forgot' ? (
          <div className="text-center mt-6 text-sm font-medium text-slate-500">
            Remember your password? <button onClick={() => setAuthMode('login')} className="text-teal-600 font-bold hover:underline">Back to Login</button>
          </div>
        ) : null}

      </div>
    </div>
  );
      }
