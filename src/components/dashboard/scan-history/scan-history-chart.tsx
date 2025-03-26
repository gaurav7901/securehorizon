
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/ui/chart';

const scanData = [
  { date: 'Mar 1', scans: 12, findings: 5 },
  { date: 'Mar 2', scans: 8, findings: 3 },
  { date: 'Mar 3', scans: 15, findings: 8 },
  { date: 'Mar 4', scans: 10, findings: 2 },
  { date: 'Mar 5', scans: 13, findings: 6 },
  { date: 'Mar 6', scans: 18, findings: 9 },
  { date: 'Mar 7', scans: 11, findings: 4 },
];

export function ScanHistoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Activity</CardTitle>
        <CardDescription>Number of scans and findings over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart 
          data={scanData}
          categories={['scans', 'findings']}
          index="date"
          valueFormatter={(value) => `${value}`}
          colors={['#8b5cf6', '#f97316']}
          yAxisWidth={48}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
