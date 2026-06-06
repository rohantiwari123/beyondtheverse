import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore'; 
import { auth, db } from '../firebase'; 

// 🛡️ SECURITY FIX: LocalStorage Helper Functions
const saveLocalUser = (value) => localStorage.setItem('btv_user', JSON.stringify(value));
const getLocalUser = () => JSON.parse(localStorage.getItem('btv_user')) || null;
const removeLocalUser = () => localStorage.removeItem('btv_user');

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const savedUser = getLocalUser();
  
  // 🛡️ SECURITY FIX: Normalize role for legacy and case-sensitivity
  const normalizeRole = (role) => {
    if (!role) return 'user';
    const r = role.toLowerCase();
    return r === 'student' ? 'user' : r;
  };

  const initialRole = normalizeRole(savedUser?.role);
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!savedUser);
  const [userRole, setUserRole] = useState(initialRole); // user, teacher, admin, examiner
  
  const [isAdmin, setIsAdmin] = useState(initialRole === 'admin');
  const [isTeacher, setIsTeacher] = useState(initialRole === 'teacher');
  const [isExaminer, setIsExaminer] = useState(initialRole === 'examiner');
  const [isUser, setIsUser] = useState(initialRole === 'user');

  const [userName, setUserName] = useState(savedUser?.name || ""); 
  const [userUsername, setUserUsername] = useState(savedUser?.username || "");
  const [userProfilePic, setUserProfilePic] = useState(savedUser?.profilePic || "");
  const [isCheckingAuth, setIsCheckingAuth] = useState(!savedUser);

  useEffect(() => {
    let unsubscribeSnapshot = null; 

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        
        unsubscribeSnapshot = onSnapshot(doc(db, 'users', user.uid), 
          (userDoc) => {
            if (userDoc.exists()) {
              const role = normalizeRole(userDoc.data().role);
              const realName = userDoc.data().name || user.displayName || ""; 
              const realUsername = userDoc.data().username || "";
              const realProfilePic = userDoc.data().profilePic || user.photoURL || "";
              
              setIsAuthenticated(true);
              setUserRole(role);
              setIsAdmin(role === 'admin');
              setIsTeacher(role === 'teacher');
              setIsExaminer(role === 'examiner');
              setIsUser(role === 'user');

              setUserName(realName); 
              setUserUsername(realUsername);
              setUserProfilePic(realProfilePic);
              
              saveLocalUser({ uid: user.uid, role, name: realName, username: realUsername, profilePic: realProfilePic });
            } else {
              const tempName = user.displayName || ""; 
              const tempProfilePic = user.photoURL || "";
              setIsAuthenticated(true);
              setUserRole('user');
              setIsAdmin(false);
              setIsTeacher(false);
              setIsExaminer(false);
              setIsUser(true);
              setUserName(tempName);
              setUserUsername("");
              setUserProfilePic(tempProfilePic);
              saveLocalUser({ uid: user.uid, role: 'user', name: tempName, username: "", profilePic: tempProfilePic });
            }
            setIsCheckingAuth(false);
          }, 
          (error) => {
            console.error("AuthContext Snapshot Error:", error);
            setIsAuthenticated(true); 
            setUserName(user.displayName || getLocalUser()?.name || "");
            setUserProfilePic(user.photoURL || getLocalUser()?.profilePic || "");
            setIsCheckingAuth(false);
          }
        );

      } else {
        setCurrentUser(null);
        removeLocalUser();
        setIsAuthenticated(false);
        setUserRole('user');
        setIsAdmin(false);
        setIsTeacher(false);
        setIsExaminer(false);
        setIsUser(false);
        setUserName("");
        setUserProfilePic("");
        setIsCheckingAuth(false);
        
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const login = (role, name, username, profilePic) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setIsAdmin(role === 'admin');
    setIsTeacher(role === 'teacher');
    setIsExaminer(role === 'examiner');
    setIsUser(role === 'user');
    if (name) setUserName(name);
    if (username !== undefined) setUserUsername(username);
    if (profilePic !== undefined) setUserProfilePic(profilePic);
  };

  const logout = async () => {
    await signOut(auth);
    removeLocalUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUserRole('user');
    setIsAdmin(false);
    setIsTeacher(false);
    setIsExaminer(false);
    setIsUser(false);
    setUserName("");
    setUserUsername("");
    setUserProfilePic("");
  };

  const value = { 
    currentUser, 
    isAuthenticated, 
    userRole,
    isAdmin, 
    isTeacher,
    isExaminer,
    isUser,
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
