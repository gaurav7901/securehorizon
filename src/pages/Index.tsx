
import React, { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { SecuritySection } from '@/components/security-section';
import { DeploymentSection } from '@/components/deployment-section';
import { FaqSection } from '@/components/faq-section';
import { CtaSection } from '@/components/cta-section';
import { AppTour } from '@/components/app-tour/AppTour';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

const Index = () => {
  const [showTour, setShowTour] = useState(false);

  return (
    <>
      <div className="fixed top-24 right-8 z-40">
        <Button 
          onClick={() => setShowTour(!showTour)} 
          className="shadow-lg"
        >
          <PlayCircle className="h-4 w-4 mr-2" />
          {showTour ? 'Close Tour' : 'Start Video Tour'}
        </Button>
      </div>
      
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <DeploymentSection />
      <FaqSection />
      <CtaSection />
      
      {showTour && <AppTour />}
    </>
  );
};

export default Index;
