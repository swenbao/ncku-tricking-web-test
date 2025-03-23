
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Trick, TrickLevel } from './types';

const DEFAULT_TRICK: Trick = {
  id: '',
  name: '',
  description: '',
  level: 'beginner',
  videoUrl: '',
  prerequisites: [],
  categories: []
};

export const useTricktionaryManager = () => {
  const [tricks, setTricks] = useState<Trick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrick, setSelectedTrick] = useState<Trick>(DEFAULT_TRICK);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTricks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('tricks')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      if (data) {
        // Map DB data to client-side Trick objects
        const mappedTricks: Trick[] = data.map(trick => ({
          id: trick.id,
          name: trick.name,
          description: trick.description,
          level: trick.level as TrickLevel,
          videoUrl: trick.video_url,
          prerequisites: trick.prerequisites || [],
          categories: trick.categories || [],
          created_at: trick.created_at
        }));
        
        setTricks(mappedTricks);
      }
    } catch (err) {
      console.error('Error fetching tricks:', err);
      setError('Failed to load tricks data');
      toast({
        title: 'Error',
        description: 'Failed to load tricks data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTricks();
  }, []);

  const openCreateDialog = () => {
    setSelectedTrick(DEFAULT_TRICK);
    setIsDialogOpen(true);
  };

  const openEditDialog = (trick: Trick) => {
    setSelectedTrick({
      ...trick,
      videoUrl: trick.videoUrl || trick.video_url || '',
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const saveTrick = async (formData: Trick) => {
    // Check if creating a new trick or updating an existing one
    const isNewTrick = !formData.id;

    try {
      if (isNewTrick) {
        // Create a new trick
        const { data, error } = await supabase
          .from('tricks')
          .insert([
            {
              name: formData.name,
              description: formData.description,
              level: formData.level,
              video_url: formData.videoUrl,
              prerequisites: formData.prerequisites || [],
              categories: formData.categories,
            }
          ])
          .select()
          .single();

        if (error) throw error;
        
        if (data) {
          const newTrick: Trick = {
            id: data.id,
            name: data.name,
            description: data.description,
            level: data.level as TrickLevel,
            videoUrl: data.video_url,
            prerequisites: data.prerequisites || [],
            categories: data.categories || [],
            created_at: data.created_at
          };
          
          setTricks(prev => [...prev, newTrick]);
          
          toast({
            title: 'Success',
            description: 'Trick created successfully',
          });
        }
      } else {
        // Update existing trick
        const { error } = await supabase
          .from('tricks')
          .update({
            name: formData.name,
            description: formData.description,
            level: formData.level,
            video_url: formData.videoUrl,
            prerequisites: formData.prerequisites || [],
            categories: formData.categories,
          })
          .eq('id', formData.id);

        if (error) throw error;
        
        // Update local state
        setTricks(prev => 
          prev.map(trick => 
            trick.id === formData.id 
              ? {
                  ...trick,
                  name: formData.name,
                  description: formData.description,
                  level: formData.level,
                  videoUrl: formData.videoUrl,
                  prerequisites: formData.prerequisites || [],
                  categories: formData.categories,
                }
              : trick
          )
        );
        
        toast({
          title: 'Success',
          description: 'Trick updated successfully',
        });
      }
      
      closeDialog();
    } catch (err) {
      console.error('Error saving trick:', err);
      toast({
        title: 'Error',
        description: 'Failed to save trick',
        variant: 'destructive'
      });
    }
  };

  const deleteTrick = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tricks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setTricks(prev => prev.filter(trick => trick.id !== id));
      
      toast({
        title: 'Success',
        description: 'Trick deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting trick:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete trick',
        variant: 'destructive'
      });
    }
  };

  const getFilteredTricks = () => {
    return tricks.filter(trick => {
      // Apply category filter
      if (filterCategory && !trick.categories.includes(filterCategory)) {
        return false;
      }
      
      // Apply level filter
      if (filterLevel && trick.level !== filterLevel) {
        return false;
      }
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          trick.name.toLowerCase().includes(query) ||
          trick.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  return {
    tricks: getFilteredTricks(),
    allTricks: tricks,
    isLoading,
    error,
    selectedTrick,
    isDialogOpen,
    filterCategory,
    filterLevel,
    searchQuery,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    saveTrick,
    deleteTrick,
    setFilterCategory,
    setFilterLevel,
    setSearchQuery,
  };
};
