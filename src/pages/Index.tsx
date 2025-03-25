
import React from 'react';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { SecuritySection } from '@/components/security-section';
import { DeploymentSection } from '@/components/deployment-section';
import { FaqSection } from '@/components/faq-section';
import { CtaSection } from '@/components/cta-section';

const Index = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <DeploymentSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};

export default Index;
