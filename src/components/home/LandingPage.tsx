'use client';

import HeroSection from './HeroSection';
import BusinessAreasSection from './BusinessAreasSection';
import DistinguishSection from './DistinguishSection';
import ValuesSection from './ValuesSection';
import ContactSection from './ContactSection';

export default function LandingPage() {
  return (
    <div className="bg-white text-blue">
      <HeroSection />
      <BusinessAreasSection />
      <DistinguishSection />
      <ValuesSection />
      <ContactSection />
    </div>
  );
}
