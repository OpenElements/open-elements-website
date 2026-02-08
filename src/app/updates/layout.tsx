import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Updates & Changelog | Open Elements',
  description:
    'Stay up to date with the latest features, improvements, and bug fixes for Open Elements.',
  openGraph: {
    title: 'Updates & Changelog | Open Elements',
    description:
      'Stay up to date with the latest features, improvements, and bug fixes for Open Elements.',
    type: 'website',
  },
};

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
