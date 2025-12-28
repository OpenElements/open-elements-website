import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support & Care - Open Elements',
  description: 'Support & Care ist ein Programm zur nachhaltigen Weiterentwicklung, Stabilisierung und Unterstützung von Open Source Software (OSS).',
  keywords: ['Open Source', 'Support', 'Care', 'Java', 'Eclipse Temurin', 'Apache Maven'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/de/support-care',
    title: 'Support & Care - Open Elements',
    description: 'Support & Care ist ein Programm zur nachhaltigen Weiterentwicklung, Stabilisierung und Unterstützung von Open Source Software (OSS).',
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

export default function DeSupportCareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
