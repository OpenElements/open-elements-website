import Image from 'next/image'
import Link from 'next/link'

interface Partner {
  title: string
  text: string
  logo: string
  link: string
  visible: boolean
}

interface PartnerCardProps {
  partner: Partner
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="relative w-full max-w-5xl py-3 mx-auto sm:px-3">
      <div className="bg-gray rounded-[30px] shadow-4 p-6 pb-9 h-full">
        <div className="flex items-center justify-start gap-3 mb-5 mt-2">
          <div className="object-contain w-28">
            <Link href={partner.link} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
              <Image 
                className="w-full" 
                src={partner.logo} 
                alt={`${partner.title} logo`}
                width={96}
                height={112}
              />
            </Link>
          </div>
          <p className="pr-2 pt-0 text-2xl font-bold text-blue">{partner.title}</p>
        </div>
        <div 
          className="text-sm leading-6 text-blue"
          dangerouslySetInnerHTML={{ __html: partner.text }}
        />
      </div>
    </div>
  )
}
