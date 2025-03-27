
import React, { createContext } from 'react';
import { AuthContextType } from './types';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';

// Create the auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, loading, setLoading } = useAuthState();
  const { login, signup, logout, updateUser, updateTrickStatus } = useAuthActions(user, setUser, setLoading);

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
