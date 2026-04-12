import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore'; // 🌟 FIX: getDoc ki jagah onSnapshot
import { auth, db } from '../firebase'; 

// 🛡️ SECURITY FIX: LocalStorage Helper Functions
const saveLocalUser = (value) => localStorage.setItem('btv_user', JSON.stringify(value));
const getLocalUser = () => JSON.parse(localStorage.getItem('btv_user')) || null;
const removeLocalUser = () => localStorage.removeItem('btv_user');

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const savedUser = getLocalUser();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!savedUser);
  const [isAdmin, setIsAdmin] = useState(savedUser?.role === 'admin');
  const [userName, setUserName] = useState(savedUser?.name || ""); 
  const [isCheckingAuth, setIsCheckingAuth] = useState(!savedUser);

  useEffect(() => {
    let unsubscribeSnapshot = null; // 🌟 Firestore listener ko rokne ke liye

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        
        // 🚀 PRO UPGRADE: Real-time Database Listener
        // Ab agar database mein role ya name change hoga, toh website par instantly update hoga (bina refresh)
        unsubscribeSnapshot = onSnapshot(doc(db, 'users', user.uid), 
          (userDoc) => {
            if (userDoc.exists()) {
              const role = userDoc.data().role || 'client';
              const realName = userDoc.data().name || user.displayName || ""; 
              
              setIsAuthenticated(true);
              setIsAdmin(role === 'admin');
              setUserName(realName); 
              
              saveLocalUser({ uid: user.uid, role, name: realName });
            } else {
              const tempName = user.displayName || ""; 
              setIsAuthenticated(true);
              setIsAdmin(false);
              setUserName(tempName);
              saveLocalUser({ uid: user.uid, role: 'client', name: tempName });
            }
            setIsCheckingAuth(false);
          }, 
          (error) => {
            console.error("AuthContext Snapshot Error:", error);
            // Fallback agar network chala jaye
            setIsAuthenticated(true); 
            setUserName(user.displayName || getLocalUser()?.name || "");
            setIsCheckingAuth(false);
          }
        );

      } else {
        // User logged out
        setCurrentUser(null);
        removeLocalUser();
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserName("");
        setIsCheckingAuth(false);
        
        // 🧹 Memory Leak roko: Agar user logout ho jaye toh Firestore ko sun-na band karo
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
    });

    // 🧹 Cleanup function jab component unmount ho
    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const login = (role, name) => {
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
    if (name) setUserName(name);
  };

  const logout = async () => {
    await signOut(auth);
    removeLocalUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserName("");
  };

  const value = { 
    currentUser, 
    isAuthenticated, 
    isAdmin, 
    userName, 
    userId: currentUser?.uid || savedUser?.uid, 
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