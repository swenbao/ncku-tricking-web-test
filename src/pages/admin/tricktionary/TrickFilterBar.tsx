
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TrickFilterBarProps {
  searchQuery: string;
  activeTab: string;
  onSearchChange: (query: string) => void;
  onTabChange: (tab: string) => void;
}

const TrickFilterBar: React.FC<TrickFilterBarProps> = ({ 
  searchQuery, 
  activeTab, 
  onSearchChange, 
  onTabChange 
}) => {
  return (
    <>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search tricks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <div className="flex space-x-2 flex-wrap gap-2">
          {['Absolute Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
            <Button
              key={level}
              variant={activeTab === level ? 'default' : 'outline'}
              onClick={() => onTabChange(level)}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrickFilterBar;
