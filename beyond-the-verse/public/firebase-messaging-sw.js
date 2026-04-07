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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Jab app background me hoga, ye code notification lock screen par dikhayega
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png' // Agar aapka logo kisi aur naam se hai, to yahan change kar lena
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
