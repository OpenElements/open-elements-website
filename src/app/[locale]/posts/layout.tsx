import type { Metadata } from 'next'

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: 'Articles - Open Elements',
    de: 'Artikel - Open Elements',
  };
  
  const descriptions = {
    en: 'Read our latest articles about Open Source, Java, and software development.',
    de: 'Lesen Sie unsere neuesten Artikel über Open Source, Java und Softwareentwicklung.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: ['Open Source', 'Java', 'Blog', 'Articles', 'Software Development'],
    openGraph: {
      type: 'website',
      url: locale === 'de' ? 'https://open-elements.com/de/posts' : 'https://open-elements.com/posts',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      siteName: 'Open Elements',
      images: [
        {
          url: '/open-graph/open-elements.png',
          width: 1200,
          height: 630,
          alt: 'OpenElements Logo',
        },
      ],
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
  };
}

export default async function BlogLayout({
  children,
}: LayoutProps) {
  return <>{children}</>
}
