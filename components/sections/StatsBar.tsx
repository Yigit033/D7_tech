'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: Stat[] = [
  { value: 900, suffix: '+', label: 'Subscribers' },
  { value: 4, suffix: '', label: 'Active Projects' },
  { value: 3, suffix: '', label: 'IEEE Publications' },
  { value: 1, suffix: '', prefix: 'EU', label: 'ITEA Funded Program' },
];

function CountUp({ target, suffix, prefix }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;

    const duration = 1800;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.ceil((step / steps) * target), target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-mono font-bold text-3xl sm:text-4xl text-sky-400 tabular-nums" aria-label={`${prefix ? prefix + ' ' : ''}${target}${suffix}`}>
      {prefix && <span className="text-slate-300 mr-1 text-2xl sm:text-3xl">{prefix}</span>}
      {count}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function StatsBar() {
  return (
    <section className="bg-[#0a0f1e] border-y border-[#1a2540]" aria-label="Key statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center gap-2 group"
              variants={itemVariants}
            >
              <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-slate-500 uppercase">
                {stat.label}
              </span>
              <div className="h-px w-8 bg-sky-500/30 group-hover:w-14 transition-all duration-500" aria-hidden="true" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
