import Image from 'next/image'
import Link from 'next/link'

interface CareCard {
  title: string
  text: string
  logo: string
  link?: string
}

interface CareCardProps {
  card: CareCard
}

export default function CareCard({ card }: CareCardProps) {
  return (
    <div className="w-full py-3 2xl:w-1/3 lg:w-1/2 sm:px-3 sm:py-3">
      <div className="bg-gray rounded-[30px] shadow-4 p-6 pb-9 h-full">
        <div className="flex items-center justify-center w-40 mx-auto h-52">
          {card.link ? (
            <Link href={card.link} target="_blank" rel="noopener noreferrer">
              <Image 
                className="w-full" 
                src={card.logo} 
                alt={`${card.title} logo`}
                width={160}
                height={208}
              />
            </Link>
          ) : (
            <Image 
              className="w-full" 
              src={card.logo} 
              alt={`${card.title} logo`}
              width={160}
              height={208}
            />
          )}
        </div>
        <div className="mt-2 space-y-6">
          <h2 className="pr-2 text-lg font-bold text-center text-blue">{card.title}</h2>
          <div 
            className="text-sm leading-6 text-blue"
            dangerouslySetInnerHTML={{ __html: card.text }}
          />
        </div>
      </div>
    </div>
  )
}
