
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { SettingsTabs } from '@/components/dashboard/settings/settings-tabs';
import { AWSSettings } from '@/components/dashboard/settings/aws-settings';

const Settings = () => {
  return (
    <PageTransition>
      <div className="space-y-4 md:space-y-6 p-4 md:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Settings</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <SettingsTabs />
          
          <AWSSettings />
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;
