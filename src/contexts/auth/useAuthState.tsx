
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AppUser } from './types';
import { fetchUserProfile } from './authService';

export function useAuthState() {
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
            fetchUserProfile(session.user.id)
              .then(profileData => {
                setUser(profileData);
              })
              .catch(error => {
                console.error('Error fetching user profile:', error);
                toast({
                  title: "Error loading profile",
                  description: "Could not load your profile information",
                  variant: "destructive"
                });
              });
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
        fetchUserProfile(session.user.id)
          .then(profileData => {
            setUser(profileData);
          })
          .catch(error => {
            console.error('Error fetching user profile:', error);
          });
      }
    }).finally(() => {
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  return {
    user,
    setUser,
    session,
    loading,
    setLoading
  };
}
