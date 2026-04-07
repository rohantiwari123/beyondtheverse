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
import { updateProfile, updatePassword } from 'firebase/auth'; 
import { db, auth } from '../firebase'; 
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

// ==========================================
// 📝 1. COMMUNITY & CATEGORIES
// ==========================================

export const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...postData,
      createdAt: serverTimestamp(),
    });

    // 🌟 BROADCAST NOTIFICATION TO ALL USERS (CLEANED UP)
    try {
      const usersSnap = await getDocs(collection(db, "users")); 
      const batch = writeBatch(db); 
      
      usersSnap.forEach((userDoc) => {
        // 🔒 Wapas 'if' laga diya hai. Ab khud ko notification nahi aayegi.
        if (userDoc.id !== postData.userId) { 
          const notifRef = doc(collection(db, "notifications"));
          batch.set(notifRef, {
            userId: userDoc.id, 
            triggerUserId: postData.userId, 
            title: "New Thought in Verse 🌟",
            message: `${postData.userName || 'A user'} shared a new thought in ${postData.category || 'Community'}.`,
            link: `/post/${docRef.id}`, 
            isRead: false,
            timestamp: serverTimestamp()
          });
        }
      });
      
      await batch.commit();
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
// 🔔 9. NOTIFICATIONS SYSTEM
// ==========================================

export const createNotification = async (targetUserId, data) => {
  try {
    if (targetUserId === data.triggerUserId) return; 

    await addDoc(collection(db, "notifications"), {
      userId: targetUserId, 
      triggerUserId: data.triggerUserId, 
      title: data.title,
      message: data.message,
      link: data.link || "/",
      isRead: false,
      timestamp: serverTimestamp()
    });
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
    // 🧹 Alert hata diya gaya hai, sirf console me error dikhega
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
      // 🚨 YAHAN APNI VAPID KEY DAALEIN JO FIREBASE CONSOLE SE MILEGI
      const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY_HERE" });
      
      if (token) {
        console.log("Push Token Generated:", token);
        // Is token ko user ke document me save kar do, taaki baad me server is par message bhej sake
        await updateDoc(doc(db, "users", userId), { fcmToken: token });
      } else {
        console.log("No registration token available.");
      }
    } else {
      console.log("User denied notification permission.");
    }
  } catch (error) {
    console.error("Error asking for permission:", error);
  }
};
