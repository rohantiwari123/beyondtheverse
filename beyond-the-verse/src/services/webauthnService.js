import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

// 🌟 PRODUCTION BACKEND URL
const BACKEND_URL = 'https://beyond-the-verse-production.up.railway.app'; 

const handleFetchResponse = async (response, url) => {
  const contentType = response.headers.get("content-type");
  if (!response.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server error at ${url}`);
    } else {
      throw new Error(`Server returned ${response.status} for ${url}`);
    }
  }
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Server at ${url} did not return JSON. Check if the backend is running and the URL is correct.`);
  }
  return response.json();
};

export const registerBiometric = async (uid, email) => {
  const url = `${BACKEND_URL}/api/webauthn/register-options`;
  try {
    let resp;
    try {
      resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, email }),
      });
    } catch (e) {
      throw new Error(`Failed to connect to backend at ${url}. Is the server running?`);
    }

    const options = await handleFetchResponse(resp, url);

    const attResp = await startRegistration(options);

    const verifyUrl = `${BACKEND_URL}/api/webauthn/register-verify`;
    let verifyResp;
    try {
      verifyResp = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, response: attResp }),
      });
    } catch (e) {
      throw new Error(`Failed to connect to backend at ${verifyUrl} for verification.`);
    }

    const verification = await handleFetchResponse(verifyResp, verifyUrl);
    return verification.success;
  } catch (error) {
    console.error('Biometric Registration Error:', error);
    throw error;
  }
};

export const loginBiometric = async (email) => {
  const url = `${BACKEND_URL}/api/webauthn/login-options`;
  try {
    let resp;
    try {
      resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (e) {
      throw new Error(`Failed to connect to backend at ${url}. Is the server running?`);
    }

    const options = await handleFetchResponse(resp, url);

    const asseResp = await startAuthentication(options);

    const verifyUrl = `${BACKEND_URL}/api/webauthn/login-verify`;
    let verifyResp;
    try {
      verifyResp = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, response: asseResp }),
      });
    } catch (e) {
      throw new Error(`Failed to connect to backend at ${verifyUrl} for verification.`);
    }

    const verification = await handleFetchResponse(verifyResp, verifyUrl);
    return verification.token; 
  } catch (error) {
    console.error('Biometric Login Error:', error);
    throw error;
  }
};
