
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, AlertTriangle, Cloud } from 'lucide-react';

interface FindingsHeaderProps {
  isConnected: boolean;
  isLoading: boolean;
  onRefresh: () => void;
}

export const FindingsHeader = ({ isConnected, isLoading, onRefresh }: FindingsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Security Findings</h1>
      
      <div className="flex items-center gap-2">
        {isConnected && (
          <Badge variant="outline" className="gap-1">
            <Cloud className="h-3 w-3" />
            AWS Connected
          </Badge>
        )}
        <Button variant="outline" size="sm" className="h-9" onClick={onRefresh} disabled={isLoading || !isConnected}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        
        <Button size="sm" className="h-9" disabled={isLoading}>
          <AlertTriangle className="h-4 w-4 mr-2" />
          Scan Now
        </Button>
      </div>
    </div>
  );
};
