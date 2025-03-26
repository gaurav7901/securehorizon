
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

const alertSummary = {
  critical: 3,
  high: 7,
  medium: 12,
  low: 9,
  total: 31
};

export function AlertsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts Overview</CardTitle>
        <CardDescription>Summary of active security alerts by severity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <ShieldX className="h-6 w-6 text-destructive" />
            <div>
              <p className="text-sm font-medium leading-none">Critical</p>
              <p className="text-2xl font-bold">{alertSummary.critical}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <ShieldAlert className="h-6 w-6 text-orange-500" />
            <div>
              <p className="text-sm font-medium leading-none">High</p>
              <p className="text-2xl font-bold">{alertSummary.high}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <Shield className="h-6 w-6 text-amber-500" />
            <div>
              <p className="text-sm font-medium leading-none">Medium</p>
              <p className="text-2xl font-bold">{alertSummary.medium}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <ShieldCheck className="h-6 w-6 text-teal-500" />
            <div>
              <p className="text-sm font-medium leading-none">Low</p>
              <p className="text-2xl font-bold">{alertSummary.low}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 rounded-md border p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Total Active Alerts</p>
            <p className="text-2xl font-bold">{alertSummary.total}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
