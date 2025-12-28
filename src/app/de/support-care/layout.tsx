import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support & Care | Open Elements',
  description: 'Support & Care ist ein Programm zur nachhaltigen Weiterentwicklung, Stabilisierung und Unterstützung von Open Source Software (OSS). Wir bieten professionelle Unterstützung für Apache Maven und Eclipse Temurin.',
}

export default function DeSupportCareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
