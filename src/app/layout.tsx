import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

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

// RootLayout is now in [locale]/layout.tsx for i18n support
// This is just a redirect wrapper
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
