
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const reportStats = {
  totalReports: 47,
  completedReports: 38,
  pendingReports: 9,
  completionRate: 81,
  weeklyChange: 4,
};

export function ReportsSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Summary</CardTitle>
        <CardDescription>Overview of security reports and compliance status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Completion Rate</span>
            <span className="text-sm font-medium">{reportStats.completionRate}%</span>
          </div>
          <Progress value={reportStats.completionRate} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {reportStats.weeklyChange > 0 ? '+' : ''}{reportStats.weeklyChange}% change from last week
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-md border p-4">
            <div className="text-sm font-medium">Completed</div>
            <div className="mt-1 flex items-baseline">
              <div className="text-2xl font-semibold">{reportStats.completedReports}</div>
              <div className="ml-1 text-xs text-muted-foreground">reports</div>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <div className="text-sm font-medium">Pending</div>
            <div className="mt-1 flex items-baseline">
              <div className="text-2xl font-semibold">{reportStats.pendingReports}</div>
              <div className="ml-1 text-xs text-muted-foreground">reports</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
