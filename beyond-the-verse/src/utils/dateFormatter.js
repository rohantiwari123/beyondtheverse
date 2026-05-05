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
