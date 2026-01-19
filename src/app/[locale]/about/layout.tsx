import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About us - Open Elements',
  description: 'An overview of the engagement of Open Elements and its partners and customers.',
  keywords: ['Open Source', 'Java', 'OSS', 'Open Source Support', 'Java Support'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/about',
    title: 'About us - Open Elements',
    description: 'An overview of the engagement of Open Elements and its partners and customers.',
    siteName: 'Open Elements',
    images: [
      {
        url: '/open-graph/open-elements.png',
        width: 1200,
        height: 630,
        alt: 'OpenElements Logo',
      },
    ],
    locale: 'en_US',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
