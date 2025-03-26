
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { ScanHistoryList } from '@/components/dashboard/scan-history/scan-history-list';
import { ScanHistoryStats } from '@/components/dashboard/scan-history/scan-history-stats';
import { ScanHistoryChart } from '@/components/dashboard/scan-history/scan-history-chart';

const ScanHistory = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Scan History</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-3">
            <ScanHistoryStats />
          </div>
          
          <div className="md:col-span-3">
            <ScanHistoryChart />
          </div>
          
          <div className="md:col-span-6">
            <ScanHistoryList />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ScanHistory;
