
import React from 'react';
import { TrickSearch } from './TrickSearch';
import { TrickFilters } from './TrickFilters';

interface TricktionaryFiltersSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  clearFilters: () => void;
  translations: {
    searchPlaceholder: string;
    filterButton: string;
    categoriesHeading: string;
    clearFilters: string;
    applyFilters: string;
    clearAll: string;
  };
}

export const TricktionaryFiltersSection: React.FC<TricktionaryFiltersSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  clearFilters,
  translations
}) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <TrickSearch 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        placeholder={translations.searchPlaceholder}
      />
      
      <TrickFilters 
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        clearFilters={clearFilters}
        searchQuery={searchQuery}
        translations={{
          filterButton: translations.filterButton,
          categoriesHeading: translations.categoriesHeading,
          clearFilters: translations.clearFilters,
          applyFilters: translations.applyFilters,
          clearAll: translations.clearAll
        }}
      />
    </div>
  );
};
