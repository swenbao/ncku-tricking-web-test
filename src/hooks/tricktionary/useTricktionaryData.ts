
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Trick } from '@/lib/data';

// Function to fetch difficulty levels
export const fetchDifficultyLevels = async () => {
  const { data, error } = await supabase
    .from('difficulty_levels')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching difficulty levels:', error);
    throw error;
  }
  
  return data || [];
};

// Function to fetch categories from Supabase
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  return data || [];
};

// Improved function to fetch tricks with proper category handling
export const fetchTricks = async () => {
  // First, fetch all categories
  const categories = await fetchCategories();
  
  // Then fetch tricks data
  const { data, error } = await supabase
    .from('tricks')
    .select(`
      *,
      difficulty_levels(name)
    `);
  
  if (error) {
    console.error('Error fetching tricks:', error);
    throw error;
  }
  
  // Transform the data to match our Trick type
  return (data || []).map(trick => {
    // Parse the category_id field to handle multiple formats
    let categoryIds = [];
    
    if (trick.category_id) {
      // If category_id is a JSON string array
      if (typeof trick.category_id === 'string' && trick.category_id.startsWith('[')) {
        try {
          categoryIds = JSON.parse(trick.category_id);
        } catch (e) {
          console.error('Error parsing category_id as JSON:', e);
          categoryIds = [trick.category_id];
        }
      } 
      // If it's already an array
      else if (Array.isArray(trick.category_id)) {
        categoryIds = trick.category_id;
      }
      // If it's a single value
      else {
        categoryIds = [trick.category_id];
      }
    }
    
    // Map category IDs to category names
    const trickCategories = categoryIds
      .map(id => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : null;
      })
      .filter(Boolean); // Remove any null values
    
    return {
      id: trick.id,
      name: trick.name,
      level: trick.difficulty_levels?.name || '',
      description: trick.description || '',
      videoUrl: trick.video_url || undefined,
      prerequisites: trick.prerequisites || [],
      categories: trickCategories,
    };
  });
};

// Custom hook that combines all data fetching
export const useTricktionaryData = () => {
  // Fetch categories for the filters
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Fetch difficulty levels from Supabase
  const { data: difficultyLevels, isLoading: isLoadingDifficulties } = useQuery({
    queryKey: ['difficultyLevels'],
    queryFn: fetchDifficultyLevels
  });

  // Fetch tricks from Supabase
  const { data: tricks = [], isLoading: isLoadingTricks } = useQuery({
    queryKey: ['tricks'],
    queryFn: fetchTricks
  });

  const isLoading = isLoadingCategories || isLoadingDifficulties || isLoadingTricks;

  return {
    categories,
    difficultyLevels,
    tricks,
    isLoading
  };
};
