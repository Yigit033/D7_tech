'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Instagram, ExternalLink } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  projects: [
    { label: 'Wearable Sensors', href: '/projects/wearable-sensors' },
    { label: 'ADVISOR ASV', href: '/projects/advisor' },
    { label: 'Multi-Static Radar', href: '/projects/multistatic' },
    { label: 'Underwater Gliders', href: '/projects/underwater-gliders' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'Twitter / X', href: 'https://twitter.com', icon: Twitter },
    { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1a2540] bg-[#020409] overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group" aria-label="D7 Technology — Home">
              <div className="flex items-center justify-center w-9 h-9 rounded border border-sky-500/40 bg-sky-500/10 group-hover:border-sky-500/70 transition-colors">
                <span className="font-mono font-bold text-sky-400 text-base select-none">D7</span>
              </div>
              <span className="font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase">
                Technology
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Designing intelligent autonomous platforms and advanced sensing technologies for real-world applications.
            </p>
            <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
              <span className="font-mono text-[10px] text-sky-500/60 tracking-widest">
                {'// SYS:ONLINE'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[11px] tracking-widest text-slate-500 uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-mono text-[11px] tracking-widest text-slate-500 uppercase mb-4">
              Projects
            </h4>
            <ul className="space-y-2.5" role="list">
              {footerLinks.projects.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[11px] tracking-widest text-slate-500 uppercase mb-4">
              Connect
            </h4>
            <ul className="space-y-3" role="list">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200 group"
                  >
                    <link.icon size={14} className="text-sky-500/60 group-hover:text-sky-400 transition-colors" aria-hidden="true" />
                    {link.label}
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-40 transition-opacity" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-[#1a2540]">
              <p className="text-xs text-slate-600 font-mono">d7tech.net</p>
              <p className="text-xs text-slate-600 mt-1">Istanbul, Turkiye</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a2540] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} D7 Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
