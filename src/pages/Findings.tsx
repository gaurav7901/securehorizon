
import React, { useState, useEffect } from 'react';
import { PageTransition } from '@/components/page-transition';
import { useToast } from '@/hooks/use-toast';
import { useAWSConnection } from '@/hooks/use-aws-connection';
import { getRecentCloudTrailEvents, getComplianceByResource } from '@/utils/aws-client';
import { FindingsHeader } from '@/components/findings/FindingsHeader';
import { FindingsFilter } from '@/components/findings/FindingsFilter';
import { FindingsList } from '@/components/findings/FindingsList';
import { Finding, CloudTrailEventDetails } from '@/components/findings/types';

// Mock data when AWS is not connected
const mockFindingsData: Finding[] = [
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

  return (
    <PageTransition>
      <div className="space-y-6">
        <FindingsHeader 
          isConnected={isConnected} 
          isLoading={isLoading} 
          onRefresh={fetchAWSData}
        />
        
        <FindingsFilter />
        
        <FindingsList 
          findings={findingsData} 
          isLoading={isLoading} 
          isConnected={isConnected} 
        />
      </div>
    </PageTransition>
  );
};

export default Findings;
