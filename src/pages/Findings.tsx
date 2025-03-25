
import React from 'react';
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
import { Search, Filter, Shield, AlertTriangle, RefreshCw } from 'lucide-react';

const findingsData = [
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

const Findings = () => {
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
            <Button variant="outline" size="sm" className="h-9">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button size="sm" className="h-9">
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
      </div>
    </PageTransition>
  );
};

export default Findings;
