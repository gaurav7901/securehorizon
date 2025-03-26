
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { SettingsTabs } from '@/components/dashboard/settings/settings-tabs';
import { AWSSettings } from '@/components/dashboard/settings/aws-settings';

const Settings = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <SettingsTabs />
          
          <AWSSettings />
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;
