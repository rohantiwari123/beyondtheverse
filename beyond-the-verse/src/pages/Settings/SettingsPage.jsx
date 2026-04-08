// src/pages/Settings/SettingsPage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import GeneralSettings from '../../components/Settings/GeneralSettings';
import SecuritySettings from '../../components/Settings/SecuritySettings';

export default function SettingsPage({ showToast }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20 pt-6 sm:pt-10">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
        
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8">
          <BackButton />
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 px-0 sm:px-6 lg:px-8">
          
          {/* 🌟 SIDEBAR / MOBILE TABS */}
          <div className="w-full md:w-64 shrink-0 px-4 sm:px-0">
            <div className="bg-white p-3 sm:p-5 sm:rounded-2xl border-b sm:border border-slate-200 md:sticky md:top-24 overflow-x-auto hide-scrollbar">
              <h2 className="hidden md:flex text-lg text-slate-800 mb-6 px-2 items-center gap-2">
                <i className="fa-solid fa-gear text-teal-600"></i> Settings
              </h2>
              <nav className="flex md:flex-col gap-2 min-w-max md:min-w-0">
                <button 
                  onClick={() => setActiveTab('general')}
                  className={`flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm text-left whitespace-nowrap ${activeTab === 'general' ? 'bg-teal-50 text-teal-700 border border-teal-100/50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}
                >
                  <i className="fa-solid fa-user w-4 sm:w-5 text-center"></i> General Profile
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm text-left whitespace-nowrap ${activeTab === 'security' ? 'bg-teal-50 text-teal-700 border border-teal-100/50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}
                >
                  <i className="fa-solid fa-shield-halved w-4 sm:w-5 text-center"></i> Security
                </button>
              </nav>
            </div>
          </div>

          {/* 🌟 MAIN CONTENT AREA */}
          <div className="flex-1 max-w-full overflow-hidden">
            {activeTab === 'general' && <GeneralSettings showToast={showToast} />}
            {activeTab === 'security' && <SecuritySettings showToast={showToast} />}
          </div>

        </div>
      </div>
    </div>
  );
}