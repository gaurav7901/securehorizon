
import React from 'react';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/page-transition';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldOff } from 'lucide-react';

const NotFound = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <ShieldOff className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
