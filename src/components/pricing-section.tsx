import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 AWS accounts',
      'Basic security scanning',
      'Email notifications',
      'Community support',
      '10 custom rules'
    ],
    popular: false,
    cta: 'Get Started',
    href: '/login'
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'For growing security teams',
    features: [
      'Up to 50 AWS accounts',
      'Advanced threat detection',
      'Multi-channel alerts',
      'Priority support',
      'Unlimited custom rules',
      'Compliance reports',
      'API access'
    ],
    popular: true,
    cta: 'Start Free Trial',
    href: '/login'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Unlimited AWS accounts',
      'Advanced AI threat detection',
      'Custom integrations',
      'Dedicated support',
      'White-label options',
      'Custom compliance frameworks',
      'On-premises deployment',
      'SLA guarantees'
    ],
    popular: false,
    cta: 'Contact Sales',
    href: '#contact'
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container max-w-7xl mx-auto">
        <SectionHeading
          title="Simple, Transparent Pricing"
          subtitle="Choose the plan that fits your security needs"
          centered
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`professional-card p-8 relative ${
                plan.popular 
                  ? 'ring-2 ring-primary shadow-glow scale-105' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold text-gradient">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                asChild 
                className={`w-full ${
                  plan.popular 
                    ? 'gradient-primary text-white shadow-glow' 
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                <Link to={plan.href}>
                  {plan.cta}
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}