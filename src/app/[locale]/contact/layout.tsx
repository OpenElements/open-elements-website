import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact us - Open Elements',
  description: 'Get in touch with Open Elements. Schedule a meeting, send us an email, or give us a call.',
  keywords: ['Contact', 'Open Elements', 'Get in touch', 'Schedule meeting'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/contact',
    title: 'Contact us - Open Elements',
    description: 'Get in touch with Open Elements. Schedule a meeting, send us an email, or give us a call.',
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
