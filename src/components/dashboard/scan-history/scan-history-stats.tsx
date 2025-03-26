
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ClockIcon, ServerIcon, ShieldCheckIcon } from 'lucide-react';

const scanStats = {
  totalScans: 157,
  completedScans: 156,
  failedScans: 1,
  successRate: 99,
  averageDuration: '5m 27s',
  averageCoverage: 92,
};

export function ScanHistoryStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Statistics</CardTitle>
        <CardDescription>Overview of security scan performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Success Rate</span>
            <span className="text-sm font-medium">{scanStats.successRate}%</span>
          </div>
          <Progress value={scanStats.successRate} className="h-2" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <ServerIcon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Total Scans</p>
              <p className="text-lg font-semibold">{scanStats.totalScans}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="rounded-full bg-green-500/10 p-2">
              <ShieldCheckIcon className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Average Coverage</p>
              <p className="text-lg font-semibold">{scanStats.averageCoverage}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="rounded-full bg-blue-500/10 p-2">
              <ClockIcon className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Average Duration</p>
              <p className="text-lg font-semibold">{scanStats.averageDuration}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
