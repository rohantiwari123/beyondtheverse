require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} = require('@simplewebauthn/server');

const app = express();
app.use(cors());
app.use(express.json());

// 🌟 FIREBASE ADMIN SETUP
let serviceAccount = null;
const credsRaw = process.env.FIREBASE_CREDENTIALS;

if (credsRaw) {
  try {
    // Check if the string was accidentally pasted as "FIREBASE_CREDENTIALS=..."
    let cleanCreds = credsRaw.trim();
    if (cleanCreds.startsWith('FIREBASE_CREDENTIALS=')) {
      cleanCreds = cleanCreds.replace('FIREBASE_CREDENTIALS=', '').trim();
    }
    // Remove potential surrounding single/double quotes
    if ((cleanCreds.startsWith("'") && cleanCreds.endsWith("'")) || 
        (cleanCreds.startsWith('"') && cleanCreds.endsWith('"'))) {
      cleanCreds = cleanCreds.slice(1, -1).trim();
    }
    
    serviceAccount = JSON.parse(cleanCreds);
  } catch (err) {
    console.error("❌ ERROR: FIREBASE_CREDENTIALS is not valid JSON.");
    console.error("Value starts with:", credsRaw.substring(0, 20) + "...");
    console.error("Make sure you only paste the JSON content { ... } into the Vercel environment variable value, not the key name or quotes.");
  }
}

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin initialized via Environment Variable");
  } else {
    // ⚠️ Fallback for local development if .env is missing or doesn't have credentials
    console.warn("⚠️ FIREBASE_CREDENTIALS not found. Backend will fail on DB calls.");
  }
}

// Only get Firestore if an app exists, otherwise delay or handle error
const db = admin.apps.length ? admin.firestore() : null;

// 🛡️ MIDDLEWARE: Check if Firebase is initialized
app.use((req, res, next) => {
  // Always allow health checks or the root path
  if (req.path === '/' || req.path === '/api') return next();
  
  if (!db) {
    return res.status(500).json({ 
      error: "Firebase Admin is not initialized. Please ensure FIREBASE_CREDENTIALS is set correctly in Vercel Environment Variables.",
      diagnostics: {
        hasRawCreds: !!process.env.FIREBASE_CREDENTIALS,
        rawCredsLength: process.env.FIREBASE_CREDENTIALS?.length || 0
      }
    });
  }
  next();
});

// 🌟 DYNAMIC DOMAIN DETECTION FOR WEBAUTHN
const getRPID = (req) => {
  const host = req.get('host') || 'localhost';
  return host.split(':')[0]; // Remove port if present
};

const getOrigin = (req) => {
  const host = req.get('host') || 'localhost';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
};

const RP_NAME = 'Beyond The Verse';

// 🌟 WEB AUTHENTICATION (WEBAUTHN) ENDPOINTS 🌟

// 1. Generate Registration Options
app.post('/api/webauthn/register-options', async (req, res) => {
  const { uid, email } = req.body;
  if (!uid || !email) return res.status(400).json({ error: 'UID and Email are required' });

  const RP_ID = getRPID(req);

  try {
    const userDoc = await db.collection('users').doc(uid).get();
    const userCredentials = userDoc.data()?.webauthnCredentials || [];

    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID: RP_ID,
      userID: uid,
      userName: email,
      attestationType: 'none',
      excludeCredentials: userCredentials.map(cred => ({
        id: cred.credentialID,
        type: 'public-key',
      })),
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    });

    // Save challenge in Firestore for verification
    await db.collection('authChallenges').doc(uid).set({
      challenge: options.challenge,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json(options);
  } catch (error) {
    console.error('Register Options Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. Verify Registration Response
app.post('/api/webauthn/register-verify', async (req, res) => {
  const { uid, response } = req.body;
  if (!uid || !response) return res.status(400).json({ error: 'UID and Response are required' });

  const RP_ID = getRPID(req);
  const ORIGIN = getOrigin(req);

  try {
    const challengeDoc = await db.collection('authChallenges').doc(uid).get();
    if (!challengeDoc.exists) return res.status(400).json({ error: 'Challenge not found' });

    const expectedChallenge = challengeDoc.data().challenge;

    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge,
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
    });

    if (verification.verified) {
      const { registrationInfo } = verification;
      const { credentialID, credentialPublicKey, counter } = registrationInfo;

      // Store credential in User document
      const newCredential = {
        credentialID: Buffer.from(credentialID).toString('base64url'),
        publicKey: Buffer.from(credentialPublicKey).toString('base64url'),
        counter,
        transports: response.response.transports,
      };

      await db.collection('users').doc(uid).update({
        webauthnCredentials: admin.firestore.FieldValue.arrayUnion(newCredential)
      });

      await db.collection('authChallenges').doc(uid).delete();
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Verification failed' });
    }
  } catch (error) {
    console.error('Register Verify Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Generate Authentication Options
app.post('/api/webauthn/login-options', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const RP_ID = getRPID(req);

  try {
    const userSnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (userSnapshot.empty) return res.status(404).json({ error: 'User not found' });

    const userDoc = userSnapshot.docs[0];
    const uid = userDoc.id;
    const userCredentials = userDoc.data().webauthnCredentials || [];

    if (userCredentials.length === 0) {
      return res.status(400).json({ error: 'No biometric credentials registered for this user' });
    }

    const options = await generateAuthenticationOptions({
      rpID: RP_ID,
      allowCredentials: userCredentials.map(cred => ({
        id: cred.credentialID,
        type: 'public-key',
        transports: cred.transports,
      })),
      userVerification: 'preferred',
    });

    // Save challenge in Firestore for verification
    await db.collection('authChallenges').doc(email).set({
      challenge: options.challenge,
      uid: uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json(options);
  } catch (error) {
    console.error('Login Options Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Verify Authentication Response
app.post('/api/webauthn/login-verify', async (req, res) => {
  const { email, response } = req.body;
  if (!email || !response) return res.status(400).json({ error: 'Email and Response are required' });

  const RP_ID = getRPID(req);
  const ORIGIN = getOrigin(req);

  try {
    const challengeDoc = await db.collection('authChallenges').doc(email).get();
    if (!challengeDoc.exists) return res.status(400).json({ error: 'Challenge not found' });

    const { challenge: expectedChallenge, uid } = challengeDoc.data();
    const userDoc = await db.collection('users').doc(uid).get();
    const userCredentials = userDoc.data().webauthnCredentials || [];

    const credentialID = response.id;
    const credential = userCredentials.find(cred => cred.credentialID === credentialID);

    if (!credential) return res.status(400).json({ error: 'Credential not found for this user' });

    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge,
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
      authenticator: {
        credentialID: Buffer.from(credential.credentialID, 'base64url'),
        credentialPublicKey: Buffer.from(credential.publicKey, 'base64url'),
        counter: credential.counter,
      },
    });

    if (verification.verified) {
      // Update counter
      const updatedCredentials = userCredentials.map(cred => {
        if (cred.credentialID === credentialID) {
          return { ...cred, counter: verification.authenticationInfo.newCounter };
        }
        return cred;
      });

      await db.collection('users').doc(uid).update({
        webauthnCredentials: updatedCredentials
      });

      // Generate Firebase Custom Token
      const customToken = await admin.auth().createCustomToken(uid);
      
      await db.collection('authChallenges').doc(email).delete();
      res.json({ success: true, token: customToken });
    } else {
      res.status(400).json({ error: 'Verification failed' });
    }
  } catch (error) {
    console.error('Login Verify Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Beyond the Verse Notification & Auth Server is Live! 🚀');
});

app.get('/api', (req, res) => {
  res.json({ success: true, message: 'BTVerse API is Live! 🚀' });
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