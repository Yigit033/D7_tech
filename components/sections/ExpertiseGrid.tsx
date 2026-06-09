'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Radio,
  Navigation,
  Layers,
  Brain,
  Wrench,
  Cpu,
} from 'lucide-react';
import SectionLabel from '@/components/common/SectionLabel';

type ExpertiseKey = 'sensorSystems' | 'autonomousVehicles' | 'radarSonar' | 'sensorFusion' | 'aiMl' | 'systemIntegration';

const iconMap: Record<ExpertiseKey, React.ElementType> = {
  sensorSystems: Radio,
  autonomousVehicles: Navigation,
  radarSonar: Cpu,
  sensorFusion: Layers,
  aiMl: Brain,
  systemIntegration: Wrench,
};

const EXPERTISE_KEYS: { key: ExpertiseKey; id: string }[] = [
  { key: 'sensorSystems', id: '01' },
  { key: 'autonomousVehicles', id: '02' },
  { key: 'radarSonar', id: '03' },
  { key: 'sensorFusion', id: '04' },
  { key: 'aiMl', id: '05' },
  { key: 'systemIntegration', id: '06' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ExpertiseGrid() {
  const t = useTranslations('ExpertiseGrid');

  return (
    <section className="py-20 sm:py-28 bg-[#020409] relative overflow-hidden" aria-labelledby="expertise-heading">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <SectionLabel label={t('sectionLabel')} className="mb-4" />
          <h2 id="expertise-heading" className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight max-w-xl">
            {t('heading')}
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {EXPERTISE_KEYS.map(({ key, id }) => {
            const Icon = iconMap[key];
            return (
              <motion.article
                key={key}
                variants={cardVariants}
                className="group relative p-5 sm:p-6 rounded-sm bg-[#0a0f1e] border border-[#1a2540] hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)]"
              >
                <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-500/20 group-hover:border-sky-500/50 transition-colors" aria-hidden="true" />
                <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-sky-500/20 group-hover:border-sky-500/50 transition-colors" aria-hidden="true" />

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:bg-sky-500/15 group-hover:border-sky-500/40 transition-all duration-300">
                    <Icon size={18} className="text-sky-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[9px] text-sky-500/50 tracking-widest" aria-hidden="true">
                        SYS:{id}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-100 mb-2 leading-snug">
                      {t(`items.${key}.title` as any)}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                      {t(`items.${key}.description` as any)}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
