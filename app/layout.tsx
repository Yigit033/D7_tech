import type { ReactNode } from 'react';

// Minimal root layout — html/body/lang are provided by [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
