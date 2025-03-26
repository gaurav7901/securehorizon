
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const alerts = [
  {
    id: 'a1',
    title: 'Unusual login attempt detected',
    description: 'Multiple failed login attempts from IP 192.168.1.23',
    severity: 'critical',
    status: 'open',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 'a2',
    title: 'API key exposure detected',
    description: 'API key found in public GitHub repository',
    severity: 'critical',
    status: 'open',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 'a3',
    title: 'Outdated dependency detected',
    description: 'Package "react-router" has known vulnerabilities',
    severity: 'high',
    status: 'open',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: 'a4',
    title: 'Unusual outbound network traffic',
    description: 'High volume of traffic detected to unknown domain',
    severity: 'high',
    status: 'investigating',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
  },
  {
    id: 'a5',
    title: 'Misconfigured S3 bucket permissions',
    description: 'Public read access detected on sensitive bucket',
    severity: 'medium',
    status: 'resolved',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: 'a6',
    title: 'XSS vulnerability detected',
    description: 'Cross-site scripting vulnerability in login form',
    severity: 'medium',
    status: 'resolved',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'destructive';
    case 'high': return 'orange';
    case 'medium': return 'amber';
    case 'low': return 'teal';
    default: return 'blue';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open': return <AlertCircle className="h-4 w-4 text-destructive" />;
    case 'investigating': return <Clock className="h-4 w-4 text-amber-500" />;
    case 'resolved': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default: return null;
  }
};

export function RecentAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>The most recent security alerts detected by the system</CardDescription>
        </div>
        <Button size="sm" variant="outline">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(alert.status)}
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
                <Button size="icon" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <span>{formatDistanceToNow(alert.timestamp, { addSuffix: true })}</span>
                <span className="mx-2">•</span>
                <span className="capitalize">{alert.status}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
