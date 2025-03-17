
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Define user types
export type UserStatus = 'Blank Card' | 'Beginner Card' | 'Advanced Card';

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  sex?: 'Male' | 'Female' | 'Other';
  age?: number;
  phoneNumber?: string;
  status: UserStatus;
  completedTricks: {
    trickId: string;
    status: 'Started' | 'Completed' | 'Proficient';
  }[];
  points: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateTrickStatus: (trickId: string, status: 'Started' | 'Completed' | 'Proficient') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for now, to be replaced with actual backend later
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  profilePicture: '',
  status: 'Beginner Card',
  completedTricks: [],
  points: 20
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
    // Mock login - would connect to backend in production
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(MOCK_USER);
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
