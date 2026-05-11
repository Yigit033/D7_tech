import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionLabel from '@/components/common/SectionLabel';
import StatusBadge from '@/components/common/StatusBadge';
import TechTag from '@/components/common/TechTag';
import ProjectCover from '@/components/projects/ProjectCover';
import { getProjectBySlug } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'ADVISOR: Autonomous Surface Ship for Guidance',
  description:
    'EU ITEA Program — Escort-type Autonomous Surface Vehicle for cooperative navigation in constrained maritime environments.',
  openGraph: {
    title: 'ADVISOR ASV | D7 Technology',
    description: 'EU ITEA Program — Escort-type Autonomous Surface Vehicle.',
    type: 'article',
  },
};

const sensorSuite = [
  { name: 'IMU', full: 'Inertial Measurement Unit', desc: 'Attitude and motion estimation' },
  { name: 'GNSS', full: 'Global Navigation Satellite System', desc: 'Global positioning and velocity' },
  { name: 'Camera', full: 'Visual Perception System', desc: 'Object detection and scene understanding' },
  { name: 'LiDAR', full: '3D Laser Mapping', desc: 'High-resolution 3D environmental mapping' },
  { name: 'RADAR', full: 'Millimeter-wave Radar', desc: 'All-weather obstacle detection' },
  { name: 'MET', full: 'Meteorological Sensors', desc: 'Wind speed, direction, temperature, pressure' },
];

export default function AdvisorPage() {
  const project = getProjectBySlug('advisor')!;

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
            <span className="font-mono text-[11px] tracking-widest text-sky-500/50 uppercase">PRJ-002</span>
            <StatusBadge status={project.status} />
            <span className="font-mono text-[10px] text-emerald-400/60 tracking-wider">
              {project.startDate} — Present
            </span>
          </div>

          <SectionLabel label="// AUTONOMOUS SYSTEMS · EU ITEA" className="mb-4" />
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
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            ADVISOR is an escort-type Autonomous Surface Vehicle (ASV) developed under the EU ITEA program, focusing on autonomous guidance and cooperative navigation in constrained maritime environments including harbors and near-shore areas. The project emphasizes supervised autonomy — where human oversight coexists with automated decision-making — to enable safe, reliable operation in dynamic and cluttered waterways. Field validation is a central component of the program.
          </p>
        </section>

        {/* Field Trial Setup */}
        <section className="mb-12" aria-labelledby="field-trial-heading">
          <h2 id="field-trial-heading" className="text-xl font-semibold text-slate-100 mb-4">
            Field Trial Setup
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
            Field trials are conducted in representative maritime environments to validate navigation algorithms, sensor fusion performance, and autonomous decision-making under real operational conditions. The ASV undergoes structured test scenarios including convoy operations, obstacle avoidance, and return-to-base maneuvers.
          </p>
          <figure className="m-0">
            <div className="relative w-full aspect-video rounded-sm bg-[#0a0f1e] border border-[#1a2540] overflow-hidden">
              <Image
                src="/images/projects/advisor_field_trial.png"
                alt="Autonomous surface vehicle — Maritime Robotics platform for harbor and escort trials"
                fill
                className="object-cover object-center"
                sizes="(max-width: 896px) 100vw, 896px"
              />
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020409]/50 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
            <figcaption className="mt-3 text-xs text-slate-600 text-center sm:text-left">
              ADVISOR field trial — autonomous surface vessel in harbor environment
            </figcaption>
          </figure>
        </section>

        {/* Sensor Suite */}
        <section className="mb-12" aria-labelledby="navigation-heading">
          <h2 id="navigation-heading" className="text-xl font-semibold text-slate-100 mb-4">
            Navigation in Dynamic Environments
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
            The ADVISOR platform integrates a comprehensive multi-modal sensor suite to achieve robust situational awareness in complex, dynamic maritime environments. Sensor data is fused in real time to support obstacle detection, path planning, and adaptive navigation.
          </p>

          {/* Sensor table */}
          <div className="rounded-sm border border-[#1a2540] overflow-hidden" role="table" aria-label="Sensor suite specifications">
            <div className="grid grid-cols-[70px_1fr_1fr] bg-[#0a0f1e] border-b border-[#1a2540]" role="row">
              <div className="px-4 py-2.5 font-mono text-[10px] tracking-widest text-slate-600 uppercase" role="columnheader">Sensor</div>
              <div className="px-4 py-2.5 font-mono text-[10px] tracking-widest text-slate-600 uppercase" role="columnheader">System</div>
              <div className="px-4 py-2.5 font-mono text-[10px] tracking-widest text-slate-600 uppercase" role="columnheader">Function</div>
            </div>
            {sensorSuite.map((s, i) => (
              <div
                key={s.name}
                className={`grid grid-cols-[70px_1fr_1fr] ${
                  i % 2 === 0 ? 'bg-[#020409]' : 'bg-[#0a0f1e]/40'
                } border-b border-[#1a2540]/50 last:border-0`}
                role="row"
              >
                <div className="px-4 py-3 font-mono text-xs text-sky-400 font-semibold" role="cell">{s.name}</div>
                <div className="px-4 py-3 text-xs text-slate-300" role="cell">{s.full}</div>
                <div className="px-4 py-3 text-xs text-slate-500" role="cell">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bathymetry */}
        <section className="mb-12" aria-labelledby="bathymetry-heading">
          <h2 id="bathymetry-heading" className="text-xl font-semibold text-slate-100 mb-4">
            Bathymetry Mapping & Environmental Data Collection
          </h2>
          <p className="text-slate-400 leading-relaxed mb-4 text-sm sm:text-base">
            In addition to navigation, ADVISOR collects environmental and oceanographic data during operations. Onboard meteorological sensors continuously monitor wind speed, wind direction, air temperature, and atmospheric pressure — providing contextual data that informs route planning and maneuverability analysis.
          </p>
          <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
            Bathymetric mapping capabilities support harbor surveying and shallow-water navigation, contributing to a richer environmental model that enhances the ASV&apos;s autonomous decision-making.
          </p>
          <figure className="m-0">
            <div className="relative w-full aspect-video rounded-sm bg-[#0a0f1e] border border-[#1a2540] overflow-hidden">
              <Image
                src="/images/projects/bathymetry_mapping.jpg"
                alt="3D bathymetric map on a display: color-coded seafloor depths with survey overlays during operations"
                fill
                className="object-cover object-center"
                sizes="(max-width: 896px) 100vw, 896px"
              />
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020409]/50 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
            <figcaption className="mt-3 text-xs text-slate-600 text-center sm:text-left">
              Bathymetry and environmental data collection during field operations
            </figcaption>
          </figure>
        </section>
      </div>
    </article>
  );
}
