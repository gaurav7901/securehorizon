
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const complianceRequirements = [
  {
    id: 'req1',
    title: 'Data Encryption at Rest',
    framework: 'SOC 2',
    category: 'Security',
    status: 'fulfilled',
    description: 'All data stored in databases and file systems must be encrypted',
  },
  {
    id: 'req2',
    title: 'Access Control Policy',
    framework: 'HIPAA',
    category: 'Access',
    status: 'fulfilled',
    description: 'Implementation of role-based access control for sensitive data',
  },
  {
    id: 'req3',
    title: 'Regular Security Training',
    framework: 'ISO 27001',
    category: 'Training',
    status: 'fulfilled',
    description: 'All staff must complete security awareness training annually',
  },
  {
    id: 'req4',
    title: 'Incident Response Plan',
    framework: 'SOC 2',
    category: 'Process',
    status: 'not-fulfilled',
    description: 'Documented procedure for handling security incidents and breaches',
  },
  {
    id: 'req5',
    title: 'Data Processing Agreement',
    framework: 'GDPR',
    category: 'Legal',
    status: 'fulfilled',
    description: 'Contracts with third-party data processors meeting GDPR requirements',
  },
  {
    id: 'req6',
    title: 'Vulnerability Management',
    framework: 'ISO 27001',
    category: 'Security',
    status: 'at-risk',
    description: 'Regular scanning and remediation of security vulnerabilities',
  },
  {
    id: 'req7',
    title: 'Backup and Recovery',
    framework: 'SOC 2',
    category: 'Operations',
    status: 'fulfilled',
    description: 'Regular data backups and documented recovery procedures',
  },
  {
    id: 'req8',
    title: 'Physical Security Controls',
    framework: 'HIPAA',
    category: 'Physical',
    status: 'at-risk',
    description: 'Physical access restrictions to systems containing PHI',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'fulfilled': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'not-fulfilled': return <XCircle className="h-4 w-4 text-destructive" />;
    case 'at-risk': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    default: return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'fulfilled': return 'success';
    case 'not-fulfilled': return 'destructive';
    case 'at-risk': return 'warning';
    default: return 'default';
  }
};

export function ComplianceRequirements() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Compliance Requirements</CardTitle>
          <CardDescription>Status of individual compliance controls and requirements</CardDescription>
        </div>
        <Button size="sm" variant="outline">Filter</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceRequirements.map((requirement) => (
            <div key={requirement.id} className="rounded-md border p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(requirement.status)}
                    <h4 className="font-medium">{requirement.title}</h4>
                    <Badge variant="outline">{requirement.framework}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{requirement.description}</p>
                </div>
                <Badge variant={getStatusColor(requirement.status) as any} className="capitalize">
                  {requirement.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
