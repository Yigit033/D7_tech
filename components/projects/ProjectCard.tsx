'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/data/projects';
import StatusBadge from '@/components/common/StatusBadge';
import TechTag from '@/components/common/TechTag';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex flex-col p-5 sm:p-6 rounded-sm bg-[#0a0f1e] border border-[#1a2540] border-t-2 border-t-sky-500/40 hover:border-t-sky-500 hover:border-[#1a2540]/80 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020409] h-full"
      >
        {/* Corner brackets */}
        <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-sky-500/20 group-hover:border-sky-500/50 transition-colors" aria-hidden="true" />
        <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-sky-500/20 group-hover:border-sky-500/50 transition-colors" aria-hidden="true" />

        {/* Image placeholder */}
        <div className="relative w-full aspect-video rounded-sm bg-[#020409] border border-[#1a2540] mb-5 overflow-hidden flex items-center justify-center" aria-hidden="true">
          <div className="grid-bg absolute inset-0 opacity-60" />
          <div className="relative z-10 flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest text-sky-500/30 uppercase">
              {project.id.toUpperCase()}
            </span>
            <span className="w-8 h-px bg-sky-500/20" />
            <span className="font-mono text-[9px] text-slate-600 uppercase tracking-wider">
              Visual Placeholder
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020409]/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className="font-mono text-[10px] tracking-widest text-sky-500/50">
              {project.id.toUpperCase()}
            </span>
            <StatusBadge status={project.status} />
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <TechTag key={tag} tag={tag} />
            ))}
          </div>

          <h3 className="text-base font-semibold text-slate-100 group-hover:text-sky-300 transition-colors leading-snug mb-1.5">
            {project.title}
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-2">
            {project.subtitle}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-sky-400/60 group-hover:text-sky-400 transition-colors duration-200">
            View Project
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
