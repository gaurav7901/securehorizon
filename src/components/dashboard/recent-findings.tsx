
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlarmClock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const recentFindings = [
  {
    id: 'f1',
    title: 'Public S3 Bucket Detected',
    service: 'S3',
    severity: 'Critical',
    timestamp: '30 minutes ago',
  },
  {
    id: 'f2',
    title: 'Unused IAM Access Keys',
    service: 'IAM',
    severity: 'High',
    timestamp: '1 hour ago',
  },
  {
    id: 'f3',
    title: 'Unencrypted EBS Volume',
    service: 'EBS',
    severity: 'Medium',
    timestamp: '2 hours ago',
  },
  {
    id: 'f4',
    title: 'Security Group with Open Ports',
    service: 'EC2',
    severity: 'High',
    timestamp: '3 hours ago',
  },
];

export function RecentFindings() {
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
    <Card className="glass-card col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Findings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentFindings.map((finding, index) => (
            <motion.div
              key={finding.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={getSeverityColor(finding.severity)}>
                    {finding.severity}
                  </Badge>
                  <Badge variant="outline">{finding.service}</Badge>
                </div>
                <h4 className="text-sm font-medium">{finding.title}</h4>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <AlarmClock className="h-3 w-3 mr-1" />
                  <span>{finding.timestamp}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="ml-2">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to="/dashboard/findings">View All Findings</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
