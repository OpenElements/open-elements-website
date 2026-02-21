import Image from 'next/image'
import Link from 'next/link'

interface Engagement {
  title: string
  text: string
  logo: string
  link: string
  visible: boolean
}

interface EngagementCardProps {
  engagement: Engagement
}

export default function EngagementCard({ engagement }: EngagementCardProps) {
  return (
    <div className="bg-gray rounded-[30px] shadow-4 p-6 h-full flex flex-col gap-5">
      <div className="flex items-center justify-start gap-3 py-2">
          {engagement.link ? (
            <Link href={engagement.link} target="_blank" rel="noopener noreferrer" className="shrink-0 object-contain w-24">
              <Image 
                className="object-contain w-24" 
                src={engagement.logo} 
                alt={`${engagement.title} logo`}
                width={96}
                height={96}
              />
            </Link>
          ) : (
            <Image 
              className="shrink-0 w-24 object-contain" 
              src={engagement.logo} 
              alt={`${engagement.title} logo`}
              width={96}
              height={96}
            />
          )}
        <h2 className="text-lg font-bold text-blue">{engagement.title}</h2>
      </div>
      <div 
        className="text-sm leading-6 text-blue"
        dangerouslySetInnerHTML={{ __html: engagement.text }}
      />
    </div>
  )
}
