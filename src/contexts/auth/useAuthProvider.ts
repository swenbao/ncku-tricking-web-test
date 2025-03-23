
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AuthContextType, User } from './types';
import { DbProfile } from '@/lib/supabaseTypes';

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const getSession = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();
      
      if (!error && data?.session) {
        setSession(data.session);
        await fetchUserProfile(data.session.user.id);
      } else {
        setUser(null);
        setSession(null);
      }
      
      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth event: ${event}`);
      setSession(session);
      
      if (session?.user.id) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
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
      
      // Map DB profile to app user
      const mappedUser: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        points: data.points,
        status: data.status,
        profileImage: data.profile_picture,
        role: data.role,
        sex: data.sex,
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
      
      setUser(mappedUser);
    } catch (error) {
      console.error('Exception in fetchUserProfile:', error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
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
