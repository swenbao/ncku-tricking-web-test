
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Define user types
export type UserStatus = 'Blank Card' | 'Beginner Card' | 'Advanced Card';
export type UserRole = 'student' | 'official';

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  sex?: 'Male' | 'Female' | 'Other';
  age?: number;
  phoneNumber?: string;
  status: UserStatus;
  role: UserRole;
  completedTricks: {
    trickId: string;
    status: 'Started' | 'Completed' | 'Proficient';
  }[];
  points: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateTrickStatus: (trickId: string, status: 'Started' | 'Completed' | 'Proficient') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for students and admin
const MOCK_STUDENT: User = {
  id: '1',
  name: 'John Doe',
  email: 'student@example.com',
  profilePicture: '',
  status: 'Beginner Card',
  role: 'student',
  completedTricks: [],
  points: 20
};

const MOCK_ADMIN: User = {
  id: '2',
  name: 'Admin User',
  email: 'admin@example.com',
  profilePicture: '',
  status: 'Advanced Card',
  role: 'official',
  completedTricks: [],
  points: 100
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('nckuTrickingUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('nckuTrickingUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('nckuTrickingUser');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Mock login - would connect to Supabase in production
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if email matches admin or student account
      if (email === 'admin@example.com') {
        setUser(MOCK_ADMIN);
      } else {
        setUser(MOCK_STUDENT);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: Partial<User> & { password: string }) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new user 
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        profilePicture: userData.profilePicture,
        sex: userData.sex,
        age: userData.age,
        phoneNumber: userData.phoneNumber,
        status: 'Blank Card',
        role: 'student', // Default to student role
        completedTricks: [],
        points: 0
      };
      
      setUser(newUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const updateTrickStatus = (trickId: string, status: 'Started' | 'Completed' | 'Proficient') => {
    if (!user) return;

    const updatedTricks = [...user.completedTricks];
    const existingIndex = updatedTricks.findIndex(t => t.trickId === trickId);

    if (existingIndex >= 0) {
      updatedTricks[existingIndex] = { ...updatedTricks[existingIndex], status };
    } else {
      updatedTricks.push({ trickId, status });
    }

    setUser({ ...user, completedTricks: updatedTricks });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isAdmin: user?.role === 'official',
        loading,
        login, 
        signup, 
        logout,
        updateUser,
        updateTrickStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const UserAvatar: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useAuth();
  
  return (
    <Avatar className={className}>
      {user?.profilePicture ? (
        <AvatarImage src={user.profilePicture} alt={user.name} />
      ) : (
        <AvatarFallback className="bg-secondary text-secondary-foreground">
          {user?.name?.charAt(0) || 'G'}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
