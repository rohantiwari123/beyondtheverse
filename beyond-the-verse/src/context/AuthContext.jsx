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
  const [userUsername, setUserUsername] = useState(savedUser?.username || "");
  const [userProfilePic, setUserProfilePic] = useState(savedUser?.profilePic || "");
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
              const realUsername = userDoc.data().username || "";
              const realProfilePic = userDoc.data().profilePic || user.photoURL || "";
              
              setIsAuthenticated(true);
              setIsAdmin(role === 'admin');
              setUserName(realName); 
              setUserUsername(realUsername);
              setUserProfilePic(realProfilePic);
              
              saveLocalUser({ uid: user.uid, role, name: realName, username: realUsername, profilePic: realProfilePic });
            } else {
              const tempName = user.displayName || ""; 
              const tempProfilePic = user.photoURL || "";
              setIsAuthenticated(true);
              setIsAdmin(false);
              setUserName(tempName);
              setUserUsername("");
              setUserProfilePic(tempProfilePic);
              saveLocalUser({ uid: user.uid, role: 'client', name: tempName, username: "", profilePic: tempProfilePic });
            }
            setIsCheckingAuth(false);
          }, 
          (error) => {
            console.error("AuthContext Snapshot Error:", error);
            // Fallback agar network chala jaye
            setIsAuthenticated(true); 
            setUserName(user.displayName || getLocalUser()?.name || "");
            setUserProfilePic(user.photoURL || getLocalUser()?.profilePic || "");
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
        setUserProfilePic("");
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

  const login = (role, name, username, profilePic) => {
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
    if (name) setUserName(name);
    if (username !== undefined) setUserUsername(username);
    if (profilePic !== undefined) setUserProfilePic(profilePic);
  };

  const logout = async () => {
    await signOut(auth);
    removeLocalUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserName("");
    setUserUsername("");
    setUserProfilePic("");
  };

  const value = { 
    currentUser, 
    isAuthenticated, 
    isAdmin, 
    userName,
    userUsername, 
    userProfilePic,
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