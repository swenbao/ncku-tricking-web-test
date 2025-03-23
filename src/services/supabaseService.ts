
import { supabase } from '@/integrations/supabase/client';
import { 
  dbTrickToAppTrick, 
  appTrickToDbTrick 
} from '@/lib/supabaseTypes';
import { Trick, TrickLevel } from '@/lib/data';

// Tricks
export const fetchTricks = async (): Promise<Trick[]> => {
  console.log('Fetching tricks from Supabase');
  
  const { data, error } = await supabase
    .from('tricks')
    .select('*');

  if (error) {
    console.error('Error fetching tricks:', error);
    throw error;
  }

  console.log('Fetch result:', data);
  return data.map(dbTrickToAppTrick);
};

export const fetchTricksByLevel = async (level: TrickLevel): Promise<Trick[]> => {
  const { data, error } = await supabase
    .from('tricks')
    .select('*')
    .eq('level', level);

  if (error) {
    console.error('Error fetching tricks by level:', error);
    throw error;
  }

  return data.map(dbTrickToAppTrick);
};

export const createTrick = async (trick: Omit<Trick, 'id'>): Promise<Trick | null> => {
  const dbTrick = appTrickToDbTrick(trick as Trick);
  console.log('Creating trick:', dbTrick);
  
  const { data, error } = await supabase
    .from('tricks')
    .insert(dbTrick)
    .select()
    .single();

  if (error) {
    console.error('Error creating trick:', error);
    throw error;
  }

  return dbTrickToAppTrick(data);
};

export const updateTrick = async (trick: Trick): Promise<Trick | null> => {
  const dbTrick = appTrickToDbTrick(trick);
  
  const { data, error } = await supabase
    .from('tricks')
    .update(dbTrick)
    .eq('id', trick.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating trick:', error);
    throw error;
  }

  return dbTrickToAppTrick(data);
};

export const deleteTrick = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('tricks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting trick:', error);
    throw error;
  }

  return true;
};

// Profiles, classes and other data services would go here...
