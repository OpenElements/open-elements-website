import Image from 'next/image'
import Link from 'next/link'

export default function DeSupportCareMavenPage() {
  return (
    <div className="relative pb-40">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 w-full h-40 -z-10 overflow-hidden">
        <Image
          src="/illustrations/hero-bg-2.svg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-center pt-16 sm:pt-24 pb-8 sm:pb-12">
            <Image
              src="/illustrations/support-care-logos/support-care-maven-logo.svg"
              alt="Support and Care für Apache Maven logo"
              className="w-full max-w-2xl"
              width={768}
              height={300}
            />
          </div>

          {/* Introduction Text */}
          <div className="relative flex flex-col mt-8 text-base leading-7 gap-6 text-blue">
            <p>
              Open Elements hat mit seinem Programm Support & Care für Apache Maven™ eine wichtige Initiative gestartet, die dazu beiträgt, 
              ein zentrales Werkzeug des Java-Ökosystems abzusichern. Mit Förderung der <a href="https://www.sovereign.tech/de" className="text-purple hover:underline" target="_blank" rel="noopener noreferrer">Sovereign Tech Agency</a> 
              wird erstmals eine nachhaltige Unterstützung für Apache Maven ermöglicht – eines der weltweit am häufigsten genutzten Open-Source-Projekte.
            </p>
            <p>
              Wir bieten nun Unternehmen und Organisationen die Möglichkeit, sich an diesem wichtigen Vorhaben zu beteiligen. 
              Durch den Abschluss eines Support & Care-Abonnements tragen Sie dazu bei, die langfristige Stabilität und Weiterentwicklung von Apache Maven zu sichern. 
              Ihre Unterstützung hilft dabei, kritische Aufgaben wie Sicherheitsupdates, Fehlerbehebungen und die Entwicklung neuer Funktionen zu finanzieren.
            </p>
            <p>
              Neben der Unterstützung der Community-getriebenen Entwicklung ermöglicht Ihnen ein Support & Care-Abonnement den direkten Zugang zu unseren Experten und Maintainern, 
              um Fehlerbehebungen zu priorisieren oder Sie bei anderen Themen rund um Apache Maven™ zu unterstützen.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Packages */}
      <div className="container mt-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-blue mb-12">
            Unser Abonnement-Modell für Apache Maven™
          </h2>
          <p className="text-center text-blue mb-12 max-w-3xl mx-auto">
            Wir bieten drei verschiedene Pakete, die auf die Bedürfnisse verschiedener Nutzergruppen zugeschnitten sind.
            Gerne helfen wir Ihnen bei der Ermittlung, welches Paket am besten zu Ihren Anforderungen passt.
          </p>
        </div>
      </div>

      {/* STA Support Section */}
      <div className="container mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue mb-8">
            Förderung durch die Sovereign Tech Agency
          </h2>
          <div className="flex flex-col gap-6 text-base leading-7 text-blue">
            <p>
              Die Sovereign Tech Agency (STA) ist ein Förderprogramm des Bundesministeriums für Wirtschaft und Klimaschutz, 
              das sich der nachhaltigen Unterstützung von Open-Source-Software widmet. Das Programm zielt darauf ab, kritische digitale Infrastrukturen 
              langfristig zu sichern und die Resilienz des europäischen Technologie-Ökosystems zu stärken. Von der STA geförderte Projekte müssen von 
              erheblicher Bedeutung für Wirtschaft und Gesellschaft sein und nachhaltigen Entwicklungspraktiken folgen.
            </p>
            <p>
              Seit 2024 investiert die STA in das Projekt Support & Care für Apache Maven™ und ermöglicht so eine nachhaltige Kostenteilung zwischen 
              öffentlicher Förderung und kommerziellen Beiträgen. Die Investition der STA legt den Grundstein für eine nachhaltige Zukunft des Projekts 
              und des gesamten Java-Ökosystems. Allerdings ist eine breite Unterstützung aus der Community und Industrie unerlässlich, um Apache Maven 
              langfristig abzusichern.
            </p>
          </div>
        </div>
      </div>

      {/* Model Project Section */}
      <div className="container mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue mb-8">
            Ein Modellprojekt für Open Source
          </h2>
          <div className="flex flex-col gap-6 text-base leading-7 text-blue mb-12">
            <p>
              Mit Support & Care für Apache Maven™ unternimmt Open Elements einen starken Schritt in Richtung nachhaltiger Unterstützung von 
              Open-Source-Projekten. Dieses Programm dient als Pilotprojekt innerhalb der Support & Care-Initiative, die darauf abzielt, in 
              weitere kritische Open-Source-Komponenten zu investieren.
            </p>
            <p>
              Das Konzept kombiniert öffentliche Förderung, kommerzielle Unterstützung, transparente Finanzverwaltung und aktive Community-Beteiligung. 
              Es zeigt, wie essentielle Open-Source-Projekte zukunftssicher gemacht werden können, während Innovationen gefördert werden – 
              ein Modell, das ähnliche Initiativen im gesamten Open-Source-Ökosystem inspirieren kann.
            </p>
          </div>
          
          {/* Care Tree Illustration */}
          <div className="flex justify-center mt-12">
            <Image
              src="/illustrations/general/many-care-tree.svg"
              alt="Mehr Menschen fangen an sich zu kümmern"
              className="w-full max-w-2xl"
              width={768}
              height={400}
            />
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="container mt-16 mb-20">
        <div className="flex items-center w-full h-full mx-auto">
          <Link
            href="/de/contact"
            className="inline-flex shrink-0 items-center justify-center w-full max-w-xs gap-3 px-4 py-3.5 mx-auto text-base font-bold text-center text-white capitalize transition-all duration-150 ease-in-out rounded-full bg-purple sm:px-6 hover:bg-purple-700 hover:shadow-3 active:shadow-none active:bg-purple"
          >
            <Image src="/icons/call.svg" alt="Call icon" width={20} height={20} />
            Kontaktieren Sie uns
          </Link>
        </div>
      </div>

      {/* Decorative Circles at Bottom */}
      <div className="absolute bottom-20 left-0 w-full overflow-hidden pointer-events-none">
        <Image
          className="absolute -left-32 w-96 h-96"
          src="/illustrations/round-1.svg"
          alt=""
          width={384}
          height={384}
        />
        <Image
          className="absolute right-0 -bottom-20 w-64 h-64"
          src="/illustrations/round-2.svg"
          alt=""
          width={256}
          height={256}
        />
      </div>
    </div>
  )
}
