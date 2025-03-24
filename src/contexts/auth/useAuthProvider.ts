
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AuthContextType, User, UserStatus, UserRole, UserSex } from './types';
import { DbProfile } from '@/lib/supabaseTypes';
import { toast } from 'sonner';

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Auth provider initialized');
    
    const checkSession = async () => {
      setIsLoading(true);
      
      try {
        // First check for existing session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setUser(null);
          setSession(null);
          setIsLoading(false);
          return;
        }
        
        if (sessionData?.session) {
          console.log('Found existing session');
          setSession(sessionData.session);
          
          // Fetch user profile
          if (sessionData.session.user?.id) {
            await fetchUserProfile(sessionData.session.user.id);
          }
        } else {
          console.log('No existing session found');
          setUser(null);
          setSession(null);
        }
      } catch (err) {
        console.error('Error checking session:', err);
        setUser(null);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Set up the auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log(`Auth event: ${event}`, newSession?.user?.id);
      
      if (newSession) {
        setSession(newSession);
        if (newSession.user?.id) {
          await fetchUserProfile(newSession.user.id);
        }
      } else {
        setUser(null);
        setSession(null);
      }
      
      setIsLoading(false);
    });
    
    // Initial session check
    checkSession();
    
    return () => {
      console.log('Cleaning up auth listener');
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log(`Fetching profile for user: ${userId}`);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
        return;
      }
      
      if (!data) {
        console.error('No profile found for user:', userId);
        setUser(null);
        return;
      }
      
      console.log('Profile data received:', data);
      
      // Map DB profile to app user with proper type casting
      const mappedUser: User = {
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
        completedTricks: [] // Initialize with empty array
      };
      
      // Fetch completed tricks if needed
      const { data: completedTricksData, error: tricksError } = await supabase
        .from('completed_tricks')
        .select('trick_id')
        .eq('user_id', userId);
      
      if (!tricksError && completedTricksData) {
        mappedUser.completedTricks = completedTricksData.map(t => t.trick_id);
      }
      
      console.log('Setting user state:', mappedUser);
      setUser(mappedUser);
    } catch (error) {
      console.error('Exception in fetchUserProfile:', error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log(`Attempting login for: ${email}`);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Login failed:', error);
        throw error;
      }
      
      console.log('Login successful');
      toast.success('Login successful');
      // Auth state listener will handle setting user state
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      // Don't set isLoading to false here, let the auth state listener handle it
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { name }
        }
      });
      if (error) throw error;
      
      toast.success('Sign up successful! Please check your email to verify your account.');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error("No authenticated user");
      
      // Map from app user format to DB format
      const dbUpdates: Partial<DbProfile> = {};
      
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.points !== undefined) dbUpdates.points = updates.points;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.profileImage !== undefined) dbUpdates.profile_picture = updates.profileImage;
      if (updates.role !== undefined) dbUpdates.role = updates.role;
      if (updates.sex !== undefined) dbUpdates.sex = updates.sex;
      if (updates.age !== undefined) dbUpdates.age = updates.age;
      if (updates.phoneNumber !== undefined) dbUpdates.phone_number = updates.phoneNumber;
      
      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local user state
      setUser({ ...user, ...updates });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return {
    user,
    session,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'official',
    isLoading,
    login,
    signup,
    logout,
    updateUserProfile,
  };
};
