
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { classTypes, getAvailableDifficulties } from '@/lib/bookingData';

interface ClassTypeStepProps {
  selectedType: string | null;
  setSelectedType: (type: string) => void;
}

const ClassTypeStep: React.FC<ClassTypeStepProps> = ({ selectedType, setSelectedType }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Select Class Type</h2>
      <p className="text-muted-foreground mb-6">
        Choose the type of class you're interested in attending.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        {classTypes.map((type) => {
          // Skip types that don't have available classes
          const availableDifficulties = getAvailableDifficulties(type.id);
          if (availableDifficulties.length === 0) return null;
          
          return (
            <Card 
              key={type.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md overflow-hidden flex-1 transition-all duration-300 group",
                selectedType === type.id 
                  ? "ring-2 ring-red-800/80" 
                  : "border hover:border-red-800/70"
              )}
              onClick={() => setSelectedType(type.id)}
            >
              <CardContent className="p-0 h-full">
                <div className="bg-red-300/80 text-red-900 group-hover:bg-red-800/90 group-hover:text-white h-full flex flex-col transition-colors duration-300">
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <div className="bg-red-900/20 p-2 rounded-full mr-3 transition-colors duration-300 group-hover:bg-white/20">
                        {type.icon}
                      </div>
                      <h3 className="text-xl font-bold">{type.name}</h3>
                    </div>
                  </div>
                  <div className="p-5 flex-grow">
                    <p className="mb-3">{type.description}</p>
                    {selectedType === type.id && (
                      <Badge className="bg-red-900/60 group-hover:bg-white/20 transition-colors duration-300">Selected</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ClassTypeStep;
