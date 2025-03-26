
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  setAWSCredentials, 
  hasAWSCredentials, 
  clearAWSCredentials,
  verifyAWSCredentials,
  AWSCredentials
} from "@/utils/aws-client";
import { Shield, X } from 'lucide-react';

export const AWSConnector = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(hasAWSCredentials());
  const [credentials, setCredentials] = useState<AWSCredentials>({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1'
  });

  const handleConnect = async () => {
    if (!credentials.accessKeyId || !credentials.secretAccessKey) {
      toast({
        title: "Error",
        description: "Please provide both Access Key ID and Secret Access Key",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Set the credentials
      setAWSCredentials(credentials);
      
      // Verify the credentials
      const isValid = await verifyAWSCredentials();
      
      if (isValid) {
        setIsConnected(true);
        toast({
          title: "Connected to AWS",
          description: "Successfully connected to your AWS account",
        });
      } else {
        clearAWSCredentials();
        toast({
          title: "Connection Failed",
          description: "Could not connect with the provided credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error connecting to AWS:', error);
      clearAWSCredentials();
      toast({
        title: "Connection Error",
        description: "An error occurred while connecting to AWS",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    clearAWSCredentials();
    setIsConnected(false);
    setCredentials({
      accessKeyId: '',
      secretAccessKey: '',
      region: 'us-east-1'
    });
    toast({
      title: "Disconnected",
      description: "Successfully disconnected from AWS"
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Connected to AWS
          </CardTitle>
          <CardDescription>
            Your AWS account is connected and secure
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={handleDisconnect}
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect to AWS</CardTitle>
        <CardDescription>
          Provide your AWS credentials to connect to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="accessKeyId">Access Key ID</Label>
          <Input
            id="accessKeyId"
            name="accessKeyId"
            value={credentials.accessKeyId}
            onChange={handleChange}
            placeholder="AKIAIOSFODNN7EXAMPLE"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="secretAccessKey">Secret Access Key</Label>
          <Input
            id="secretAccessKey"
            name="secretAccessKey"
            type="password"
            value={credentials.secretAccessKey}
            onChange={handleChange}
            placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="region">AWS Region</Label>
          <Input
            id="region"
            name="region"
            value={credentials.region}
            onChange={handleChange}
            placeholder="us-east-1"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConnect} 
          disabled={isConnecting}
          className="w-full"
        >
          {isConnecting ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Connecting...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4 mr-2" />
              Connect to AWS
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
