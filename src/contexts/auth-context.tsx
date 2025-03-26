
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { encryptData, decryptData } from '@/utils/encryption';

// Define user roles
export type UserRole = 'admin' | 'manager' | 'analyst' | 'viewer';

// Define user data structure
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
}

// Define what our auth context will provide
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demonstration
const DEMO_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@securitydashboard.com',
    password: 'admin123', // In a real app, you would never store passwords in plain text
    role: 'admin' as UserRole,
    permissions: ['read:all', 'write:all', 'delete:all', 'manage:users']
  },
  {
    id: '2',
    name: 'Security Manager',
    email: 'manager@securitydashboard.com',
    password: 'manager123',
    role: 'manager' as UserRole,
    permissions: ['read:all', 'write:findings', 'manage:reports']
  },
  {
    id: '3',
    name: 'Security Analyst',
    email: 'analyst@securitydashboard.com',
    password: 'analyst123',
    role: 'analyst' as UserRole,
    permissions: ['read:findings', 'write:findings', 'read:reports']
  },
  {
    id: '4',
    name: 'Security Viewer',
    email: 'viewer@securitydashboard.com',
    password: 'viewer123',
    role: 'viewer' as UserRole,
    permissions: ['read:findings', 'read:reports']
  }
];

// Map roles to permissions for role-based checks
const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  admin: ['admin', 'manager', 'analyst', 'viewer'],
  manager: ['manager', 'analyst', 'viewer'],
  analyst: ['analyst', 'viewer'],
  viewer: ['viewer']
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      const encryptedUser = localStorage.getItem('secure_user');
      
      if (encryptedUser) {
        try {
          const decryptedUser = decryptData(encryptedUser);
          if (decryptedUser && decryptedUser.id) {
            // Remove password field if it exists from the decrypted user
            const { password, ...secureUser } = decryptedUser;
            setUser(secureUser);
          }
        } catch (error) {
          console.error('Error decrypting user data:', error);
          localStorage.removeItem('secure_user');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching credentials
    const matchedUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (matchedUser) {
      // Create a clean user object without the password
      const { password: _, ...secureUser } = matchedUser;
      
      // Store encrypted user data in localStorage
      localStorage.setItem('secure_user', encryptData(matchedUser));
      
      setUser(secureUser);
      setIsLoading(false);
      toast.success(`Welcome back, ${secureUser.name}!`);
      return true;
    } else {
      setIsLoading(false);
      toast.error('Invalid email or password');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('secure_user');
    setUser(null);
    toast.info('You have been logged out');
    navigate('/');
  };

  // Check if user has specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  // Check if user has specific role(s)
  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    const roles = Array.isArray(role) ? role : [role];
    
    // Check if the user's role is in the hierarchy of any of the required roles
    return roles.some(r => ROLE_HIERARCHY[user.role].includes(r));
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
