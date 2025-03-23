
import { Session } from '@supabase/supabase-js';

// Define user types
export type UserStatus = 'Blank Card' | 'Beginner Card' | 'Advanced Card';
export type UserRole = 'student' | 'official';
export type UserSex = 'Male' | 'Female' | 'Other';

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  points?: number;
  status?: UserStatus;
  profileImage?: string | null;
  role?: UserRole;
  sex?: UserSex;
  age?: number;
  phoneNumber?: string;
  completedTricks?: string[];
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}
