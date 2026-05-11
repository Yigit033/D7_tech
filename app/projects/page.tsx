import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Research & Engineering Projects',
  description:
    'D7 Technology research and engineering projects — autonomous surface vessels, multi-static radar, wearable sensor systems, and more.',
  openGraph: {
    title: 'Projects | D7 Technology',
    description:
      'IEEE-published and EU-funded research projects in autonomous systems, sensing, and AI.',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
