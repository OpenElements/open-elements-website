import Image from 'next/image'
import Link from 'next/link'

const supportOfferings = [
  {
    title: 'Support & Care für Apache Maven™',
    text: 'Support & Care für Apache Maven™ stärkt die Zukunft des Java-Ökosystems durch nachhaltige Finanzierung und transparente Entwicklung. Sichern Sie die langfristige Stabilität und Weiterentwicklung von Apache Maven.',
    logo: '/illustrations/support-care-logos/support-care-maven-logo.svg',
    link: '/de/support-care-maven',
  },
  {
    title: 'Eclipse Temurin Support & Care',
    text: 'Professionelle Unterstützung für Eclipse Temurin, die am weitesten verbreitete Java-Laufzeitumgebung mit über 20 Millionen Downloads pro Monat. Sichern Sie die langfristige Funktionalität Ihrer Java-Anwendungen.',
    logo: '/illustrations/support-care-logos/support-care-temurin-logo.svg',
    link: '/de/support-care-temurin',
  },
]

export default function DeSupportCarePage() {
  return (
    <div className="relative pb-40">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center pt-16 pb-4 sm:pt-36 sm:pb-12">
            <div className="relative flex flex-col items-center justify-center w-full">
              <h1 className="text-center h1">Support & Care</h1>
              <Image
                src="/illustrations/underline.svg"
                alt="Underline"
                className="absolute w-48 -bottom-3 sm:w-72 sm:-mr-24 shrink-0"
                width={288}
                height={24}
              />
            </div>
          </div>
          <h2 className="text-center sm:mt-10 mt-14 lg:mt-12 h2 text-blue">
            Nachhaltige Unterstützung für Open Source Software
          </h2>
        </div>
      </div>

      <div className="relative pb-28 md:pb-40 sm:pb-36 lg:pb-52">
        <Image
          className="absolute bottom-0 hidden w-full pb-12 2xl:block xl:pb-28 sm:pb-16"
          src="/illustrations/dash-line-7.svg"
          alt="Dash line"
          width={1920}
          height={100}
        />
        <Image
          className="absolute bottom-0 hidden w-full pb-12 2xl:hidden sm:block xl:pb-28 sm:pb-16"
          src="/illustrations/dash-line-7-d.svg"
          alt="Dash line"
          width={1920}
          height={100}
        />
        <Image
          className="absolute bottom-0 w-full pb-12 sm:hidden sm:pb-16"
          src="/illustrations/dash-line-12-sm.svg"
          alt="Dashline"
          width={768}
          height={100}
        />

        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="relative flex flex-col mt-8 text-base leading-7 gap-7 text-blue">
              <p>
                Support & Care ist ein Programm zur nachhaltigen Weiterentwicklung, Stabilisierung und Unterstützung von Open Source Software (OSS).
                Open Elements arbeitet sowohl mit der Industrie als auch mit der Open-Source-Community zusammen, um die Qualität,
                Unabhängigkeit und Entwicklung kritischer Open-Source-Projekte und -Komponenten sicherzustellen.
              </p>
              <p>
                Mit Support & Care bietet Open Elements eine Lösung für kritische Projekte, damit die Produkte bedenkenlos in professionellen Umgebungen eingesetzt werden können. Unsere Open-Source-Strategie zielt darauf ab, die Ausrichtung der Projekte durch finanzielle Unterstützung und aktive
                Zusammenarbeit zu verbessern und Unterfinanzierung, schlechte Wartung und Sicherheit dieser kritischen OSS zu verhindern.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="relative flex justify-center">
          <Image
            className="w-full max-w-4xl mx-auto"
            src="/illustrations/support-care-logos/support-care-logo.svg"
            alt="Support & Care Logo"
            width={896}
            height={400}
          />
        </div>
      </div>

      <div className="container mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative flex flex-col mt-8 gap-7 text-blue">
            <p className="text-base leading-7">
              Durch Support & Care bieten wir umfassende Dienstleistungen, um die Leistung und Sicherheit Ihrer Anwendungen zu gewährleisten.
              Unsere Dienstleistungen gehen über die klassische Fehlerbehebung hinaus und fördern die nachhaltige Verbesserung Ihrer Infrastruktur.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex items-center w-full h-full mx-auto mt-8">
          <Link
            href="/de/contact"
            className="inline-flex shrink-0 items-center justify-center w-full max-w-xs gap-3 px-4 py-3.5 mx-auto text-base font-bold text-center text-white capitalize transition-all duration-150 ease-in-out rounded-full bg-purple sm:px-6 hover:bg-purple-700 hover:shadow-3 active:shadow-none active:bg-purple"
          >
            <Image src="/icons/call.svg" alt="Call icon" width={20} height={20} />
            Kontaktieren Sie uns
          </Link>
        </div>
      </div>

      <div className="container relative mx-auto">
        <h2 className="text-center mt-20 mb-12 text-3xl sm:text-4xl font-bold text-blue">
          Unsere Support & Care Angebote
        </h2>
        <div className="flex flex-wrap justify-center w-full gap-8">
          {supportOfferings.map((offering, index) => (
            <div key={index} className="w-full max-w-2xl">
              <Link href={offering.link} className="block">
                <div className="bg-gray rounded-[30px] shadow-4 p-8 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center mb-6">
                    <Image 
                      className="w-full max-w-md" 
                      src={offering.logo} 
                      alt={`${offering.title} logo`}
                      width={448}
                      height={200}
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-center text-blue">{offering.title}</h3>
                    <p className="text-sm leading-6 text-blue text-center">{offering.text}</p>
                    <div className="flex justify-center mt-4">
                      <span className="text-purple font-semibold hover:text-purple-700">Mehr erfahren →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
