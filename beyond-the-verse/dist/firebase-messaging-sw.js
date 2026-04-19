importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAcJgkQWpIW4dpgS_2NAJ4wotLsk3RQV5o",
  authDomain: "donation-app-25cac.firebaseapp.com",
  projectId: "donation-app-25cac",
  storageBucket: "donation-app-25cac.firebasestorage.app",
  messagingSenderId: "523938237581",
  appId: "1:523938237581:web:5fe504c83db2af679da6c4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 🌟 BACKGROUND NOTIFICATION HANDLER
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Agar payload me notification object hai
  if (payload.notification) {
    const notificationTitle = payload.notification.title || 'Beyond the Verse';
    const notificationOptions = {
      body: payload.notification.body || 'You have a new update!',
      icon: '/favicon.svg', // 🌟 FIX: Tumhare public folder me jo icon hai wahi diya hai
      badge: '/favicon.svg', // Android me chota icon dikhane ke liye
      data: payload.data || { url: '/' }, // Payload se url aayega warna default
      requireInteraction: true // Jab tak user close na kare, tab tak screen par rahega
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});

// 🌟 EXTRA PRO FEATURE: Notification par click karne se app khulega!
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Click karte hi notification band ho jayega

  // Agar notification ke data me link hai, to wahan bhejo warna homepage par
  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Agar pehle se koi tab open hai, to usko focus karo
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus();
        }
      }
      // Agar koi tab open nahi hai, to naya tab kholo
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});