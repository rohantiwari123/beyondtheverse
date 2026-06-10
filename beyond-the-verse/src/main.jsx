import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// 🌟 FIX: HashRouter हटाकर BrowserRouter इम्पोर्ट किया
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// PWA Registration
import { registerSW } from 'virtual:pwa-register';

// 🌟 NAYA: AuthProvider import kiya (Yahi sabse zaroori hai!)
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Register Service Worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

// 🌟 Advanced Error Boundary 🌟
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // FIX 1: error variable ko null set kiya
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // FIX 2: error ko state mein save kiya taaki screen par dikha sakein
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("🚨 Beyond The Verse Error Log:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red", backgroundColor: "#ffe6e6", minHeight: "100vh" }}>
          <h2>Something went wrong in Exam section!</h2>

          {/* Yeh line actual error ko phone ki screen par print kar degi 👇 */}
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>
            🚨 Error: {this.state.error ? this.state.error.message : "Unknown Error"}
          </p>
          <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
            (Is error ka screenshot le lijiye)
          </p>
        </div>
      );
    }

    // FIX 3: Agar koi error nahi hai, toh normal app chalne do
    return this.props.children;
  }
} // FIX 4: Class yahan properly close ki

// Pro-level Console Message
console.log(
  "%c🌌 Beyond The Verse is Active!",
  "color: #0d9488; font-size: 18px; font-weight: 900; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);"
);
console.log(
  "%cBuilt with passion for education.",
  "color: #64748b; font-size: 12px;"
);

// App Render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      {/* 🌟 FIX: Dynamic basename detection for local and GitHub Pages support */}
      <BrowserRouter basename={window.location.pathname.startsWith('/beyondtheverse') ? '/beyondtheverse' : '/'}>
        {/* 🌟 NAYA: Puri App ko AuthProvider ke andar lapet diya hai! 🌟 */}
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);