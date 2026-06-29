import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAlternates } from '@/lib/metadata';
import SectionLabel from '@/components/common/SectionLabel';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'AboutPage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: { title: t('metadata.title'), description: t('metadata.description'), type: 'website' },
    alternates: getAlternates('/about'),
  };
}

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  linkedin: string;
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'AboutPage' });

  const team: TeamMember[] = [
    { name: t('team.ahmet.name'), role: t('team.ahmet.role'), initials: 'AG', linkedin: 'https://www.linkedin.com/in/ahmet-g%C3%BCne%C5%9F-phd-mba/' },
    { name: t('team.bilal.name'), role: t('team.bilal.role'), initials: 'BB', linkedin: 'https://www.linkedin.com/in/bilal-bayram-6175a5307/' },
    { name: t('team.berkant.name'), role: t('team.berkant.role'), initials: 'BK', linkedin: 'https://www.linkedin.com/in/berkant-kirikkanat-7a1934227/' },
    { name: t('team.fehim.name'), role: t('team.fehim.role'), initials: 'FK', linkedin: 'https://www.linkedin.com/in/fehim-ku%C5%9F-a19006131/' },
    { name: t('team.yigit.name'), role: t('team.yigit.role'), initials: 'YT', linkedin: 'https://www.linkedin.com/in/yigittilaver/' },
    { name: t('team.yusuf.name'), role: t('team.yusuf.role'), initials: 'YE', linkedin: 'https://www.linkedin.com/' }
  ];

  const values = [
    { id: '01', title: t('values.innovation.title'), desc: t('values.innovation.desc') },
    { id: '02', title: t('values.rigor.title'), desc: t('values.rigor.desc') },
    { id: '03', title: t('values.impact.title'), desc: t('values.impact.desc') },
    { id: '04', title: t('values.openScience.title'), desc: t('values.openScience.desc') },
  ];

  const timeline = [
    { year: t('timeline.year2025Label'), events: [t('timeline.year2025e1'), t('timeline.year2025e2')] },
    { year: t('timeline.yearJan2026Label'), events: [t('timeline.yearJan2026e1')] },
    { year: t('timeline.year2026Label'), events: [t('timeline.year2026e1'), t('timeline.year2026e2')] },
  ];

  return (
    <div className="min-h-screen bg-[#020409]">
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden" aria-labelledby="about-heading">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel label={t('heroLabel')} className="mb-5" />
          <h1 id="about-heading" className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-5">
            {t('heroTitle')}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            {t('heroDescription')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 space-y-20 sm:space-y-24">
        {/* Mission */}
        <section aria-labelledby="mission-heading">
          <div className="h-px bg-[#1a2540] mb-12" aria-hidden="true" />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div>
              <SectionLabel label={t('missionLabel')} className="mb-5" />
              <h2 id="mission-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                {t('missionTitle')}
              </h2>
            </div>
            <div className="space-y-4 text-slate-400 leading-relaxed text-sm sm:text-base">
              <p>{t('missionP1')}</p>
              <p>{t('missionP2')}</p>
              <p>{t('missionP3')}</p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section aria-labelledby="team-heading">
          <div className="h-px bg-[#1a2540] mb-12" aria-hidden="true" />
          <SectionLabel label={t('teamLabel')} className="mb-5" />
          <h2 id="team-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mb-10">
            {t('teamTitle')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {team.map((member, i) => (
              <a
                key={i}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} — LinkedIn`}
                className="group relative p-5 rounded-sm bg-[#0a0f1e] border border-[#1a2540] hover:border-sky-500/30 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(14,165,233,0.07)] transition-all duration-300 text-center block"
              >
                <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-500/20 group-hover:border-sky-500/40 transition-colors" aria-hidden="true" />
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-500/10 border border-sky-500/20 group-hover:border-sky-500/40 group-hover:bg-sky-500/15 flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <span className="font-mono font-bold text-sky-400 text-base sm:text-lg">{member.initials}</span>
                </div>
                <p className="text-sm font-semibold text-slate-200 group-hover:text-sky-300 transition-colors">{member.name}</p>
                <p className="text-xs text-slate-500 mt-1">{member.role}</p>
                <p className="text-[10px] font-mono text-sky-500/40 group-hover:text-sky-400/70 mt-2 tracking-widest transition-colors">{t('teamLinkedIn')}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section aria-labelledby="history-heading">
          <div className="h-px bg-[#1a2540] mb-12" aria-hidden="true" />
          <SectionLabel label={t('historyLabel')} className="mb-5" />
          <h2 id="history-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mb-10">
            {t('historyTitle')}
          </h2>
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-[#1a2540]" aria-hidden="true" />
            <div className="space-y-6 sm:space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 sm:gap-8">
                  <div className="flex-shrink-0 w-[52px] text-right pt-4">
                    <span className="font-mono text-[10px] sm:text-xs text-sky-400/70 whitespace-nowrap">{item.year}</span>
                  </div>
                  <div className="relative flex-1 pb-2">
                    <div className="absolute -left-[7px] top-4 w-2.5 h-2.5 rounded-full bg-sky-500/40 border-2 border-sky-500/60" aria-hidden="true" />
                    <div className="p-4 rounded-sm bg-[#0a0f1e] border border-[#1a2540] space-y-2">
                      {item.events.map((event, j) => (
                        <p key={j} className="text-sm text-slate-400">
                          <span className="text-sky-500/50 mr-2 font-mono text-[10px]" aria-hidden="true">—</span>
                          {event}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section aria-labelledby="values-heading">
          <div className="h-px bg-[#1a2540] mb-12" aria-hidden="true" />
          <SectionLabel label={t('valuesLabel')} className="mb-5" />
          <h2 id="values-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mb-10">
            {t('valuesTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {values.map((v) => (
              <div
                key={v.id}
                className="group p-5 rounded-sm bg-[#0a0f1e] border border-[#1a2540] hover:border-sky-500/30 transition-all duration-300 relative"
              >
                <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-500/20 group-hover:border-sky-500/40 transition-colors" aria-hidden="true" />
                <span className="font-mono text-[10px] text-sky-500/40 tracking-widest block mb-3" aria-hidden="true">{v.id}</span>
                <h3 className="text-sm font-bold text-slate-100 mb-2">{v.title}</h3>
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
