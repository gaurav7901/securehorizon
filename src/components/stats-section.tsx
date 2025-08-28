import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Users, AlertTriangle } from 'lucide-react';

const stats = [
  {
    icon: Shield,
    label: 'Security Scans',
    value: '2.5M+',
    description: 'Automated scans completed',
    color: 'text-green-500'
  },
  {
    icon: AlertTriangle,
    label: 'Threats Detected',
    value: '15K+',
    description: 'Critical vulnerabilities found',
    color: 'text-red-500'
  },
  {
    icon: Users,
    label: 'Enterprise Clients',
    value: '500+',
    description: 'Companies trust our platform',
    color: 'text-blue-500'
  },
  {
    icon: TrendingUp,
    label: 'Uptime',
    value: '99.9%',
    description: 'Service availability',
    color: 'text-primary'
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
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function StatsSection() {
  return (
    <section className="py-16 px-6">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="professional-card p-6 text-center group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-background/50 ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6" />
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="font-medium text-foreground">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}