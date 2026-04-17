import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,         
  orderBy, 
  updateDoc, 
  deleteDoc, 
  arrayUnion, 
  arrayRemove, 
  serverTimestamp,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { updateProfile, updatePassword, deleteUser } from 'firebase/auth'; 
import { getToken } from "firebase/messaging";

// 🌟 Sab kuch ek hi line mein import karein taaki "Redeclaration" error na aaye
import { db, auth, messaging } from '../firebase';

// ==========================================
// 🤖 AUTO-GRAMMAR BOT API (Now using Groq Llama 3)
// ==========================================
export const checkSpellingWithAPI = async (text) => {
  const API_KEY = import.meta.env.VITE_DICT_API_KEY;

  if (!API_KEY) return [];

  try {
    // 🌟 Prompt remains EXACTLY the same as your request
    const prompt = `
      You are a Professional Linguistic & Grammar Expert. 
      Your task is to scan the text for EVERY single error, whether it is a long word or a very short word, in both Hindi and English.

      STRICT CORRECTION RULES:
      1. HINDI (Short Words): Correct 'मै' to 'मैं', 'हु' to 'हूँ', 'क्यु' to 'क्यों', 'हो' to 'हो' (context based), 'मदद' to 'मदद'.
      2. HINDI (Common Errors): Correct 'बहोत' to 'बहुत', 'सुरू' to 'शुरू', 'जरुरत' to 'ज़रूरत', 'महेनत' to 'मेहनत'.
      3. ENGLISH: Correct all typos (e.g., 'writting' to 'writing') and basic grammar.
      4. INPUT STYLE: The text might be mixed (Hinglish), ignore the slang but correct the spellings.
      
      OUTPUT FORMAT:
      - Return ONLY a JSON array of objects with "wrong" and "correct" keys.
      - Example: [{"wrong": "मै", "correct": "मैं"}, {"wrong": "बहोत", "correct": "बहुत"}]
      - If the text is 100% correct, return [].

      Text: "${text}"
    `;

    // 🌟 Fetching from Groq Cloud instead of Gemini
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Using the best versatile model on Groq
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" } // Force JSON response
      }),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const responseText = data.choices[0].message.content;
    const result = JSON.parse(responseText);
    
    // Extracting the array from JSON (handling various possible key names like 'mistakes', 'errors')
    return result.mistakes || result.errors || result.corrections || Object.values(result)[0] || [];

  } catch (error) {
    console.error("Groq Bot Error:", error.message);
    return []; 
  }
};

// ==========================================
// 📝 1. COMMUNITY & CATEGORIES
// ==========================================

export const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...postData,
      createdAt: serverTimestamp(),
    });

    // 🌟 Bot logic removed as requested!

    try {
      const usersSnap = await getDocs(collection(db, "users")); 
      
      // 🛡️ SECURITY FIX: Batch Chunking (Prevents Firebase 500 Limit Crash)
      const batches = [];
      let currentBatch = writeBatch(db);
      let operationCount = 0;
      
      // 👇 YAHAN APNA ASLI VERCEL URL DAALNA 👇
      const BACKEND_URL = "https://beyondtheverse.vercel.app/api/send-notification";
      
      usersSnap.forEach((userDoc) => {
        if (userDoc.id !== postData.userId) { 
          const userData = userDoc.data();
          const fcmToken = userData.fcmToken;
          const userPrefs = userData.notificationPrefs;

          // 🌟 Check karo ki kya user ne notifications band to nahi ki hain
          if (!userPrefs || userPrefs.pushMentions !== false) {
            
            // 1. In-App Notification (Database me save)
            const notifRef = doc(collection(db, "notifications"));
            currentBatch.set(notifRef, {
              userId: userDoc.id, 
              triggerUserId: postData.userId, 
              title: "New Thought in Verse 🌟",
              message: `${postData.userName || 'A user'} shared a new thought in ${postData.category || 'Community'}.`,
              link: `/post/${docRef.id}`, 
              isRead: false,
              timestamp: serverTimestamp()
            });
            
            operationCount++;

            // 🌟 2. ASLI PUSH NOTIFICATION (FCM / Vercel Server)
            if (fcmToken) {
              fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  fcmToken: fcmToken,
                  title: "New Thought in Verse 🌟",
                  body: `${postData.userName || 'A user'} shared a new thought in ${postData.category || 'Community'}.`,
                  link: `/post/${docRef.id}`
                })
              }).catch(err => console.error("FCM Push Error:", err)); // Error aaye to app crash na ho
            }
            
            // Execute batch when it reaches safe limit (450)
            if (operationCount >= 450) {
              batches.push(currentBatch.commit());
              currentBatch = writeBatch(db);
              operationCount = 0;
            }
          }
        }
      });
      
      // Commit any remaining operations
      if (operationCount > 0) {
        batches.push(currentBatch.commit());
      }
      
      await Promise.all(batches);
      
    } catch (notifError) {
      console.error("Failed to broadcast notifications:", notifError);
    }

    return docRef;
  } catch (error) {
    console.error("Error creating post: ", error);
    throw error;
  }
};

export const saveCategories = async (updatedCats) => {
  try {
    await setDoc(doc(db, "settings", "categories"), { items: updatedCats });
    return true;
  } catch (error) {
    console.error("Error saving categories: ", error);
    throw error;
  }
};

export const getPostById = async (postId) => {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw error;
  }
};

// ==========================================
// 🌟 2. POSTCARD ACTIONS (Edit, Delete, Pin, etc.)
// ==========================================

export const upgradeToAdminPost = async (postId) => {
  return await updateDoc(doc(db, "posts", postId), { isAdminPost: true });
};

export const editPostText = async (postId, newText) => {
  return await updateDoc(doc(db, "posts", postId), { text: newText, isEdited: true });
};

export const deletePost = async (postId) => {
  return await deleteDoc(doc(db, "posts", postId));
};

export const togglePinPost = async (postId, currentPinStatus) => {
  return await updateDoc(doc(db, "posts", postId), { isPinned: !currentPinStatus });
};

export const toggleBookmarkPost = async (postId, userId, isBookmarked) => {
  const postRef = doc(db, "posts", postId);
  return await updateDoc(postRef, {
    bookmarks: isBookmarked ? arrayRemove(userId) : arrayUnion(userId)
  });
};

export const addPostInteraction = async (postId, interactionData) => {
  return await updateDoc(doc(db, "posts", postId), {
    interactions: arrayUnion(interactionData)
  });
};

// ==========================================
// 💬 3. COMMENT & INTERACTION BOX ACTIONS
// ==========================================

export const upgradeCommentToAdmin = async (postId, allInteractions, targetId) => {
  const updatedInteractions = allInteractions.map(i => 
    (i.id || i.timestamp) === targetId ? { ...i, isAdminComment: true } : i
  );
  return await updateDoc(doc(db, "posts", postId), { interactions: updatedInteractions });
};

export const deleteCommentInteraction = async (postId, allInteractions, targetId, parentId, interactionType, userId) => {
  let newInteractions = allInteractions.filter(i => (i.id || i.timestamp) !== targetId);
  
  if (parentId) {
    newInteractions = newInteractions.map(i => {
      if ((i.id || i.timestamp) === parentId) {
        const updatedGates = { ...i.commentGates };
        if (updatedGates[interactionType]) {
          updatedGates[interactionType] = updatedGates[interactionType].filter(uid => uid !== userId);
        }
        return { ...i, commentGates: updatedGates };
      }
      return i;
    });
  }
  return await updateDoc(doc(db, "posts", postId), { interactions: newInteractions });
};

export const editCommentInteraction = async (postId, allInteractions, targetId, newText) => {
  const newInteractions = allInteractions.map(i =>
    (i.id || i.timestamp) === targetId ? { ...i, text: newText.trim(), isEdited: true } : i
  );
  return await updateDoc(doc(db, "posts", postId), { interactions: newInteractions });
};

export const togglePinComment = async (postId, allInteractions, targetId, currentPinStatus) => {
  const newInteractions = allInteractions.map(i =>
    (i.id || i.timestamp) === targetId ? { ...i, isPinned: !currentPinStatus } : i
  );
  return await updateDoc(doc(db, "posts", postId), { interactions: newInteractions });
};

export const addCommentReply = async (postId, allInteractions, targetId, replyData, currentGates) => {
  const newGates = { ...currentGates };
  if (!newGates[replyData.type].includes(replyData.userId)) {
    newGates[replyData.type] = [...newGates[replyData.type], replyData.userId];
  }

  const newInteractions = allInteractions.map(i => {
    if ((i.id || i.timestamp) === targetId) return { ...i, commentGates: newGates };
    return i;
  });
  
  newInteractions.push(replyData);
  return await updateDoc(doc(db, "posts", postId), { interactions: newInteractions });
};

// ==========================================
// 🎓 4. ACADEMY & ASSESSMENTS (Exams)
// ==========================================

export const saveExamToDb = async (examData) => {
  try {
    const docRef = await addDoc(collection(db, "exams"), {
      ...examData,
      createdAt: serverTimestamp(),
      isResultPublished: false,
    });
    return docRef;
  } catch (error) {
    console.error("Error saving exam: ", error);
    throw error;
  }
};

export const getExamById = async (examId) => {
  const docRef = doc(db, "exams", examId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  return null;
};

export const deleteExam = async (examId) => {
  try {
    await deleteDoc(doc(db, "exams", examId));
    return true;
  } catch (error) {
    console.error("Error deleting exam: ", error);
    throw error;
  }
};

export const submitExamResult = async (resultData) => {
  const resultId = `${resultData.userId}_${resultData.examId}`;
  return await setDoc(doc(db, "exam_results", resultId), {
    ...resultData,
    submittedAt: serverTimestamp()
  });
};

export const getAllExams = async () => {
  try {
    const q = query(collection(db, "exams"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching exams: ", error);
    throw error;
  }
};

// ==========================================
// 🏛️ 5. VAULT (User Results)
// ==========================================

export const getUserExamResults = async (userId) => {
  try {
    const q = query(
      collection(db, "exam_results"),
      where("userId", "==", userId),
      orderBy("submittedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error("Error fetching user results: ", error);
    throw error;
  }
};

// ==========================================
// 💰 6. DONATION SERVICES (Real-time Listeners)
// ==========================================

export const subscribeToTargetAmount = (callback) => {
  const docRef = doc(db, 'settings', 'config');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists() && docSnap.data().targetAmount) {
      callback(docSnap.data().targetAmount);
    }
  });
};

export const subscribeToDonations = (callback) => {
  const q = query(collection(db, 'donations'));
  return onSnapshot(q, (snapshot) => {
    let total = 0;
    let list = [];
    snapshot.forEach(doc => {
      let data = doc.data();
      total += (Number(data.amount) || 0);
      list.push({ id: doc.id, ...data });
    });
    list.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
    callback({ list, total });
  });
};

// ==========================================
// ❓ 7. FAQS & Q&A INBOX
// ==========================================

export const getFAQs = async () => {
  try {
    const q = query(collection(db, "faqs"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching FAQs: ", error);
    return [];
  }
};

export const submitUserQuestion = async (questionText, user = null) => {
  try {
    await addDoc(collection(db, "user_questions"), {
      question: questionText,
      userId: user?.uid || "anonymous",
      userName: user?.name || "Guest User",
      status: "pending", 
      timestamp: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error submitting question:", error);
    throw error;
  }
};

export const getPendingQuestions = async () => {
  try {
    const q = query(collection(db, "user_questions"), where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);
    const questions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return questions.sort((a, b) => (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0));
  } catch (error) {
    console.error("Error fetching pending questions: ", error);
    return [];
  }
};

export const publishQuestionToFAQ = async (questionId, questionText, answerText) => {
  try {
    await addDoc(collection(db, "faqs"), {
      q: questionText,
      a: answerText,
      timestamp: serverTimestamp()
    });
    await updateDoc(doc(db, "user_questions", questionId), {
      status: "answered",
      answeredAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error publishing FAQ:", error);
    throw error;
  }
};

export const deleteUserQuestion = async (questionId) => {
  try {
    await deleteDoc(doc(db, "user_questions", questionId));
    return true;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

// ==========================================
// ⚙️ 8. USER SETTINGS (Profile & Security) 
// ==========================================

export const updateUserProfileName = async (newName) => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: newName });
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { name: newName });
      return true;
    }
    throw new Error("No user logged in");
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const updateUserSecurityPassword = async (newPassword) => {
  try {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
      return true;
    }
    throw new Error("No user logged in");
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// ==========================================
// 📸 UPLOAD PROFILE PICTURE (Via ImgBB - 100% Free)
// ==========================================
export const uploadProfilePicture = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    // 🔴 ImgBB ki API Key yahan paste karo (api.imgbb.com se nikal kar)
    const apiKey = "a6229f654ae5d1e5afd8bc12581b23cb"; 
    
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    
    const data = await res.json();
    
    if (data.success) {
      const photoURL = data.data.url; // Live DP Link

      // 1. Firestore Database me update karo
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        profilePic: photoURL
      });

      // 2. Firebase Auth Profile me bhi update kar do (Taki har jagah easily mil jaye)
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: photoURL });
      }

      return photoURL; 
    } else {
      throw new Error("ImgBB Upload Failed");
    }

  } catch (error) {
    console.error("Error uploading DP:", error);
    throw error;
  }
};

// ==========================================
// 🔔 9. NOTIFICATIONS SYSTEM
// ==========================================

// ==========================================
// 🔔 9. NOTIFICATIONS SYSTEM
// ==========================================

export const createNotification = async (targetUserId, data) => {
  try {
    if (targetUserId === data.triggerUserId) return; 

    // 🌟 1. User ki details nikalo (Preferences aur FCM Token dono chahiye)
    const userDocRef = doc(db, "users", targetUserId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) return;

    const userData = userDocSnap.data();
    const userPrefs = userData.notificationPrefs;
    const fcmToken = userData.fcmToken; // 🌟 Phone par bhejne ki chabi

    // Agar user ne setting se notifications OFF kar rakhi hai, to wapas laut jao
    if (userPrefs && userPrefs.pushMentions === false) {
      console.log(`Notification blocked for user ${targetUserId} by settings.`);
      return; 
    }

    // 🌟 2. Database me save karo (In-App Notification)
    await addDoc(collection(db, "notifications"), {
      userId: targetUserId, 
      triggerUserId: data.triggerUserId, 
      title: data.title,
      message: data.message,
      link: data.link || "/",
      isRead: false,
      timestamp: serverTimestamp()
    });

    // 🌟 3. ASLI PUSH NOTIFICATION BHEJO (Backend ko call karke)
    if (fcmToken) {
      // 👇 YAHAN APNA CODESPACE WALA PORT 3000 KA URL DAALO 👇
      const BACKEND_URL = "https://beyondtheverse.vercel.app/api/send-notification";

      await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fcmToken: fcmToken,
          title: data.title,
          body: data.message,
          link: data.link || "/"
        })
      });
      console.log("FCM trigger sent to backend! 🚀");
    }

  } catch (error) {
    console.error("Error creating notification: ", error);
  }
};

export const subscribeToUserNotifications = (userId, callback) => {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );
  
  return onSnapshot(q, (snapshot) => {
    const notifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(notifs);
  }, (error) => {
    console.error("Snapshot error on notifications:", error);
  });
};

export const markNotificationAsRead = async (notifId) => {
  try {
    await updateDoc(doc(db, "notifications", notifId), { isRead: true });
  } catch (error) {
    console.error("Error updating notification: ", error);
  }
};

// ==========================================
// 📲 10. PUSH NOTIFICATIONS (FCM)
// ==========================================

export const requestPushNotificationPermission = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "BNEhEaLGJ8poqSmS3NUmBJp4tc3o4bXND6h-nS4P1_d69EiYsoKlMezolS44y9qFiBziMFIIlW-ogkKLjHTp0G4" });
      
      if (token) {
        console.log("Push Token Generated:", token);
        await updateDoc(doc(db, "users", userId), { fcmToken: token });
      }
    }
  } catch (error) {
    console.error("Error asking for permission:", error);
  }
};

// ==========================================
// 📚 11. LIBRARY & KNOWLEDGE BASE
// ==========================================

// 1. Get Real-time Library Data
export const subscribeToLibraryItems = (callback) => {
  const q = query(collection(db, "library"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(items);
  }, (error) => {
    console.error("Error fetching library items:", error);
  });
};

// 2. Create New Folder
export const createLibraryFolder = async (name, parentId) => {
  try {
    const docRef = await addDoc(collection(db, "library"), {
      name: name.trim(),
      type: "folder",
      parentId: parentId,
      createdAt: serverTimestamp()
    });
    return docRef;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};

// 🌟 3. ADD PDF LINK (AUTO CONVERT TO DIRECT DOWNLOAD)
export const uploadLibraryFile = async (linkUrl, parentId, pdfName) => {
  try {
    if (!linkUrl || !pdfName) throw new Error("Name and Link are required!");

    let finalUrl = linkUrl.trim();

    // 🚀 THE GOOGLE DRIVE HACK: Convert normal link to Direct Download link
    if (finalUrl.includes("drive.google.com")) {
      const idMatch = finalUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || finalUrl.match(/id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        const fileId = idMatch[1];
        finalUrl = `https://drive.google.com/uc?export=download&id=${fileId}`; // Direct download link
      }
    }

    // Sirf Firestore Database mein entry banayenge (No Storage Upload)
    const docRef = await addDoc(collection(db, "library"), {
      name: pdfName.trim(),
      type: "file",
      parentId: parentId,
      url: finalUrl, 
      createdAt: serverTimestamp()
    });

    return docRef;
  } catch (error) {
    console.error("Error saving PDF link:", error);
    throw error;
  }
};

// 4. Rename Item (File or Folder)
export const renameLibraryItem = async (itemId, newName) => {
  try {
    await updateDoc(doc(db, "library", itemId), { 
      name: newName.trim() 
    });
    return true;
  } catch (error) {
    console.error("Error renaming item:", error);
    throw error;
  }
};

// 🌟 5. DELETE ITEM (Ab storage se delete nahi karna padega, sirf database se)
export const deleteLibraryItem = async (item) => {
  try {
    // Sirf Firestore se document delete karo
    await deleteDoc(doc(db, "library", item.id));
    return true;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

// 🌟 6. MOVE ITEM (Change parentId)
export const moveLibraryItem = async (itemId, newParentId) => {
  try {
    await updateDoc(doc(db, "library", itemId), { 
      parentId: newParentId 
    });
    return true;
  } catch (error) {
    console.error("Error moving item:", error);
    throw error;
  }
};

// 🌟 7. COPY ITEM
export const copyLibraryItem = async (item, newParentId) => {
  try {
    const { id, createdAt, ...rest } = item; // ID aur purana time hata kar baki data lo
    await addDoc(collection(db, "library"), {
      ...rest,
      name: `${rest.name} (Copy)`, // Copy pehchanne ke liye
      parentId: newParentId,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error copying item:", error);
    throw error;
  }
};

// ==========================================
// ⚙️ 12. ADVANCED SETTINGS (Notifications & Danger Zone)
// ==========================================

export const getUserPreferences = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, "users", userId));
    if (docSnap.exists() && docSnap.data().notificationPrefs) {
      return docSnap.data().notificationPrefs;
    }
    return null;
  } catch (error) {
    console.error("Error getting preferences:", error);
    return null;
  }
};

export const updateUserPreferences = async (userId, prefs) => {
  try {
    await updateDoc(doc(db, "users", userId), { notificationPrefs: prefs });
    return true;
  } catch (error) {
    console.error("Error updating preferences:", error);
    throw error;
  }
};

export const deleteUserAccount = async (userId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user logged in");
    
    // 1. Pehle Firestore se user ka data delete karo
    await deleteDoc(doc(db, "users", userId));
    
    // 2. Phir Firebase Auth se hamesha ke liye delete kar do
    await deleteUser(user);
    return true;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

// ==========================================
// 👤 13. PROFILE DATA SERVICES
// ==========================================

export const getUserPosts = async (userId) => {
  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
};

export const getUserBookmarkedPosts = async (userId) => {
  try {
    const q = query(collection(db, "posts"), where("bookmarks", "array-contains", userId), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching bookmarked posts:", error);
    return [];
  }
};

// firebaseServices.js me sabse niche add karo:
export const getUserProfile = async (targetUserId) => {
  try {
    const docRef = doc(db, "users", targetUserId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
