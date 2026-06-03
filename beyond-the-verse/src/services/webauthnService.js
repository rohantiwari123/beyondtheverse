import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

// 🌟 DYNAMIC BACKEND URL
const BACKEND_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3000' 
  : 'https://beyondtheverse.vercel.app'; 

const handleFetchResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  if (!response.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Server error');
    } else {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }
  }
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Server did not return JSON. Check if the backend is running and the URL is correct.");
  }
  return response.json();
};

export const registerBiometric = async (uid, email) => {
  try {
    let resp;
    try {
      resp = await fetch(`${BACKEND_URL}/api/webauthn/register-options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, email }),
      });
    } catch (e) {
      throw new Error(`Failed to connect to backend at ${BACKEND_URL}. Is the server running?`);
    }

    const options = await handleFetchResponse(resp);

    const attResp = await startRegistration(options);

    let verifyResp;
    try {
      verifyResp = await fetch(`${BACKEND_URL}/api/webauthn/register-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, response: attResp }),
      });
    } catch (e) {
      throw new Error(`Failed to connect to backend at ${BACKEND_URL} for verification.`);
    }

    const verification = await handleFetchResponse(verifyResp);
    return verification.success;
  } catch (error) {
    console.error('Biometric Registration Error:', error);
    throw error;
  }
};

export const loginBiometric = async (email) => {
  try {
    let resp;
    try {
      resp = await fetch(`${BACKEND_URL}/api/webauthn/login-options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (e) {
      throw new Error(`Failed to connect to backend at ${BACKEND_URL}. Is the server running?`);
    }

    const options = await handleFetchResponse(resp);

    const asseResp = await startAuthentication(options);

    let verifyResp;
    try {
      verifyResp = await fetch(`${BACKEND_URL}/api/webauthn/login-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, response: asseResp }),
      });
    } catch (e) {
      throw new Error(`Failed to connect to backend at ${BACKEND_URL} for verification.`);
    }

    const verification = await handleFetchResponse(verifyResp);
    return verification.token; 
  } catch (error) {
    console.error('Biometric Login Error:', error);
    throw error;
  }
};
