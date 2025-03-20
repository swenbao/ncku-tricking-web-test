
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDifficultyDetails, difficultyLevels } from '@/lib/bookingData';

interface DifficultyStepProps {
  selectedDifficulty: string | null;
  setSelectedDifficulty: (difficulty: string) => void;
}

const DifficultyStep: React.FC<DifficultyStepProps> = ({ 
  selectedDifficulty, 
  setSelectedDifficulty 
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Select Difficulty Level</h2>
      <p className="text-muted-foreground mb-6">
        Choose the difficulty level that matches your experience.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {difficultyLevels.map((level) => (
          <Card 
            key={level.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md overflow-hidden",
              selectedDifficulty === level.id ? "ring-2 ring-red-500" : "border"
            )}
            onClick={() => setSelectedDifficulty(level.id)}
          >
            <CardContent className="p-0">
              <div className={cn(
                "p-4",
                level.id === 'beginner' ? "bg-black text-white" : "bg-red-500 text-white"
              )}>
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
                  <Badge className="bg-red-500 hover:bg-red-600">Selected</Badge>
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
