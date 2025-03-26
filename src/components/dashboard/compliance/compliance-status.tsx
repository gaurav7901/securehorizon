
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const complianceFrameworks = [
  {
    id: 'soc2',
    name: 'SOC 2',
    progress: 92,
    status: 'compliant',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180), // 6 months from now
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    progress: 78,
    status: 'in-progress',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60), // 60 days from now
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    progress: 84,
    status: 'compliant',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120), // 4 months from now
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    progress: 65,
    status: 'at-risk',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 1 month from now
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'compliant': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'at-risk': return <AlertCircle className="h-4 w-4 text-destructive" />;
    case 'in-progress': return <Clock className="h-4 w-4 text-amber-500" />;
    default: return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'compliant': return 'green';
    case 'at-risk': return 'destructive';
    case 'in-progress': return 'amber';
    default: return 'blue';
  }
};

export function ComplianceStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Status</CardTitle>
        <CardDescription>Current compliance with regulatory frameworks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceFrameworks.map((framework) => (
            <div key={framework.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(framework.status)}
                  <span className="font-medium">{framework.name}</span>
                </div>
                <span className="text-sm">{framework.progress}%</span>
              </div>
              
              <Progress 
                value={framework.progress} 
                className={`h-2 ${
                  framework.status === 'compliant' ? 'bg-muted text-green-600' : 
                  framework.status === 'at-risk' ? 'bg-muted text-destructive' : 
                  'bg-muted text-amber-500'
                }`}
              />
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="capitalize">{framework.status}</span>
                <span>
                  Due: {framework.dueDate.toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
