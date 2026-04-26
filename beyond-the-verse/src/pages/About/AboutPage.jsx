import React from 'react';
import { useNavigate } from 'react-router-dom';

// 🌟 JADOO: Saare chote components yahan import kar liye
import AboutHero from '../../components/About/AboutHero';
import AboutMission from '../../components/About/AboutMission';
import AboutPillars from '../../components/About/AboutPillars';
import AboutCTA from '../../components/About/AboutCTA';

import BackButton from '../../components/common/BackButton'; // 👈 इम्पोर्ट करें

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16 lg:space-y-24">
      
      {/* 🌟 BACK BUTTON: Premium Pill Style */}
      <BackButton />

      {/* 🌟 PAGE ASSEMBLY (Dekho kitna saaf lag raha hai!) */}
      <AboutHero />
      <AboutMission />
      <AboutPillars />
      <AboutCTA onNavigate={() => navigate('/')} />

    </div>
  );
}