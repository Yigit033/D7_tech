import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAlternates } from '@/lib/metadata';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import SectionLabel from '@/components/common/SectionLabel';
import StatusBadge from '@/components/common/StatusBadge';
import TechTag from '@/components/common/TechTag';
import ProjectCover from '@/components/projects/ProjectCover';
import { getProjectBySlug } from '@/lib/data/projects';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'UnderwaterGlidersPage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: { title: t('metadata.title'), description: t('metadata.description'), type: 'article' },
    alternates: getAlternates('/projects/underwater-gliders'),
  };
}

export default async function UnderwaterGlidersPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'UnderwaterGlidersPage' });
  const tCommon = await getTranslations({ locale: params.locale, namespace: 'Common' });
  const project = getProjectBySlug('underwater-gliders')!;

  return (
    <article className="min-h-screen bg-[#020409]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 sm:pb-24">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200 mb-10 font-mono">
          <ArrowLeft size={14} aria-hidden="true" />
          {tCommon('backToProjects')}
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-widest text-sky-500/50 uppercase">{t('prjId')}</span>
            <StatusBadge status={project.status} />
          </div>
          <SectionLabel label={t('sectionLabel')} className="mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-3">{t('title')}</h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6">{t('subtitle')}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => <TechTag key={tag} tag={tag} />)}
          </div>
          <div className="mt-8">
            <ProjectCover src={project.coverImage} alt={project.coverImageAlt} priority />
          </div>
        </header>

        <div className="h-px bg-[#1a2540] mb-12" aria-hidden="true" />

        <div className="relative p-8 sm:p-10 rounded-sm bg-[#0a0f1e] border border-[#1a2540] border-dashed text-center">
          <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-sky-500/20" aria-hidden="true" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sky-500/20" aria-hidden="true" />
          <div className="font-mono text-[10px] tracking-widest text-amber-400/60 uppercase mb-4" aria-hidden="true">
            {t('statusLabel')}
          </div>
          <h2 className="text-xl font-semibold text-slate-300 mb-3">{t('researchTitle')}</h2>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">{t('description')}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-sky-500/50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" aria-hidden="true" />
            {t('updatesComingSoon')}
          </div>
        </div>
      </div>
    </article>
  );
}
