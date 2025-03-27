
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { FindingsHeader } from '@/components/findings/FindingsHeader';
import { FindingsFilter } from '@/components/findings/FindingsFilter';
import { FindingsList } from '@/components/findings/FindingsList';
import { useFindings } from '@/hooks/use-findings';

const Findings = () => {
  const { findings, isLoading, isConnected, refreshFindings } = useFindings();

  return (
    <PageTransition>
      <div className="space-y-6">
        <FindingsHeader 
          isConnected={isConnected} 
          isLoading={isLoading} 
          onRefresh={refreshFindings}
        />
        
        <FindingsFilter />
        
        <FindingsList 
          findings={findings} 
          isLoading={isLoading} 
          isConnected={isConnected} 
        />
      </div>
    </PageTransition>
  );
};

export default Findings;
