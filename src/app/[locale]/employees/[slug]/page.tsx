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
    <div className="relative">
      <Image
        className="absolute hidden lg:block lg:right-[15%] lg:top-[25%]"
        alt="Circles"
        src="/illustrations/circles.svg"
        width={100}
        height={100}
      />
      <Image
        className="absolute hidden lg:block lg:right-[31%] lg:top-[25%]"
        alt="Arrow"
        src="/illustrations/arrow-dashed.svg"
        width={100}
        height={100}
      />

      <div className="container px-0 max-w-xs sm:max-w-full pt-56 sm:pt-64 lg:pt-72 pb-20 sm:pb-36">
        <div className="pt-16 pb-4 sm:pt-36 sm:pb-12">
          <h1 className="text-center h1">
            {member.firstName} {member.lastName}
          </h1>
          <p className="text-center font-bold text-purple">{member.role}</p>
        </div>

        <div className="flex flex-col gap-8 items-center justify-center mb-16 lg:flex-row w-full">
          <div className="relative flex items-center justify-center w-full max-w-md lg:w-1/2">
            <Image
              className="w-full max-w-md"
              alt="background"
              src="/illustrations/bg-employee.svg"
              width={512}
              height={512}
            />
            <Image
              className="xl:w-77.5 xl:h-77.5 lg:w-66.25 lg:h-66.25 sm:w-77.5 sm:h-77.5 w-48.75 h-48.75 border border-purple rounded-full object-cover absolute top-[17%] xl:right-[10%] lg:right-[10.5%] sm:right-[9%] right-[11%]"
              alt="employee"
              src={member.picture}
              width={310}
              height={310}
              priority
            />
          </div>

          <div className="w-full max-w-lg">
            <div>{member.bio}</div>
            {member.socials && member.socials.length > 0 ? (
              <div className="flex items-center gap-5 mt-4">
                {member.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-3xl text-white transition-colors duration-150 ease-in-out rounded group focus:outline-none w-11 h-11 bg-sky"
                  >
                    <span className="iconify text-3xl" data-icon={social.icon}></span>
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
