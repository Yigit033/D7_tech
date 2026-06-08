import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Research & Engineering Projects',
  description:
    'D7 Technology research and engineering projects — autonomous surface vessels, multi-static radar, wearable sensor systems, and more.',
  openGraph: {
    title: 'Projects | D7 Technology',
    description:
      'Research and engineering projects in autonomous systems, sensing, and AI — from prototype to field deployment.',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
