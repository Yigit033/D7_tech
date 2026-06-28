import type { Metadata } from 'next';
import Image from 'next/image';
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
  const t = await getTranslations({ locale: params.locale, namespace: 'AdvisorPage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: { title: t('metadata.title'), description: t('metadata.description'), type: 'article' },
    alternates: getAlternates('/projects/advisor'),
  };
}

export default async function AdvisorPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'AdvisorPage' });
  const tCommon = await getTranslations({ locale: params.locale, namespace: 'Common' });
  const project = getProjectBySlug('advisor')!;

  const sensors = [
    { name: 'IMU', full: t('imuFull'), desc: t('imuDesc') },
    { name: 'GNSS', full: t('gnssFull'), desc: t('gnssDesc') },
    { name: 'Camera', full: t('cameraFull'), desc: t('cameraDesc') },
    { name: 'LiDAR', full: t('lidarFull'), desc: t('lidarDesc') },
    { name: 'RADAR', full: t('radarFull'), desc: t('radarDesc') },
    { name: 'MET', full: t('metFull'), desc: t('metDesc') },
  ];

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
            <span className="font-mono text-[10px] text-emerald-400/60 tracking-wider">
              {project.startDate} — {t('present')}
            </span>
          </div>
          <SectionLabel label={t('sectionLabel')} className="mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-3">{t('title')}</h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6">{t('subtitle')}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => <TechTag key={tag} tag={tag} />)}
          </div>
          <div className="mt-8">
            <ProjectCover src={project.coverImage} alt={project.coverImageAlt} priority sizes="(max-width: 896px) 100vw, 896px" />
          </div>
        </header>

        <div className="h-px bg-[#1a2540] mb-12" aria-hidden="true" />

        <section className="mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-xl font-semibold text-slate-100 mb-4">{t('overviewTitle')}</h2>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{t('overviewText')}</p>
        </section>

        <section className="mb-12" aria-labelledby="field-trial-heading">
          <h2 id="field-trial-heading" className="text-xl font-semibold text-slate-100 mb-4">{t('fieldTrialTitle')}</h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">{t('fieldTrialText')}</p>
          <figure className="m-0">
            <div className="relative w-full aspect-video rounded-sm bg-[#0a0f1e] border border-[#1a2540] overflow-hidden">
              <Image src="/images/projects/advisor_field_trial.png" alt={t('fieldTrialImageAlt')} fill className="object-contain" sizes="(max-width: 896px) 100vw, 896px" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020409]/50 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <figcaption className="mt-3 text-xs text-slate-600 text-center sm:text-left">{t('fieldTrialCaption')}</figcaption>
          </figure>
        </section>

        <section className="mb-12" aria-labelledby="navigation-heading">
          <h2 id="navigation-heading" className="text-xl font-semibold text-slate-100 mb-4">{t('navTitle')}</h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">{t('navText')}</p>
          <div className="rounded-sm border border-[#1a2540] overflow-hidden" role="table" aria-label={t('sensorTableLabel')}>
            <div className="grid grid-cols-[70px_1fr_1fr] bg-[#0a0f1e] border-b border-[#1a2540]" role="row">
              <div className="px-4 py-2.5 font-mono text-[10px] tracking-widest text-slate-600 uppercase" role="columnheader">{t('sensorColSensor')}</div>
              <div className="px-4 py-2.5 font-mono text-[10px] tracking-widest text-slate-600 uppercase" role="columnheader">{t('sensorColSystem')}</div>
              <div className="px-4 py-2.5 font-mono text-[10px] tracking-widest text-slate-600 uppercase" role="columnheader">{t('sensorColFunction')}</div>
            </div>
            {sensors.map((s, i) => (
              <div key={s.name} className={`grid grid-cols-[70px_1fr_1fr] ${i % 2 === 0 ? 'bg-[#020409]' : 'bg-[#0a0f1e]/40'} border-b border-[#1a2540]/50 last:border-0`} role="row">
                <div className="px-4 py-3 font-mono text-xs text-sky-400 font-semibold" role="cell">{s.name}</div>
                <div className="px-4 py-3 text-xs text-slate-300" role="cell">{s.full}</div>
                <div className="px-4 py-3 text-xs text-slate-500" role="cell">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12" aria-labelledby="bathymetry-heading">
          <h2 id="bathymetry-heading" className="text-xl font-semibold text-slate-100 mb-4">{t('bathyTitle')}</h2>
          <p className="text-slate-400 leading-relaxed mb-4 text-sm sm:text-base">{t('bathyText1')}</p>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{t('bathyText2')}</p>
        </section>
      </div>
    </article>
  );
}
