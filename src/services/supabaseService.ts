
import { supabase } from '@/integrations/supabase/client';
import { 
  dbTrickToAppTrick, 
  appTrickToDbTrick 
} from '@/lib/supabaseTypes';
import { Trick, TrickLevel } from '@/lib/data';

// Tricks
export const fetchTricks = async (): Promise<Trick[]> => {
  const { data, error } = await supabase
    .from('tricks')
    .select('*');

  if (error) {
    console.error('Error fetching tricks:', error);
    return [];
  }

  return data.map(dbTrickToAppTrick);
};

export const fetchTricksByLevel = async (level: TrickLevel): Promise<Trick[]> => {
  const { data, error } = await supabase
    .from('tricks')
    .select('*')
    .eq('level', level);

  if (error) {
    console.error('Error fetching tricks by level:', error);
    return [];
  }

  return data.map(dbTrickToAppTrick);
};

export const createTrick = async (trick: Omit<Trick, 'id'>): Promise<Trick | null> => {
  const { data, error } = await supabase
    .from('tricks')
    .insert(appTrickToDbTrick(trick as Trick))
    .select()
    .single();

  if (error) {
    console.error('Error creating trick:', error);
    return null;
  }

  return dbTrickToAppTrick(data);
};

export const updateTrick = async (trick: Trick): Promise<Trick | null> => {
  const { data, error } = await supabase
    .from('tricks')
    .update(appTrickToDbTrick(trick))
    .eq('id', trick.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating trick:', error);
    return null;
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
    return false;
  }

  return true;
};

// Profiles, classes and other data services would go here...
