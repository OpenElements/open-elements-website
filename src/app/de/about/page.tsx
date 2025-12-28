'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AboutSidebar from '@/components/about/AboutSidebar'
import TeamSection from '@/components/about/TeamSection'
import EngagementsSection from '@/components/about/EngagementsSection'
import PartnersSection from '@/components/about/PartnersSection'

export default function DeAboutPage() {
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
      <div className="flow-root relative pb-20 sm:pb-36 container">
        {/* Decorative images */}
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

        <div className="relative flex 2xl:flex-row flex-col gap-24 pt-60 sm:pt-64 lg:pt-72 pb-16 w-full">
          <div className="relative w-full 2xl:w-81 2xl:shrink-0">
            <div className="top-20 sticky -mt-36">
              <div className="mb-16">
                <div className="relative flex justify-center sm:justify-start items-center sm:items-start text-left">
                  <h1 className="text-center h1">Über uns</h1>
                  <Image 
                    src="/illustrations/underline.svg" 
                    alt="Underline"
                    className="-bottom-3 absolute sm:-mr-24 w-48 lg:w-72 shrink-0"
                    width={288}
                    height={24}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-6 bg-white shadow-5 px-7 py-8 rounded-[28px] w-full">
                <div className="flex flex-col gap-4">
                  <button 
                    type="button" 
                    onClick={() => {
                      setActiveSection('div1')
                      document.getElementById('div1')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`flex items-start gap-3 text-base text-left ${
                      activeSection === 'div1' ? 'text-green font-bold' : 'text-blue font-medium'
                    }`}
                  >
                    <div 
                      className={`mt-0.5 border-[3px] rounded-full size-5 shrink-0 ${
                        activeSection === 'div1' ? 'bg-green border-green' : 'border-purple bg-transparent'
                      }`}
                    />
                    Unser Team
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setActiveSection('div2')
                      document.getElementById('div2')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`flex items-start gap-3 text-base text-left ${
                      activeSection === 'div2' ? 'text-green font-bold' : 'text-blue font-medium'
                    }`}
                  >
                    <div 
                      className={`mt-0.5 border-[3px] rounded-full size-5 shrink-0 ${
                        activeSection === 'div2' ? 'bg-green border-green' : 'border-purple bg-transparent'
                      }`}
                    />
                    Unser Engagement
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setActiveSection('div3')
                      document.getElementById('div3')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`flex items-start gap-3 text-base text-left ${
                      activeSection === 'div3' ? 'text-green font-bold' : 'text-blue font-medium'
                    }`}
                  >
                    <div 
                      className={`mt-0.5 border-[3px] rounded-full size-5 shrink-0 ${
                        activeSection === 'div3' ? 'bg-green border-green' : 'border-purple bg-transparent'
                      }`}
                    />
                    Unsere Kunden & Partner
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-20 lg:gap-32 w-full">
            <div id="div1" className="scroll-mt-24 scroll-section">
              <div className="flex justify-between items-center gap-5">
                <h2 className="font-bold text-blue text-3xl sm:text-4xl lg:text-5xl">
                  Unser <span className="text-sky">Team</span>
                </h2>
              </div>
              <div className="place-content-center gap-x-6 gap-y-6 sm:gap-y-4 grid sm:grid-cols-3 mt-8 w-full">
                <TeamSection />
              </div>
            </div>

            <div id="div2" className="scroll-mt-24 scroll-section">
              <h2 className="font-bold text-blue text-3xl sm:text-4xl lg:text-5xl">
                Unser <span className="text-purple">Engagement</span>
              </h2>
              <div className="gap-5 grid md:grid-cols-2 mt-7 md:mt-12 w-full">
                <EngagementsSection />
              </div>
            </div>

            <div id="div3" className="scroll-mt-24 scroll-section">
              <h2 className="font-bold text-blue text-3xl sm:text-4xl lg:text-5xl">
                Unsere <span className="text-rose">Kunden & Partner</span>
              </h2>
              <div className="relative flex flex-wrap justify-center mt-7 md:mt-12 w-full">
                <PartnersSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
