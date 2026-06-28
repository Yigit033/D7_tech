import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAlternates } from '@/lib/metadata';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import SectionLabel from '@/components/common/SectionLabel';
import StatusBadge from '@/components/common/StatusBadge';
import TechTag from '@/components/common/TechTag';
import PublicationCard from '@/components/projects/PublicationCard';
import ProjectCover from '@/components/projects/ProjectCover';
import { getProjectBySlug } from '@/lib/data/projects';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'MultistaticPage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: { title: t('metadata.title'), description: t('metadata.description'), type: 'article' },
    alternates: getAlternates('/projects/multistatic'),
  };
}

export default async function MultistaticPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'MultistaticPage' });
  const tCommon = await getTranslations({ locale: params.locale, namespace: 'Common' });
  const project = getProjectBySlug('multistatic')!;

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
            <ProjectCover src={project.coverImage} alt={project.coverImageAlt} priority objectFit={project.coverObjectFit} />
          </div>
        </header>

        <div className="h-px bg-[#1a2540] mb-12" aria-hidden="true" />

        <section className="mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-xl font-semibold text-slate-100 mb-4">{t('overviewTitle')}</h2>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{t('overviewText')}</p>
        </section>

        <section className="mb-12" aria-labelledby="simulation-heading">
          <h2 id="simulation-heading" className="text-xl font-semibold text-slate-100 mb-4">{t('simulationTitle')}</h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">{t('simulationText')}</p>
          <figure className="m-0">
            <div className="relative w-full aspect-video rounded-sm bg-[#0a0f1e] border border-[#1a2540] overflow-hidden">
              <Image src="/images/projects/simulation_map.png" alt={t('simulationImageAlt')} fill className="object-contain object-center bg-[#0a0f1e]" sizes="(max-width: 896px) 100vw, 896px" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020409]/40 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <figcaption className="mt-3 text-xs text-slate-600 text-center sm:text-left">{t('simulationCaption')}</figcaption>
          </figure>
        </section>

        <section className="mb-12" aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="text-xl font-semibold text-slate-100 mb-4">{t('demoTitle')}</h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">{t('demoText')}</p>
          <div className="relative w-full aspect-video rounded-sm border border-[#1a2540] overflow-hidden bg-[#0a0f1e]">
            <iframe src={project.youtubeEmbed} title={t('demoIframeTitle')} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </section>

        {project.publications && project.publications.length > 0 && (
          <section aria-labelledby="publications-heading">
            <div className="h-px bg-[#1a2540] mb-8" aria-hidden="true" />
            <SectionLabel label={t('publicationsLabel')} className="mb-5" />
            <h2 id="publications-heading" className="sr-only">{tCommon('overview')}</h2>
            <div className="space-y-4">
              {project.publications.map((pub, i) => <PublicationCard key={i} publication={pub} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
