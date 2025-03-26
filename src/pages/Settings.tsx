
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { SettingsTabs } from '@/components/dashboard/settings/settings-tabs';

const Settings = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        
        <div className="w-full">
          <SettingsTabs />
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;
