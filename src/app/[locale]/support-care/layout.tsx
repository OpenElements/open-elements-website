import type { Metadata } from 'next';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: 'Support & Care - Open Elements',
    de: 'Support & Care - Open Elements',
  };

  const descriptions = {
    en: 'Support & Care is a program for the sustainable further development, stabilization and support of open source software (OSS).',
    de: 'Support & Care ist ein Programm zur nachhaltigen Weiterentwicklung, Stabilisierung und Unterstützung von Open-Source-Software (OSS).',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      'Open Source',
      'Support',
      'Care',
      'Java',
      'Eclipse Temurin',
      'Apache Maven',
    ],
    openGraph: {
      type: 'website',
      url:
        locale === 'de'
          ? 'https://open-elements.com/de/support-care'
          : 'https://open-elements.com/support-care',
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
      siteName: 'Open Elements',
      images: [
        {
          url: '/open-graph/support-care.png',
          width: 1200,
          height: 630,
          alt: 'Open Elements Support & Care',
        },
      ],
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ['/open-graph/support-care.png'],
    },
  };
}

export default async function SupportCareLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
