
import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTricks,
  createTrick,
  updateTrick,
  deleteTrick
} from '@/services/supabaseService';
import { Trick, TrickLevel } from '@/lib/data';
import { useToast } from "@/components/ui/use-toast";
import { TrickFormData } from './TrickDialog';

export const useTricktionaryManager = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('Absolute Novice');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTrick, setSelectedTrick] = useState<Trick | null>(null);
  const [formData, setFormData] = useState<TrickFormData>({
    name: '',
    level: 'Absolute Novice',
    description: '',
    categories: [],
    videoUrl: '',
    prerequisites: [],
  });
  
  const queryClient = useQueryClient();
  
  // Fetch tricks from Supabase
  const { data: trickList = [], isLoading, error: fetchError, refetch } = useQuery({
    queryKey: ['tricks'],
    queryFn: fetchTricks,
    refetchOnWindowFocus: true,
    retry: 3,
  });
  
  // Handle fetch error
  React.useEffect(() => {
    if (fetchError) {
      toast({
        title: "Error fetching tricks",
        description: "There was an error loading the tricks. Please try again.",
        variant: "destructive",
      });
      console.error('Fetch error:', fetchError);
    }
  }, [fetchError, toast]);
  
  // Create trick mutation
  const createTrickMutation = useMutation({
    mutationFn: createTrick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tricks'] });
      refetch();
      toast({
        title: "Success!",
        description: "Trick created successfully.",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create trick. Please try again.",
        variant: "destructive",
      });
      console.error('Create trick error:', error);
    }
  });
  
  // Update trick mutation
  const updateTrickMutation = useMutation({
    mutationFn: updateTrick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tricks'] });
      refetch();
      toast({
        title: "Success!",
        description: "Trick updated successfully.",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update trick. Please try again.",
        variant: "destructive",
      });
      console.error('Update trick error:', error);
    }
  });
  
  // Delete trick mutation
  const deleteTrickMutation = useMutation({
    mutationFn: deleteTrick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tricks'] });
      refetch();
      toast({
        title: "Success!",
        description: "Trick deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete trick. Please try again.",
        variant: "destructive",
      });
      console.error('Delete trick error:', error);
    }
  });

  const handleOpenAddDialog = () => {
    setFormData({
      name: '',
      level: 'Absolute Novice',
      description: '',
      categories: [],
      videoUrl: '',
      prerequisites: [],
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (trick: Trick) => {
    setSelectedTrick(trick);
    setFormData({
      name: trick.name,
      level: trick.level,
      description: trick.description,
      categories: trick.categories,
      videoUrl: trick.videoUrl || '',
      prerequisites: trick.prerequisites || [],
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedTrick(null);
    setFormData({
      name: '',
      level: 'Absolute Novice',
      description: '',
      categories: [],
      videoUrl: '',
      prerequisites: [],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSave = () => {
    // Validate form data
    if (!formData.name || formData.categories.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditDialogOpen && selectedTrick) {
      // Updating an existing trick
      const updatedTrick: Trick = {
        ...selectedTrick,
        name: formData.name,
        level: formData.level as TrickLevel,
        description: formData.description,
        categories: formData.categories,
        prerequisites: formData.prerequisites,
        videoUrl: formData.videoUrl,
      };
      
      updateTrickMutation.mutate(updatedTrick);
    } else {
      // Adding a new trick
      const newTrick: Omit<Trick, 'id'> = {
        name: formData.name,
        level: formData.level as TrickLevel,
        description: formData.description,
        categories: formData.categories,
        prerequisites: formData.prerequisites,
        videoUrl: formData.videoUrl,
      };
      
      createTrickMutation.mutate(newTrick);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this trick?")) {
      deleteTrickMutation.mutate(id);
    }
  };

  // Filter tricks based on active tab and search query
  const filteredTricks = useMemo(() => {
    return trickList.filter(trick => 
      trick.level === activeTab &&
      (searchQuery === '' || 
        trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trick.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [trickList, activeTab, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
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
