
import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { 
  ShieldAlert, 
  Bell, 
  Database, 
  UserCog, 
  Zap, 
  Workflow,
  FileBarChart,
  Radar
} from 'lucide-react';

const features = [
  {
    icon: ShieldAlert,
    title: 'Security Scanning',
    description: 'Detect misconfigurations in IAM, S3, EC2, RDS and more with custom security rules.'
  },
  {
    icon: Bell,
    title: 'Alerting System',
    description: 'Receive notifications via SNS, Slack, Teams or email when security issues are found.'
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Store findings in DynamoDB and S3 with efficient indexing for quick access.'
  },
  {
    icon: UserCog,
    title: 'Access Control',
    description: 'Role-based access control with Admin, Analyst and Developer roles.'
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Support for scheduled and real-time scans with parallel execution.'
  },
  {
    icon: Workflow,
    title: 'Automated Remediation',
    description: 'Optional auto-fixing of security issues using AWS Systems Manager.'
  },
  {
    icon: FileBarChart,
    title: 'Logging & Monitoring',
    description: 'Comprehensive logging of all findings and activities with CloudTrail.'
  },
  {
    icon: Radar,
    title: 'Threat Intelligence',
    description: 'Integration with threat intelligence services for enhanced security.'
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container max-w-7xl mx-auto">
        <SectionHeading
          title="Core Features"
          subtitle="Comprehensive toolset for AWS security and compliance"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="glass-card p-6 transition-all duration-300 hover:shadow-md flex flex-col"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
