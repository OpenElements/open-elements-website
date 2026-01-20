'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface AboutSidebarProps {
  activeSection: string
  onSectionClick: (section: string) => void
}

export default function AboutSidebar({ activeSection, onSectionClick }: AboutSidebarProps) {
  const t = useTranslations('about')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSectionClick = (section: string, elementId: string) => {
    onSectionClick(section)
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full md:w-81 md:shrink-0">
      <div className="top-20 sticky -mt-36">
        <div className="mb-16">
          <div className="relative flex justify-center sm:justify-start items-center sm:items-start text-left">
            <h1 className="text-center h1">{t('title')}</h1>
            <Image 
              src="/illustrations/underline.svg" 
              alt="Underline"
              className="-bottom-3 absolute sm:-mr-24 w-48 lg:w-72 shrink-0"
              width={288}
              height={24}
            />
          </div>
        </div>
        
        <div 
          className={`flex flex-col gap-6 bg-white shadow-5 px-7 py-8 rounded-[28px] ${
            isOpen ? 'w-full' : 'w-24'
          }`}
        >
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            type="button" 
            className="md:hidden"
          >
            <svg width="38" height="21" viewBox="0 0 38 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="38" height="3" fill="#469F85"/>
              <rect y="9" width="38" height="3" fill="#469F85"/>
              <rect y="18" width="38" height="3" fill="#469F85"/>
            </svg>
          </button>
          {isOpen && (
            <div className="flex flex-col gap-4">
              <button 
                type="button" 
                onClick={() => handleSectionClick('div1', 'div1')}
                className={`flex items-start gap-3 text-base text-left ${
                  activeSection === 'div1' ? 'text-green font-bold' : 'text-blue font-medium'
                }`}
              >
                <div 
                  className={`mt-0.5 border-[3px] rounded-full size-5 shrink-0 ${
                    activeSection === 'div1' ? 'bg-green border-green' : 'border-purple bg-transparent'
                  }`}
                />
                {t('sidebar.team')}
              </button>
              <button 
                type="button" 
                onClick={() => handleSectionClick('div2', 'div2')}
                className={`flex items-start gap-3 text-base text-left ${
                  activeSection === 'div2' ? 'text-green font-bold' : 'text-blue font-medium'
                }`}
              >
                <div 
                  className={`mt-0.5 border-[3px] rounded-full size-5 shrink-0 ${
                    activeSection === 'div2' ? 'bg-green border-green' : 'border-purple bg-transparent'
                  }`}
                />
                {t('sidebar.engagements')}
              </button>
              <button 
                type="button" 
                onClick={() => handleSectionClick('div3', 'div3')}
                className={`flex items-start gap-3 text-base text-left ${
                  activeSection === 'div3' ? 'text-green font-bold' : 'text-blue font-medium'
                }`}
              >
                <div 
                  className={`mt-0.5 border-[3px] rounded-full size-5 shrink-0 ${
                    activeSection === 'div3' ? 'bg-green border-green' : 'border-purple bg-transparent'
                  }`}
                />
                {t('sidebar.partners')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
