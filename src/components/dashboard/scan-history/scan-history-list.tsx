
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Clock, FileText, Terminal, XCircle } from 'lucide-react';

const scanHistoryData = [
  {
    id: 'scan123',
    type: 'Full System Scan',
    status: 'completed',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    duration: '6m 12s',
    findings: 8,
    coverage: '94%',
  },
  {
    id: 'scan122',
    type: 'API Endpoints Scan',
    status: 'completed',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    duration: '3m 45s',
    findings: 2,
    coverage: '96%',
  },
  {
    id: 'scan121',
    type: 'Database Security Scan',
    status: 'completed',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
    duration: '7m 30s',
    findings: 5,
    coverage: '89%',
  },
  {
    id: 'scan120',
    type: 'Authentication Flow Scan',
    status: 'completed',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    duration: '4m 51s',
    findings: 1,
    coverage: '98%',
  },
  {
    id: 'scan119',
    type: 'Container Security Scan',
    status: 'failed',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    duration: '2m 17s',
    findings: 0,
    coverage: '43%',
  },
  {
    id: 'scan118',
    type: 'Full System Scan',
    status: 'completed',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    duration: '6m 05s',
    findings: 12,
    coverage: '95%',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'failed': return <XCircle className="h-4 w-4 text-destructive" />;
    case 'in-progress': return <Clock className="h-4 w-4 text-amber-500" />;
    default: return null;
  }
};

const getScanTypeIcon = (type: string) => {
  if (type.includes('API')) return <Terminal className="h-4 w-4" />;
  if (type.includes('Database')) return <FileText className="h-4 w-4" />;
  return <Terminal className="h-4 w-4" />;
};

export function ScanHistoryList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>History of security scans performed on your system</CardDescription>
        </div>
        <Button size="sm">Run New Scan</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scanHistoryData.map((scan) => (
            <div key={scan.id} className="flex items-center justify-between rounded-md border p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getScanTypeIcon(scan.type)}
                  <h4 className="font-medium">{scan.type}</h4>
                  <Badge variant={scan.status === 'completed' ? 'default' : 'destructive'} 
                    className={scan.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(scan.status)}
                      <span>{scan.status}</span>
                    </span>
                  </Badge>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Started {formatDistanceToNow(scan.startTime, { addSuffix: true })}</span>
                  <span className="mx-2">•</span>
                  <span>Duration: {scan.duration}</span>
                  <span className="mx-2">•</span>
                  <span>Findings: {scan.findings}</span>
                  <span className="mx-2">•</span>
                  <span>Coverage: {scan.coverage}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">View Details</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
