'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/common/SectionLabel';

export default function Newsletter() {
  const t = useTranslations('Newsletter');

  return (
    <section className="py-20 sm:py-28 bg-[#020409] relative overflow-hidden" aria-labelledby="connect-heading">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      {/* Subtle radial highlight */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(14,165,233,0.04),transparent)]"
        aria-hidden="true"
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SectionLabel label={t('sectionLabel')} className="justify-center mb-6" />

          <h2 id="connect-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mb-4">
            {t('heading')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/company/d7-technology/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-[#020409] font-semibold text-sm rounded transition-all duration-200 glow-cyan-sm hover:glow-cyan focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020409]"
            >
              <Linkedin size={15} aria-hidden="true" />
              {t('followLinkedin')}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-sky-500/30 hover:border-sky-500/70 text-sky-300 hover:text-sky-100 font-medium text-sm rounded transition-all duration-200 hover:bg-sky-500/5 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020409]"
            >
              {t('getInTouch')}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-8 font-mono text-[10px] tracking-widest text-slate-700 uppercase">
            d7tech.net · Istanbul, Turkiye
          </p>
        </motion.div>
      </div>
    </section>
  );
}
