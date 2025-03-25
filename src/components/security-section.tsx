
import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { Shield, UserCheck, Globe, FileCode } from 'lucide-react';

const securityFeatures = [
  {
    icon: UserCheck,
    title: 'Role-Based Access Control',
    description: 'Granular permissions with Admin, Security Analyst, and Developer roles.'
  },
  {
    icon: Globe,
    title: 'Cross-Account Access',
    description: 'Securely scan multiple AWS accounts with least privilege permissions.'
  },
  {
    icon: FileCode,
    title: 'Custom Security Rules',
    description: 'Define your own security policies with JSON/YAML-based rules.'
  },
  {
    icon: Shield,
    title: 'Compliance Frameworks',
    description: 'Built-in templates for CIS, NIST, ISO 27001, and SOC 2 compliance.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function SecuritySection() {
  return (
    <section id="security" className="py-20 px-6 bg-secondary/50">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <SectionHeading
              title="Enterprise-Grade Security"
              subtitle="Protect your AWS infrastructure with confidence"
              className="lg:text-left"
            />
            
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6 mt-8"
            >
              {securityFeatures.map((feature) => (
                <motion.li key={feature.title} variants={itemVariants} className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="glass-card overflow-hidden rounded-2xl">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-1/4 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 dark:bg-black/20 shadow-sm backdrop-blur-sm mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Advanced IAM Policy Analysis</h3>
                  
                  <div className="bg-black/80 text-white p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::example-bucket",
        "arn:aws:s3:::example-bucket/*"
      ]
    }
  ]
}`}</pre>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Findings:</p>
                    <div className="flex items-center text-sm text-red-500 mb-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      No encryption requirement on S3 objects
                    </div>
                    <div className="flex items-center text-sm text-amber-500">
                      <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                      No conditional access controls
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
