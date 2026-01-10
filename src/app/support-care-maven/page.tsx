import Image from 'next/image'
import Link from 'next/link'

export default function SupportCareMavenPage() {
  return (
    <div className=" pb-40">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 w-full h-40  -z-10 overflow-hidden">
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
              alt="Support and Care for Apache Maven logo"
              className="w-full max-w-2xl"
              width={768}
              height={300}
            />
          </div>

          {/* Introduction Text */}
          <div className="relative flex flex-col mt-8 text-base leading-7 gap-6 text-blue">
            <p>
              Open Elements has launched a major initiative with its program Support & Care for Apache Maven™, helping to secure a central tool of the Java ecosystem. 
              With funding from the <a href="https://www.sovereign.tech/de" className="text-purple hover:underline" target="_blank" rel="noopener noreferrer">Sovereign Tech Agency</a>, 
              sustainable support for Apache Maven is enabled for the first time—one of the world's most widely used open-source projects.
            </p>
            <p>
              We now offer companies and organizations the opportunity to participate in this important undertaking. 
              By subscribing to a Support & Care subscription, you contribute to securing the long-term stability and continued development of Apache Maven. 
              Your support helps finance critical tasks such as security updates, bug fixes, and the development of new features.
            </p>
            <p>
              In addition to supporting community-driven development, a Support & Care subscription allows you to directly access our experts and maintainers 
              to prioritize bug fixes or assist you with other topics related to Apache Maven™.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Packages */}
      <div className="container mt-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-blue mb-12">
            Our Subscription Model for Apache Maven™
          </h2>
          <p className="text-center text-blue mb-12 max-w-3xl mx-auto">
            We offer three different packages tailored to the needs of various user groups.
            We are happy to help you determine which package best suits your requirements.
          </p>

          {/* Subscription Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Basic Subscription */}
            <div className="bg-gray-100 rounded-[30px] shadow-lg p-6 pb-9 flex flex-col h-full">
              <h3 className="text-lg font-bold text-center text-blue mb-6">Basic Subscription</h3>
              <ul className="space-y-3 mb-8 flex-grow text-blue text-sm leading-6">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>4 hours of support per month included<sup>1</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Response time: 1 business day<sup>2</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Support requests via helpdesk in German and English<sup>3</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>10% discount on every additional support hour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Quarterly webinar directly with the experts<sup>4,5</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Monthly newsletter</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-purple rounded-full hover:bg-purple-700 hover:shadow-lg transition-all active:shadow-none active:bg-purple"
              >
                Contact us
              </Link>
            </div>

            {/* Standard Subscription */}
            <div className="bg-gray-100 rounded-[30px] shadow-lg p-6 pb-9 flex flex-col h-full border-2 border-purple">
              <h3 className="text-lg font-bold text-center text-blue mb-6">Standard Subscription</h3>
              <ul className="space-y-3 mb-8 flex-grow text-blue text-sm leading-6">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>8 hours of support per month included<sup>1</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Response time: 1 business day<sup>2</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Support requests via helpdesk in German and English<sup>3</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>15% discount on every additional support hour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Quarterly webinar directly with the experts<sup>4,5</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Monthly newsletter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>10% training discount</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Individual monthly call with experts<sup>4,5</sup></span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-purple rounded-full hover:bg-purple-700 hover:shadow-lg transition-all active:shadow-none active:bg-purple"
              >
                Contact us
              </Link>
            </div>

            {/* Premium Subscription */}
            <div className="bg-gray-100 rounded-[30px] shadow-lg p-6 pb-9 flex flex-col h-full">
              <h3 className="text-lg font-bold text-center text-blue mb-6">Premium Subscription</h3>
              <ul className="space-y-3 mb-8 flex-grow text-blue text-sm leading-6">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>8 hours of support per month included<sup>1</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Response time: 1 hour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Support requests via helpdesk and hotline in German and English<sup>3</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>15% discount on every additional support hour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Quarterly webinar directly with the experts<sup>4,5</sup></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Monthly newsletter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>10% training discount</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5 shrink-0">✓</span>
                  <span>Individual monthly call with experts<sup>4,5</sup></span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-purple rounded-full hover:bg-purple-700 hover:shadow-lg transition-all active:shadow-none active:bg-purple"
              >
                Contact us
              </Link>
            </div>
          </div>

          <p className="text-center text-blue mt-12 text-lg">
            We look forward to shaping the future of Apache Maven together with you!
          </p>
        </div>
      </div>

      {/* STA Support Section */}
      <div className="container mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue mb-8">
            Support from the Sovereign Tech Agency
          </h2>
          <div className="flex flex-col gap-6 text-base leading-7 text-blue">
            <p>
              The Sovereign Tech Agency (STA) is a funding program of the German Federal Ministry for Economic Affairs and Climate Action 
              dedicated to the sustainable support of open-source software. The program aims to secure critical digital infrastructures in the long term 
              and strengthen the resilience of the European technology ecosystem. Projects funded by the STA must be of significant importance to the economy 
              and society while following sustainable development practices.
            </p>
            <p>
              Since 2024, the STA has been investing in the Support & Care for Apache Maven™ project, enabling sustainable cost-sharing between public funding 
              and commercial contributions. The STA's investment lays the foundation for a sustainable future of the project and the entire Java ecosystem. 
              However, broad support from the community and industry is essential to secure Apache Maven in the long term.
            </p>
          </div>

          {/* How Support is Paid Illustration */}
          <div className="flex justify-center mt-12">
            <Image
              src="/support-care-maven/diagram-1.png"
              alt="How Support and Care for Apache Maven is paid"
              className="w-full max-w-3xl"
              width={900}
              height={500}
            />
          </div>
        </div>
      </div>

      {/* Who Works Section */}
      <div className="container mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue mb-8">
            Who Works on Support & Care for Apache Maven™?
          </h2>
          <div className="flex flex-col gap-6 text-base leading-7 text-blue">
            <p>
              Employees of Open Elements as well as external developers and maintainers work together on Support & Care for Apache Maven™. 
              While project management and coordination are handled by Open Elements, development is carried out by both our engineers and 
              long-standing external maintainers of Apache Maven. This close collaboration with the Apache Software Foundation and the active 
              Apache Maven community ensures that the project evolves in line with user needs.
            </p>
          </div>
        </div>
      </div>

      {/* Model Project Section */}
      <div className="container mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue mb-8">
            A Model Project for Open Source
          </h2>
          <div className="flex flex-col gap-6 text-base leading-7 text-blue mb-12">
            <p>
              With Support & Care for Apache Maven™, Open Elements is taking a strong step toward sustainable support for open-source projects. 
              This program serves as a pilot within the Support & Care initiative, which aims to invest in additional critical open-source components.
            </p>
            <p>
              The concept combines public funding, commercial support, transparent financial management, and active community involvement. 
              It demonstrates how essential open-source projects can be made future-proof while fostering innovation — a model that can inspire 
              similar initiatives across the open-source ecosystem.
            </p>
          </div>
          
          {/* Care Tree Illustration */}
          <div className="flex justify-center mt-12">
            <Image
              src="/illustrations/general/many-care-tree.svg"
              alt="More people start to care"
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
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center w-full max-w-xs gap-3 px-4 py-3.5 mx-auto text-base font-bold text-center text-white capitalize transition-all duration-150 ease-in-out rounded-full bg-purple sm:px-6 hover:bg-purple-700 hover:shadow-3 active:shadow-none active:bg-purple"
          >
            <Image src="/icons/call.svg" alt="Call icon" width={20} height={20} />
            Contact us
          </Link>
        </div>
      </div>

      {/* Footnotes Section */}
      <div className="container mt-20 mb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue mb-8">
            Footnotes & Service Information
          </h2>
          <div className="flex flex-col gap-4 text-sm leading-6 text-blue">
            <p>
              Apache™ and Apache Maven™ are trademarks of the Apache Software Foundation.
            </p>
            <p>
              <sup>1</sup>Unused support hours expire at the end of the month — in this case, your contribution directly supports 
              the continued development of the respective open-source components.
            </p>
            <p>
              <sup>2</sup>Business days are Monday through Friday, excluding public holidays in North Rhine-Westphalia, Germany.
            </p>
            <p>
              <sup>3</sup>Our helpdesk uses a GDPR-compliant, EU-hosted solution. Customers receive individual accounts, 
              and communication is available in both German and English.
            </p>
            <p>
              <sup>4</sup>Our experts are developers and technical staff who are directly involved in the respective OSS projects 
              (e.g., as committers or maintainers).
            </p>
            <p>
              <sup>5</sup>We use Zoom for webinars and individual meetings.
            </p>
          </div>
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
