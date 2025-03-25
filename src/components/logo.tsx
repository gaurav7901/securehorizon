
import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, ShieldCheck } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
};

const iconSizes = {
  sm: 20,
  md: 24,
  lg: 32,
};

export function Logo({ 
  className, 
  variant = 'default',
  size = 'md' 
}: LogoProps) {
  return variant === 'icon-only' ? (
    <Shield size={iconSizes[size]} className={cn("text-primary", className)} />
  ) : (
    <div className={cn("flex items-center gap-2", className)}>
      <ShieldCheck size={iconSizes[size]} className="text-primary animate-pulse-slow" />
      <span className={cn("font-bold tracking-tight", sizes[size])}>
        CyberHorizon
      </span>
    </div>
  );
}
