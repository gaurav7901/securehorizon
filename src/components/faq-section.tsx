
import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does CyberHorizon scan AWS accounts?",
    answer: "CyberHorizon uses AWS Config, Security Hub, and GuardDuty to scan your AWS accounts for misconfigurations and security vulnerabilities. It leverages AWS APIs with cross-account roles to perform scans with least privilege permissions."
  },
  {
    question: "Can I customize security rules for my organization's needs?",
    answer: "Yes, CyberHorizon supports custom security rules defined using JSON or YAML files stored in S3. You can create organization-specific rules or modify existing ones to match your security requirements and compliance framework."
  },
  {
    question: "Does CyberHorizon automatically fix security issues?",
    answer: "CyberHorizon offers optional automated remediation capabilities using AWS Systems Manager (SSM). You can configure which types of issues should be auto-remediated and which should require manual approval. All remediation actions are logged for audit purposes."
  },
  {
    question: "What notification channels are supported?",
    answer: "CyberHorizon supports multiple notification channels including AWS SNS, Slack, Microsoft Teams, and email. You can configure different notifications for different severity levels and security findings."
  },
  {
    question: "How does CyberHorizon handle multi-account environments?",
    answer: "For organizations with multiple AWS accounts, CyberHorizon can be deployed using a centralized model with AWS Organizations. A management account collects findings from all linked accounts using cross-account IAM roles, providing a unified view of your security posture."
  },
  {
    question: "What compliance frameworks does CyberHorizon support?",
    answer: "CyberHorizon includes built-in support for major compliance frameworks including CIS AWS Benchmark, NIST 800-53, ISO 27001, and SOC 2. You can generate compliance reports and track your adherence to these standards over time."
  }
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 px-6 bg-secondary/50">
      <div className="container max-w-4xl mx-auto">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about CyberHorizon"
          centered
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="glass-card">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-0">
                <AccordionTrigger className="text-left py-6 px-6 hover:no-underline">
                  <span className="text-base font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
