
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/ui/chart';

const alertsData = [
  { name: 'Mon', value: 8 },
  { name: 'Tue', value: 12 },
  { name: 'Wed', value: 7 },
  { name: 'Thu', value: 15 },
  { name: 'Fri', value: 9 },
  { name: 'Sat', value: 4 },
  { name: 'Sun', value: 6 },
];

export function AlertsMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Activity</CardTitle>
        <CardDescription>New alerts triggered in the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart 
          data={alertsData}
          categories={['value']}
          index="name"
          valueFormatter={(value) => `${value} alerts`}
          colors={['#8b5cf6']}
          yAxisWidth={48}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
