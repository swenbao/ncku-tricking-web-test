
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, BookOpen, Flame, FlipHorizontal, Dumbbell } from 'lucide-react';
import { ClassData } from '@/hooks/useBookingState';

interface ClassCardProps {
  classItem: ClassData;
  isSelected: boolean;
  userPoints: number;
  onSelectClass: (classItem: ClassData) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  classItem,
  isSelected,
  userPoints,
  onSelectClass,
}) => {
  const hasEnoughPoints = userPoints >= 1;
  
  return (
    <Card 
      key={classItem.id}
      className={cn(
        "border-2 transition-all cursor-pointer hover:bg-gray-800/20",
        isSelected ? "border-primary" : "border-transparent",
        hasEnoughPoints ? "opacity-100" : "opacity-70 cursor-not-allowed"
      )}
      onClick={() => onSelectClass(classItem)}
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
                    isSelected 
                      ? "bg-green-900/30 text-green-300 border-green-700" 
                      : "bg-gray-800/30 text-gray-300 border-gray-700"
                  )}
                >
                  {isSelected ? "Selected" : "Available"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
