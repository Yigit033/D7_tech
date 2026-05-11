import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionLabel from '@/components/common/SectionLabel';
import StatusBadge from '@/components/common/StatusBadge';
import TechTag from '@/components/common/TechTag';
import PublicationCard from '@/components/projects/PublicationCard';
import { getProjectBySlug } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Multi-Static Radar Systems',
  description:
    'Spatially distributed radar for multi-target tracking and spatial diversity — IEEE RadarConf25 research by D7 Technology.',
  openGraph: {
    title: 'Multi-Static Radar Systems | D7 Technology',
    description: 'Spatially distributed radar for multi-target tracking and spatial diversity.',
    type: 'article',
  },
};

function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div
      className="relative w-full aspect-video rounded-sm bg-[#0a0f1e] border border-[#1a2540] overflow-hidden flex flex-col items-center justify-center gap-3"
      role="img"
      aria-label={caption}
    >
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <span className="relative z-10 font-mono text-[10px] sm:text-xs text-sky-500/40 tracking-widest uppercase">
        [ Image Placeholder ]
      </span>
      <span className="relative z-10 text-[10px] sm:text-xs text-slate-600 text-center px-4">{caption}</span>
    </div>
  );
}

export default function MultistaticPage() {
  const project = getProjectBySlug('multistatic')!;

  return (
    <article className="min-h-screen bg-[#020409]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 sm:pb-24">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200 mb-10 font-mono"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-widest text-sky-500/50 uppercase">PRJ-003</span>
            <StatusBadge status={project.status} />
          </div>

          <SectionLabel label="// SENSING · TARGET TRACKING" className="mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-3">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TechTag key={tag} tag={tag} />
            ))}
          </div>
        </header>

        <div className="h-px bg-[#1a2540] mb-12" aria-hidden="true" />

        {/* Overview */}
        <section className="mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-xl font-semibold text-slate-100 mb-4">Overview</h2>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            Multi-static radar uses separated transmitters and receivers to observe targets from multiple aspect angles, improving detection robustness for low-RCS (Radar Cross Section) targets and reducing sensitivity to clutter, interference, and stealth shaping. By exploiting spatial diversity, multi-static configurations overcome fundamental limitations of monostatic radar and provide richer measurement geometry for target tracking and classification.
          </p>
        </section>

        {/* Simulation Map */}
        <section className="mb-12" aria-labelledby="simulation-heading">
          <h2 id="simulation-heading" className="text-xl font-semibold text-slate-100 mb-4">
            Simulation Map
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
            Simulation environments model the geometric distribution of radar nodes, target trajectories, and measurement uncertainty. Monte Carlo trials across diverse target scenarios are used to validate plot fusion algorithms and assess tracking performance metrics including detection probability, false alarm rate, and positional accuracy.
          </p>
          <ImagePlaceholder caption="Multi-static radar simulation map — node distribution and target tracking scenario" />
        </section>

        {/* Demo Video */}
        <section className="mb-12" aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="text-xl font-semibold text-slate-100 mb-4">
            Multi-Static Systems Demo
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
            The following demonstration illustrates the multi-static radar system processing pipeline, including plot-level data fusion, track initiation, and multi-target tracking performance in a simulated scenario.
          </p>
          <div className="relative w-full aspect-video rounded-sm border border-[#1a2540] overflow-hidden bg-[#0a0f1e]">
            <iframe
              src={project.youtubeEmbed}
              title="Multi-Static Radar Demo"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Publications */}
        {project.publications && project.publications.length > 0 && (
          <section aria-labelledby="publications-heading">
            <div className="h-px bg-[#1a2540] mb-8" aria-hidden="true" />
            <SectionLabel label="// IEEE PUBLICATIONS" className="mb-5" />
            <h2 id="publications-heading" className="sr-only">Publications</h2>
            <div className="space-y-4">
              {project.publications.map((pub, i) => (
                <PublicationCard key={i} publication={pub} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
