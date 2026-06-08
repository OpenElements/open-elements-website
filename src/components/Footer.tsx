'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useState } from 'react';
import mainMenu from '@/data/mainMenu.json';

interface FooterProps {
  locale: string;
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <footer className="bg-[#001452]">
      <div className="mx-auto max-w-7xl px-8 pt-8 pb-6 lg:px-8 lg:pt-16 lg:pb-8 xl:px-20">
        {/* Top section */}
        <div className="flex flex-col gap-[85px] lg:flex-row lg:justify-between lg:gap-20">
          {/* Logo + tagline */}
          <div className="flex shrink-0 flex-col gap-3">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Open Elements"
                width={264}
                height={35}
                className="h-[35px] w-auto"
              />
            </Link>
            <p className="text-xl leading-8 text-[#C5DEF3]">
              {t('footerPhrase')}
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-col gap-[53px] lg:flex-row lg:gap-[53px]">
            {/* Navigation column */}
            <div className="flex flex-col gap-6 lg:gap-4">
              <button
                className="flex items-center justify-between lg:pointer-events-none"
                onClick={() => toggleSection('nav')}>
                <h3 className="text-xs font-bold uppercase leading-[26px] tracking-[1.2px] text-white">
                  {t('footerNavigation')}
                </h3>
                <ChevronDown
                  className={`lg:hidden transition-transform ${openSection === 'nav' ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`flex-col gap-4 ${openSection === 'nav' ? 'flex' : 'hidden'} lg:flex`}>
                {mainMenu.map((item, index) => {
                  if (!item.visibleInFooter) return null;
                  return (
                    <Link
                      key={index}
                      href={item.link}
                      className="text-base leading-[26px] text-[#C5DEF3] hover:text-white transition-colors">
                      {item.i18nKey ? t(item.i18nKey) : item.name}
                    </Link>
                  );
                })}
                {locale === 'de' && (
                  <>
                    <Link
                      href="/newsletter"
                      className="text-base leading-[26px] text-[#C5DEF3] hover:text-white transition-colors">
                      {t('newsletter')}
                    </Link>
                    <Link
                      href="/newsletter-archive"
                      className="text-base leading-[26px] text-[#C5DEF3] hover:text-white transition-colors">
                      {t('newsletterArchive')}
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Company column */}
            <div className="flex flex-col gap-6 lg:gap-4">
              <button
                className="flex items-center justify-between lg:pointer-events-none"
                onClick={() => toggleSection('company')}>
                <h3 className="text-xs font-bold uppercase leading-[26px] tracking-[1.2px] text-white">
                  {t('footerCompany')}
                </h3>
                <ChevronDown
                  className={`lg:hidden transition-transform ${openSection === 'company' ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`flex-col gap-4 ${openSection === 'company' ? 'flex' : 'hidden'} lg:flex`}>
                <a
                  href="https://www.iubenda.com/privacy-policy/63821551"
                  className="text-base leading-[26px] text-[#C5DEF3] hover:text-white transition-colors iubenda-nostyle no-brand iubenda-noiframe iubenda-embed"
                  title="Privacy Policy">
                  {t('privacyPolicy')}
                </a>
                <Link
                  href="/impressum"
                  className="text-base leading-[26px] text-[#C5DEF3] hover:text-white transition-colors">
                  {t('impressum')}
                </Link>
              </div>
            </div>

            {/* Contact column */}
            <div className="flex flex-col gap-6 lg:gap-4">
              <h3 className="text-xs font-bold uppercase leading-[26px] tracking-[1.2px] text-white">
                {t('footerContact')}
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:info@open-elements.com"
                  className="text-base leading-[26px] text-[#C5DEF3] hover:text-white transition-colors">
                  {t('footerEmail')}
                </a>
                <span className="text-base leading-[26px] text-[#C5DEF3]">
                  {t('footerLocation')}
                </span>
              </div>
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-xl border border-white px-6 py-3.5 text-[15px] font-bold leading-[18px] text-white hover:bg-white/10 transition-colors lg:mt-4 lg:w-auto">
                {t('footerBookAppointment')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-[#3A559A] pt-4 text-center">
          <span className="text-base leading-[26px] text-[#C5DEF3]">
            {t('footerTagline')}
          </span>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
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
        `,
        }}
      />
    </footer>
  );
}
