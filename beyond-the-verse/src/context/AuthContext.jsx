import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Path check kar lijiyega

// 🍪 COOKIES 
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return JSON.parse(match[2]);
  return null;
};

const eraseCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};

// 1. Context बनाना
const AuthContext = createContext();

// 2. Custom Hook (ताकि किसी भी पेज से इसे आसानी से बुला सकें)
export const useAuth = () => useContext(AuthContext);

// 3. Provider Component
export const AuthProvider = ({ children }) => {
  const savedUser = getCookie('btv_user');
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!savedUser);
  const [isAdmin, setIsAdmin] = useState(savedUser?.role === 'admin');
  const [userName, setUserName] = useState(savedUser?.name || ""); 
  const [isCheckingAuth, setIsCheckingAuth] = useState(!savedUser);

  // 🌟 PURE FIREBASE AUTH (No Fake Names, No Refresh Logouts) 🌟
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
            setCookie('btv_user', { uid: user.uid, role, name: realName }, 30);
          } else {
            const tempName = user.displayName || ""; 
            setIsAuthenticated(true);
            setIsAdmin(false);
            setUserName(tempName);
            setCookie('btv_user', { uid: user.uid, role: 'client', name: tempName }, 30);
          }
        } catch (error) {
          console.error("AuthContext Error:", error);
          setIsAuthenticated(true); 
          setUserName(user.displayName || getCookie('btv_user')?.name || "");
        }
      } else {
        setCurrentUser(null);
        eraseCookie('btv_user');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserName("");
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // Login function
  const login = (role, name) => {
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
    if (name) setUserName(name);
  };

  // Logout function
  const logout = async () => {
    await signOut(auth);
    eraseCookie('btv_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserName("");
  };

  // ये सारा डेटा अब "बादल" (Cloud) में रहेगा
  const value = { currentUser, isAuthenticated, isAdmin, userName, login, logout };

  // लोडिंग स्क्रीन भी अब यहीं से हैंडल होगी
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-4 animate-pulse shadow-inner border border-teal-100">
          <i className="fa-solid fa-atom text-4xl text-teal-600"></i>
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm tracking-wide uppercase">
          <i className="fa-solid fa-circle-notch fa-spin text-teal-600"></i> Securing session
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
