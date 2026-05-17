# Beyond the Verse Security Policy

This document outlines the security measures implemented on the Beyond the Verse platform and provides a roadmap for further hardening based on industry fundamentals.

## 🛡️ Security Scorecard

| Fundamental | Implementation Status | Technical Detail |
| :--- | :--- | :--- |
| **SSL/TLS Encryption** | ✅ **Active** | Handled automatically by Vercel Edge Network. |
| **Keep Software Updated** | ✅ **Active** | Regular `npm audit` and vulnerability patching. |
| **Limit Admin Access** | ✅ **Active** | Role-based authentication enforced via Firestore Rules. |
| **Strong Authentication** | ✅ **Active** | Complex password rules + Email OTP verification during signup. |
| **Block Brute Force** | ✅ **Active** | `express-rate-limit` enforced on all backend API routes. |
| **Secure Database** | ✅ **Active** | Comprehensive Firestore & Storage Security Rules. |
| **Regular Backups** | ✅ **Active** | Python-based Firestore Export tool provided in `python_tools/`. |
| **Input Validation** | ⚠️ **Partial** | Client-side validation active; Server-side validation recommended for all POST routes. |
| **Firewall (WAF)** | ✅ **Active** | Protected by Vercel's built-in firewall and DDoS mitigation. |

---

## 🛠️ Security Tools Provided

### 1. Database Backup Tool (`firebase_backup.py`)
To fulfill the requirement for **Regular Backups**, we have provided a Python tool that exports your entire database to encrypted-ready JSON files.
- **Location:** `python_tools/firebase_backup.py`
- **Usage:** Requires a `serviceAccountKey.json`. Run weekly to ensure data redundancy.

### 2. Backend Security Headers
We use **Helmet.js** to set secure HTTP headers:
- `Content-Security-Policy` (CSP)
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options: DENY`

---

## 📝 Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an e-mail to **security@beyondtheverse.org**. All security vulnerabilities will be promptly addressed.

Please include the following in your report:
- Type of issue (e.g., XSS, SQLi, Auth bypass)
- Steps to reproduce
- Potential impact

---

## 🚀 Future Security Roadmap
- [ ] **Turnstile Integration:** Adding Cloudflare Turnstile to the Login/Signup forms to block bot-driven brute force.
- [ ] **Firebase App Check:** Implementing App Check to ensure only our authorized frontend can talk to the database.
- [ ] **MFA for Admins:** Enforcing Hardware/App-based Multi-Factor Authentication for all Admin roles.
