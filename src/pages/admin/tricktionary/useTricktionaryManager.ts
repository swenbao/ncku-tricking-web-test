import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trick } from '@/lib/data';

export const useTricktionaryManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Beginner');
  const [tricks, setTricks] = useState<Trick[]>([]);
  const [filteredTricks, setFilteredTricks] = useState<Trick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Trick>({
    id: '',
    name: '',
    description: '',
    level: 'Beginner',
    categories: [],
    tutorial_url: '',
    image_url: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTricks();
  }, []);

  useEffect(() => {
    filterTricks();
  }, [tricks, searchQuery, activeTab]);

  const fetchTricks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('tricks')
        .select('*');

      if (error) {
        console.error('Error fetching tricks:', error);
        toast({
          title: 'Error fetching tricks',
          description: error.message,
          variant: 'destructive',
        });
      }

      if (data) {
        setTricks(data);
      }
    } catch (error: any) {
      console.error('Unexpected error fetching tricks:', error);
      toast({
        title: 'Unexpected error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterTricks = () => {
    let filtered = [...tricks];

    if (searchQuery) {
      filtered = filtered.filter(trick =>
        trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trick.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab !== 'All Levels') {
      filtered = filtered.filter(trick => trick.level === activeTab);
    }

    setFilteredTricks(filtered);
  };

  const handleOpenAddDialog = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      level: 'Beginner',
      categories: [],
      tutorial_url: '',
      image_url: '',
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (trick: Trick) => {
    setFormData(trick);
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        };
      }
    });
  };

  const handleLevelChange = (level: string) => {
    setFormData(prev => ({ ...prev, level }));
  };

  const createTrickMutation = {
    mutateAsync: async (newTrick: Omit<Trick, 'id'>) => {
      try {
        const { data, error } = await supabase
          .from('tricks')
          .insert([newTrick])
          .select()
          .single();

        if (error) {
          console.error('Error creating trick:', error);
          toast({
            title: 'Error creating trick',
            description: error.message,
            variant: 'destructive',
          });
          throw error;
        }

        if (data) {
          setTricks(prev => [...prev, data]);
          toast({
            title: 'Trick created',
            description: `${data.name} has been created successfully.`,
          });
          handleCloseDialog();
          return data;
        }
      } catch (error: any) {
        console.error('Unexpected error creating trick:', error);
        toast({
          title: 'Unexpected error',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
    },
    isPending: false, // Mocked for now
  };

  const updateTrickMutation = {
    mutateAsync: async (updatedTrick: Trick) => {
      try {
        const { data, error } = await supabase
          .from('tricks')
          .update(updatedTrick)
          .eq('id', updatedTrick.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating trick:', error);
          toast({
            title: 'Error updating trick',
            description: error.message,
            variant: 'destructive',
          });
          throw error;
        }

        if (data) {
          setTricks(prev => prev.map(trick => (trick.id === data.id ? data : trick)));
          toast({
            title: 'Trick updated',
            description: `${data.name} has been updated successfully.`,
          });
          handleCloseDialog();
          return data;
        }
      } catch (error: any) {
        console.error('Unexpected error updating trick:', error);
        toast({
          title: 'Unexpected error',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
    },
    isPending: false, // Mocked for now
  };

  const handleSave = async () => {
    if (isAddDialogOpen) {
      try {
        await createTrickMutation.mutateAsync(formData);
      } catch (error) {
        console.error('Failed to create trick', error);
      }
    } else if (isEditDialogOpen) {
      try {
        await updateTrickMutation.mutateAsync(formData);
      } catch (error) {
        console.error('Failed to update trick', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tricks')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting trick:', error);
        toast({
          title: 'Error deleting trick',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setTricks(prev => prev.filter(trick => trick.id !== id));
      toast({
        title: 'Trick deleted',
        description: 'Trick has been deleted successfully.',
      });
    } catch (error: any) {
      console.error('Unexpected error deleting trick:', error);
      toast({
        title: 'Unexpected error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    tricks,
    filteredTricks,
    isLoading,
    isAddDialogOpen,
    isEditDialogOpen,
    formData,
    createTrickMutation,
    updateTrickMutation,
    handleOpenAddDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleInputChange,
    handleCategoryChange,
    handleLevelChange,
    handleSave,
    handleDelete,
  };
};
