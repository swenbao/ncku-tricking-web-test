
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { getAvailableClassTypes } from '@/lib/bookingData';

interface ClassTypeStepProps {
  selectedType: string | null;
  selectedDifficulty: string | null;
  setSelectedType: (type: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ClassTypeStep: React.FC<ClassTypeStepProps> = ({ 
  selectedType, 
  selectedDifficulty,
  setSelectedType, 
  onNext,
  onPrevious
}) => {
  const handleSelectType = (typeId: string) => {
    // First set the type
    setSelectedType(typeId);
    
    // Then navigate to next step with a slight delay
    // to ensure the state is updated
    setTimeout(() => {
      onNext();
    }, 50);
  };

  // Get available class types based on selected difficulty
  const availableClassTypes = selectedDifficulty 
    ? getAvailableClassTypes(selectedDifficulty)
    : [];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onPrevious}
          className="mr-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold mb-2">Select Class Type</h2>
          <p className="text-muted-foreground">
            Choose the type of class you're interested in attending.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {availableClassTypes.map((type) => (
          <Card 
            key={type.id}
            className={cn(
              "cursor-pointer transition-all overflow-hidden border-2 flex-1 duration-300 group",
              selectedType === type.id 
                ? "ring-2 ring-red-600 border-red-600" 
                : "border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
              "transform transition-transform duration-300 hover:-translate-y-2"
            )}
            onClick={() => handleSelectType(type.id)}
          >
            <CardContent className="p-0 h-full">
              <div className="bg-black text-white h-full flex flex-col group-hover:bg-gray-900 transition-colors duration-300">
                <div className="p-5 border-b border-gray-800">
                  <div className="flex items-center mb-3">
                    <div className="bg-black p-3 rounded-full mr-3 border border-gray-700 group-hover:border-red-800 transition-colors duration-300">
                      <div className="text-white group-hover:text-red-500 transition-colors duration-300">
                        {type.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                      {type.name}
                    </h3>
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <p className="mb-3 text-gray-300">{type.description}</p>
                  {selectedType === type.id && (
                    <Badge className="bg-red-600 text-white hover:bg-red-700">Selected</Badge>
                  )}
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-black to-gray-800 group-hover:from-red-800 group-hover:to-red-600 transition-all duration-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassTypeStep;
