
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getClassTypeDetails, getAvailableDifficulties } from '@/lib/bookingData';

interface DifficultyStepProps {
  selectedType: string | null;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (difficulty: string) => void;
}

const DifficultyStep: React.FC<DifficultyStepProps> = ({ 
  selectedType, 
  selectedDifficulty, 
  setSelectedDifficulty 
}) => {
  if (!selectedType) return null;
  
  const typeDetails = getClassTypeDetails(selectedType);
  const availableDifficulties = getAvailableDifficulties(selectedType);
  
  if (availableDifficulties.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">No Classes Available</h2>
        <p className="text-muted-foreground">
          There are no classes available for this type. Please select a different class type.
        </p>
      </div>
    );
  }
  
  // If there's only one difficulty available, auto-select it
  if (availableDifficulties.length === 1 && !selectedDifficulty) {
    setTimeout(() => {
      setSelectedDifficulty(availableDifficulties[0].id);
    }, 0);
  }
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Select Difficulty Level</h2>
      <p className="text-muted-foreground mb-6">
        Choose the difficulty level that matches your experience.
      </p>
      
      <div className="mb-4">
        <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/50 flex items-start gap-3 mb-6">
          <div className={`${typeDetails.color} p-2 rounded-full`}>
            {typeDetails.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-blue-300 mb-1">
              Selected Class Type
            </p>
            <p className="text-sm text-blue-300">
              {typeDetails.name} - {typeDetails.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {availableDifficulties.map((level) => (
          <Card 
            key={level.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md overflow-hidden",
              selectedDifficulty === level.id ? "ring-2 ring-primary" : "border"
            )}
            onClick={() => setSelectedDifficulty(level.id)}
          >
            <CardContent className="p-0">
              <div className={`${level.color} p-4`}>
                <div className="flex items-center mb-3">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    {level.icon}
                  </div>
                  <h3 className="text-xl font-bold">{level.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground mb-3">{level.description}</p>
                {selectedDifficulty === level.id && (
                  <Badge className="bg-primary hover:bg-primary/90">Selected</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DifficultyStep;
