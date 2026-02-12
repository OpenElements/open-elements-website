import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface DltLecturePageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: DltLecturePageProps): Promise<Metadata> {
  const { locale } = await params

  // Only German version exists initially
  if (locale !== 'de') {
    return {
      title: 'Page Not Available - Open Elements',
      description: 'This page is not available in this language',
    }
  }

  const title = 'Vorlesung zu "DLT & Digital Trust" - Open Elements'
  const description = "Seit 2023 bietet Hendrik Ebbers die Vorlesung 'Distribution Ledger Technology und Digital Trust' an"

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'Open Elements',
      locale: 'de_DE',
    },
  }
}

export default async function DltLecturePage({ params }: DltLecturePageProps) {
  const { locale } = await params

  // Only German version exists initially
  if (locale !== 'de') {
    notFound()
  }

  return (
    <div >
      {/* Hero Section */}
      <div className="absolute left-0 w-full top-0 h-48 -z-10 overflow-hidden">
        <Image
          src="/illustrations/hero-bg-2.svg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full">
        <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
          <div className="relative flex flex-col items-center justify-center w-full">
            <h1 className="text-center h1">Vorlesung zu &quot;DLT & Digital Trust&quot;</h1>
            <Image
              src="/illustrations/underline.svg"
              alt="Unterstrich"
              width={288}
              height={24}
              className="absolute w-48 -bottom-3 sm:w-72 sm:-mr-24 shrink-0"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className=" lg:pb-48 sm:pb-32 pb-28">
        <div className="container mt-12 xl:max-w-1xl">
          <div
            className="text-blue prose prose-lg prose-a:text-purple-700 prose-code:bg-yellow prose-blockquote:border-l-0 prose-blockquote:bg-green-100 prose-blockquote:not-italic prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:rounded-3xl relative mx-auto"
            style={{ maxWidth: '100%' }}
          >
            <p className="lead">
              Seit 2023 bietet <Link href="/de/about-hendrik">Hendrik Ebbers</Link> die Vorlesung{' '}
              <strong>&quot;Distribution Ledger Technology und Digital Trust&quot;</strong> an.
              Aktuell wird die Vorlesung als Lehrauftrag an der{' '}
              <a href="https://www.oth-regensburg.de" target="_blank" rel="noopener noreferrer">
                OTH Regensburg
              </a>{' '}
              durchgeführt.
            </p>

            <p>
              Die Vorlesung behandelt die Grundlagen von Distributed Ledger Technologien (DLT) und
              vermittelt die notwendigen Kenntnisse, um DLT-basierte Systeme zu entwickeln.
            </p>

            <h2>Auszug zur Vorlesung aus dem Vorlesungsverzeichnis der OTH Regensburg</h2>

            <p>
              Die Vorlesung vermittelt das grundlegende Verständnis über
              Distributed-Ledger-Technologien. Neben den technischen Grundlagen zu Kryptowährungen
              werden hierbei auch weitergehende Ansätze wie Smart Contracts und NFTs behandelt.
              Inhaltlich werden konkret folgende Punkte besprochen:
            </p>

            <ul>
              <li>Geschichte und Hintergrund von Bitcoin und Distributed-Ledger-Technologien</li>
              <li>Umsetzung von Blockchains und Mining von Kryptowährungen</li>
              <li>Tokens und NFTs</li>
              <li>Einsatzmöglichkeiten von Distributed-Ledger-Technologien</li>
              <li>Nutzung und Einbindung von öffentlichen Distributed-Ledger-Technologien</li>
              <li>Smart Contracts und die Ethereum Virtual Machine (EVM)</li>
            </ul>

            <h2>Meinung der Studenten zur Vorlesung</h2>

            <blockquote className="not-prose my-8">
              <div className="bg-green-100 rounded-3xl p-8">
                <p className="text-blue italic mb-4">
                  &quot;Die Vorlesung hat mir sehr gut gefallen. Hendrik hat es geschafft, ein
                  komplexes Thema verständlich und praxisnah zu vermitteln. Besonders die praktischen
                  Übungen haben mir geholfen, das Gelernte anzuwenden.&quot;
                </p>
                <p className="text-blue font-semibold mb-0">- Fabian, Student</p>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
