import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Play, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Users,
  Database
} from 'lucide-react';

const mockDashboardData = [
  { label: 'Active Scans', value: '24', trend: '+12%', color: 'text-blue-500' },
  { label: 'Critical Issues', value: '3', trend: '-8%', color: 'text-red-500' },
  { label: 'Resolved Today', value: '18', trend: '+45%', color: 'text-green-500' },
  { label: 'Compliance Score', value: '94%', trend: '+2%', color: 'text-primary' }
];

const recentFindings = [
  { severity: 'Critical', title: 'S3 Bucket Publicly Accessible', service: 'S3', status: 'Active' },
  { severity: 'High', title: 'Unused IAM Role with Admin Access', service: 'IAM', status: 'Resolved' },
  { severity: 'Medium', title: 'Security Group Too Permissive', service: 'EC2', status: 'In Progress' }
];

export function DemoPreviewSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'text-green-500';
      case 'in progress': return 'text-yellow-500';
      default: return 'text-red-500';
    }
  };

  return (
    <section id="demo" className="py-20 px-6 bg-gradient-subtle">
      <div className="container max-w-7xl mx-auto">
        <SectionHeading
          title="See CyberHorizon in Action"
          subtitle="Interactive preview of our security dashboard"
          centered
        />
        
        <div className="mt-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="professional-card overflow-hidden"
          >
            {/* Dashboard Header */}
            <div className="bg-gradient-primary p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">Security Dashboard</h3>
                  <p className="text-white/80 text-sm">Real-time AWS security monitoring</p>
                </div>
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isPlaying ? 'Pause Demo' : 'Start Demo'}
                </Button>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {mockDashboardData.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-background/50 rounded-xl p-4 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-green-500 font-medium">
                      {stat.trend}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Recent Findings */}
            <div className="p-6 pt-0">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Recent Security Findings
              </h4>
              
              <div className="space-y-3">
                {recentFindings.map((finding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/30"
                  >
                    <div className="flex items-center gap-3">
                      <Badge className={`${getSeverityColor(finding.severity)} text-white`}>
                        {finding.severity}
                      </Badge>
                      <div>
                        <div className="font-medium text-sm">{finding.title}</div>
                        <div className="text-xs text-muted-foreground">{finding.service}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${getStatusColor(finding.status)}`}>
                      {finding.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Live Activity Indicator */}
            <div className="px-6 pb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live monitoring active • Last scan: 2 minutes ago</span>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-8">
            <Button asChild size="lg" className="gradient-primary text-white shadow-glow">
              <a href="#" onClick={() => window.open('/dashboard', '_blank')}>
                Open Full Dashboard
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}