
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure by design</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              <span className="text-gradient">Enterprise Security</span>
              <br />
              Dashboard
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Comprehensive security monitoring and threat detection for your entire infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-medium">
                <Link to="/login">
                  Try Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Book a Demo
              </Button>
            </div>
            
            <div className="pt-4 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <span>Role-Based Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <span>End-to-End Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <span>Compliance Ready</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Dashboard Preview */}
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              <div className="professional-card overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-primary p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-3 w-3 bg-white/30 rounded-full"></div>
                    <div className="h-3 w-3 bg-white/30 rounded-full"></div>
                    <div className="h-3 w-3 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium">CyberHorizon Dashboard</div>
                </div>
                
                <div className="p-4 bg-background/95">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <div className="text-lg font-bold text-green-600">24</div>
                      <div className="text-xs text-green-600">Active Scans</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                      <div className="text-lg font-bold text-red-600">3</div>
                      <div className="text-xs text-red-600">Critical Issues</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Security Score</span>
                      <span>94%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 professional-card p-3 bg-card animate-bounce-in">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Live Monitoring</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 professional-card p-3 bg-card">
                <div className="text-xs font-medium text-primary">✓ Compliant</div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -z-10 top-1/3 right-1/4 h-44 w-44 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -z-10 bottom-1/3 left-1/4 h-32 w-32 bg-primary-glow/20 rounded-full blur-3xl animate-float"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-10 h-60 w-60 bg-blue-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}
