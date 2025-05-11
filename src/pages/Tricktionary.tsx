
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  TrickDetailDialog,
  TricktionaryHeader,
  TricktionaryFiltersSection,
  TricktionaryLoading,
  TrickTabs
} from '@/components/tricktionary';
import { useTricktionaryData } from '@/hooks/tricktionary/useTricktionaryData';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { Trick } from '@/lib/data';

const TricktionaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTrick, setSelectedTrick] = useState(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const { language } = useLanguage();
  const t = translations[language].tricktionary;

  // Fetch data using our custom hook
  const { difficultyLevels, tricks, isLoading } = useTricktionaryData();

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

  // Filter tricks based on search, categories, and level
  const filteredTricks = tricks.filter(trick => {
    const matchesSearch = trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (trick.description && trick.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || 
                            (trick.categories && trick.categories.some(category => 
                              selectedCategories.includes(category)));
    
    const matchesLevel = activeTab === 'all' || trick.level === activeTab;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (isLoading) {
    return <TricktionaryLoading message={t.loading} />;
  }

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <TricktionaryHeader 
            title={t.title} 
            subtitle={t.subtitle} 
          />
          
          <TricktionaryFiltersSection 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            clearFilters={clearFilters}
            translations={{
              searchPlaceholder: t.searchPlaceholder,
              filterButton: t.filterButton,
              categoriesHeading: t.categoriesHeading,
              clearFilters: t.clearFilters,
              applyFilters: t.applyFilters,
              clearAll: t.clearAll
            }}
          />
          
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
