
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent -z-10" />
      <div className="absolute top-1/2 left-1/2 w-full h-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Ready to Secure Your AWS Infrastructure?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Start protecting your AWS accounts from security vulnerabilities and compliance gaps today.
          Try CyberHorizon and experience enterprise-grade security automation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/dashboard">
              Explore Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
