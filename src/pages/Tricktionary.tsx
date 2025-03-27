import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrickSearch } from '@/components/tricktionary/TrickSearch';
import { TrickFilters } from '@/components/tricktionary/TrickFilters';
import { TrickTabs } from '@/components/tricktionary/TrickTabs';
import { TrickDetailDialog } from '@/components/tricktionary/TrickDetailDialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { Trick } from '@/lib/data';

// Function to fetch difficulty levels
const fetchDifficultyLevels = async () => {
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
const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  return data || [];
};

// Function to fetch tricks from Supabase
const fetchTricks = async () => {
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
    // Parse the category_id field - if it's a string representation of an array, parse it
    // Otherwise, create an array with the single category_id if it exists
    let categoryIds = [];
    
    if (trick.category_id) {
      // If category_id is a JSON string array, parse it
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
    
    // Map category IDs to category names using the categories data
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

const TricktionaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTrick, setSelectedTrick] = useState(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const { language } = useLanguage();
  const t = translations[language].tricktionary;

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

  // Set initial active tab once difficulty levels are loaded
  useEffect(() => {
    if (difficultyLevels && difficultyLevels.length > 0 && !activeTab) {
      setActiveTab(difficultyLevels[0].name);
    }
  }, [difficultyLevels, activeTab]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
  };

  // Adjusted to use the dynamic difficulty levels and fetched tricks
  const filteredTricks = tricks.filter(trick => {
    const matchesSearch = trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (trick.description && trick.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || 
                            (trick.categories && trick.categories.some(category => 
                              selectedCategories.includes(category)));
    
    const matchesLevel = activeTab === 'all' || trick.level === activeTab;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const isLoading = isLoadingDifficulties || isLoadingTricks || isLoadingCategories;

  if (isLoading) {
    return (
      <div className="page-transition min-h-screen flex flex-col items-center justify-center">
        <div className="animate-pulse text-white">{t.loading}</div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </header>
          
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <TrickSearch 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              placeholder={t.searchPlaceholder}
            />
            
            <TrickFilters 
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              clearFilters={clearFilters}
              searchQuery={searchQuery}
              translations={{
                filterButton: t.filterButton,
                categoriesHeading: t.categoriesHeading,
                clearFilters: t.clearFilters,
                applyFilters: t.applyFilters,
                clearAll: t.clearAll
              }}
            />
          </div>
          
          {difficultyLevels && (
            <TrickTabs 
              difficultyLevels={difficultyLevels}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              filteredTricks={filteredTricks}
              onTrickSelect={setSelectedTrick}
              translations={{
                noTricksFound: t.noTricksFound,
                tryAdjusting: t.tryAdjusting
              }}
            />
          )}
        </div>
      </main>
      
      <Footer />
      
      <TrickDetailDialog
        selectedTrick={selectedTrick}
        setSelectedTrick={setSelectedTrick}
      />
    </div>
  );
};

export default TricktionaryPage;
