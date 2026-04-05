import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,        // 🌟 NAYA: Iske bina Vault Error dega
  orderBy, 
  updateDoc, 
  deleteDoc, 
  arrayUnion, 
  arrayRemove, 
  serverTimestamp,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase'; // Aapka connection (Chulha)

// ==========================================
// 📝 1. COMMUNITY & CATEGORIES
// ==========================================

export const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...postData,
      createdAt: serverTimestamp(),
    });
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
// 🎓 4. ACADEMY & MIND TRIALS (Exams)
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

// 1. Sabse upar 'onSnapshot' add karein imports mein:
// import { collection, ..., onSnapshot } from 'firebase/firestore';

// ==========================================
// 💰 6. DONATION SERVICES (Real-time Listeners)
// ==========================================

// 🎯 Target Amount (Goal) listen karna
export const subscribeToTargetAmount = (callback) => {
  const docRef = doc(db, 'settings', 'config');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists() && docSnap.data().targetAmount) {
      callback(docSnap.data().targetAmount);
    }
  });
};

// 💖 Live Donations listen karna
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
    // Sorting: Newest first
    list.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
    
    // UI ko data bhej dena
    callback({ list, total });
  });
};