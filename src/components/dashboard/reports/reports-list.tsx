
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const reports = [
  {
    id: 'r1',
    title: 'Weekly Security Summary',
    type: 'Weekly',
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    size: '1.4 MB',
    status: 'completed',
  },
  {
    id: 'r2',
    title: 'Infrastructure Vulnerability Report',
    type: 'On-Demand',
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    size: '3.2 MB',
    status: 'completed',
  },
  {
    id: 'r3',
    title: 'API Gateway Security Audit',
    type: 'On-Demand',
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    size: '2.7 MB',
    status: 'completed',
  },
  {
    id: 'r4',
    title: 'User Activity Analysis',
    type: 'Monthly',
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    size: '5.1 MB',
    status: 'completed',
  },
  {
    id: 'r5',
    title: 'Database Access Audit',
    type: 'Quarterly',
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8 days ago
    size: '4.3 MB',
    status: 'completed',
  },
  {
    id: 'r6',
    title: 'Third-Party Integration Risk Assessment',
    type: 'Annual',
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 days ago
    size: '7.8 MB',
    status: 'completed',
  },
];

export function ReportsList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>Recent security and compliance reports</CardDescription>
        </div>
        <Button size="sm">Generate New Report</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{report.title}</h4>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Badge variant="outline" className="mr-2">{report.type}</Badge>
                  <span>{formatDistanceToNow(report.generatedAt, { addSuffix: true })}</span>
                  <span className="mx-1">•</span>
                  <span>{report.size}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
