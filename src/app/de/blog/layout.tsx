import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artikel - Open Elements',
  description: 'Lesen Sie unsere neuesten Artikel über Open Source, Java und Softwareentwicklung.',
  keywords: ['Open Source', 'Java', 'Blog', 'Artikel', 'Softwareentwicklung'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/de/blog',
    title: 'Artikel - Open Elements',
    description: 'Lesen Sie unsere neuesten Artikel über Open Source, Java und Softwareentwicklung.',
    siteName: 'Open Elements',
    images: [
      {
        url: '/open-graph/open-elements.png',
        width: 1200,
        height: 630,
        alt: 'OpenElements Logo',
      },
    ],
    locale: 'de_DE',
  },
}

export default function DeBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
