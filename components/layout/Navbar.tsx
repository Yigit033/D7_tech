'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  // Store scroll position for iOS-compatible scroll lock
  const scrollYRef = useRef(0);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const navLinks = [
    { label: t('projects'), href: '/projects' },
    { label: t('about'), href: '/about' },
  ];

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  // iOS-compatible scroll lock: body position:fixed preserves fixed children correctly
  useEffect(() => {
    if (mobileOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) closeMobile();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, closeMobile]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // Mobile: always has a background so the navbar is visually grounded (prevents
  // the "transparent bar scrolling through content" illusion on iOS/Android).
  // Desktop: transparent at top, frosted glass when scrolled.
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#020409]/95 backdrop-blur-md border-b border-[#1a2540]'
          : 'bg-[#020409]/85 border-b border-[#1a2540]/40 sm:bg-transparent sm:border-b-0'
      }`}
      role="navigation"
      aria-label={t('mainNavAriaLabel')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group relative z-10"
            aria-label={t('logoAriaLabel')}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded border border-sky-500/40 bg-sky-500/10 group-hover:border-sky-500/70 group-hover:bg-sky-500/15 transition-all duration-200">
              <span className="font-mono font-bold text-sky-400 text-base leading-none select-none">
                D7
              </span>
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase hidden sm:block group-hover:text-slate-300 transition-colors">
              Technology
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-sky-400'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-sky-500" aria-hidden="true" />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-4 py-2 text-sm font-medium bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded hover:bg-sky-500/20 hover:border-sky-500/60 transition-all duration-200"
            >
              {t('getInTouch')}
            </Link>

            {/* Language switcher */}
            <div className="ml-3 flex items-center gap-0.5 font-mono text-[11px] tracking-wider border-l border-[#1a2540] pl-3">
              <Link
                href={pathname}
                locale="tr"
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  locale === 'tr' ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                aria-label="Türkçe"
              >
                TR
              </Link>
              <span className="text-slate-700 select-none">|</span>
              <Link
                href={pathname}
                locale="en"
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  locale === 'en' ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                aria-label="English"
              >
                EN
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative z-10 p-2 text-slate-400 hover:text-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — max-h collapse so it takes zero layout space when closed */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`md:hidden overflow-hidden bg-[#020409] transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        role="menu"
        aria-hidden={!mobileOpen}
      >
        {/* border-t lives inside so it's clipped during the height animation */}
        <div className="border-t border-[#1a2540] px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className={`block px-3 py-2.5 text-sm font-medium rounded transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-sky-400 bg-sky-500/10'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
              aria-current={isActive(link.href) ? 'page' : undefined}
              onClick={closeMobile}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            role="menuitem"
            className="block mt-3 px-3 py-2.5 text-center text-sm font-medium bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded hover:bg-sky-500/20 transition-all duration-200"
            onClick={closeMobile}
          >
            {t('getInTouch')}
          </Link>

          {/* Mobile language switcher */}
          <div className="mt-3 pt-3 border-t border-[#1a2540] flex items-center gap-1 font-mono text-xs">
            <Link
              href={pathname}
              locale="tr"
              onClick={closeMobile}
              className={`px-3 py-1.5 rounded transition-colors duration-200 ${
                locale === 'tr' ? 'text-sky-400 bg-sky-500/10' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              TR
            </Link>
            <span className="text-slate-700 select-none">|</span>
            <Link
              href={pathname}
              locale="en"
              onClick={closeMobile}
              className={`px-3 py-1.5 rounded transition-colors duration-200 ${
                locale === 'en' ? 'text-sky-400 bg-sky-500/10' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
