import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import SectionLabel from '@/components/common/SectionLabel';

export const metadata: Metadata = {
  title: 'Careers at D7 Technology',
  description:
    'Join D7 Technology. We are hiring Research Engineers and ML Engineers to work on autonomous systems, sensor fusion, and perception.',
  openGraph: {
    title: 'Careers at D7 Technology',
    description: 'Join our deep-tech R&D team in Istanbul, Turkiye.',
    type: 'website',
  },
};

interface Job {
  title: string;
  tags: string[];
  description: string;
  requirements: string[];
}

const jobs: Job[] = [
  {
    title: 'Research Engineer — Autonomous Systems',
    tags: ['Autonomous Vehicles', 'Navigation', 'ROS', 'C++', 'Python'],
    description:
      'Join the autonomous systems team to develop and validate navigation, planning, and control algorithms for our ASV platforms. You will work across simulation and real-world field testing.',
    requirements: [
      'Experience with ROS/ROS2 and autonomous robot development',
      'Strong foundations in probabilistic robotics, state estimation, or control theory',
      'Python and C++ proficiency',
      'Familiarity with sensor fusion (GNSS/IMU/LiDAR/Camera)',
      'Background in maritime or ground autonomy preferred',
    ],
  },
  {
    title: 'ML Engineer — Sensor Fusion & Perception',
    tags: ['Machine Learning', 'Sensor Fusion', 'PyTorch', 'Signal Processing', 'Python'],
    description:
      'Work on perception and decision-support systems that fuse data from radar, sonar, cameras, and inertial sensors. Apply deep learning and probabilistic methods to build robust real-world detection and tracking pipelines.',
    requirements: [
      'Hands-on experience with PyTorch or TensorFlow for applied ML',
      'Understanding of sensor fusion and Bayesian filtering (Kalman, particle filters)',
      'Signal processing knowledge — time/frequency domain analysis',
      'Experience with radar or sonar data is a strong plus',
      'Ability to work from research papers to production implementation',
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#020409]">
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden" aria-labelledby="careers-heading">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel label="// JOIN THE TEAM" className="mb-5" />
          <h1 id="careers-heading" className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-5">
            Careers
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            We are building serious engineering — and we need serious engineers. Work on autonomous systems, sensing, and AI problems that matter.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="h-px bg-[#1a2540] mb-12 sm:mb-16" aria-hidden="true" />

        {/* Jobs */}
        <div className="space-y-5 sm:space-y-6 mb-12 sm:mb-16" aria-label="Open positions">
          {jobs.map((job, i) => (
            <article
              key={i}
              className="group relative rounded-sm border border-[#1a2540] bg-[#0a0f1e] hover:border-sky-500/20 transition-colors duration-300 overflow-hidden"
            >
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-[#1a2540] bg-[#020409]" aria-hidden="true">
                <Terminal size={12} className="text-sky-500/50" />
                <span className="font-mono text-[10px] tracking-widest text-sky-500/50 uppercase">
                  position://{(i + 1).toString().padStart(2, '0')}
                </span>
                <div className="ml-auto flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1a2540]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1a2540]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500/30" />
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-slate-100 mb-3">{job.title}</h2>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-sm bg-sky-500/5 border border-sky-500/15 text-sky-300/60 font-mono text-[10px] tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-5">{job.description}</p>

                <ul className="space-y-1.5 mb-6" role="list">
                  {job.requirements.map((req, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-500">
                      <span className="text-sky-500/40 mt-0.5 font-mono flex-shrink-0" aria-hidden="true">›</span>
                      {req}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/60 font-medium text-sm rounded transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
                >
                  Apply Now
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Open CTA */}
        <div className="relative p-6 sm:p-8 rounded-sm border border-dashed border-[#1a2540] bg-[#0a0f1e]/50 text-center">
          <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-sky-500/20" aria-hidden="true" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sky-500/20" aria-hidden="true" />

          <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase mb-3" aria-hidden="true">
            // OPEN APPLICATION
          </p>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">
            Don&apos;t see your role?
          </h3>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
            We are always interested in exceptional engineers and researchers. Send us your CV and tell us what you would build.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-[#020409] font-semibold text-sm rounded transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
          >
            Send Your CV
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
