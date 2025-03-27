
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FindingCard } from './FindingCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud } from 'lucide-react';

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

interface FindingsListProps {
  findings: Finding[];
  isLoading: boolean;
  isConnected: boolean;
}

export const FindingsList = ({ findings, isLoading, isConnected }: FindingsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isConnected) {
    return (
      <Card className="bg-muted/50 border-dashed border-2 mt-6">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Cloud className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Connect to AWS for Real Data</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
            Connect your AWS account to fetch real security findings instead of sample data
          </p>
          <Button onClick={() => window.location.href = '/dashboard/settings'}>
            Configure AWS Connection
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {findings.map((finding) => (
        <FindingCard key={finding.id} finding={finding} />
      ))}
    </div>
  );
};
