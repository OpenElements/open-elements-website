'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import mainMenu from '@/data/mainMenu.json'
import social from '@/data/social.json'

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations()

  return (
    <div className="bg-blue">
      <div className="container relative max-w-sm mx-auto lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full">
        <div className="absolute sm:-top-20 -top-16 sm:right-[12%] right-[8%] z-10">
          <a 
            href="#top" 
            aria-label="go up" 
            className="flex items-center justify-center w-12 h-12 transition-all duration-150 ease-in-out rounded-full shadow-2xl bg-green shadow-green hover:scale-110 sm:w-14 sm:h-14"
          >
            <span className="text-4xl text-white iconify" data-icon="iconoir:nav-arrow-up"></span>
          </a>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div className="container relative max-w-sm py-12 mx-auto lg:max-w-7xl md:max-w-2xl sm:max-w-xl sm:w-full lg:py-20 sm:py-16">
          <Image 
            src="/illustrations/round-1.svg" 
            alt="Circle" 
            width={400} 
            height={400}
            className="absolute w-full max-w-sm lg:-right-32 -bottom-16 -right-16 lg:-top-1/2" 
          />
          <Image 
            src="/illustrations/round-2.svg" 
            alt="Circle" 
            width={128} 
            height={128}
            className="absolute left-0 w-32 lg:right-80 lg:top-16 bottom-1/2 lg:left-auto" 
          />
          
          <div className="relative flex flex-col gap-5 lg:flex-row 2xl:gap-20 sm:gap-12">
            <div className="flex flex-col justify-between gap-6 xl:w-64 lg:w-1/3 shrink-0">
              <div className="flex flex-col gap-6">
                <Link href="/">
                  <Image src="/images/logo.svg" alt="logo" width={150} height={32} className="h-8 w-auto" />
                </Link>
                <p className="text-sm leading-7 text-white">
                  {t('footerPhrase')}
                </p>
              </div>
              
              <div className="items-center hidden gap-4 lg:flex">
                {social.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link} 
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-3xl text-white transition-colors duration-150 ease-in-out rounded group hover:text-blue focus:outline-none bg-white/40 hover:bg-green w-11 h-11"
                  >
                    <span className="iconify" data-icon={item.icon}></span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 xl:w-full lg:w-2/3 xl:grid-cols-4 gap-x-5 gap-y-10">
              <div>
                <p className="mb-4 text-base font-semibold leading-10 text-white sm:text-2xl sm:mb-6">Explore</p>
                <div className="flex flex-col gap-5">
                  {mainMenu.map((item, index) => {
                    if (!item.visibleInFooter) return null
                    return (
                      <Link key={index} href={item.link} className="flex items-start gap-3 group">
                        <span className="iconify footer-link-icon" data-icon="ph:arrow-right-bold"></span>
                        <span className="footer-link">{item.i18nKey ? t(item.i18nKey) : item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
              
              <div>
                <p className="mb-4 text-base font-semibold leading-10 text-white sm:text-2xl sm:mb-6">{t('privacy')}</p>
                <div className="flex flex-col gap-5">
                  <a 
                    href="https://www.iubenda.com/privacy-policy/63821551" 
                    className="flex items-center gap-3 group iubenda-nostyle no-brand iubenda-noiframe iubenda-embed" 
                    title="Privacy Policy"
                  >
                    <span className="iconify footer-link-icon" data-icon="ph:arrow-right-bold"></span>
                    <span className="footer-link">{t('privacyPolicy')}</span>
                  </a>
                  <a 
                    href="https://www.iubenda.com/privacy-policy/63821551/cookie-policy" 
                    className="flex items-center gap-3 group iubenda-nostyle no-brand iubenda-noiframe iubenda-embed" 
                    title="Cookie Policy"
                  >
                    <span className="iconify footer-link-icon" data-icon="ph:arrow-right-bold"></span>
                    <span className="footer-link">{t('privacyCookies')}</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center gap-3 iubenda-cs-preferences-link group"
                  >
                    <span className="iconify footer-link-icon" data-icon="ph:arrow-right-bold"></span>
                    <span className="footer-link">{t('privacySettings')}</span>
                  </a>
                  <Link href="/impressum" className="flex items-center gap-3 group">
                    <span className="iconify footer-link-icon" data-icon="ph:arrow-right-bold"></span>
                    <span className="footer-link">{t('impressum')}</span>
                  </Link>
                </div>
              </div>
              
              <div className="relative w-full col-span-2 xl:col-span-2">
                <div className="items-center justify-start gap-4 mt-6 lg:hidden flex">
                  {social.map((item, index) => (
                    <a 
                      key={index}
                      href={item.link} 
                      aria-label={item.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center text-3xl text-white transition-colors duration-150 ease-in-out rounded group hover:text-blue focus:outline-none bg-white/40 hover:bg-green w-11 h-11"
                    >
                      <span className="iconify" data-icon={item.icon}></span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          (function (w,d) {
            var loader = function () {
              var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; 
              s.src="https://cdn.iubenda.com/iubenda.js"; 
              tag.parentNode.insertBefore(s,tag);
            }; 
            if(w.addEventListener){
              w.addEventListener("load", loader, false);
            }else if(w.attachEvent){
              w.attachEvent("onload", loader);
            }else{
              w.onload = loader;
            }
          })(window, document);
        `
      }} />
    </div>
  )
}
