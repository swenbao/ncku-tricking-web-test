
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
              "cursor-pointer transition-all overflow-hidden group",
              selectedDifficulty === level.id ? "ring-2 ring-red-800/80" : "border",
              level.id === 'beginner' 
                ? "hover:shadow-md hover:border-gray-400 transition-all duration-300" 
                : "hover:shadow-[0_0_15px_rgba(185,28,28,0.4)] hover:border-red-800/90 hover:transform hover:translate-y-[-5px] transition-all duration-300"
            )}
            onClick={() => setSelectedDifficulty(level.id)}
          >
            <CardContent className="p-0 h-full">
              <div className={cn(
                "flex flex-col h-full transition-colors duration-300",
                level.id === 'beginner' 
                  ? "bg-red-200/90 text-red-900 group-hover:bg-red-800/75 group-hover:text-white" 
                  : "bg-red-400/60 text-red-950 group-hover:bg-red-800/90 group-hover:text-white"
              )}>
                <div className="p-5 flex items-center">
                  <div className={cn(
                    "p-3 rounded-full mr-4 transition-colors duration-300",
                    level.id === 'beginner'
                      ? "bg-red-900/20 group-hover:bg-white/20"
                      : "bg-red-950/20 group-hover:bg-white/20"
                  )}>
                    {level.id === 'beginner' ? <ArrowDown className="w-6 h-6" /> : <ArrowUp className="w-6 h-6" />}
                  </div>
                  <h3 className="text-2xl font-bold">{level.name}</h3>
                </div>
                <div className="p-5 flex-grow">
                  <p className="mb-4">{level.description}</p>
                  {selectedDifficulty === level.id && (
                    <Badge className={cn(
                      "transition-colors duration-300",
                      level.id === 'beginner'
                        ? "bg-red-900/60 group-hover:bg-white/20"
                        : "bg-red-950/60 group-hover:bg-white/20"
                    )}>
                      Selected
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DifficultyStep;
