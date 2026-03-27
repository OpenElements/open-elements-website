import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support & Care | Open Elements',
  description: 'Support & Care is a program for the sustainable further development, stabilization and support of open source software (OSS). We offer professional support for Apache Maven and Eclipse Temurin.',
}

export default function SupportCareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
