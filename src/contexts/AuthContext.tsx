
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Define user types
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

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<AppUser> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<AppUser>) => void;
  updateTrickStatus: (trickId: string, status: 'Started' | 'Completed' | 'Proficient') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up auth state listener and check for existing session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Use setTimeout to prevent Supabase deadlock
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    }).finally(() => {
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  // Fetch user profile data from Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      // First get basic profile information
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) throw profileError;

      // Then get completed tricks
      const { data: tricks, error: tricksError } = await supabase
        .from('user_completed_tricks')
        .select('trick_id, status')
        .eq('user_id', userId);
      
      if (tricksError) throw tricksError;

      // Transform the data to match our AppUser interface
      const formattedUser: AppUser = {
        id: profile.id,
        name: profile.name || '',
        email: profile.email || '',
        profilePicture: profile.profile_picture,
        sex: profile.sex as 'Male' | 'Female' | 'Other',
        age: profile.age,
        phoneNumber: profile.phone_number,
        status: profile.status as UserStatus,
        points: profile.points || 0,
        completedTricks: tricks.map(trick => ({
          trickId: trick.trick_id,
          status: trick.status as 'Started' | 'Completed' | 'Proficient'
        }))
      };

      setUser(formattedUser);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: "Error loading profile",
        description: "Could not load your profile information",
        variant: "destructive"
      });
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Could not sign in with those credentials",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: Partial<AppUser> & { password: string }) => {
    setLoading(true);
    try {
      // Register the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: userData.email || '',
        password: userData.password,
        options: {
          data: {
            name: userData.name || '',
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Additional profile data will be inserted by the database trigger
        // Update any additional fields that aren't set by the trigger
        await supabase
          .from('user_profiles')
          .update({
            sex: userData.sex,
            age: userData.age,
            phone_number: userData.phoneNumber,
            profile_picture: userData.profilePicture
          })
          .eq('id', data.user.id);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "Could not create your account",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "Could not sign you out properly",
        variant: "destructive"
      });
    }
  };

  const updateUser = async (userData: Partial<AppUser>) => {
    if (!user) return;
    
    try {
      // Update user profile in Supabase
      const { error } = await supabase
        .from('user_profiles')
        .update({
          name: userData.name,
          email: userData.email,
          profile_picture: userData.profilePicture,
          sex: userData.sex,
          age: userData.age,
          phone_number: userData.phoneNumber,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setUser(prev => prev ? { ...prev, ...userData } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      console.error('Update user error:', error);
      toast({
        title: "Update failed",
        description: "Could not update your profile information",
        variant: "destructive"
      });
    }
  };

  const updateTrickStatus = async (trickId: string, status: 'Started' | 'Completed' | 'Proficient') => {
    if (!user) return;

    try {
      const existingTrick = user.completedTricks.find(t => t.trickId === trickId);
      
      if (existingTrick) {
        // Update existing trick status
        const { error } = await supabase
          .from('user_completed_tricks')
          .update({
            status,
            completed_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('trick_id', trickId);
          
        if (error) throw error;
      } else {
        // Insert new trick status
        const { error } = await supabase
          .from('user_completed_tricks')
          .insert({
            user_id: user.id,
            trick_id: trickId,
            status,
          });
          
        if (error) throw error;
      }
      
      // Update local state
      const updatedTricks = [...user.completedTricks];
      const existingIndex = updatedTricks.findIndex(t => t.trickId === trickId);
      
      if (existingIndex >= 0) {
        updatedTricks[existingIndex] = { ...updatedTricks[existingIndex], status };
      } else {
        updatedTricks.push({ trickId, status });
      }
      
      setUser({ ...user, completedTricks: updatedTricks });
      
      toast({
        title: "Progress updated",
        description: `Trick status updated to ${status}`,
      });
    } catch (error) {
      console.error('Update trick status error:', error);
      toast({
        title: "Update failed",
        description: "Could not update your trick progress",
        variant: "destructive"
      });
    }
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
