import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionLabel from '@/components/common/SectionLabel';
import StatusBadge from '@/components/common/StatusBadge';
import TechTag from '@/components/common/TechTag';
import PublicationCard from '@/components/projects/PublicationCard';
import ProjectCover from '@/components/projects/ProjectCover';
import { getProjectBySlug } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Wearable Sensors & Performance Analysis',
  description:
    'UWB and IMU-based human motion tracking and performance analysis research by D7 Technology. IEEE SIU 2025 publication.',
  openGraph: {
    title: 'Wearable Sensors & Performance Analysis | D7 Technology',
    description: 'UWB and IMU-based human motion tracking and performance analysis.',
    type: 'article',
  },
};

function SectionFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="m-0">
      <div className="relative w-full aspect-video rounded-sm bg-[#0a0f1e] border border-[#1a2540] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 896px) 100vw, 896px"
        />
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020409]/50 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>
      <figcaption className="mt-3 text-xs text-slate-600 text-center sm:text-left">{caption}</figcaption>
    </figure>
  );
}

export default function WearableSensorsPage() {
  const project = getProjectBySlug('wearable-sensors')!;

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
            <span className="font-mono text-[11px] tracking-widest text-sky-500/50 uppercase">
              PRJ-001
            </span>
            <StatusBadge status={project.status} />
          </div>

          <SectionLabel label="// SENSING · HEALTH & SPORTS" className="mb-4" />
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

          <div className="mt-8">
            <ProjectCover src={project.coverImage} alt={project.coverImageAlt} priority />
          </div>
        </header>

        <div className="h-px bg-[#1a2540] mb-12" aria-hidden="true" />

        {/* Overview */}
        <section className="mb-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-xl font-semibold text-slate-100 mb-4">Overview</h2>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{project.description}</p>
        </section>

        {/* Section 1 */}
        <section className="mb-12" aria-labelledby="localization-heading">
          <h2 id="localization-heading" className="text-xl font-semibold text-slate-100 mb-4">
            Controlled Localization Test Setup
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
            A structured indoor test environment was established to validate UWB-based localization accuracy under controlled conditions. Multiple anchor nodes were positioned in a calibrated grid, enabling sub-decimeter positional accuracy measurements. IMU data was synchronized to provide complementary inertial measurements for motion state classification.
          </p>
          <SectionFigure
            src="/images/projects/controlled_localization.jpg"
            alt="Workstation display showing a precision localization and tracking interface used in controlled indoor tests"
            caption="Controlled localization test environment with UWB anchor placement"
          />
        </section>

        {/* Section 2 */}
        <section className="mb-12" aria-labelledby="motion-heading">
          <h2 id="motion-heading" className="text-xl font-semibold text-slate-100 mb-4">
            Data Driven Motion Evaluation
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
            Collected sensor data was processed through machine learning pipelines to classify motion states, detect anomalies such as falls, and evaluate athletic performance metrics. The fusion of UWB positional data and IMU acceleration/gyroscope readings enables robust discrimination between normal activity and fall events with high sensitivity and specificity.
          </p>
          <SectionFigure
            src="/images/projects/data_driven_motion.jpg"
            alt="Abstract visualization representing large-scale motion and sensor-derived data for analysis pipelines"
            caption="Motion evaluation pipeline — sensor fusion and ML classification results"
          />
        </section>

        {/* Section 3 */}
        <section className="mb-12" aria-labelledby="field-heading">
          <h2 id="field-heading" className="text-xl font-semibold text-slate-100 mb-4">
            Field Experiments
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
            Real-world trials were conducted in sports and healthcare settings to validate system performance outside controlled laboratory conditions. Field experiments tested the system&apos;s robustness to multipath propagation, body occlusion, and varying environmental conditions, demonstrating reliable fall detection and performance analysis in practical deployments.
          </p>
          <SectionFigure
            src="/images/projects/field_experiments.jpg"
            alt="Athlete on an indoor court wearing ankle-mounted sensors during a motion capture style field experiment"
            caption="Field experiment setup — real-world wearable sensor deployment"
          />
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
