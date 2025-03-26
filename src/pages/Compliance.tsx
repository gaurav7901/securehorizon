
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { ComplianceStatus } from '@/components/dashboard/compliance/compliance-status';
import { ComplianceRequirements } from '@/components/dashboard/compliance/compliance-requirements';
import { ComplianceTimeline } from '@/components/dashboard/compliance/compliance-timeline';

const Compliance = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Compliance</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-3">
            <ComplianceStatus />
          </div>
          
          <div className="md:col-span-3">
            <ComplianceTimeline />
          </div>
          
          <div className="md:col-span-6">
            <ComplianceRequirements />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Compliance;
