
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

interface TrickFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  clearFilters: () => void;
  searchQuery: string;
  translations: {
    filterButton: string;
    categoriesHeading: string;
    clearFilters: string;
    applyFilters: string;
    clearAll: string;
  };
}

export const TrickFilters: React.FC<TrickFiltersProps> = ({
  selectedCategories,
  setSelectedCategories,
  clearFilters,
  searchQuery,
  translations
}) => {
  // Fetch categories from Supabase
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {translations.filterButton}
            {selectedCategories.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedCategories.length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{translations.filterButton}</SheetTitle>
            <SheetDescription>
              {translations.categoriesHeading}
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6">
            <h3 className="text-sm font-medium mb-4">{translations.categoriesHeading}</h3>
            <div className="space-y-3">
              {isLoading ? (
                <div className="animate-pulse text-muted-foreground">Loading categories...</div>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={() => handleCategoryChange(category.name)}
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={clearFilters} size="sm">
              {translations.clearFilters}
            </Button>
            <SheetClose asChild>
              <Button size="sm">{translations.applyFilters}</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      
      {(searchQuery || selectedCategories.length > 0) && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          {translations.clearAll}
        </Button>
      )}
    </div>
  );
};
