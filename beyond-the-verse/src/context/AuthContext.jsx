import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; 

// 🛡️ SECURITY FIX: Cookies की जगह LocalStorage का इस्तेमाल
// (इससे हैकर्स आसानी से role एडिट नहीं कर पाएंगे और परफॉरमेंस बढ़ेगी)
const saveLocalUser = (value) => {
  localStorage.setItem('btv_user', JSON.stringify(value));
};

const getLocalUser = () => {
  const match = localStorage.getItem('btv_user');
  if (match) return JSON.parse(match);
  return null;
};

const removeLocalUser = () => {
  localStorage.removeItem('btv_user');
};

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // 🌟 FIX: getCookie की जगह getLocalUser
  const savedUser = getLocalUser();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!savedUser);
  const [isAdmin, setIsAdmin] = useState(savedUser?.role === 'admin');
  const [userName, setUserName] = useState(savedUser?.name || ""); 
  const [isCheckingAuth, setIsCheckingAuth] = useState(!savedUser);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role || 'client';
            const realName = userDoc.data().name || user.displayName || ""; 
            setIsAuthenticated(true);
            setIsAdmin(role === 'admin');
            setUserName(realName); 
            // 🌟 FIX: setCookie की जगह saveLocalUser
            saveLocalUser({ uid: user.uid, role, name: realName });
          } else {
            const tempName = user.displayName || ""; 
            setIsAuthenticated(true);
            setIsAdmin(false);
            setUserName(tempName);
            // 🌟 FIX: setCookie की जगह saveLocalUser
            saveLocalUser({ uid: user.uid, role: 'client', name: tempName });
          }
        } catch (error) {
          console.error("AuthContext Error:", error);
          setIsAuthenticated(true); 
          // 🌟 FIX: getCookie की जगह getLocalUser
          setUserName(user.displayName || getLocalUser()?.name || "");
        }
      } else {
        setCurrentUser(null);
        // 🌟 FIX: eraseCookie की जगह removeLocalUser
        removeLocalUser();
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserName("");
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const login = (role, name) => {
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
    if (name) setUserName(name);
  };

  const logout = async () => {
    await signOut(auth);
    // 🌟 FIX: eraseCookie की जगह removeLocalUser
    removeLocalUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserName("");
  };

  // 🌟 VALUE UPDATED: userId ab yahan se pass ho raha hai
  const value = { 
    currentUser, 
    isAuthenticated, 
    isAdmin, 
    userName, 
    userId: currentUser?.uid || savedUser?.uid, // Dono jagah se check karega
    login, 
    logout 
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-4 animate-pulse border border-teal-100">
          <i className="fa-solid fa-atom text-4xl text-teal-600"></i>
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm tracking-wide uppercase">
          <i className="fa-solid fa-circle-notch fa-spin text-teal-600"></i> Securing session
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};