
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { AlertsOverview } from '@/components/dashboard/alerts/alerts-overview';
import { RecentAlerts } from '@/components/dashboard/alerts/recent-alerts';
import { AlertsMetrics } from '@/components/dashboard/alerts/alerts-metrics';

const Alerts = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Security Alerts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-3">
            <AlertsOverview />
          </div>
          
          <div className="md:col-span-3">
            <AlertsMetrics />
          </div>
          
          <div className="md:col-span-6">
            <RecentAlerts />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Alerts;
