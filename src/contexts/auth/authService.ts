
import { supabase } from "@/integrations/supabase/client";
import { AppUser } from "./types";

// Fetch user profile data from Supabase
export const fetchUserProfile = async (userId: string): Promise<AppUser> => {
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
  return {
    id: profile.id,
    name: profile.name || '',
    email: profile.email || '',
    profilePicture: profile.profile_picture,
    sex: profile.sex as 'Male' | 'Female' | 'Other',
    age: profile.age,
    phoneNumber: profile.phone_number,
    status: profile.status,
    points: profile.points || 0,
    completedTricks: tricks.map(trick => ({
      trickId: trick.trick_id,
      status: trick.status as 'Started' | 'Completed' | 'Proficient'
    }))
  };
};

// Login user with email and password
export const loginUser = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
};

// Register a new user
export const signupUser = async (userData: Partial<AppUser> & { password: string }) => {
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
};

// Update user profile
export const updateUserProfile = async (userId: string, userData: Partial<AppUser>) => {
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
    .eq('id', userId);
  
  if (error) throw error;
};

// Update trick status
export const updateTrickStatus = async (
  userId: string, 
  trickId: string, 
  status: 'Started' | 'Completed' | 'Proficient'
) => {
  const existingTrick = await supabase
    .from('user_completed_tricks')
    .select('*')
    .eq('user_id', userId)
    .eq('trick_id', trickId)
    .maybeSingle();
  
  if (existingTrick.data) {
    // Update existing trick status
    const { error } = await supabase
      .from('user_completed_tricks')
      .update({
        status,
        completed_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('trick_id', trickId);
      
    if (error) throw error;
  } else {
    // Insert new trick status
    const { error } = await supabase
      .from('user_completed_tricks')
      .insert({
        user_id: userId,
        trick_id: trickId,
        status,
      });
      
    if (error) throw error;
  }
};

// Log out user
export const logoutUser = async () => {
  await supabase.auth.signOut();
};
