import Image from 'next/image'

export default function ContactInfo() {
  return (
    <div className="relative flex flex-col items-center w-full gap-8 lg:items-start xl:gap-12 lg:gap-6">
      <div className="bg-sky-100 gap-2 rounded-[28px] border-2 border-dashed border-sky p-6 max-w-[450px] shrink-0 w-full flex flex-col">
        <p>Next to this you can send us a mail at</p>
        <a 
          href="mailto:info@open-elements.com" 
          className="flex items-center gap-1 text-purple-700 link-purple"
        >
          <svg 
            className="w-5 h-5 stroke-2" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/>
          </svg>
          <p className="font-semibold">info@open-elements.com</p>
        </a>
        <p>or call us directly at</p>
        <a 
          href="tel:+4915122684622" 
          className="flex items-center gap-2 text-purple-700 link-purple"
        >
          <svg 
            className="w-5 h-5 stroke-2" 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path 
              fillRule="evenodd" 
              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
            />
          </svg>
          <p className="font-semibold">+49 151-22684622</p>
        </a>
      </div>
      
      <div className="bg-sky-100 gap-2 rounded-[28px] border-2 border-dashed border-sky p-6 max-w-[450px] shrink-0 w-full flex flex-col lg:-mr-5 xl:place-self-end">
        <p>Our postal address is</p>
        <div className="flex items-start gap-2 text-purple-700">
          <svg 
            className="w-6 h-6 mt-1 stroke-2" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
          <p className="font-semibold">
            Open Elements GmbH<br/>
            Gerhart-Hauptmann-Str. 49B<br/>
            51379 Leverkusen<br/>
            Germany
          </p>
        </div>
      </div>
    </div>
  )
}
