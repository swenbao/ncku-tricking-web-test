
import React, { useState, useEffect } from 'react';
import { tricks } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrickSearch } from '@/components/tricktionary/TrickSearch';
import { TrickFilters } from '@/components/tricktionary/TrickFilters';
import { TrickTabs } from '@/components/tricktionary/TrickTabs';
import { TrickDetailDialog } from '@/components/tricktionary/TrickDetailDialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

const TricktionaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTrick, setSelectedTrick] = useState(null);
  const [activeTab, setActiveTab] = useState<string>('');

  // Fetch difficulty levels from Supabase
  const { data: difficultyLevels, isLoading: isLoadingDifficulties } = useQuery({
    queryKey: ['difficultyLevels'],
    queryFn: fetchDifficultyLevels
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

  // Adjusted to use the dynamic difficulty levels
  const filteredTricks = tricks.filter(trick => {
    const matchesSearch = trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trick.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                            trick.categories.some(category => selectedCategories.includes(category));
    
    const matchesLevel = activeTab === 'all' || trick.level === activeTab;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (isLoadingDifficulties) {
    return (
      <div className="page-transition min-h-screen flex flex-col items-center justify-center">
        <div className="animate-pulse text-white">Loading difficulty levels...</div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tricktionary</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our database of tricking moves, from basic to advanced techniques.
            </p>
          </header>
          
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <TrickSearch 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            
            <TrickFilters 
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              clearFilters={clearFilters}
              searchQuery={searchQuery}
            />
          </div>
          
          {difficultyLevels && (
            <TrickTabs 
              difficultyLevels={difficultyLevels}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              filteredTricks={filteredTricks}
              onTrickSelect={setSelectedTrick}
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
