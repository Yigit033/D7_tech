import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/common/SectionLabel';

export const metadata: Metadata = {
  title: 'Careers at D7 Technology',
  description:
    'No open positions at the moment — but we are always interested in exceptional engineers and researchers. Reach out.',
  openGraph: {
    title: 'Careers at D7 Technology',
    description: 'Join our deep-tech R&D team in Istanbul, Turkiye.',
    type: 'website',
  },
};

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

        {/* No open positions notice */}
        <div className="relative p-8 sm:p-12 rounded-sm border border-[#1a2540] bg-[#0a0f1e] text-center mb-8">
          <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-sky-500/20" aria-hidden="true" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sky-500/20" aria-hidden="true" />

          <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase mb-6" aria-hidden="true">
            {'// STATUS'}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1a2540] bg-[#020409] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">No open positions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-200 mb-4">
            New roles will be announced here.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            We are not actively hiring right now, but that changes as our projects scale. Check back — or better yet, reach out before we post.
          </p>
        </div>

        {/* Open application CTA */}
        <div className="relative p-6 sm:p-8 rounded-sm border border-dashed border-[#1a2540] bg-[#0a0f1e]/50 text-center">
          <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-sky-500/20" aria-hidden="true" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sky-500/20" aria-hidden="true" />

          <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase mb-3" aria-hidden="true">
            {'// OPEN APPLICATION'}
          </p>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">
            Exceptional engineers don&apos;t wait.
          </h3>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
            If you work on autonomous systems, perception, or sensor fusion at a high level — we want to hear from you. Drop us a message and include a link to your CV or LinkedIn.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-[#020409] font-semibold text-sm rounded transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
          >
            Get in Touch
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
