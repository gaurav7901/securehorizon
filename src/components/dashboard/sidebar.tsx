
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import {
  LayoutDashboard,
  ShieldAlert,
  Bell,
  Settings,
  BarChart3,
  History,
  FileText,
  LogOut,
  UserCircle,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', permission: null },
  { icon: ShieldAlert, label: 'Security Findings', href: '/dashboard/findings', permission: 'read:findings' },
  { icon: Bell, label: 'Alerts', href: '/dashboard/alerts', permission: null, roles: ['admin', 'manager', 'analyst'] },
  { icon: BarChart3, label: 'Reports', href: '/dashboard/reports', permission: 'read:reports' },
  { icon: History, label: 'Scan History', href: '/dashboard/history', permission: null },
  { icon: FileText, label: 'Compliance', href: '/dashboard/compliance', permission: null, roles: ['admin', 'manager'] },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', permission: null, roles: ['admin'] },
];

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isMobile, isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { user, logout, hasPermission, hasRole } = useAuth();
  
  // Filter nav items based on user permissions
  const filteredNavItems = navItems.filter(item => {
    // Check permission-based access
    if (item.permission && !hasPermission(item.permission)) {
      return false;
    }
    
    // Check role-based access
    if (item.roles && !hasRole(item.roles as any)) {
      return false;
    }
    
    return true;
  });
  
  const sidebar = (
    <div className={cn(
      "h-screen flex flex-col bg-sidebar border-r border-sidebar-border",
      isMobile ? "fixed inset-y-0 left-0 z-50 w-72 sm:w-80" : "w-64 hidden md:flex"
    )}>
      <div className="p-4 md:p-6">
        <Logo className="mb-6" />
        
        {user && (
          <div className="mb-4 md:mb-6 p-3 rounded-md bg-sidebar-accent/50 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <UserCircle className="h-4 w-4 text-primary" />
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize truncate">{user.role}</p>
            </div>
          </div>
        )}
        
        <nav className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors relative",
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
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
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
