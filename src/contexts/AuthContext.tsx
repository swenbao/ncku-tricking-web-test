import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

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

interface AuthContextType {
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state from Supabase
  useEffect(() => {
    const initAuth = async () => {
      // Check if there's an active session
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setIsLoading(false);
        return;
      }
      
      if (data.session) {
        setSession(data.session);
        await fetchUserProfile(data.session.user.id);
      }
      
      // Subscribe to auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        
        if (event === 'SIGNED_IN' && newSession) {
          await fetchUserProfile(newSession.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });
      
      setIsLoading(false);
      
      // Cleanup subscription
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);
  
  // Fetch user profile from the profiles table
  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return;
    }
    
    if (data) {
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        points: data.points,
        status: data.status as UserStatus,
        profileImage: data.profile_picture,
        role: data.role as UserRole,
        sex: data.sex as UserSex,
        age: data.age,
        phoneNumber: data.phone_number,
        completedTricks: data.completed_tricks || []
      });
    }
  };
  
  // Login with email and password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Something went wrong during login",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Signup with email and password
  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Welcome! Your account has been created successfully.",
      });
      
      // Create a profile for the new user
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: email,
          name: name || '',
          role: 'student',
          points: 0,
          status: 'Blank Card'
        });
      }
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "Something went wrong during signup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message || "Something went wrong during logout",
        variant: "destructive",
      });
    }
  };
  
  // Update user profile
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      // Convert from app user type to DB type
      const dbUpdates: any = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.points !== undefined) dbUpdates.points = updates.points;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.profileImage !== undefined) dbUpdates.profile_picture = updates.profileImage;
      if (updates.sex !== undefined) dbUpdates.sex = updates.sex;
      if (updates.age !== undefined) dbUpdates.age = updates.age;
      if (updates.phoneNumber !== undefined) dbUpdates.phone_number = updates.phoneNumber;
      
      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setUser({
        ...user,
        ...updates,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Update failed",
        description: error.message || "Something went wrong updating your profile",
        variant: "destructive",
      });
    }
  };
  
  // Determine if user is an admin
  const isAdmin = user?.role === 'official';
  
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        isAdmin,
        isLoading,
        login,
        signup,
        logout,
        updateUserProfile,
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
