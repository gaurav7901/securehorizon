
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/ui/chart';
import { motion } from 'framer-motion';

const serviceData = [
  { name: 'IAM', critical: 1, high: 2, medium: 3, low: 2 },
  { name: 'S3', critical: 1, high: 1, medium: 4, low: 1 },
  { name: 'EC2', critical: 0, high: 1, medium: 2, low: 3 },
  { name: 'RDS', critical: 0, high: 1, medium: 1, low: 1 },
  { name: 'EBS', critical: 0, high: 0, medium: 2, low: 1 },
];

export function ServiceFindings() {
  return (
    <Card className="glass-card col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Findings by Service</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="h-80"
        >
          <BarChart
            data={serviceData}
            index="name"
            categories={['critical', 'high', 'medium', 'low']}
            colors={['#ef4444', '#f59e0b', '#eab308', '#22c55e']}
            valueFormatter={(value) => `${value} issues`}
            yAxisWidth={30}
          />
        </motion.div>
      </CardContent>
    </Card>
  );
}
