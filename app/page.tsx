import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import ExpertiseGrid from '@/components/sections/ExpertiseGrid';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Newsletter from '@/components/sections/Newsletter';

export const metadata: Metadata = {
  title: 'D7 Technology — Autonomous Systems & Advanced Sensing',
  description:
    'D7 Technology designs intelligent autonomous platforms and advanced sensing technologies for real-world applications.',
  openGraph: {
    title: 'D7 Technology — Autonomous Systems & Advanced Sensing',
    description:
      'D7 Technology designs intelligent autonomous platforms and advanced sensing technologies for real-world applications.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExpertiseGrid />
      <FeaturedProjects />
      <Newsletter />
    </>
  );
}
