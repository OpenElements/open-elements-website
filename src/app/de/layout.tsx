import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Open Elements - Open Source, aber richtig',
  description: 'Open Source, aber richtig - Open Elements ist ein modernes Unternehmen mit einem Fokus auf Open Source und Java',
  keywords: ['open source', 'Java', 'OSS', 'open source Support', 'Java Support'],
  openGraph: {
    type: 'website',
    url: 'https://open-elements.com/de',
    title: 'Open Elements - Open Source, aber richtig',
    description: 'Open Source, aber richtig - Open Elements ist ein modernes Unternehmen mit einem Fokus auf Open Source und Java',
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

export default function DeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${montserrat.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body className={montserrat.className}>
        <div id="top" className="relative">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
