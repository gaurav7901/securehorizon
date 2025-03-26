
import React from 'react';
import { PageTransition } from '@/components/page-transition';
import { SecurityScoreCard } from '@/components/dashboard/security-score-card';
import { FindingsSummary } from '@/components/dashboard/findings-summary';
import { ServiceFindings } from '@/components/dashboard/service-findings';
import { RecentFindings } from '@/components/dashboard/recent-findings';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Lock, ShieldAlert, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, hasRole, hasPermission, logout } = useAuth();
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          
          <Card className="w-full md:w-auto bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="outline" className="capitalize">
                      {user?.role}
                    </Badge>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={logout}
                    >
                      <LogOut className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Access Level
              </CardTitle>
              <CardDescription>
                Your current permissions and access level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Role Hierarchy:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['admin', 'manager', 'analyst', 'viewer'].map((role) => (
                      <Badge 
                        key={role} 
                        variant={hasRole(role as any) ? "default" : "outline"}
                        className={hasRole(role as any) ? "" : "opacity-50"}
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Your Permissions:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {user?.permissions.map((perm) => (
                      <div 
                        key={perm}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <ShieldAlert className="h-3 w-3 text-primary" />
                        {perm}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="md:col-span-1">
            <SecurityScoreCard 
              score={72} 
              previousScore={68} 
              scoreChangePercentage={4} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-6">
            <FindingsSummary />
          </div>
          
          {hasPermission('read:all') && (
            <ServiceFindings />
          )}
          
          <RecentFindings />
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
