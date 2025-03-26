
import { useEffect, useState } from 'react';
import { hasAWSCredentials, verifyAWSCredentials } from '@/utils/aws-client';

export const useAWSConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      setIsVerifying(true);
      try {
        if (hasAWSCredentials()) {
          const verified = await verifyAWSCredentials();
          setIsConnected(verified);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        setIsConnected(false);
      } finally {
        setIsVerifying(false);
      }
    };

    checkConnection();
  }, []);

  return { isConnected, isVerifying };
};
