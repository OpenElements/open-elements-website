'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AboutSidebar from '@/components/about/AboutSidebar'
import TeamSection from '@/components/about/TeamSection'
import EngagementsSection from '@/components/about/EngagementsSection'
import PartnersSection from '@/components/about/PartnersSection'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, options)

    const sections = document.querySelectorAll('.scroll-section')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <div className="">
      <div className="absolute  left-0 w-full top-0 h-34 -z-10 overflow-hidden">
        <Image
          src="/illustrations/hero-bg-2.svg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flow-root relative pb-20 sm:pb-36 container">
        <Image
          className="top-20 right-0 absolute size-40 shrink-0"
          src="/illustrations/circles-2.svg"
          alt=""
          width={160}
          height={160}
        />
        <Image
          className="top-[20%] left-52 absolute size-20 shrink-0"
          src="/illustrations/star.svg"
          alt=""
          width={80}
          height={80}
        />
        <Image
          className="top-[32%] left-12 absolute size-20 shrink-0"
          src="/illustrations/line-7.svg"
          alt=""
          width={80}
          height={80}
        />
        <Image
          className="top-[39%] -left-6 absolute size-72 shrink-0"
          src="/illustrations/sb-circle-2.svg"
          alt=""
          width={288}
          height={288}
        />
        <Image
          className="top-[55%] left-12 absolute size-20 shrink-0"
          src="/illustrations/line-6.svg"
          alt=""
          width={80}
          height={80}
        />
        <Image
          className="top-[65%] left-0 absolute size-56 shrink-0"
          src="/illustrations/circle-55.svg"
          alt=""
          width={224}
          height={224}
        />

        <div className="relative flex md:flex-row flex-col gap-24 pt-60 sm:pt-64 lg:pt-72 pb-16 w-full">
          <AboutSidebar 
            activeSection={activeSection} 
            onSectionClick={setActiveSection} 
          />
          
          <div className="flex flex-col gap-20 lg:gap-32 w-full">
            <TeamSection />
            <EngagementsSection />
            <PartnersSection />
          </div>
        </div>
      </div>
    </div>
  )
}
