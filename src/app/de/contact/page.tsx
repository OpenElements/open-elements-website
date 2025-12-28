import Image from 'next/image'
import CalendlyButton from '@/components/contact/CalendlyButton'
import ContactInfo from '@/components/contact/ContactInfo'

export default function DeContactPage() {
  return (
    <div className="relative">
      <div className="container relative max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full xl:pb-36 pb-28">
        <Image
          className="absolute hidden w-full -ml-20 top-52 2xl:-ml-32 lg:block"
          src="/illustrations/lines-5.svg"
          alt="Lines"
          width={1200}
          height={100}
        />
        <Image
          className="absolute w-full md:top-40 sm:top-36 top-27.5 md:-ml-16 sm:ml-0 lg:hidden sm:block hidden"
          src="/illustrations/linesb.svg"
          alt="Line M"
          width={800}
          height={100}
        />
        
        <div className="flex items-center justify-center pt-16 pb-4 lg:pt-36 md:pt-28 sm:pt-24 sm:pb-12">
          <h1 className="flex items-center justify-center w-full text-center h1">
            <div className="relative z-0 flex items-center justify-center w-full">
              <Image
                className="absolute w-32 mt-1 lg:w-64 sm:w-48 -mr-28"
                src="/illustrations/textBG.svg"
                alt="Hero text background"
                width={256}
                height={100}
              />
              <span className="relative">Kontakt</span>
            </div>
          </h1>
        </div>
        
        <div className="relative flex flex-col gap-24 2xl:gap-40 lg:gap-32">
          <div className="max-w-[1080px] w-full pt-3 mx-auto">
            <div className="bg-sky-100 rounded-[28px] border-2 border-dashed border-sky p-6 w-full flex flex-col items-center justify-center text-center">
              <p>
                Der einfachste Weg, um mit uns in Kontakt zu treten, besteht darin, einen kostenlosen 30-minütigen Slot in unserem offenen Kalender zu buchen. Auf diese Weise können wir eine Diskussion beginnen und über Ihre Anliegen, Interessen oder Probleme bezüglich unserer Schwerpunktthemen wie Open Source und Java sprechen.
              </p>
              <button
                onClick={() => window.open('https://cal.com/open-elements/15min', '_blank')}
                className="flex items-center justify-center gap-3 px-4 py-3 mt-4 text-base font-semibold text-center text-white capitalize transition-all duration-150 ease-in-out rounded-full cursor-pointer bg-purple sm:px-6 hover:bg-purple-700 hover:shadow-3 active:shadow-none active:bg-purple"
              >
                <Image src="/icons/call.svg" alt="Call icon" width={20} height={20} />
                Termin vereinbaren
              </button>
            </div>
          </div>
          
          <div className="relative flex flex-col-reverse items-center justify-center w-full gap-16 lg:flex-row xl:gap-12 lg:gap-6">
            <Image
              className="absolute lg:w-112.5 w-80 lg:-left-44 -left-24 lg:top-12 top-125 sm:block hidden"
              src="/illustrations/round-1.svg"
              alt="Round"
              width={450}
              height={450}
            />
            <Image
              className="absolute lg:w-112.5 w-80 lg:-left-44 sm:-left-24 -left-40 lg:top-12 top-110 sm:hidden"
              src="/illustrations/round-44.svg"
              alt="Round small"
              width={450}
              height={450}
            />
            
            <div className="relative flex flex-col items-center w-full gap-8 lg:items-start xl:gap-12 lg:gap-6">
              <div className="bg-sky-100 gap-2 rounded-[28px] border-2 border-dashed border-sky p-6 max-w-112.5 shrink-0 w-full flex flex-col">
                <p>Zusätzlich dazu können Sie uns eine E-Mail senden an:</p>
                <a href="mailto:info@open-elements.de" className="flex items-center gap-1 text-purple-700 link-purple">
                  <svg className="w-5 h-5 stroke-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/>
                  </svg>
                  <p className="font-semibold">info@open-elements.de</p>
                </a>
                <p>oder uns direkt anrufen unter:</p>
                <a href="tel:+4915122684622" className="flex items-center gap-2 text-purple-700 link-purple">
                  <svg className="w-5 h-5 stroke-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                  </svg>
                  <p className="font-semibold">+49 151-22684622</p>
                </a>
              </div>
              
              <div className="bg-sky-100 gap-2 rounded-[28px] border-2 border-dashed border-sky p-6 max-w-112.5 shrink-0 w-full flex flex-col lg:-mr-5 xl:place-self-end">
                <p>Unsere Postadresse lautet:</p>
                <div className="flex items-start gap-2 text-purple-700">
                  <svg className="w-6 h-6 mt-1 stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                  <p className="font-semibold">
                    Open Elements GmbH<br/>
                    Gerhart-Hauptmann-Str. 49B<br/>
                    51379 Leverkusen<br/>
                    Germany
                  </p>
                </div>
              </div>
            </div>
            
            <Image
              className="w-full max-w-sm xl:max-w-md shrink-0 xl:mt-16"
              src="/illustrations/contact.svg"
              alt="Contact"
              width={448}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
