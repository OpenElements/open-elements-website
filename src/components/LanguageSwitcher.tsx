'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export default function LanguageSwitcher({ 
  className = '', 
  showLabel = true 
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale as 'en' | 'de' });
    });
  };

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];
  const otherLanguages = languages.filter((lang) => lang.code !== locale);

  return (
    <div className={`relative group ${className}`}>
      <button
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-white/10 hover:bg-white/20
          border border-white/20 hover:border-white/40
          transition-all duration-200 ease-in-out
          text-sm font-medium
          ${isPending ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
        `}
        disabled={isPending}
        aria-label="Change language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        {showLabel && (
          <span className="text-blue">{currentLanguage.code.toUpperCase()}</span>
        )}
        <svg 
          className="w-4 h-4 text-blue transition-transform group-hover:rotate-180" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div className="
        absolute top-full right-0 mt-2
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-200 ease-in-out
        z-50
      ">
        <div className="
          bg-white rounded-lg shadow-lg border border-gray-200
          overflow-hidden min-w-[140px]
          py-1
        ">
          {otherLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLocaleChange(lang.code)}
              disabled={isPending}
              className="
                flex items-center gap-3 w-full px-4 py-2.5
                text-left text-sm font-medium text-gray-700
                hover:bg-purple/10 hover:text-purple
                transition-colors duration-150
                disabled:opacity-50 disabled:cursor-wait
              "
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
