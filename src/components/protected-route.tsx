
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/contexts/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: UserRole | UserRole[];
}

export const ProtectedRoute = ({ 
  children, 
  requiredPermission, 
  requiredRole 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, hasPermission, hasRole, user } = useAuth();
  const location = useLocation();

  // Show loading state if auth is still being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for specific permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/dashboard/unauthorized" replace />;
  }

  // Check for specific role if required
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/dashboard/unauthorized" replace />;
  }

  // Render the protected content
  return <>{children}</>;
};
