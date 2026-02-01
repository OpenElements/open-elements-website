import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Open Elements - Open Source made right',
  description: 'Open Source made right - Open Elements is a modern company with a clear focus on Open Source and Java',
  keywords: ['open source', 'Java', 'OSS', 'open source Support', 'Java Support'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/',
    title: 'Open Elements - Open Source made right',
    description: 'Open Source made right - Open Elements is a modern company with a clear focus on Open Source and Java',
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

// Root layout delegates to [locale]/layout.tsx for i18n support
// The locale layout provides html/body with proper lang attributes
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
