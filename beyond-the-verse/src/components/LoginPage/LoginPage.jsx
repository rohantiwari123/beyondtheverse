import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export default function LoginPage({ onLogin, showToast }) {
  const [activeTab, setActiveTab] = useState('client'); 
  const [authMethod, setAuthMethod] = useState('email'); // 'email' या 'phone'
  const [authMode, setAuthMode] = useState('login'); 
  
  // Email States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Phone OTP States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);

  // 🌟 JADOO: Recaptcha Setup (useEffect से निकालकर यहाँ डाल दिया ताकि क्रैश न हो) 🌟
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          showToast("Recaptcha expired. Please try again.", false);
        }
      });
    }
  };

  // 🌟 Phone OTP भेजने का फंक्शन 🌟
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return showToast("Enter a valid 10-digit phone number!", false);
    
    setIsLoading(true);
    try {
      // 1. बटन क्लिक होने पर Recaptcha चालू करो
      setupRecaptcha();

      // भारत का कोड +91 जोड़ना ज़रूरी है
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      showToast("OTP sent successfully via SMS!");
    } catch (error) {
      console.error("SMS Error:", error);
      // अगर एरर आये तो Recaptcha को क्लियर करना पड़ता है ताकि दोबारा ट्राई कर सकें
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      showToast("Failed to send OTP. Try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  // 🌟 Phone OTP वेरीफाई करने का फंक्शन 🌟
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return showToast("Enter the 6-digit OTP!", false);

    setIsLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // चेक करें कि क्या यह नया यूजर है या पुराना
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // नया यूजर: डेटाबेस में सेव करें
        await setDoc(doc(db, 'users', user.uid), {
          name: fullName || "Phone User", // अगर नाम नहीं डाला तो डिफ़ॉल्ट नाम
          phone: user.phoneNumber,
          role: activeTab, 
          createdAt: Date.now()
        });
        showToast(`Account created successfully via Phone!`);
        onLogin(activeTab);
      } else {
        // पुराना यूजर: रोल चेक करें
        const userRole = userDoc.data().role;
        if (userRole !== activeTab) {
          await signOut(auth);
          showToast(`Access Denied! You are registered as ${userRole.toUpperCase()}.`, false);
          setIsLoading(false);
          return;
        }
        showToast(`Logged in successfully!`);
        onLogin(activeTab);
      }
    } catch (error) {
      showToast("Invalid OTP entered!", false);
    } finally {
      setIsLoading(false);
    }
  };

  // --- (Email Auth Logic) ---
  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pass)) return "Must contain at least one uppercase letter (A-Z).";
    if (!/[0-9]/.test(pass)) return "Must contain at least one number (0-9).";
    return ""; 
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault(); 
    if (authMode === 'signup' && !fullName.trim()) return showToast("Please enter your Full Name!", false);
    if (!email.trim()) return showToast("Please enter your Email Address!", false);
    if (authMode !== 'forgot') {
      if (!password) return showToast("Please enter your Password!", false);
      if (authMode === 'signup') {
        const errorMsg = validatePassword(password);
        if (errorMsg) { setPasswordError(errorMsg); return; }
      }
    }
    setPasswordError(''); 
    setIsLoading(true);

    try {
      if (authMode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          name: fullName, email: user.email, role: activeTab, createdAt: Date.now()
        });
        showToast(`Welcome ${fullName}! Account created successfully.`);
        onLogin(activeTab);
      } else if (authMode === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          if (userRole !== activeTab) {
            await signOut(auth); showToast(`Access Denied! Registered as ${userRole.toUpperCase()}.`, false); setIsLoading(false); return;
          }
          showToast(`Logged in successfully!`); onLogin(activeTab);
        } else { showToast("User role not found!", false); await signOut(auth); }
      } else if (authMode === 'forgot') {
        await sendPasswordResetEmail(auth, email); showToast("Password reset link sent!"); setAuthMode('login');
      }
    } catch (error) {
      let msg = "Authentication failed!";
      if (error.code === 'auth/email-already-in-use') msg = "Email already registered!";
      else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') msg = "Invalid Email or Password!";
      showToast(msg, false);
    } finally { setIsLoading(false); }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); setAuthMode('login'); setFullName(''); setEmail(''); setPassword(''); setPasswordError(''); setOtpSent(false); setOtp(''); setPhoneNumber('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 relative z-10">
      <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-teal-500/10 max-w-md w-full border border-white relative animate-fade-in-up">
        
        {/* Firebase Phone Auth के लिए अदृश्य Recaptcha Container */}
        <div id="recaptcha-container"></div>

        <div className="flex flex-col items-center justify-center mb-6 relative">
          <div className="h-14 w-14 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl flex items-center justify-center mb-3 shadow-inner border border-teal-100/50">
            <i className="fa-solid fa-atom text-3xl text-teal-600"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight text-center">
            Beyond The <span className="text-teal-600">Verse</span>
          </h1>
        </div>

        {/* 🌟 TABS (Client/Admin) 🌟 */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6 relative z-10">
          <button onClick={() => handleTabChange('client')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'client' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            <i className="fa-solid fa-users mr-1.5"></i> Client
          </button>
          <button onClick={() => handleTabChange('admin')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'admin' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            <i className="fa-solid fa-shield-halved mr-1.5"></i> Admin
          </button>
        </div>

        {/* 🌟 Email vs Phone Toggle 🌟 */}
        {authMode !== 'forgot' && (
          <div className="flex justify-center gap-4 mb-6">
            <button onClick={() => {setAuthMethod('email'); setOtpSent(false);}} className={`text-sm font-bold pb-1 border-b-2 transition-all ${authMethod === 'email' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
              <i className="fa-solid fa-envelope mr-1"></i> Email
            </button>
            <button onClick={() => setAuthMethod('phone')} className={`text-sm font-bold pb-1 border-b-2 transition-all ${authMethod === 'phone' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
              <i className="fa-solid fa-phone mr-1"></i> Phone OTP
            </button>
          </div>
        )}

        {/* ----------------- PHONE OTP FORM ----------------- */}
        {authMethod === 'phone' ? (
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4 animate-fade-in">
            <div className="text-center mb-4">
              <h2 className="text-lg font-extrabold text-slate-800">
                {otpSent ? 'Enter SMS OTP' : `Login/Signup with Phone`}
              </h2>
            </div>

            {!otpSent && authMode === 'signup' && (
              <div className="relative animate-fade-in">
                <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20" />
              </div>
            )}

            {!otpSent ? (
              <div className="relative">
                <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="tel" placeholder="Mobile Number (e.g. 9876543210)" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20" />
              </div>
            ) : (
              <div className="relative animate-fade-in">
                <i className="fa-solid fa-message absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="number" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-lg tracking-widest font-bold outline-none focus:ring-2 focus:ring-teal-500/20 text-center" />
              </div>
            )}

            <button type="submit" disabled={isLoading} className={`w-full text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2 ${activeTab === 'admin' ? 'bg-slate-800 hover:bg-slate-900' : 'bg-teal-600 hover:bg-teal-700'}`}>
              {isLoading ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</> : <>{otpSent ? 'Verify OTP & Login' : 'Send OTP via SMS'} <i className="fa-solid fa-arrow-right"></i></>}
            </button>
          </form>
        ) : (
          
        /* ----------------- EMAIL FORM ----------------- */
          <form onSubmit={handleEmailAuth} className="space-y-4 animate-fade-in" noValidate>
            <div className="text-center mb-4">
              <h2 className="text-lg font-extrabold text-slate-800">
                {authMode === 'login' && `Login to ${activeTab === 'admin' ? 'Admin' : 'Client'}`}
                {authMode === 'signup' && `Create ${activeTab === 'admin' ? 'Admin' : 'Client'} Account`}
                {authMode === 'forgot' && `Reset Password`}
              </h2>
            </div>

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
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); setPasswordError('');}} className={`w-full bg-slate-50 border ${passwordError ? 'border-rose-300' : 'border-slate-200'} pl-11 pr-12 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600">
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            )}

            {passwordError && authMode === 'signup' && <p className="text-xs font-bold text-rose-500"><i className="fa-solid fa-circle-exclamation"></i> {passwordError}</p>}

            {authMode === 'login' && (
              <div className="text-right">
                <button type="button" onClick={() => setAuthMode('forgot')} className="text-xs font-bold text-teal-600 hover:text-teal-700">Forgot Password?</button>
              </div>
            )}
            
            <button type="submit" disabled={isLoading} className={`w-full text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2 ${activeTab === 'admin' ? 'bg-slate-800 hover:bg-slate-900' : 'bg-teal-600 hover:bg-teal-700'}`}>
              {isLoading ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</> : <>{authMode === 'login' ? 'Secure Login' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}</>}
            </button>
          </form>
        )}

        {/* 🌟 TOGGLE LOGIN / SIGNUP 🌟 */}
        {authMode !== 'forgot' ? (
          <div className="text-center mt-6 text-sm font-medium text-slate-500">
            {authMode === 'login' ? "New here? " : "Already have an account? "}
            <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-teal-600 font-bold hover:underline">
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
