import React from 'react';
import BackButton from '../../components/common/BackButton';

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <BackButton />
      
      <div className="mt-8 space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 text-sm sm:text-base">Last updated: May 16, 2026</p>
        </div>

        <section className="prose prose-slate max-w-none space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">1. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed">
              At Beyond the Verse, we collect information to provide a better experience for our community. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Personal Information:</strong> Name, email address, and profile details provided during signup.</li>
              <li><strong>Usage Data:</strong> How you interact with our research papers, exams, and community posts.</li>
              <li><strong>Device Information:</strong> IP address, browser type, and operating system.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">2. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed">
              We use your data to maintain the platform, process donations, generate exam results, and send real-time notifications about community activity. We never sell your personal data to third parties.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">3. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement industry-standard security measures, including Firebase Authentication and secure Firestore rules, to protect your data from unauthorized access or disclosure.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">4. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed">
              You have the right to access, update, or delete your personal information at any time through your Profile Settings.
            </p>
          </div>
        </section>

        <div className="bg-teal-50 border border-teal-100 p-6 rounded-2xl">
          <p className="text-teal-800 text-sm italic">
            Questions about our privacy practices? Contact us at privacy@beyondtheverse.org
          </p>
        </div>
      </div>
    </div>
  );
}
