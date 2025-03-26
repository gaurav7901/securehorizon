
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const scheduledReports = [
  {
    id: 'sr1',
    title: 'Weekly Security Summary',
    frequency: 'Every Monday at 9:00 AM',
    nextScheduled: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    status: 'active',
  },
  {
    id: 'sr2',
    title: 'Executive Dashboard',
    frequency: 'Monthly on the 1st',
    nextScheduled: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10 days from now
    status: 'active',
  },
  {
    id: 'sr3',
    title: 'Compliance Audit Report',
    frequency: 'Quarterly',
    nextScheduled: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45), // 45 days from now
    status: 'active',
  },
  {
    id: 'sr4',
    title: 'Vulnerability Scan',
    frequency: 'Daily at 11:30 PM',
    nextScheduled: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
    status: 'active',
  },
];

export function ScheduledReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Reports</CardTitle>
        <CardDescription>Upcoming automated security reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduledReports.map((report) => (
            <div key={report.id} className="flex items-start space-x-4 rounded-md border p-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{report.title}</p>
                  <Badge variant="outline">{report.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{report.frequency}</p>
                <p className="text-xs">
                  Next: {report.nextScheduled.toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
