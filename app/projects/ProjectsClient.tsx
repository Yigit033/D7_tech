'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '@/components/common/SectionLabel';
import ProjectCard from '@/components/projects/ProjectCard';
import { projects, Project } from '@/lib/data/projects';

type FilterCategory = 'all' | Project['category'];

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Autonomous Systems', value: 'autonomous-systems' },
  { label: 'Sensing', value: 'sensing' },
  { label: 'AI / ML', value: 'ai-ml' },
];

export default function ProjectsClient() {
  const [active, setActive] = useState<FilterCategory>('all');

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-[#020409]">
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden" aria-labelledby="projects-heading">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel label="// RESEARCH & ENGINEERING" className="mb-5" />
            <h1 id="projects-heading" className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4">
              Projects
            </h1>
            <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              From IEEE-published radar research to EU-funded autonomous ships — our projects span the intersection of advanced sensing, autonomy, and AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="border-y border-[#1a2540] bg-[#0a0f1e]/50 sticky top-16 z-30 backdrop-blur-sm" role="toolbar" aria-label="Filter projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none" role="tablist">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                role="tab"
                aria-selected={active === f.value}
                className={`flex-shrink-0 px-4 py-2 rounded text-sm font-medium font-mono tracking-wide transition-all duration-200 ${
                  active === f.value
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 sm:py-16" aria-label="Project list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 text-slate-600 font-mono text-sm"
              >
                {'// No projects in this category yet.'}
              </motion.div>
            ) : (
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
