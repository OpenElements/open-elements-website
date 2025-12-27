import PartnerCard from './PartnerCard'
import partnersData from '@/data/en/partners.json'

export default function PartnersSection() {
  const visiblePartners = partnersData.filter(partner => partner.visible)

  return (
    <div id="div3" className="scroll-mt-24 scroll-section">
      <h2 id="section_customers" className="font-bold text-blue text-3xl sm:text-4xl lg:text-5xl">
        Our <span className="text-rose">Customers & Partners</span>
      </h2>
      <div className="relative flex flex-wrap justify-center mt-7 md:mt-12 w-full">
        {visiblePartners.map((partner, index) => (
          <PartnerCard key={index} partner={partner} />
        ))}
      </div>
    </div>
  )
}
