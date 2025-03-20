
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDifficultyDetails, difficultyLevels } from '@/lib/bookingData';
import { Sparkles, Trophy } from 'lucide-react';

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
              "cursor-pointer overflow-hidden border-2 transition-all duration-300 group",
              selectedDifficulty === level.id 
                ? "ring-2 ring-red-600 border-red-600" 
                : "border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
              "transform transition-transform duration-300 hover:-translate-y-2"
            )}
            onClick={() => setSelectedDifficulty(level.id)}
          >
            <CardContent className="p-0 h-full">
              <div className={cn(
                "flex flex-col h-full bg-black text-white group-hover:bg-gray-900 transition-colors duration-300",
                selectedDifficulty === level.id && "bg-gradient-to-br from-black to-red-950"
              )}>
                <div className="p-5 flex items-center border-b border-gray-800">
                  <div className={cn(
                    "p-3 rounded-full mr-4 transition-colors duration-300",
                    level.id === 'beginner'
                      ? "bg-black border border-gray-700" 
                      : "bg-red-950 border border-red-800"
                  )}>
                    {level.id === 'beginner' ? 
                      <Sparkles className="w-5 h-5 text-white/80" /> : 
                      <Trophy className="w-5 h-5 text-red-500" />
                    }
                  </div>
                  <h3 className={cn(
                    "text-2xl font-bold",
                    level.id === 'beginner' ? "text-white" : "text-red-500"
                  )}>
                    {level.name}
                  </h3>
                </div>
                <div className="p-5 flex-grow">
                  <p className="mb-4 text-gray-300">{level.description}</p>
                  {selectedDifficulty === level.id && (
                    <Badge className="bg-red-600 text-white hover:bg-red-700">
                      Selected
                    </Badge>
                  )}
                </div>
                <div className={cn(
                  "h-1 w-full transition-all duration-500",
                  level.id === 'beginner' 
                    ? "bg-gradient-to-r from-gray-800 to-gray-600 group-hover:from-gray-700 group-hover:to-red-700" 
                    : "bg-gradient-to-r from-red-800 to-red-600 group-hover:from-red-700 group-hover:to-red-500"
                )} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DifficultyStep;
