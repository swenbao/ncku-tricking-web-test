
import React, { createContext, useEffect } from 'react';
import { AuthContextType } from './types';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { supabase } from '@/integrations/supabase/client';

// Create the auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, loading, setLoading } = useAuthState();
  const { login, signup, logout, updateUser, updateTrickStatus } = useAuthActions(user, setUser, setLoading);

  // Listen for difficulty level changes to update any cached data
  useEffect(() => {
    const channel = supabase
      .channel('difficulty-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'difficulty_levels'
      }, (payload) => {
        // When difficulty levels change, we could refresh related data here
        console.log('Difficulty level changed:', payload);
        // In a production app, you'd refresh the cached data here
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
