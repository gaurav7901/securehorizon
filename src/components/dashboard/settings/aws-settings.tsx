
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AWSConnector } from '@/components/aws/aws-connector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAWSConnection } from '@/hooks/use-aws-connection';
import { Separator } from '@/components/ui/separator';
import { CloudCog } from 'lucide-react';

export const AWSSettings = () => {
  const { isConnected, isVerifying } = useAWSConnection();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CloudCog className="h-5 w-5" />
          <CardTitle>AWS Integration</CardTitle>
        </div>
        <CardDescription>
          Connect to your AWS account to fetch real security data
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <Tabs defaultValue="connection">
          <TabsList className="mb-4 w-full md:w-auto">
            <TabsTrigger value="connection" className="flex-1 md:flex-none">Connection</TabsTrigger>
            <TabsTrigger value="permissions" className="flex-1 md:flex-none">Required Permissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connection">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${isVerifying ? 'bg-amber-500 animate-pulse' : isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {isVerifying ? 'Checking connection...' : isConnected ? 'Connected to AWS' : 'Not connected to AWS'}
                </span>
              </div>
              
              <Separator />
              
              <AWSConnector />
            </div>
          </TabsContent>
          
          <TabsContent value="permissions">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your AWS IAM user or role needs the following permissions to use all features:
              </p>
              
              <div className="bg-muted/50 p-3 md:p-4 rounded-md font-mono text-xs overflow-x-auto">
                {`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudtrail:LookupEvents",
        "config:DescribeComplianceByResource",
        "config:GetComplianceDetailsByResource",
        "sts:GetCallerIdentity"
      ],
      "Resource": "*"
    }
  ]
}`}
              </div>
              
              <p className="text-sm text-muted-foreground">
                For production use, we recommend creating a dedicated IAM user with minimal permissions.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
