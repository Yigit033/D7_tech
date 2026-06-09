'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/common/SectionLabel';
import StatusBadge from '@/components/common/StatusBadge';
import TechTag from '@/components/common/TechTag';
import { projects } from '@/lib/data/projects';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function FeaturedProjects() {
  const t = useTranslations('FeaturedProjects');
  const tProject = useTranslations('ProjectData');

  return (
    <section className="py-20 sm:py-28 bg-[#0a0f1e] relative overflow-hidden" aria-labelledby="featured-projects-heading">
      <div className="absolute inset-0 grid-bg-sm opacity-30" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-14 flex-wrap gap-4"
        >
          <div>
            <SectionLabel label={t('sectionLabel')} className="mb-4" />
            <h2 id="featured-projects-heading" className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
              {t('heading')}
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
              {t('description')}
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 font-medium transition-colors duration-200"
          >
            {t('allProjects')}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project) => {
            const title = tProject(`${project.slug}.title` as any);
            const subtitle = tProject(`${project.slug}.subtitle` as any);
            return (
              <motion.div key={project.id} variants={cardVariants}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 p-4 sm:p-5 lg:p-6 rounded-sm bg-[#020409] border border-[#1a2540] border-l-4 border-l-sky-500/40 hover:border-l-sky-500 hover:border-[#1a2540]/80 hover:shadow-[0_0_25px_rgba(14,165,233,0.06)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020409]"
                >
                  {/* Project ID */}
                  <div className="flex-shrink-0 w-16 hidden sm:block">
                    <span className="font-mono text-[11px] tracking-widest text-sky-500/50 uppercase">
                      {project.id.toUpperCase()}
                    </span>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <TechTag key={tag} tag={tag} />
                      ))}
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-sky-300 transition-colors leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {subtitle}
                    </p>
                  </div>

                  {/* Status + arrow */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <StatusBadge status={project.status} />
                    <ArrowRight
                      size={16}
                      className="text-sky-500/40 group-hover:text-sky-400 group-hover:translate-x-1 transition-all duration-200"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
