
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldX, ShieldQuestion, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const findingsData = [
  { severity: 'Critical', count: 2, icon: ShieldX, color: 'text-red-500', bgColor: 'bg-red-500/10' },
  { severity: 'High', count: 5, icon: ShieldAlert, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  { severity: 'Medium', count: 12, icon: ShieldQuestion, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
  { severity: 'Low', count: 8, icon: ShieldCheck, color: 'text-green-500', bgColor: 'bg-green-500/10' },
];

export function FindingsSummary() {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Findings Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {findingsData.map((item, index) => (
            <motion.div
              key={item.severity}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{item.severity}</span>
              </div>
              <span className={`text-sm font-semibold ${item.color}`}>{item.count}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
