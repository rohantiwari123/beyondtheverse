import React from 'react';
import { Link } from 'react-router-dom';

// 🌟 REUSABLE STYLES DICTIONARY (Light & Dark Theme Mapped)
const styles = {
  // Main Containers
  footerWrapper: "relative pt-16 pb-8 overflow-hidden transition-colors duration-300 bg-white border-t border-slate-200 dark:bg-slate-950 dark:border-slate-900",
  decoratorLine: "absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent dark:via-teal-500/50",
  decoratorGlow: "absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none dark:bg-teal-500/10",
  
  // Text & Brand
  brandTitle: "text-xl font-bold tracking-tight text-slate-900 dark:text-white",
  brandAccent: "text-teal-600 dark:text-teal-400",
  description: "text-sm leading-relaxed max-w-sm text-slate-600 dark:text-slate-400",
  sectionTitle: "text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white",
  
  // Buttons & Links
  socialBtn: "h-9 w-9 rounded-lg flex items-center justify-center transition-all bg-slate-50 border border-slate-200 text-slate-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-teal-900/30 dark:hover:text-teal-400 dark:hover:border-teal-700",
  linkItem: "text-sm transition-colors flex items-center gap-2 group text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400",
  linkDot: "h-1 w-1 rounded-full transition-colors bg-slate-300 group-hover:bg-teal-500 dark:bg-slate-700 dark:group-hover:bg-teal-400",
  
  // Bottom Bar
  bottomBar: "pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 border-slate-200 dark:border-slate-800/80",
  bottomText: "text-xs text-slate-500 dark:text-slate-400",
  bottomLink: "hover:text-slate-900 transition-colors dark:hover:text-white",
  liveBadge: "flex items-center gap-2 px-3 py-1 rounded-full border bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800",
  liveBadgeText: "text-[10px] font-medium text-slate-500 dark:text-slate-400"
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Navigation",
      links: [
        { name: "Home", path: "/" },
        { name: "About Initiative", path: "/about" },
        { name: "Research Papers", path: "/research" },
        { name: "Digital Library", path: "/library" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Global Verse", path: "/community" },
        { name: "Academy / Exams", path: "/exam" },
        { name: "Framework", path: "/framework" },
        { name: "Donations", path: "/donate" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
        { name: "Help Center / FAQ", path: "/faq" },
      ]
    }
  ];

  return (
    <footer className={styles.footerWrapper}>
      {/* Background Decoration */}
      <div className={styles.decoratorLine}></div>
      <div className={styles.decoratorGlow}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="h-10 w-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-atom text-white text-xl"></i>
              </div>
              <span className={styles.brandTitle}>
                Beyond <span className={styles.brandAccent}>The Verse</span>
              </span>
            </Link>
            <p className={styles.description}>
              Exploring the ultimate reality by bridging the gap between rigorous scientific logic and deep philosophical consciousness. Join our global community of thinkers.
            </p>
            <div className="flex gap-4">
              {['twitter', 'github', 'discord', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className={styles.socialBtn}
                  aria-label={social}
                >
                  <i className={`fa-brands fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className={styles.sectionTitle}>{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className={styles.linkItem}>
                      <span className={styles.linkDot}></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomText}>
            © {currentYear} <span className="font-medium text-slate-800 dark:text-slate-200">Beyond The Verse</span>. All rights reserved.
          </div>
          <div className={`flex items-center gap-6 ${styles.bottomText}`}>
            <Link to="/security" className={styles.bottomLink}>Security</Link>
            <Link to="/privacy" className={styles.bottomLink}>Privacy</Link>
            <Link to="/terms" className={styles.bottomLink}>Terms</Link>
            
            <div className={styles.liveBadge}>
              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className={styles.liveBadgeText}>System Live</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}