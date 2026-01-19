import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles - Open Elements',
  description: 'Read our latest articles about Open Source, Java, and software development.',
  keywords: ['Open Source', 'Java', 'Blog', 'Articles', 'Software Development'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/blog',
    title: 'Articles - Open Elements',
    description: 'Read our latest articles about Open Source, Java, and software development.',
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
