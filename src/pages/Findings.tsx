import React, { useState, useEffect } from 'react';
import { PageTransition } from '@/components/page-transition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Shield, AlertTriangle, RefreshCw, Cloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAWSConnection } from '@/hooks/use-aws-connection';
import { getRecentCloudTrailEvents, getComplianceByResource } from '@/utils/aws-client';

// Mock data when AWS is not connected
const mockFindingsData = [
  {
    id: 'f1',
    title: 'Public S3 Bucket Detected',
    description: 'The S3 bucket "logs-backup-2023" is publicly accessible. This poses a significant security risk as anyone on the internet can access the contents.',
    service: 'S3',
    resourceId: 'arn:aws:s3:::logs-backup-2023',
    severity: 'Critical',
    status: 'Open',
    timestamp: '2023-10-15T14:23:41Z',
  },
  {
    id: 'f2',
    title: 'Unused IAM Access Keys',
    description: 'IAM access keys for user "deploy-user" have not been used in the last 90 days. Unused credentials increase the risk of undetected compromise.',
    service: 'IAM',
    resourceId: 'AKIAIOSFODNN7EXAMPLE',
    severity: 'High',
    status: 'Open',
    timestamp: '2023-10-14T10:15:22Z',
  },
  {
    id: 'f3',
    title: 'Unencrypted EBS Volume',
    description: 'EBS volume "vol-049df61146c4d7901" is not encrypted. All EBS volumes should be encrypted to protect sensitive data at rest.',
    service: 'EBS',
    resourceId: 'vol-049df61146c4d7901',
    severity: 'Medium',
    status: 'Open',
    timestamp: '2023-10-13T08:41:17Z',
  },
  {
    id: 'f4',
    title: 'Security Group with Open Ports',
    description: 'Security group "sg-0123456789abcdef0" allows unrestricted access (0.0.0.0/0) to port 22 (SSH). This configuration allows anyone to attempt SSH connections.',
    service: 'EC2',
    resourceId: 'sg-0123456789abcdef0',
    severity: 'High',
    status: 'Open',
    timestamp: '2023-10-12T16:33:09Z',
  },
  {
    id: 'f5',
    title: 'CloudTrail Logging Disabled',
    description: 'CloudTrail logging is disabled for the AWS account. This prevents tracking of user activity and API usage.',
    service: 'CloudTrail',
    resourceId: 'N/A',
    severity: 'Critical',
    status: 'Open',
    timestamp: '2023-10-11T11:27:33Z',
  },
];

// Define the interface for CloudTrail event details
interface CloudTrailEventDetails {
  sourceIPAddress?: string;
  eventTime?: string;
  eventSource?: string;
  [key: string]: any; // Allow other properties
}

const Findings = () => {
  const { toast } = useToast();
  const { isConnected, isVerifying } = useAWSConnection();
  const [isLoading, setIsLoading] = useState(false);
  const [findingsData, setFindingsData] = useState(mockFindingsData);
  
  const fetchAWSData = async () => {
    if (!isConnected) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Get CloudTrail events and map them to findings
      const events = await getRecentCloudTrailEvents(5);
      const compliance = await getComplianceByResource();
      
      // Transform CloudTrail events to findings format
      const eventFindings = events.map((event, index) => {
        // Parse the CloudTrailEvent JSON string if it exists
        let eventDetails: CloudTrailEventDetails = {};
        try {
          if (event.CloudTrailEvent) {
            eventDetails = JSON.parse(event.CloudTrailEvent) as CloudTrailEventDetails;
          }
        } catch (error) {
          console.error("Error parsing CloudTrailEvent:", error);
        }
        
        return {
          id: `aws-event-${index}`,
          title: `${event.EventName || 'API Call'} by ${event.Username || 'User'}`,
          description: `API action ${event.EventName} was called by ${event.Username || 'User'} from ${eventDetails.sourceIPAddress || 'Unknown IP'}.`,
          service: event.EventSource?.split('.')[0].toUpperCase() || 'AWS',
          resourceId: event.Resources?.[0]?.ResourceName || event.CloudTrailEvent || 'N/A',
          severity: 'Medium',
          status: 'Open',
          timestamp: event.EventTime?.toISOString() || new Date().toISOString(),
        };
      });
      
      // Transform compliance data to findings format
      const complianceFindings = compliance.map((item, index) => ({
        id: `aws-compliance-${index}`,
        title: `${item.ResourceType} Compliance Issue`,
        description: `Resource ${item.ResourceId} is ${item.Compliance?.ComplianceType} with ${item.Compliance?.ComplianceContributorCount} compliance issues.`,
        service: item.ResourceType?.split('::')[1] || 'AWS',
        resourceId: item.ResourceId || 'N/A',
        severity: item.Compliance?.ComplianceType === 'NON_COMPLIANT' ? 'High' : 'Low',
        status: 'Open',
        timestamp: new Date().toISOString(),
      }));
      
      // Combine and set the findings
      const combinedFindings = [...eventFindings, ...complianceFindings];
      
      if (combinedFindings.length > 0) {
        setFindingsData(combinedFindings);
      }
      
      toast({
        title: "Data Refreshed",
        description: "AWS security data has been refreshed"
      });
    } catch (error) {
      console.error("Error fetching AWS data:", error);
      toast({
        title: "Error",
        description: "Could not fetch AWS security data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isConnected && !isVerifying) {
      fetchAWSData();
    }
  }, [isConnected, isVerifying]);
  
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
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Security Findings</h1>
          
          <div className="flex items-center gap-2">
            {isConnected && (
              <Badge variant="outline" className="gap-1">
                <Cloud className="h-3 w-3" />
                AWS Connected
              </Badge>
            )}
            <Button variant="outline" size="sm" className="h-9" onClick={fetchAWSData} disabled={isLoading || !isConnected}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button size="sm" className="h-9" disabled={isLoading}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Scan Now
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search findings..."
              className="pl-8 w-full"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['Critical', 'High', 'Medium', 'Low'].map((severity) => (
                  <DropdownMenuCheckboxItem
                    key={severity}
                    checked={true}
                  >
                    {severity}
                  </DropdownMenuCheckboxItem>
                ))}
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Service</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['IAM', 'S3', 'EC2', 'EBS', 'RDS', 'CloudTrail'].map((service) => (
                  <DropdownMenuCheckboxItem
                    key={service}
                    checked={true}
                  >
                    {service}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        
        {!isLoading && (
          <div className="space-y-4">
            {findingsData.map((finding) => (
              <Card key={finding.id} className="glass-card overflow-hidden transition-all duration-200 hover:shadow-md">
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
            ))}
          </div>
        )}
        
        {!isLoading && !isConnected && (
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
        )}
      </div>
    </PageTransition>
  );
};

export default Findings;
