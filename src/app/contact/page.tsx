import Image from 'next/image'
import CalendlyButton from '@/components/contact/CalendlyButton'
import ContactInfo from '@/components/contact/ContactInfo'

export default function ContactPage() {
  return (
    <div className="relative">
      <div className="container relative max-w-sm lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full xl:pb-36 pb-28">
        {/* Decorative lines */}
        <Image
          className="absolute hidden w-full -ml-20 top-52 2xl:-ml-32 lg:block"
          src="/illustrations/lines-5.svg"
          alt="Lines"
          width={1200}
          height={100}
        />
        <Image
          className="absolute w-full md:top-40 sm:top-36 top-[110px] md:-ml-16 sm:ml-0 lg:hidden sm:block hidden"
          src="/illustrations/linesb.svg"
          alt="Line M"
          width={800}
          height={100}
        />
        
        {/* Header */}
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
              <span className="relative">Contact us</span>
            </div>
          </h1>
        </div>
        
        {/* Content */}
        <div className="relative flex flex-col gap-24 2xl:gap-40 lg:gap-32">
          <CalendlyButton />
          
          <div className="relative flex flex-col-reverse items-center justify-center w-full gap-16 lg:flex-row xl:gap-12 lg:gap-6">
            {/* Decorative rounds */}
            <Image
              className="absolute lg:w-[450px] w-80 lg:-left-44 -left-24 lg:top-12 top-[500px] sm:block hidden"
              src="/illustrations/round-1.svg"
              alt="Round"
              width={450}
              height={450}
            />
            <Image
              className="absolute lg:w-[450px] w-80 lg:-left-44 sm:-left-24 -left-40 lg:top-12 top-[440px] sm:hidden"
              src="/illustrations/round-44.svg"
              alt="Round small"
              width={450}
              height={450}
            />
            
            <ContactInfo />
            
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
