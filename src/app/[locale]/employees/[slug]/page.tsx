import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import teamDataEn from '@/data/en/team.json'
import teamDataDe from '@/data/de/team.json'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  bio: string
  picture: string
  role: string
  socials?: Array<{ name: string; link: string; icon: string }>
}

function getMember(locale: string, slug: string): TeamMember | undefined {
  const teamData = locale === 'de' ? teamDataDe : teamDataEn
  return teamData.find((member) => member.id === slug)
}

export async function generateStaticParams() {
  const slugs = Array.from(new Set([...teamDataEn, ...teamDataDe].map((member) => member.id)))

  return ['en', 'de'].flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const member = getMember(locale, slug) ?? getMember('en', slug)

  if (!member) {
    return {
      title: 'Employee Not Found - Open Elements',
    }
  }

  return {
    title: `${member.firstName} ${member.lastName} - Open Elements`,
    description: member.bio,
    openGraph: {
      title: `${member.firstName} ${member.lastName} - Open Elements`,
      description: member.bio,
      images: [
        {
          url: member.picture,
          width: 800,
          height: 800,
          alt: `${member.firstName} ${member.lastName}`,
        },
      ],
    },
  }
}

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const member = getMember(locale, slug) ?? getMember('en', slug)

  if (!member) {
    notFound()
  }

  return (
    <div className="container pt-56 sm:pt-64 lg:pt-72 pb-20 sm:pb-36">
      <div className="mx-auto max-w-4xl">
        <div className="flex md:flex-row flex-col items-center md:items-start gap-8 md:gap-10">
          <div className="relative shrink-0">
            <Image
              className="size-60 sm:size-72 object-contain"
              src="/illustrations/team-placeholder.svg"
              alt=""
              width={288}
              height={288}
            />
            <Image
              className="bottom-6 left-2.5 absolute rounded-full size-45 sm:size-54 object-cover"
              src={member.picture}
              alt={`${member.firstName} ${member.lastName}`}
              width={216}
              height={216}
              priority
            />
          </div>

          <div className="flex-1">
            <h1 className="h2 text-blue">
              {member.firstName} <span className="text-sky">{member.lastName}</span>
            </h1>
            <p className="mt-2 font-bold text-purple text-base sm:text-lg">{member.role}</p>

            <p className="mt-6 text-blue leading-relaxed">{member.bio}</p>

            {member.socials && member.socials.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {member.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-blue/20 px-4 py-2 text-sm font-semibold text-blue hover:text-purple hover:border-purple/40 transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
