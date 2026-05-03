const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// 🌟 FIREBASE ADMIN SETUP (Safe way for Vercel)
const serviceAccount = process.env.FIREBASE_CREDENTIALS 
  ? JSON.parse(process.env.FIREBASE_CREDENTIALS) 
  : null;

// Ek bar se zyada initialize hone se bachane ke liye
if (serviceAccount && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// 🌟 Taki browser me kholne par 'Cannot GET /' na aaye
app.get('/', (req, res) => {
  res.send('Beyond the Verse Notification Server is Live! 🚀');
});

// 🌟 NOTIFICATION BHEJNE WALA API ROUTE
app.post('/api/send-notification', async (req, res) => {
  console.log("Push request received for token:", req.body.fcmToken);
  const { fcmToken, title, body, link } = req.body;

  if (!fcmToken) {
    return res.status(400).json({ error: "Token is missing!" });
  }

  const message = {
    notification: { title, body },
    data: { url: link || "/" },
    token: fcmToken
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    res.status(200).json({ success: true, message: "Push notification sent!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🌟 SESSION MANAGEMENT API ROUTE
app.post('/api/revoke-sessions', async (req, res) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ error: "UID is missing!" });
  
  try {
    await admin.auth().revokeRefreshTokens(uid);
    res.status(200).json({ success: true, message: "All sessions revoked successfully!" });
  } catch (error) {
    console.error("Error revoking sessions:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🌟 VERCEL SPECIFIC: Export the app instead of app.listen
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`BTVerse Backend is running locally on port ${PORT} 🚀`);
  });
}

module.exports = app;