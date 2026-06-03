import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithCustomToken
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import emailjs from '@emailjs/browser';
import { loginBiometric } from '../../services/webauthnService';

export default function LoginPage({ showToast, initialAuthMode = 'login' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('user'); // Login Portal Selection
  const [authMode, setAuthMode] = useState('login');

  // Form States
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSignupRole, setSelectedSignupRole] = useState('user'); // Role selected during signup

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
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);

  const handleBiometricLogin = async () => {
    if (!email.trim()) {
      setEmailError("Email or Username is required for biometric login.");
      return;
    }

    setIsBiometricLoading(true);
    try {
      let loginEmail = email.trim();

      // Resolve username to email if necessary
      if (!loginEmail.includes('@')) {
        const q = query(collection(db, 'users'), where('username', '==', loginEmail.toLowerCase()));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setEmailError("No account found with this username!");
          setIsBiometricLoading(false);
          return;
        }
        loginEmail = querySnapshot.docs[0].data().email;
      }

      const token = await loginBiometric(loginEmail);
      const userCredential = await signInWithCustomToken(auth, token);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const actualRole = userDoc.data().role || 'user';
        if (actualRole !== activeTab) {
          await signOut(auth);
          showToast(`Access Denied! You are not registered as a ${activeTab.toUpperCase()}.`, false);
          setIsBiometricLoading(false);
          return;
        }
        showToast(`Logged in with Biometrics!`);
        navigate('/');
      }
    } catch (error) {
      console.error("Biometric Login Error:", error);
      showToast(error.message || "Biometric login failed.", false);
    } finally {
      setIsBiometricLoading(false);
    }
  };


  useEffect(() => {
    const urlMode = new URLSearchParams(location.search).get('mode');
    const requestedMode = urlMode || location.state?.authMode || initialAuthMode;
    const allowedModes = ['login', 'signup', 'forgot'];

    if (allowedModes.includes(requestedMode)) {
      setAuthMode(requestedMode);
      if (requestedMode !== 'signup') {
        setEmailOtpSent(false);
        setEnteredEmailOtp('');
      }
    }
  }, [initialAuthMode, location.search, location.state]);

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

  // 🌟 1. DYNAMIC PASSWORD RULES
  const passRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };
  const isPasswordValid = Object.values(passRules).every(Boolean);

  // 🌟 2. LIVE PASSWORD ERROR GENERATOR
  let signupPasswordError = '';
  if (authMode === 'signup' && password.length > 0 && !isPasswordValid) {
    if (!passRules.length) signupPasswordError = "Password is too short (min 8 chars).";
    else if (!passRules.uppercase) signupPasswordError = "Missing uppercase letter (A-Z).";
    else if (!passRules.lowercase) signupPasswordError = "Missing lowercase letter (a-z).";
    else if (!passRules.number) signupPasswordError = "Missing number (0-9).";
    else if (!passRules.special) signupPasswordError = "Missing special character (!@#$...).";
  }

  const currentPasswordError = authMode === 'login' ? loginPasswordError : signupPasswordError;

  // 🌟 DYNAMIC USERNAME RULES
  const userRules = {
    length: username.length >= 6 && username.length <= 20,
    format: /^[a-z0-9_]+$/.test(username),
    hasNumber: /[0-9]/.test(username),
    hasUnderscore: /_/.test(username),
  };

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
        role: selectedSignupRole,
        createdAt: Date.now()
      });

      showToast(`Welcome ${fullName}! Account created as ${selectedSignupRole.toUpperCase()}.`);
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
          const actualRole = userDoc.data().role || 'user';
          if (actualRole !== activeTab) {
            await signOut(auth);
            showToast(`Access Denied! You are not registered as a ${activeTab.toUpperCase()}.`, false);
            setIsLoading(false);
            return;
          }
          showToast(`Logged in as ${activeTab.toUpperCase()}!`);
          navigate('/');
        } else {
          showToast("User role data not found!", false);
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
      <div className="bg-white sm:border border-slate-200 px-6 py-8 sm:p-10 rounded-none sm:rounded-[2.5rem] w-full max-w-[32rem] min-h-[100dvh] sm:min-h-fit flex flex-col justify-center relative shadow-none">

        <div className="flex justify-center mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-[24px] sm:text-[28px] text-slate-900 font-cabinet font-black tracking-tighter leading-none">Beyond</span>
            <span className="text-[18px] sm:text-[22px] lowercase tracking-tighter leading-[0.85] text-slate-400 font-serif italic font-bold">The</span>
            <span className="text-[22px] sm:text-[26px] text-teal-600 font-cabinet font-black tracking-tight leading-none">Verse</span>
          </div>
        </div>

        {/* ROLE TABS FOR LOGIN PORTALS */}
        <div className="flex bg-slate-100 p-1 rounded-xl sm:rounded-2xl mb-8 overflow-x-auto no-scrollbar">
          {['user', 'teacher', 'examiner', 'admin'].map(role => (
            <button
              key={role}
              onClick={() => handleTabChange(role)}
              className={`flex-1 min-w-[80px] py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-lg sm:rounded-xl active:scale-[0.97] transition-all ${activeTab === role ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              {role === 'user' ? <i className="fa-solid fa-graduation-cap mr-1.5 opacity-70"></i> : role === 'teacher' ? <i className="fa-solid fa-chalkboard-user mr-1.5 opacity-70"></i> : role === 'examiner' ? <i className="fa-solid fa-file-signature mr-1.5 opacity-70"></i> : <i className="fa-solid fa-shield-halved mr-1.5 opacity-70"></i>}
              {role}
            </button>
          ))}
        </div>

        <form onSubmit={authMode === 'signup' ? (emailOtpSent ? handleVerifyEmailAndSignup : handleSendEmailOtp) : handleEmailAuth} className="grid grid-cols-1 gap-3 sm:gap-4" noValidate>

          <div className="text-center mb-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {authMode === 'login' && `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Portal`}
              {authMode === 'signup' && (emailOtpSent ? 'Verify OTP' : `Create Account`)}
              {authMode === 'forgot' && `Reset Password`}
            </h2>
            {authMode === 'login' && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Accessing workspace for {activeTab}s</p>}
          </div>

          {!emailOtpSent && (
            <>
              {authMode === 'signup' && (
                <>
                  {/* SIGNUP ROLE SELECTOR */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl mb-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Select your role</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['user', 'teacher', 'examiner'].map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setSelectedSignupRole(r)}
                          className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedSignupRole === r ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/20' : 'bg-white text-slate-400 border-slate-200 hover:border-teal-300 hover:text-slate-600'}`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

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

              {/* UPGRADED PASSWORD INPUT */}
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
                        setLoginPasswordError('');
                      }}
                      className={`${designVars.inputBase} ${currentPasswordError ? designVars.inputError : designVars.inputNormal} ${designVars.inputPassword}`}
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {authMode === 'signup' && password.length > 0 && isPasswordValid && (
                        <i className="fa-solid fa-circle-check text-emerald-500 text-sm animate-fade-in-up mr-1"></i>
                      )}
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 p-1">
                        <i className={`fa-solid text-sm ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

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
            className={`w-full text-white font-bold py-3 sm:py-4 px-6 rounded-xl text-sm sm:text-base active:scale-[0.98] flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest ${activeTab === 'admin' ? 'bg-slate-900 hover:bg-black shadow-lg shadow-slate-900/10' : 'bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/10'}`}
          >
            {isLoading ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
            : <>{authMode === 'login' ? `Sign In to ${activeTab}` : authMode === 'signup' ? (emailOtpSent ? 'Verify OTP' : 'Continue Signup') : 'Send Reset Link'}</>}
          </button>

          {authMode === 'login' && (
            <div className="relative flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or login with</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>
          )}

          {authMode === 'login' && (
            <button
              type="button"
              onClick={handleBiometricLogin}
              disabled={isLoading || isBiometricLoading || !email.trim()}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isBiometricLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-fingerprint text-teal-600"></i>}
              Biometric Access
            </button>
          )}
        </form>

        {/* Form Footer Links */}
        {authMode !== 'forgot' && activeTab !== 'admin' ? (
          <div className="text-center mt-8 text-sm text-slate-500 font-medium">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-teal-600 font-bold hover:text-teal-700 hover:underline underline-offset-4">
              {authMode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </div>
        ) : authMode === 'forgot' ? (
          <div className="text-center mt-8 text-sm text-slate-500 font-medium">
            Remembered your password? <button onClick={() => setAuthMode('login')} className="text-teal-600 font-bold hover:text-teal-700 hover:underline underline-offset-4">Back to Login</button>
          </div>
        ) : null}

        {/* ADMIN SECURITY NOTE */}
        {activeTab === 'admin' && authMode === 'login' && (
          <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
            <i className="fa-solid fa-shield-halved text-amber-500 mt-0.5"></i>
            <div>
              <p className="text-[11px] text-amber-800 font-bold uppercase tracking-tight">Security Protocol</p>
              <p className="text-[10px] text-amber-700/80 leading-relaxed mt-0.5">Admin access is restricted to authorized personnel only. All attempts are monitored.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
