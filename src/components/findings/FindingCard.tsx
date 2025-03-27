
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface Finding {
  id: string;
  title: string;
  description: string;
  service: string;
  resourceId: string;
  severity: string;
  status: string;
  timestamp: string;
}

interface FindingCardProps {
  finding: Finding;
}

export const FindingCard = ({ finding }: FindingCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-500 hover:bg-red-600';
      case 'high':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <Card className="glass-card overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getSeverityColor(finding.severity)}>
                {finding.severity}
              </Badge>
              <Badge variant="outline">{finding.service}</Badge>
              <Badge variant="outline">{finding.status}</Badge>
            </div>
            <CardTitle className="text-lg">{finding.title}</CardTitle>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Ignore
            </Button>
            <Button size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Remediate
            </Button>
          </div>
        </div>
        <CardDescription className="text-xs mt-1">
          Found {new Date(finding.timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{finding.description}</p>
        <div className="bg-secondary/50 rounded-lg p-3 text-xs font-mono overflow-x-auto">
          <span className="text-muted-foreground">Resource ID: </span>
          {finding.resourceId}
        </div>
      </CardContent>
    </Card>
  );
};
