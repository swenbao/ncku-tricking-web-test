
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDifficultyDetails, difficultyLevels } from '@/lib/bookingData';
import { ArrowDown, ArrowUp } from 'lucide-react';

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
              "cursor-pointer transition-all overflow-hidden",
              selectedDifficulty === level.id ? "ring-2 ring-red-800" : "border",
              level.id === 'beginner' 
                ? "hover:shadow-md hover:border-gray-400" 
                : "hover:shadow-xl hover:shadow-red-800/40 hover:border-red-800/70 hover:transform hover:translate-y-[-5px] transition-transform duration-300"
            )}
            onClick={() => setSelectedDifficulty(level.id)}
          >
            <CardContent className="p-0">
              <div className="p-5 flex items-center bg-red-800 text-white">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  {level.id === 'beginner' ? <ArrowDown className="w-6 h-6" /> : <ArrowUp className="w-6 h-6" />}
                </div>
                <h3 className="text-2xl font-bold">{level.name}</h3>
              </div>
              <div className="p-5 bg-black text-gray-300">
                <p className="mb-4">{level.description}</p>
                {selectedDifficulty === level.id && (
                  <Badge className="bg-red-800 hover:bg-red-900">Selected</Badge>
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
