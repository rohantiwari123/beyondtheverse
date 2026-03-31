import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// GitHub aur Codespaces ke liye HashRouter sabse safe hai
import { HashRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';

// 🌟 NAYA: AuthProvider import kiya (Yahi sabse zaroori hai!)
import { AuthProvider } from './context/AuthContext';

// 🌟 Advanced Error Boundary 🌟
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("🚨 Beyond The Verse Error Log:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-center p-4 font-[Poppins] antialiased">
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-slate-200 max-w-md w-full border border-slate-100">
            <div className="h-20 w-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-triangle-exclamation text-4xl text-rose-500"></i>
            </div>
            <h1 className="text-2xl font-black text-slate-800 mb-2 leading-tight">Oops! Something <br/>went wrong.</h1>
            <p className="text-slate-500 mb-8 text-sm font-medium">Don't worry, our system has logged the error. Let's get you back on track.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl w-full transition-all active:scale-[0.98] shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
            >
              Refresh Page <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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
      <HashRouter>
        {/* 🌟 NAYA: Puri App ko AuthProvider ke andar lapet diya hai! 🌟 */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>
);
