
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface SecurityScoreCardProps {
  score: number;
  previousScore?: number;
  scoreChangePercentage?: number;
}

export function SecurityScoreCard({ 
  score, 
  previousScore, 
  scoreChangePercentage 
}: SecurityScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Security Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </span>
              {previousScore && scoreChangePercentage && (
                <div className="flex items-center text-xs font-medium">
                  <span className={scoreChangePercentage >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {scoreChangePercentage >= 0 ? '↑' : '↓'} {Math.abs(scoreChangePercentage)}%
                  </span>
                  <span className="text-muted-foreground ml-1">from last scan</span>
                </div>
              )}
            </motion.div>
            
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Progress value={score} className={`h-2 ${getProgressColor(score)}`} />
          </motion.div>
          
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
            {['Critical', 'High', 'Medium'].map((severity, index) => (
              <div key={severity} className="space-y-1">
                <span className="text-muted-foreground">{severity}</span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className={`text-sm font-medium ${index === 0 ? 'text-red-500' : index === 1 ? 'text-amber-500' : 'text-yellow-500'}`}
                >
                  {index === 0 ? 2 : index === 1 ? 5 : 12}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
