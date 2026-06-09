import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import ExpertiseGrid from '@/components/sections/ExpertiseGrid';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Newsletter from '@/components/sections/Newsletter';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'HomePage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      type: 'website',
    },
  };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Hero />
      <ExpertiseGrid />
      <FeaturedProjects />
      <Newsletter />
    </>
  );
}
