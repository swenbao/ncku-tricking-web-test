
import { supabase } from '@/integrations/supabase/client';
import { 
  dbTrickToAppTrick, 
  appTrickToDbTrick 
} from '@/lib/supabaseTypes';
import { Trick, TrickLevel } from '@/lib/data';
import { toast } from 'sonner';

// Tricks
export const fetchTricks = async (): Promise<Trick[]> => {
  console.log('Fetching tricks from Supabase');
  
  try {
    const { data, error } = await supabase
      .from('tricks')
      .select('*')
      .order('level')
      .order('name');

    if (error) {
      console.error('Error fetching tricks:', error);
      toast.error('Failed to load tricks');
      throw error;
    }

    console.log('Fetch tricks result:', data ? `${data.length} tricks found` : 'No tricks found');
    return data ? data.map(dbTrickToAppTrick) : [];
  } catch (error) {
    console.error('Exception in fetchTricks:', error);
    return [];
  }
};

export const fetchTricksByLevel = async (level: TrickLevel): Promise<Trick[]> => {
  try {
    const { data, error } = await supabase
      .from('tricks')
      .select('*')
      .eq('level', level)
      .order('name');

    if (error) {
      console.error('Error fetching tricks by level:', error);
      toast.error(`Failed to load ${level} tricks`);
      throw error;
    }

    return data ? data.map(dbTrickToAppTrick) : [];
  } catch (error) {
    console.error(`Exception in fetchTricksByLevel(${level}):`, error);
    return [];
  }
};

export const createTrick = async (trick: Omit<Trick, 'id'>): Promise<Trick | null> => {
  try {
    const dbTrick = appTrickToDbTrick(trick as Trick);
    console.log('Creating trick:', dbTrick);
    
    const { data, error } = await supabase
      .from('tricks')
      .insert(dbTrick)
      .select()
      .single();

    if (error) {
      console.error('Error creating trick:', error);
      toast.error('Failed to create trick');
      throw error;
    }

    return dbTrickToAppTrick(data);
  } catch (error) {
    console.error('Exception in createTrick:', error);
    return null;
  }
};

export const updateTrick = async (trick: Trick): Promise<Trick | null> => {
  try {
    const dbTrick = appTrickToDbTrick(trick);
    
    const { data, error } = await supabase
      .from('tricks')
      .update(dbTrick)
      .eq('id', trick.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating trick:', error);
      toast.error('Failed to update trick');
      throw error;
    }

    return dbTrickToAppTrick(data);
  } catch (error) {
    console.error('Exception in updateTrick:', error);
    return null;
  }
};

export const deleteTrick = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tricks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting trick:', error);
      toast.error('Failed to delete trick');
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Exception in deleteTrick:', error);
    return false;
  }
};

// Profiles
export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Exception in fetchUserProfile:', error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Exception in updateUserProfile:', error);
    return null;
  }
};

// Add more service functions for other data types as needed...
