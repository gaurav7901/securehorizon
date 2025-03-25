
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShieldAlert,
  Bell,
  Settings,
  BarChart3,
  History,
  FileText,
  LogOut,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ShieldAlert, label: 'Security Findings', href: '/dashboard/findings' },
  { icon: Bell, label: 'Alerts', href: '/dashboard/alerts' },
  { icon: BarChart3, label: 'Reports', href: '/dashboard/reports' },
  { icon: History, label: 'Scan History', href: '/dashboard/history' },
  { icon: FileText, label: 'Compliance', href: '/dashboard/compliance' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isMobile, isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  
  const sidebar = (
    <div className={cn(
      "h-screen flex flex-col bg-sidebar border-r border-sidebar-border",
      isMobile ? "fixed inset-y-0 left-0 z-50 w-64" : "w-64 hidden md:flex"
    )}>
      <div className="p-6">
        <Logo className="mb-6" />
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute right-0 w-1 h-6 bg-primary rounded-l-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );

  // For mobile, add overlay and animation
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onClose} />
        )}
        
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ type: "spring", damping: 20 }}
        >
          {sidebar}
        </motion.div>
      </>
    );
  }

  return sidebar;
}
