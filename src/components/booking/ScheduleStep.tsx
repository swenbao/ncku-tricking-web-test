
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, BookOpen, Flame, FlipHorizontal, Dumbbell, ChevronLeft } from 'lucide-react';
import { getFilteredClasses, getClassTypeDetails, getDifficultyDetails } from '@/lib/bookingData';
import { Button } from '@/components/ui/button';
import { ClassData } from '@/hooks/useBookingState';

interface ScheduleStepProps {
  selectedType: string | null;
  selectedDifficulty: string | null;
  selectedClass: ClassData | null;
  userPoints: number;
  onSelectClass: (classItem: ClassData) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({
  selectedType,
  selectedDifficulty,
  selectedClass,
  userPoints,
  onSelectClass,
  onPrevious,
  onNext
}) => {
  if (!selectedType || !selectedDifficulty) return null;
  
  const filteredClasses = getFilteredClasses(selectedType, selectedDifficulty);
  
  const handleSelectClass = (classItem: ClassData) => {
    if (userPoints >= 1) { // Always requires just 1 course card
      onSelectClass(classItem);
      // Navigate to next step after a brief delay to ensure state is updated
      setTimeout(() => {
        onNext();
      }, 10);
    }
  };

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
          <h2 className="text-2xl font-bold mb-2">Select a Class</h2>
          <p className="text-muted-foreground">
            Choose from available classes that match your selection.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/50 flex items-start gap-3">
          <div className={`${getClassTypeDetails(selectedType).color} p-2 rounded-full`}>
            {getClassTypeDetails(selectedType).icon}
          </div>
          <div>
            <p className="text-sm font-medium text-blue-300 mb-1">
              Selected Class Type
            </p>
            <p className="text-sm text-blue-300">
              {getClassTypeDetails(selectedType).name}
            </p>
          </div>
        </div>
        
        <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/50 flex items-start gap-3">
          <div className={`${getDifficultyDetails(selectedDifficulty).color} p-2 rounded-full`}>
            {getDifficultyDetails(selectedDifficulty).icon}
          </div>
          <div>
            <p className="text-sm font-medium text-blue-300 mb-1">
              Selected Difficulty
            </p>
            <p className="text-sm text-blue-300">
              {getDifficultyDetails(selectedDifficulty).name}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => (
            <Card 
              key={classItem.id}
              className={cn(
                "border-2 transition-all cursor-pointer hover:bg-gray-800/20",
                selectedClass?.id === classItem.id ? "border-primary" : "border-transparent",
                userPoints >= 1 ? "opacity-100" : "opacity-70 cursor-not-allowed"
              )}
              onClick={() => handleSelectClass(classItem)}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left column with class type and day */}
                  <div className={cn(
                    "p-4 flex flex-col justify-center items-center md:w-1/5 text-white",
                    `bg-${classItem.type === 'tricking' ? 'orange' : 
                            classItem.type === 'flip' ? 'purple' : 
                            'blue'}-800`
                  )}>
                    <div className="mb-2">
                      {classItem.type === 'tricking' ? <Flame className="h-6 w-6" /> :
                       classItem.type === 'flip' ? <FlipHorizontal className="h-6 w-6" /> :
                       <Dumbbell className="h-6 w-6" />}
                    </div>
                    <p className="text-base font-bold">{classItem.day}</p>
                  </div>
                  
                  {/* Center column with time - now more prominent */}
                  <div className="bg-black/40 flex flex-col justify-center items-center py-4 md:w-1/5">
                    <div className="text-xs uppercase text-yellow-300 font-medium mb-1">Time</div>
                    <div className="flex items-center justify-center px-4 py-2 bg-yellow-900/60 rounded-full">
                      <Clock className="h-4 w-4 mr-2 text-yellow-300" />
                      <span className="text-yellow-200 font-bold text-lg tracking-tight">{classItem.time}</span>
                    </div>
                  </div>
                  
                  {/* Right column with class details */}
                  <div className="p-5 flex-1">
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{classItem.name}</h3>
                        <p className="text-muted-foreground text-sm">{classItem.description}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-start">
                        <div className="flex items-center bg-yellow-900/60 text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                          <BookOpen className="h-3 w-3 mr-1" />
                          1 course card
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 items-center">
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{classItem.availableSpots} of {classItem.maxCapacity} spots available</span>
                      </div>
                      
                      {userPoints < 1 ? (
                        <Badge variant="outline" className="text-red-400 border-red-800 bg-red-900/30">
                          Insufficient Course Cards
                        </Badge>
                      ) : (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "transition-colors",
                            selectedClass?.id === classItem.id 
                              ? "bg-green-900/30 text-green-300 border-green-700" 
                              : "bg-gray-800/30 text-gray-300 border-gray-700"
                          )}
                        >
                          {selectedClass?.id === classItem.id ? "Selected" : "Available"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="booking-highlight border rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No Classes Available</h3>
            <p className="text-muted-foreground mb-4">
              There are no classes that match your selected criteria. Please try a different combination.
            </p>
            <Button onClick={onPrevious}>
              Go Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleStep;
