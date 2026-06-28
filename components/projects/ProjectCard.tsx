'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/data/projects';
import StatusBadge from '@/components/common/StatusBadge';
import TechTag from '@/components/common/TechTag';
import ProjectCover from '@/components/projects/ProjectCover';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = useTranslations('ProjectData');
  const tCommon = useTranslations('Common');
  const title = t(`${project.slug}.title` as any);
  const subtitle = t(`${project.slug}.subtitle` as any);

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

        <div className="relative mb-5">
          <ProjectCover src={project.coverImage} alt={project.coverImageAlt} priority={index < 2} objectFit={project.coverObjectFit} />
          <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none rounded-sm" aria-hidden="true" />
          <span className="absolute bottom-2 left-2 z-10 font-mono text-[9px] tracking-widest text-sky-500/50 uppercase pointer-events-none">
            {project.id.toUpperCase()}
          </span>
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
            {title}
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-2">
            {subtitle}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-sky-400/60 group-hover:text-sky-400 transition-colors duration-200">
            {tCommon('viewProject')}
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
