'use client';

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const RadarScene = dynamic(() => import('@/components/three/RadarScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" aria-hidden="true" />,
});

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const t = useTranslations('Hero');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const headline = t('headline');
  const words = headline.split(' ');

  const tickerItems = [
    t('ticker.sensorFusion'),
    t('ticker.autonomousVehicles'),
    t('ticker.radarSonar'),
    t('ticker.aiMl'),
    t('ticker.wearableSensors'),
    t('ticker.systemIntegration'),
    t('ticker.perceptionSystems'),
    t('ticker.deepTechRd'),
  ];

  return (
    <section
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#020409]"
      aria-label="Hero"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#020409_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Three.js canvas */}
      <div className="absolute inset-0 opacity-50 sm:opacity-60" aria-hidden="true">
        <Suspense fallback={null}>
          <RadarScene />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* System label */}
        {mounted && (
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="h-px w-8 sm:w-12 bg-sky-500/40" aria-hidden="true" />
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-sky-400/70 uppercase">
              {t('label')}
            </span>
            <span className="h-px w-8 sm:w-12 bg-sky-500/40" aria-hidden="true" />
          </motion.div>
        )}

        {/* Headline */}
        <h1 className="text-center max-w-3xl mx-auto mb-8" aria-label={headline}>
          <span className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.15]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={mounted ? 'visible' : 'hidden'}
                className={
                  i === 0
                    ? 'text-gradient-cyan'
                    : i === 1
                    ? 'text-sky-100'
                    : 'text-slate-200'
                }
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-slate-400 text-base sm:text-lg max-w-xl text-center mb-10 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate={mounted ? 'visible' : 'hidden'}
          transition={{ delay: 1.2 }}
        >
          {t('subtext')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={fadeUp}
          initial="hidden"
          animate={mounted ? 'visible' : 'hidden'}
          transition={{ delay: 1.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-[#020409] font-semibold text-sm rounded transition-all duration-200 glow-cyan-sm hover:glow-cyan focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020409]"
          >
            {t('viewProjects')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-sky-500/40 hover:border-sky-500/80 active:border-sky-500 text-sky-300 hover:text-sky-100 font-medium text-sm rounded transition-all duration-200 hover:bg-sky-500/5 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020409]"
          >
            {t('contactUs')}
          </Link>
        </motion.div>
      </div>

      {/* Ticker */}
      <div
        className="relative z-10 border-t border-[#1a2540] bg-[#0a0f1e]/60 backdrop-blur-sm py-3 overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap ticker-animate">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-6">
              <span className="font-mono text-[11px] tracking-widest text-sky-500/50 uppercase">
                {item}
              </span>
              <span className="text-sky-500/20 text-xs">&bull;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10" aria-hidden="true">
        <span className="font-mono text-[9px] tracking-widest text-slate-600 uppercase">{t('scroll')}</span>
        <ChevronDown size={14} className="text-slate-600 animate-bounce" />
      </div>
    </section>
  );
}
