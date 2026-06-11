import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';

const app = express();

// 🌟 THE ULTIMATE CORS FIX (Reflect Origin)
app.use(cors({
  origin: true, // Automatically allow the requesting origin
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// 📝 Request Logger for Railway Console
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

console.log("🚀 BTV Backend is starting with Auto-CORS enabled...");

// 🌟 FIREBASE ADMIN SETUP
let serviceAccount = null;
const credsRaw = process.env.FIREBASE_CREDENTIALS;

if (credsRaw) {
  try {
    let cleanCreds = credsRaw.trim();
    if (cleanCreds.startsWith('FIREBASE_CREDENTIALS=')) {
      cleanCreds = cleanCreds.replace('FIREBASE_CREDENTIALS=', '').trim();
    }
    if ((cleanCreds.startsWith("'") && cleanCreds.endsWith("'")) || 
        (cleanCreds.startsWith('"') && cleanCreds.endsWith('"'))) {
      cleanCreds = cleanCreds.slice(1, -1).trim();
    }
    serviceAccount = JSON.parse(cleanCreds);
  } catch (err) {
    console.error("❌ ERROR: FIREBASE_CREDENTIALS is not valid JSON.");
  }
}

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin initialized");
  } else {
    console.warn("⚠️ FIREBASE_CREDENTIALS not found.");
  }
}

const db = admin.apps.length ? admin.firestore() : null;

// 🛡️ MIDDLEWARE: Check if Firebase is initialized
app.use((req, res, next) => {
  if (req.path === '/' || req.path === '/api') return next();
  if (!db) {
    return res.status(500).json({ error: "Firebase Admin not initialized." });
  }
  next();
});

// 🌟 DYNAMIC DOMAIN DETECTION (Fixed for Cross-Domain WebAuthn)
const getRPID = () => {
  try {
    return new URL(FRONTEND_URL).hostname;
  } catch (e) {
    return 'localhost';
  }
};

const getOrigin = () => FRONTEND_URL;

const RP_NAME = 'Beyond The Verse';
const CHALLENGE_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

// 🌟 WEB AUTHENTICATION (WEBAUTHN) ENDPOINTS 🌟

// 1. Generate Registration Options
app.post('/api/webauthn/register-options', async (req, res) => {
  const { uid, email } = req.body;
  if (!uid || !email) return res.status(400).json({ error: 'UID and Email are required' });

  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) return res.status(404).json({ error: 'User not found' });

    const userCredentials = userDoc.data()?.webauthnCredentials || [];

    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID: getRPID(),
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

    await db.collection('authChallenges').doc(uid).set({
      challenge: options.challenge,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json(options);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Verify Registration Response
app.post('/api/webauthn/register-verify', async (req, res) => {
  const { uid, response } = req.body;
  if (!uid || !response) return res.status(400).json({ error: 'UID and Response are required' });

  try {
    const challengeDoc = await db.collection('authChallenges').doc(uid).get();
    if (!challengeDoc.exists) return res.status(400).json({ error: 'Challenge not found' });

    const { challenge: expectedChallenge, createdAt } = challengeDoc.data();
    
    // Check for timeout
    if (Date.now() - createdAt.toMillis() > CHALLENGE_TIMEOUT_MS) {
      await db.collection('authChallenges').doc(uid).delete();
      return res.status(400).json({ error: 'Challenge expired. Please try again.' });
    }

    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge,
      expectedOrigin: getOrigin(),
      expectedRPID: getRPID(),
    });

    if (verification.verified) {
      const { registrationInfo } = verification;
      const { credentialID, credentialPublicKey, counter } = registrationInfo;

      const newCredential = {
        credentialID: Buffer.from(credentialID).toString('base64url'),
        publicKey: Buffer.from(credentialPublicKey).toString('base64url'),
        counter,
        transports: response.response.transports || [],
        createdAt: Date.now()
      };

      await db.collection('users').doc(uid).update({
        webauthnCredentials: admin.firestore.FieldValue.arrayUnion(newCredential)
      });

      await db.collection('authChallenges').doc(uid).delete();
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Registration verification failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Generate Authentication Options
app.post('/api/webauthn/login-options', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const userSnapshot = await db.collection('users').where('email', '==', email.toLowerCase()).limit(1).get();
    if (userSnapshot.empty) return res.status(404).json({ error: 'User not found' });

    const userDoc = userSnapshot.docs[0];
    const userCredentials = userDoc.data().webauthnCredentials || [];

    if (userCredentials.length === 0) {
      return res.status(400).json({ error: 'No biometric credentials registered for this user' });
    }

    const options = await generateAuthenticationOptions({
      rpID: getRPID(),
      allowCredentials: userCredentials.map(cred => ({
        id: cred.credentialID,
        type: 'public-key',
        transports: cred.transports,
      })),
      userVerification: 'preferred',
    });

    await db.collection('authChallenges').doc(email.toLowerCase()).set({
      challenge: options.challenge,
      uid: userDoc.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json(options);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Verify Authentication Response
app.post('/api/webauthn/login-verify', async (req, res) => {
  const { email, response } = req.body;
  if (!email || !response) return res.status(400).json({ error: 'Email and Response are required' });

  const lowercaseEmail = email.toLowerCase();

  try {
    const challengeDoc = await db.collection('authChallenges').doc(lowercaseEmail).get();
    if (!challengeDoc.exists) return res.status(400).json({ error: 'Challenge not found' });

    const { challenge: expectedChallenge, uid, createdAt } = challengeDoc.data();

    // Check for timeout
    if (Date.now() - createdAt.toMillis() > CHALLENGE_TIMEOUT_MS) {
      await db.collection('authChallenges').doc(lowercaseEmail).delete();
      return res.status(400).json({ error: 'Challenge expired. Please try again.' });
    }

    const userDoc = await db.collection('users').doc(uid).get();
    const userCredentials = userDoc.data().webauthnCredentials || [];

    const credentialID = response.id;
    const credential = userCredentials.find(cred => cred.credentialID === credentialID);

    if (!credential) return res.status(400).json({ error: 'Credential not found' });

    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge,
      expectedOrigin: getOrigin(),
      expectedRPID: getRPID(),
      authenticator: {
        credentialID: Buffer.from(credential.credentialID, 'base64url'),
        credentialPublicKey: Buffer.from(credential.publicKey, 'base64url'),
        counter: credential.counter,
      },
    });

    if (verification.verified) {
      const updatedCredentials = userCredentials.map(cred => {
        if (cred.credentialID === credentialID) {
          return { ...cred, counter: verification.authenticationInfo.newCounter };
        }
        return cred;
      });

      await db.collection('users').doc(uid).update({
        webauthnCredentials: updatedCredentials
      });

      const customToken = await admin.auth().createCustomToken(uid);
      await db.collection('authChallenges').doc(lowercaseEmail).delete();
      
      res.json({ success: true, token: customToken });
    } else {
      res.status(400).json({ error: 'Authentication verification failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🌟 HEALTH CHECK & BASE ROUTES
app.get('/', (req, res) => res.send('Beyond the Verse API Server is Live! 🚀'));
app.get('/api', (req, res) => res.json({ success: true, message: 'BTVerse API is Live! 🚀' }));

// 🌟 NOTIFICATION BHEJNE WALA API ROUTE
app.post('/api/send-notification', async (req, res) => {
  const { fcmToken, title, body, link } = req.body;
  if (!fcmToken) return res.status(400).json({ error: "Token is missing!" });

  const message = {
    notification: { title, body },
    data: { url: link || "/" },
    token: fcmToken
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).json({ success: true, message: "Push notification sent!", fcmResponse: response });
  } catch (error) {
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
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🌟 START THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`BTVerse Backend is running on port ${PORT} 🚀`);
});

export default app;