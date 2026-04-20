import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import emailjs from '@emailjs/browser'; 

export default function LoginPage({ showToast }) {
  const navigate = useNavigate(); 
  
  const [activeTab, setActiveTab] = useState('client'); 
  const [authMode, setAuthMode] = useState('login'); 
  
  // Form States
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Strict Error States
  const [usernameError, setUsernameError] = useState(''); 
  const [emailError, setEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState(''); 

  // Live Username Checking & Suggestions States
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null); 
  const [suggestedUsernames, setSuggestedUsernames] = useState([]); 

  // Email OTP States
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState('');
  const [enteredEmailOtp, setEnteredEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  // 🌟 DESIGN VARIABLES
  const designVars = {
    inputBase: "w-full bg-slate-50 border py-3 pl-10 rounded-xl text-sm sm:text-base outline-none focus:bg-white transition-colors",
    inputNormal: "border-slate-200 focus:ring-teal-500/20 focus:border-teal-500 pr-4",
    inputError: "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 pr-4 bg-rose-50/30",
    inputPassword: "pr-10", 
    iconBase: "absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors",
    iconNormal: "text-slate-400",
    iconError: "text-rose-500",
    errorMsg: "text-[10px] sm:text-[11px] text-rose-500 font-bold mt-1.5 ml-1 flex items-center gap-1.5 animate-fade-in-up"
  };

  // 🌟 1. DYNAMIC PASSWORD RULES (Untouched)
  const passRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };
  const isPasswordValid = Object.values(passRules).every(Boolean);

  // 🌟 2. LIVE PASSWORD ERROR GENERATOR (Synchronous)
  let signupPasswordError = '';
  if (authMode === 'signup' && password.length > 0 && !isPasswordValid) {
    if (!passRules.length) signupPasswordError = "Password is too short (min 8 chars).";
    else if (!passRules.uppercase) signupPasswordError = "Missing uppercase letter (A-Z).";
    else if (!passRules.lowercase) signupPasswordError = "Missing lowercase letter (a-z).";
    else if (!passRules.number) signupPasswordError = "Missing number (0-9).";
    else if (!passRules.special) signupPasswordError = "Missing special character (!@#$...).";
  }

  // Combine login error (from Firebase) and live signup error
  const currentPasswordError = authMode === 'login' ? loginPasswordError : signupPasswordError;

  // 🌟 DYNAMIC USERNAME RULES
  const userRules = {
    length: username.length >= 6 && username.length <= 20,
    format: /^[a-z0-9_]+$/.test(username), 
    hasNumber: /[0-9]/.test(username), 
    hasUnderscore: /_/.test(username), 
  };
  const isUsernameFormatValid = username.length > 0 && Object.values(userRules).every(Boolean);

  // 🌟 SMART SUGGESTION ENGINE
  const fetchSuggestions = async (baseInput) => {
    let safeBase = baseInput.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10);
    if (safeBase.length < 3) {
      let nameBase = fullName.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8);
      safeBase = nameBase.length >= 3 ? nameBase : "verse";
    }

    const suggestions = [
      `${safeBase}_${Math.floor(10 + Math.random() * 90)}`,
      `${safeBase}_${Math.floor(100 + Math.random() * 900)}`,
      `${safeBase}_${Math.floor(1000 + Math.random() * 9000)}`
    ];

    try {
      const q = query(collection(db, 'users'), where('username', 'in', suggestions));
      const snap = await getDocs(q);
      const takenUsernames = snap.docs.map(doc => doc.data().username);
      const availableSuggestions = suggestions.filter(s => !takenUsernames.includes(s));
      setSuggestedUsernames(availableSuggestions);
    } catch (error) {
      console.error("Suggestion Error:", error);
      setSuggestedUsernames(suggestions); 
    }
  };

  // 🌟 LIVE USERNAME CHECKER
  useEffect(() => {
    if (authMode !== 'signup') return;

    if (username.trim() === '') {
      setUsernameError('');
      setIsCheckingUsername(false);
      setIsUsernameAvailable(null);
      setSuggestedUsernames([]); 
      return;
    }

    let errorFound = '';
    if (!/^[a-z0-9_]+$/.test(username)) errorFound = "Only letters, numbers, and underscores allowed.";
    else if (username.length < 6) errorFound = "Username is too short (min 6 chars).";
    else if (username.length > 20) errorFound = "Username cannot exceed 20 characters.";
    else if (!/[0-9]/.test(username)) errorFound = "Must contain at least 1 number (0-9).";
    else if (!/_/.test(username)) errorFound = "Must contain at least 1 underscore (_).";

    if (errorFound) {
      setUsernameError(errorFound);
      setIsUsernameAvailable(false);
      const timeoutId = setTimeout(() => fetchSuggestions(username), 800);
      return () => clearTimeout(timeoutId);
    }

    setUsernameError(''); 
    setIsCheckingUsername(true);
    setIsUsernameAvailable(null);
    setSuggestedUsernames([]); 

    const timeoutId = setTimeout(async () => {
      try {
        const q = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setIsUsernameAvailable(true); 
          setSuggestedUsernames([]); 
        } else {
          setIsUsernameAvailable(false); 
          setUsernameError("Oops! This username is already taken.");
          fetchSuggestions(username); 
        }
      } catch (error) {
        console.error("Username check error:", error);
        setIsUsernameAvailable(null);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username, authMode, fullName]);


  const validateEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailStr.trim()) return "Email is required.";
    if (!emailRegex.test(emailStr)) return "Please enter a valid email format.";
    return "";
  };

  const handleSendEmailOtp = async (e) => {
    e.preventDefault();
    setEmailError('');
    setLoginPasswordError('');

    if (activeTab === 'admin') return showToast("Admin accounts cannot be created publicly!", false);
    if (!fullName.trim()) return showToast("Full Name is required!", false);
    if (usernameError || !isUsernameAvailable) return showToast("Please fix username errors first.", false);

    const eError = validateEmail(email);
    if (eError) {
      setEmailError(eError);
      return;
    }
    if (!isPasswordValid) return showToast("Please fulfill all password requirements.", false);
    
    setIsLoading(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedEmailOtp(newOtp);

    try {
      await emailjs.send(
        'service_2cyd1id', 
        'template_2x68oex', 
        { to_name: fullName, to_email: email, otp_code: newOtp },
        'HZr8hKSA5jdTwvwVK' 
      );
      setEmailOtpSent(true);
      showToast("6-Digit OTP sent to your email! Check inbox/spam.");
    } catch (error) {
      console.error("EmailJS Error:", error);
      showToast("Failed to send OTP email. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmailAndSignup = async (e) => {
    e.preventDefault();
    if (!enteredEmailOtp) return showToast("Please enter the OTP.", false);
    if (enteredEmailOtp !== generatedEmailOtp) return showToast("Invalid OTP! Please check your email.", false);

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        name: fullName, 
        username: username, 
        email: user.email, 
        role: 'client', 
        createdAt: Date.now()
      });
      
      showToast(`Welcome ${fullName}! Account created successfully.`);
      navigate('/');
    } catch (error) {
      console.error("Signup Error:", error);
      let msg = "Signup failed!";
      if (error.code === 'auth/email-already-in-use') {
        msg = "This email is already registered!";
        setEmailError(msg);
      }
      showToast(msg, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setEmailError('');
    setLoginPasswordError('');

    if (authMode !== 'login') {
      const eError = validateEmail(email);
      if (eError) {
        setEmailError(eError);
        return;
      }
    } else {
      if (!email.trim()) {
        setEmailError("Email or Username is required.");
        return;
      }
    }

    if (authMode === 'login' && !password) {
      setLoginPasswordError("Password is required.");
      return;
    }
    
    setIsLoading(true);
    try {
      if (authMode === 'login') {
        let loginEmail = email.trim(); 

        if (!loginEmail.includes('@')) {
          const q = query(collection(db, 'users'), where('username', '==', loginEmail.toLowerCase()));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            setEmailError("No account found with this username!");
            setIsLoading(false);
            return;
          }
          loginEmail = querySnapshot.docs[0].data().email;
        }

        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
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
          navigate('/');
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
      console.error("Authentication Error Details:", error);
      let msg = "Authentication failed!";
      
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        msg = "Invalid email/username or password!";
        setLoginPasswordError(msg);
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        msg = "No account found with these credentials!";
        setEmailError(msg);
      } else if (error.code === 'permission-denied') {
        msg = "Database Rules are blocking the login! Update Firestore Rules.";
        setEmailError(msg);
      } else {
        msg = error.message; 
      }
      showToast(msg, false);
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); 
    setAuthMode('login'); 
    setFullName(''); 
    setUsername('');
    setEmail(''); 
    setPassword(''); 
    setEmailError(''); 
    setLoginPasswordError(''); 
    setUsernameError('');
    setSuggestedUsernames([]); 
    setEmailOtpSent(false); 
    setEnteredEmailOtp(''); 
  };

  const RuleItem = ({ met, text }) => (
    <div className="flex items-center gap-1.5">
      <i className={`fa-solid ${met ? 'fa-circle-check text-teal-500' : 'fa-circle text-slate-200'} text-[11px] sm:text-xs transition-colors duration-200`}></i>
      <span className={`text-[11px] sm:text-xs ${met ? 'text-slate-800' : 'text-slate-500'} transition-colors duration-200 whitespace-nowrap`}>
        {text}
      </span>
    </div>
  );

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

        <div className="flex bg-slate-100 p-1 rounded-xl sm:rounded-2xl mb-6">
          <button 
            onClick={() => handleTabChange('client')} 
            className={`flex-1 py-2 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl active:scale-[0.97] transition-all ${activeTab === 'client' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            <i className="fa-solid fa-users mr-1.5 opacity-80"></i> Client
          </button>
          <button 
            onClick={() => handleTabChange('admin')} 
            className={`flex-1 py-2 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl active:scale-[0.97] transition-all ${activeTab === 'admin' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            <i className="fa-solid fa-shield-halved mr-1.5 opacity-80"></i> Admin
          </button>
        </div>

        <form onSubmit={authMode === 'signup' ? (emailOtpSent ? handleVerifyEmailAndSignup : handleSendEmailOtp) : handleEmailAuth} className="grid grid-cols-1 gap-3 sm:gap-4" noValidate>
          
          <div className="text-center mb-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {authMode === 'login' && `Welcome Back`}
              {authMode === 'signup' && (emailOtpSent ? 'Verify OTP' : `Create Account`)}
              {authMode === 'forgot' && `Reset Password`}
            </h2>
          </div>

          {!emailOtpSent && (
            <>
              {authMode === 'signup' && (
                <>
                  {/* Full Name */}
                  <div className="relative">
                    <i className={`${designVars.iconBase} ${designVars.iconNormal} fa-solid fa-user`}></i>
                    <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={`${designVars.inputBase} ${designVars.inputNormal}`} />
                  </div>

                  {/* USERNAME FIELD */}
                  <div className="flex flex-col">
                    <div className="relative">
                      <i className={`${designVars.iconBase} ${usernameError ? designVars.iconError : designVars.iconNormal} fa-solid fa-at`}></i>
                      <input 
                        type="text" 
                        placeholder="Username (e.g. rohan_07)" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))} 
                        className={`${designVars.inputBase} ${usernameError ? designVars.inputError : designVars.inputNormal}`} 
                      />
                      
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                        {username.length > 0 && isCheckingUsername && <i className="fa-solid fa-spinner fa-spin text-slate-400 text-sm"></i>}
                        {username.length > 0 && !isCheckingUsername && isUsernameAvailable === true && <i className="fa-solid fa-circle-check text-emerald-500 text-sm animate-fade-in-up"></i>}
                        {username.length > 0 && !isCheckingUsername && usernameError && <i className="fa-solid fa-circle-xmark text-rose-500 text-sm animate-fade-in-up"></i>}
                      </div>
                    </div>
                    
                    {usernameError && (
                      <span className={designVars.errorMsg}>
                        <i className="fa-solid fa-triangle-exclamation"></i> {usernameError}
                      </span>
                    )}
                    
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl transition-all">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5">
                        <RuleItem met={userRules.length} text="6 to 20 characters" />
                        <RuleItem met={userRules.format && username.length > 0} text="No spaces/special chars" />
                        <RuleItem met={userRules.hasNumber} text="At least 1 number (0-9)" />
                        <RuleItem met={userRules.hasUnderscore} text="At least 1 underscore (_)" />
                      </div>
                      
                      {username.length > 0 && isUsernameAvailable === true && (
                        <div className="mt-2 pt-2 border-t border-slate-200 animate-fade-in-up">
                          <p className="text-[11px] text-emerald-600 font-bold">✨ Awesome! Username is available.</p>
                        </div>
                      )}

                      {suggestedUsernames.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-200 animate-fade-in-up">
                          <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                            <i className="fa-solid fa-wand-magic-sparkles text-teal-500"></i> Try these available usernames:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {suggestedUsernames.map(sug => (
                              <button
                                key={sug}
                                type="button"
                                onClick={() => {
                                  setUsername(sug); 
                                  setUsernameError('');
                                  setSuggestedUsernames([]); 
                                }}
                                className="px-2.5 py-1 bg-white text-teal-700 text-[11px] sm:text-xs font-bold rounded-lg border border-teal-200 hover:bg-teal-50 hover:border-teal-300 active:scale-95 transition-all shadow-sm"
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              
             {/* Email Input */}
              <div className="flex flex-col">
                <div className="relative">
                  <i className={`${designVars.iconBase} ${emailError ? designVars.iconError : designVars.iconNormal} ${authMode === 'login' ? 'fa-solid fa-user' : 'fa-solid fa-envelope'}`}></i>
                  <input 
                    type={authMode === 'login' ? "text" : "email"} 
                    placeholder={authMode === 'login' ? "Email or Username" : "Email Address"} 
                    value={email} 
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }} 
                    className={`${designVars.inputBase} ${emailError ? designVars.inputError : designVars.inputNormal}`} 
                  />
                </div>
                {emailError && <span className={designVars.errorMsg}><i className="fa-solid fa-circle-exclamation"></i> {emailError}</span>}
              </div>
              
              {/* 🌟 UPGRADED PASSWORD INPUT (Live Errors) */}
              {authMode !== 'forgot' && (
                <div className="flex flex-col">
                  <div className="relative">
                    <i className={`${designVars.iconBase} ${currentPasswordError ? designVars.iconError : designVars.iconNormal} fa-solid fa-lock`}></i>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => {
                        setPassword(e.target.value); 
                        setLoginPasswordError(''); // Login wala error reset
                      }} 
                      className={`${designVars.inputBase} ${currentPasswordError ? designVars.inputError : designVars.inputNormal} ${designVars.inputPassword}`} 
                    />
                    
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {/* Live Success Indicator for Signup */}
                      {authMode === 'signup' && password.length > 0 && isPasswordValid && (
                        <i className="fa-solid fa-circle-check text-emerald-500 text-sm animate-fade-in-up mr-1"></i>
                      )}
                      
                      {/* Show/Hide Eye Button */}
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 p-1">
                        <i className={`fa-solid text-sm ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Live Error Message (Red Text below input) */}
                  {currentPasswordError && (
                    <span className={designVars.errorMsg}>
                      <i className="fa-solid fa-triangle-exclamation"></i> {currentPasswordError}
                    </span>
                  )}

                  {authMode === 'signup' && (
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mb-2">Password rules:</p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                        <RuleItem met={passRules.length} text="8+ characters" />
                        <RuleItem met={passRules.uppercase} text="Uppercase (A-Z)" />
                        <RuleItem met={passRules.lowercase} text="Lowercase (a-z)" />
                        <RuleItem met={passRules.number} text="Number (0-9)" />
                        <RuleItem met={passRules.special} text="Special (!@#$)" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* OTP Box */}
          {emailOtpSent && authMode === 'signup' && (
            <div className="relative">
              <i className={`${designVars.iconBase} ${designVars.iconNormal} fa-solid fa-message`}></i>
              <input type="number" placeholder="Enter 6-digit OTP" value={enteredEmailOtp} onChange={(e) => setEnteredEmailOtp(e.target.value)} className={`${designVars.inputBase} ${designVars.inputNormal} text-center tracking-[0.2em] text-lg font-medium`} />
            </div>
          )}

          {authMode === 'login' && (
            <div className="flex justify-end mt-1">
              <button type="button" onClick={() => setAuthMode('forgot')} className="text-xs font-semibold text-slate-500 hover:text-teal-600">Forgot Password?</button>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={
              isLoading || 
              emailError !== '' || 
              (authMode === 'signup' && (!isPasswordValid || usernameError !== '' || isUsernameAvailable === false || isCheckingUsername || (!emailOtpSent && fullName === '')))
            } 
            className={`w-full text-white font-semibold py-3 sm:py-3.5 px-6 rounded-xl text-sm sm:text-base active:scale-[0.98] flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === 'admin' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-teal-600 hover:bg-teal-700'}`}
          >
            {isLoading ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</> 
            : <>{authMode === 'login' ? 'Sign In' : authMode === 'signup' ? (emailOtpSent ? 'Verify OTP' : 'Continue') : 'Send Reset Link'}</>}
          </button>
        </form>

        {/* Form Footer Links */}
        {authMode !== 'forgot' && activeTab === 'client' ? (
          <div className="text-center mt-6 text-sm text-slate-500">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-teal-600 font-semibold hover:text-teal-700 hover:underline underline-offset-2">
              {authMode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </div>
        ) : authMode === 'forgot' ? (
          <div className="text-center mt-6 text-sm text-slate-500">
            Remembered your password? <button onClick={() => setAuthMode('login')} className="text-teal-600 font-semibold hover:text-teal-700 hover:underline underline-offset-2">Back to Login</button>
          </div>
        ) : null}

      </div>
    </div>
  );
}