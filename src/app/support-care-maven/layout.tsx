import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support & Care - Open Elements',
  description: 'Support & Care is a program for the sustainable further development, stabilization and support of open source software (OSS).',
  keywords: ['Open Source', 'Support', 'Care', 'Java', 'Eclipse Temurin', 'Apache Maven'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/support-care',
    title: 'Support & Care - Open Elements',
    description: 'Support & Care is a program for the sustainable further development, stabilization and support of open source software (OSS).',
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

export default function SupportCareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
