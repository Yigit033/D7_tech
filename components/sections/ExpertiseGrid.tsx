'use client';

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

interface Expertise {
  icon: React.ElementType;
  title: string;
  description: string;
  id: string;
}

const expertiseList: Expertise[] = [
  {
    id: '01',
    icon: Radio,
    title: 'Sensor Systems & IoT',
    description:
      'Design and deployment of distributed sensor networks, edge devices, and IoT architectures for real-time data acquisition and monitoring.',
  },
  {
    id: '02',
    icon: Navigation,
    title: 'Autonomous Vehicles',
    description:
      'Development of autonomous platforms including ground, surface, and maritime vehicles, covering perception, navigation, and decision making.',
  },
  {
    id: '03',
    icon: Cpu,
    title: 'Radar & Sonar Systems',
    description:
      'Signal processing, detection, and tracking algorithms for radar and sonar-based sensing in complex and cluttered environments.',
  },
  {
    id: '04',
    icon: Layers,
    title: 'Sensor Fusion & Target Tracking',
    description:
      'Multi-sensor data fusion and target tracking solutions using probabilistic filtering and AI-based approaches for robust situational awareness.',
  },
  {
    id: '05',
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Application of machine learning and AI methods for perception, anomaly detection, prediction, and intelligent decision support.',
  },
  {
    id: '06',
    icon: Wrench,
    title: 'System Integration & Prototyping',
    description:
      'End-to-end integration of sensors, algorithms, and platforms — from simulation to real-world prototyping and field testing.',
  },
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
          <SectionLabel label="// 01 — CAPABILITIES" className="mb-4" />
          <h2 id="expertise-heading" className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight max-w-xl">
            Areas of Expertise
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            From signal processing to autonomous navigation — our capabilities span the full stack of advanced sensing and intelligent systems.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {expertiseList.map((item) => (
            <ExpertiseCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExpertiseCard({ item }: { item: Expertise }) {
  const Icon = item.icon;

  return (
    <motion.article
      variants={cardVariants}
      className="group relative p-5 sm:p-6 rounded-sm bg-[#0a0f1e] border border-[#1a2540] hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)]"
    >
      {/* Corner brackets */}
      <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-500/20 group-hover:border-sky-500/50 transition-colors" aria-hidden="true" />
      <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-sky-500/20 group-hover:border-sky-500/50 transition-colors" aria-hidden="true" />

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:bg-sky-500/15 group-hover:border-sky-500/40 transition-all duration-300">
          <Icon size={18} className="text-sky-400" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[9px] text-sky-500/50 tracking-widest" aria-hidden="true">
              SYS:{item.id}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-slate-100 mb-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
