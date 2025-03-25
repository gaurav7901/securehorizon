
import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { Network, Workflow, CheckCircle } from 'lucide-react';

export function DeploymentSection() {
  return (
    <section id="deployment" className="py-20 px-6">
      <div className="container max-w-7xl mx-auto">
        <SectionHeading
          title="Flexible Deployment Models"
          subtitle="Choose the deployment option that works best for your organization"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4">
                <Network className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Centralized Multi-Account</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Monitor multiple AWS accounts from a single management account using
              AWS Organizations and Security Hub Aggregator.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Ideal for enterprises with multiple AWS accounts',
                'Cross-account IAM roles for secure scanning',
                'Consolidated view of security findings',
                'Centralized management and configuration'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Architecture Overview:</div>
              <div className="text-xs text-muted-foreground">
                One management account with Security Hub acts as the central point,
                collecting findings from all linked accounts via cross-account roles.
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4">
                <Workflow className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Per-Account Deployment</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Deploy CyberHorizon individually to each AWS account for
              focused monitoring and management.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Perfect for startups and smaller teams',
                'Simplified deployment and configuration',
                'Independent management per account',
                'No cross-account permissions required'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Architecture Overview:</div>
              <div className="text-xs text-muted-foreground">
                Each AWS account has its own independent CyberHorizon deployment
                with dedicated security scanning and alerting capabilities.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
