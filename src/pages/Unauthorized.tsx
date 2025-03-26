
import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/page-transition';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <Shield className="h-10 w-10 text-destructive" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        
        <p className="text-muted-foreground text-center max-w-md mb-6">
          {user ? (
            <>You don't have sufficient permissions to access this resource. Your current role is <span className="font-semibold">{user.role}</span>.</>
          ) : (
            <>You need to be logged in with appropriate permissions to access this resource.</>
          )}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default Unauthorized;
