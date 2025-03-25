
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { SecurityScoreCard } from '@/components/dashboard/security-score-card';
import { FindingsSummary } from '@/components/dashboard/findings-summary';
import { ServiceFindings } from '@/components/dashboard/service-findings';
import { RecentFindings } from '@/components/dashboard/recent-findings';

const Dashboard = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-2">
            <SecurityScoreCard 
              score={72} 
              previousScore={68} 
              scoreChangePercentage={4} 
            />
          </div>
          
          <div className="md:col-span-4">
            <FindingsSummary />
          </div>
          
          <ServiceFindings />
          
          <RecentFindings />
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
