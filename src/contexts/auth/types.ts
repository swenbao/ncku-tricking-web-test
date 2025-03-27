
import { Session } from '@supabase/supabase-js';

export type UserStatus = 'Blank Card' | 'Beginner Card' | 'Advanced Card';

export interface AppUser {
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

export interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<AppUser> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<AppUser>) => void;
  updateTrickStatus: (trickId: string, status: 'Started' | 'Completed' | 'Proficient') => void;
}
