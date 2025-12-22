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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} scroll-smooth`}>
      <body className={montserrat.className}>
        <div id="top" className="relative">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>
      </body>
    </html>
  )
}
