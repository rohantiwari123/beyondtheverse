const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors()); // Taki tumhari GitHub wali website isse connect kar sake
app.use(express.json());

// 🌟 FIREBASE ADMIN SETUP (Security ke liye hum Environment Variables use karenge)
// Deploy karte waqt hum Vercel/Render me ye FIREBASE_CREDENTIALS daalenge
const serviceAccount = process.env.FIREBASE_CREDENTIALS 
  ? JSON.parse(process.env.FIREBASE_CREDENTIALS) 
  : require('./serviceAccountKey.json'); // Local testing ke liye

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 🌟 NOTIFICATION BHEJNE WALA API ROUTE
app.post('/api/send-notification', async (req, res) => {
  const { fcmToken, title, body, link } = req.body;

  if (!fcmToken) {
    return res.status(400).json({ error: "Token is missing!" });
  }

  // Firebase ko bhejne ke liye message ready karo
  const message = {
    notification: { title, body },
    data: { url: link || "/" }, // Click karne par kahan jayega
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

// Server Start karo
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BTVerse Backend is running on port ${PORT} 🚀`);
});