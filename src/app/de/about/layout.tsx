import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns - Open Elements',
  description: 'Eine Übersicht der verschiedenen Bereiche in denen sich Open Elements einbringt sowie unserer Partner und Kunden.',
  keywords: ['Open Source', 'Java', 'OSS', 'Open Source Support', 'Java Support'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/de/about',
    title: 'Über uns - Open Elements',
    description: 'Eine Übersicht der verschiedenen Bereiche in denen sich Open Elements einbringt sowie unserer Partner und Kunden.',
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

export default function DeAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
