
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, FileCheck, FilePlus } from 'lucide-react';

const timelineEvents = [
  {
    id: 'ct1',
    title: 'SOC 2 Annual Audit',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45), // 45 days from now
    type: 'upcoming',
    framework: 'SOC 2',
    description: 'Annual compliance review with external auditor',
  },
  {
    id: 'ct2',
    title: 'HIPAA Documentation Submission',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
    type: 'upcoming',
    framework: 'HIPAA',
    description: 'Submit updated security policies and procedures',
  },
  {
    id: 'ct3',
    title: 'ISO 27001 Gap Assessment',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    type: 'upcoming',
    framework: 'ISO 27001',
    description: 'Internal assessment to identify compliance gaps',
  },
  {
    id: 'ct4',
    title: 'GDPR Data Processing Audit',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    type: 'completed',
    framework: 'GDPR',
    description: 'Review of data processing activities and consent management',
  },
  {
    id: 'ct5',
    title: 'SOC 2 Controls Implementation',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90), // 90 days ago
    type: 'completed',
    framework: 'SOC 2',
    description: 'Implementation of required security controls',
  },
];

export function ComplianceTimeline() {
  const upcomingEvents = timelineEvents.filter(event => event.type === 'upcoming');
  const pastEvents = timelineEvents.filter(event => event.type === 'completed');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Timeline</CardTitle>
        <CardDescription>Upcoming and past compliance activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium">Upcoming</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex space-x-3 rounded-md border p-3">
                  <div className="rounded-full bg-primary/10 p-2 self-start">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{event.title}</span>
                      <Badge variant="outline" className="ml-2">{event.framework}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    <p className="text-xs font-medium">
                      {event.date.toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 font-medium">Completed</h3>
            <div className="space-y-3">
              {pastEvents.map((event) => (
                <div key={event.id} className="flex space-x-3 rounded-md border p-3">
                  <div className="rounded-full bg-green-500/10 p-2 self-start">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{event.title}</span>
                      <Badge variant="outline" className="ml-2">{event.framework}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    <p className="text-xs font-medium">
                      {event.date.toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
