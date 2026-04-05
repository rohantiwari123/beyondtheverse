// src/utils/dateFormatter.js

export const formatDateTime = (timestamp) => {
  if (!timestamp) return "";
  
  let date;
  if (typeof timestamp.toDate === 'function') {
    date = timestamp.toDate(); 
  } else {
    date = new Date(timestamp); 
  }

  const dateString = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeString = date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();

  return `${dateString} • ${timeString}`;
};




// src/services/firebaseServices.js में नीचे ये फंक्शन्स जोड़ें

// 💬 1. UPGRADE COMMENT TO ADMIN
export const upgradeCommentToAdmin = async (postId, allInteractions, targetId) => {
  const updatedInteractions = allInteractions.map(i => 
    (i.id || i.timestamp) === targetId ? { ...i, isAdminComment: true } : i
  );
  return await updateDoc(doc(db, "posts", postId), { interactions: updatedInteractions });
};

// 🗑️ 2. DELETE COMMENT / INTERACTION
export const deleteCommentInteraction = async (postId, allInteractions, targetId, parentId, interactionType, userId) => {
  let newInteractions = allInteractions.filter(i => (i.id || i.timestamp) !== targetId);
  
  // Agar ye reply tha, to parent ki gates se user id bhi hatani hogi
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

// ✏️ 3. EDIT COMMENT TEXT
export const editCommentInteraction = async (postId, allInteractions, targetId, newText) => {
  const newInteractions = allInteractions.map(i =>
    (i.id || i.timestamp) === targetId ? { ...i, text: newText.trim(), isEdited: true } : i
  );
  return await updateDoc(doc(db, "posts", postId), { interactions: newInteractions });
};

// 📌 4. PIN/UNPIN COMMENT
export const togglePinComment = async (postId, allInteractions, targetId, currentPinStatus) => {
  const newInteractions = allInteractions.map(i =>
    (i.id || i.timestamp) === targetId ? { ...i, isPinned: !currentPinStatus } : i
  );
  return await updateDoc(doc(db, "posts", postId), { interactions: newInteractions });
};

// 🚀 5. ADD REPLY (Logic recording)
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