
import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';
import { CloudTrailClient, LookupEventsCommand } from '@aws-sdk/client-cloudtrail';
import { ConfigServiceClient, DescribeComplianceByResourceCommand } from '@aws-sdk/client-config-service';

// AWS Credentials interface
export interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

// Store AWS credentials in memory (not persistent)
let awsCredentials: AWSCredentials | null = null;

// Set AWS credentials
export const setAWSCredentials = (credentials: AWSCredentials) => {
  awsCredentials = credentials;
};

// Check if AWS credentials are set
export const hasAWSCredentials = (): boolean => {
  return awsCredentials !== null;
};

// Clear AWS credentials
export const clearAWSCredentials = () => {
  awsCredentials = null;
};

// Get AWS credentials
export const getAWSCredentials = (): AWSCredentials | null => {
  return awsCredentials;
};

// Create STS client
export const createSTSClient = () => {
  if (!awsCredentials) {
    throw new Error('AWS credentials not set');
  }

  return new STSClient({
    region: awsCredentials.region,
    credentials: {
      accessKeyId: awsCredentials.accessKeyId,
      secretAccessKey: awsCredentials.secretAccessKey,
    },
  });
};

// Create CloudTrail client
export const createCloudTrailClient = () => {
  if (!awsCredentials) {
    throw new Error('AWS credentials not set');
  }

  return new CloudTrailClient({
    region: awsCredentials.region,
    credentials: {
      accessKeyId: awsCredentials.accessKeyId,
      secretAccessKey: awsCredentials.secretAccessKey,
    },
  });
};

// Create Config client
export const createConfigClient = () => {
  if (!awsCredentials) {
    throw new Error('AWS credentials not set');
  }

  return new ConfigServiceClient({
    region: awsCredentials.region,
    credentials: {
      accessKeyId: awsCredentials.accessKeyId,
      secretAccessKey: awsCredentials.secretAccessKey,
    },
  });
};

// Verify AWS credentials
export const verifyAWSCredentials = async (): Promise<boolean> => {
  try {
    const stsClient = createSTSClient();
    const command = new GetCallerIdentityCommand({});
    const response = await stsClient.send(command);
    return !!response.Account;
  } catch (error) {
    console.error('Error verifying AWS credentials:', error);
    return false;
  }
};

// Get recent CloudTrail events
export const getRecentCloudTrailEvents = async (maxResults = 10) => {
  try {
    const client = createCloudTrailClient();
    const command = new LookupEventsCommand({
      MaxResults: maxResults,
    });
    const response = await client.send(command);
    return response.Events || [];
  } catch (error) {
    console.error('Error fetching CloudTrail events:', error);
    throw error;
  }
};

// Get compliance data
export const getComplianceByResource = async () => {
  try {
    const client = createConfigClient();
    const command = new DescribeComplianceByResourceCommand({});
    const response = await client.send(command);
    return response.ComplianceByResources || [];
  } catch (error) {
    console.error('Error fetching compliance data:', error);
    throw error;
  }
};
