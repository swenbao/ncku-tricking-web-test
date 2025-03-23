
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseSession, setSupabaseSession] = useState<Session | null>(null);
  const { toast } = useToast();

  // Initialize auth state and listen for changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSupabaseSession(session);
        
        if (session) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }

      if (profile) {
        // Get completed tricks
        const { data: completedTricks, error: tricksError } = await supabase
          .from('completed_tricks')
          .select('*')
          .eq('user_id', userId);

        if (tricksError) {
          console.error('Error fetching completed tricks:', tricksError);
        }

        const userProfile: User = {
          id: profile.id,
          name: profile.name || '',
          email: profile.email || '',
          profilePicture: profile.profile_picture,
          sex: profile.sex as 'Male' | 'Female' | 'Other' | undefined,
          age: profile.age,
          phoneNumber: profile.phone_number,
          status: profile.status as UserStatus || 'Blank Card',
          role: profile.role as UserRole || 'student',
          points: profile.points || 0,
          completedTricks: completedTricks?.map(trick => ({
            trickId: trick.trick_id,
            status: trick.status as 'Started' | 'Completed' | 'Proficient'
          })) || []
        };

        setUser(userProfile);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      // User profile will be fetched by the auth state listener
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
      // Register with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: userData.email || '',
        password: userData.password,
        options: {
          data: {
            name: userData.name,
          },
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      if (data.user) {
        // Update additional profile data
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            name: userData.name,
            profile_picture: userData.profilePicture,
            sex: userData.sex,
            age: userData.age,
            phone_number: userData.phoneNumber,
            status: 'Blank Card',
            role: 'student'
          })
          .eq('id', data.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
          toast({
            title: "Profile Update Failed",
            description: "Account created but profile data could not be saved.",
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Signup Successful",
        description: "Your account has been created. You can now log in.",
        variant: "default",
      });

      // Profile will be loaded by auth state listener
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;

    try {
      // Update user profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          profile_picture: userData.profilePicture,
          sex: userData.sex,
          age: userData.age,
          phone_number: userData.phoneNumber,
          status: userData.status,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        toast({
          title: "Update Failed",
          description: "Could not update your profile.",
          variant: "destructive",
        });
        throw error;
      }

      // Update local state
      setUser({ ...user, ...userData });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const updateTrickStatus = async (trickId: string, status: 'Started' | 'Completed' | 'Proficient') => {
    if (!user) return;

    try {
      // Check if this trick status already exists
      const { data: existingRecord, error: checkError } = await supabase
        .from('completed_tricks')
        .select('*')
        .eq('user_id', user.id)
        .eq('trick_id', trickId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error checking trick status:', checkError);
        throw checkError;
      }

      let updateError;

      if (existingRecord) {
        // Update existing record
        const { error } = await supabase
          .from('completed_tricks')
          .update({ status })
          .eq('id', existingRecord.id);
        updateError = error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('completed_tricks')
          .insert({
            user_id: user.id,
            trick_id: trickId,
            status
          });
        updateError = error;
      }

      if (updateError) {
        console.error('Trick status update error:', updateError);
        throw updateError;
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
    } catch (error) {
      console.error('Update trick status error:', error);
      throw error;
    }
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
