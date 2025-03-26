
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { ReportsList } from '@/components/dashboard/reports/reports-list';
import { ReportsSummary } from '@/components/dashboard/reports/reports-summary';
import { ScheduledReports } from '@/components/dashboard/reports/scheduled-reports';

const Reports = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Security Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-3">
            <ReportsSummary />
          </div>
          
          <div className="md:col-span-3">
            <ScheduledReports />
          </div>
          
          <div className="md:col-span-6">
            <ReportsList />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Reports;
