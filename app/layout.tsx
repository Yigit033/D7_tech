import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://d7tech.net'),
  title: {
    default: 'D7 Technology — Autonomous Systems & Advanced Sensing',
    template: '%s | D7 Technology',
  },
  description:
    'D7 Technology designs intelligent autonomous platforms and advanced sensing technologies for real-world applications. Specializing in sensor fusion, radar/sonar, AI/ML, and wearable sensors.',
  keywords: [
    'autonomous vehicles',
    'sensor fusion',
    'radar systems',
    'sonar',
    'AI machine learning',
    'wearable sensors',
    'IoT',
    'deep tech',
    'IEEE',
    'ITEA',
    'D7 Technology',
  ],
  authors: [{ name: 'D7 Technology', url: 'https://d7tech.net' }],
  creator: 'D7 Technology',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://d7tech.net',
    siteName: 'D7 Technology',
    title: 'D7 Technology — Autonomous Systems & Advanced Sensing',
    description:
      'D7 Technology designs intelligent autonomous platforms and advanced sensing technologies for real-world applications.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'D7 Technology — Autonomous Systems & Advanced Sensing',
    description:
      'D7 Technology designs intelligent autonomous platforms and advanced sensing technologies.',
    creator: '@d7technology',
  },
  other: {
    'theme-color': '#020409',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-[#020409] text-[#f1f5f9]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-[#020409] focus:rounded focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
