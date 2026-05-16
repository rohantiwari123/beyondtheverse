import React from 'react';
import BackButton from '../../components/common/BackButton';

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <BackButton />
      
      <div className="mt-8 space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Terms of Service</h1>
          <p className="text-slate-500 text-sm sm:text-base">Last updated: May 16, 2026</p>
        </div>

        <section className="prose prose-slate max-w-none space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using Beyond the Verse, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">2. Community Guidelines</h2>
            <p className="text-slate-600 leading-relaxed">
              Our community is built on rigorous logic and mutual respect. Users are expected to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Engage in respectful and constructive dialogue.</li>
              <li>Avoid sharing misinformation or unverified pseudo-science.</li>
              <li>Respect the intellectual property of research papers and digital resources.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">3. Research and Content</h2>
            <p className="text-slate-600 leading-relaxed">
              Users retain ownership of their posts and comments. However, by posting on the platform, you grant Beyond the Verse a non-exclusive license to display and distribute your content to other community members.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">4. Donations and Exams</h2>
            <p className="text-slate-600 leading-relaxed">
              Donations are voluntary and non-refundable. Exam results are intended for personal growth and educational assessment within the community framework.
            </p>
          </div>
        </section>

        <div className="bg-slate-900 p-8 rounded-3xl text-center">
          <p className="text-slate-400 text-sm">
            For further legal inquiries, please reach out to legal@beyondtheverse.org
          </p>
        </div>
      </div>
    </div>
  );
}
