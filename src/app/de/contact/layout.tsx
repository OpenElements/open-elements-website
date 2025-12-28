import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt - Open Elements',
  description: 'Kontaktieren Sie Open Elements. Vereinbaren Sie einen Termin, senden Sie uns eine E-Mail oder rufen Sie uns an.',
  keywords: ['Kontakt', 'Open Elements', 'Termin vereinbaren'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/de/contact',
    title: 'Kontakt - Open Elements',
    description: 'Kontaktieren Sie Open Elements. Vereinbaren Sie einen Termin, senden Sie uns eine E-Mail oder rufen Sie uns an.',
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

export default function DeContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
