
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, FilterX } from 'lucide-react';
import { TrickLevel } from './types';

interface TrickFilterBarProps {
  categories: string[];
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterLevel: string;
  setFilterLevel: (level: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateClick: () => void;
}

const TrickFilterBar: React.FC<TrickFilterBarProps> = ({
  categories,
  filterCategory,
  setFilterCategory,
  filterLevel,
  setFilterLevel,
  searchQuery,
  setSearchQuery,
  onCreateClick,
}) => {
  const handleResetFilters = () => {
    setFilterCategory('');
    setFilterLevel('');
    setSearchQuery('');
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trick Library</h2>
        <Button onClick={onCreateClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Trick
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tricks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleResetFilters}>
          <FilterX className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default TrickFilterBar;
