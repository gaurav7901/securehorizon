
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            AWS Security Automation
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Secure Your AWS Infrastructure <br className="hidden md:inline" />
            <span className="text-primary">Automated & Effortless</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            CyberHorizon scans your AWS accounts for misconfigurations, vulnerabilities, 
            and compliance gaps. Get real-time alerts and automated remediation 
            to maintain security standards.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/dashboard">
                Try Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="#features">Learn More</a>
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="glass-card p-6 md:p-8 rounded-2xl overflow-hidden shadow-md">
            <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
              <div className="text-center px-6 py-16">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full transform -translate-y-1/2"></div>
                    <ShieldCheck size={60} className="text-primary relative animate-float" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-4">Dashboard Preview</h3>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Visualize your AWS security posture with our intuitive dashboard.
                  Identify and remediate security issues in real-time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent -z-10" />
    </section>
  );
}
