import React from 'react';
import { Link } from 'react-router-dom';

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
    <footer className="relative bg-slate-900 text-slate-400 pt-16 pb-8 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-atom text-white text-xl"></i>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Beyond <span className="text-teal-400">The Verse</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Exploring the ultimate reality by bridging the gap between rigorous scientific logic and deep philosophical consciousness. Join our global community of thinkers.
            </p>
            <div className="flex gap-4">
              {['twitter', 'github', 'discord', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all border border-slate-700 hover:border-teal-400"
                >
                  <i className={`fa-brands fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="h-1 w-1 bg-slate-700 group-hover:bg-teal-400 rounded-full transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs">
            © {currentYear} <span className="text-white font-medium">Beyond The Verse</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-xs">
            <Link to="/privacy" className="hover:text-white transition-colors">Security</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-medium text-slate-300">System Live</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
