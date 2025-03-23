
import { Database } from '@/integrations/supabase/types';
import { Trick, TrickLevel, ClassSchedule, PointPackage } from './data';

// Define types that map to your Supabase tables
export type DbTrick = Database['public']['Tables']['tricks']['Row'];
export type DbProfile = Database['public']['Tables']['profiles']['Row'];
export type DbClassSchedule = Database['public']['Tables']['class_schedule']['Row'];
export type DbPointPackage = Database['public']['Tables']['point_packages']['Row'];
export type DbBooking = Database['public']['Tables']['bookings']['Row'];
export type DbOrder = Database['public']['Tables']['orders']['Row'];
export type DbCompletedTrick = Database['public']['Tables']['completed_tricks']['Row'];

// Functions to convert between DB and app types
export const dbTrickToAppTrick = (dbTrick: DbTrick): Trick => {
  return {
    id: dbTrick.id.toString(),
    name: dbTrick.name,
    level: dbTrick.level as TrickLevel,
    description: dbTrick.description || '',
    videoUrl: dbTrick.video_url,
    prerequisites: dbTrick.prerequisites || [],
    categories: dbTrick.categories,
  };
};

export const appTrickToDbTrick = (trick: Trick): Omit<DbTrick, 'id' | 'created_at'> => {
  return {
    name: trick.name,
    level: trick.level,
    description: trick.description,
    video_url: trick.videoUrl,
    prerequisites: trick.prerequisites || [],
    categories: trick.categories,
  };
};
