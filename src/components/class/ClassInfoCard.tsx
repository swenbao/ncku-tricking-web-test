
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, BookOpen, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { getClassTypeDetails } from '@/lib/bookingData';

interface ClassInfoCardProps {
  classDetails: {
    id: string;
    type: string;
    difficulty: string;
    day: string;
    time: string;
    name: string;
    instructor?: string;
    pointsCost?: number;
  };
  date?: Date;
  variant?: 'default' | 'compact';
  status?: 'upcoming' | 'completed' | 'selected' | 'available';
  showLocation?: boolean;
  showInstructor?: boolean;
  showPoints?: boolean;
  additionalContent?: React.ReactNode;
}

const ClassInfoCard: React.FC<ClassInfoCardProps> = ({
  classDetails,
  date,
  variant = 'default',
  status = 'available',
  showLocation = true,
  showInstructor = true,
  showPoints = false,
  additionalContent,
}) => {
  const classType = getClassTypeDetails(classDetails.type);

  // Get difficulty icon based on level
  const getDifficultyIcon = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner':
        return <ArrowDown className="h-4 w-4" />;
      case 'intermediate':
        return <ArrowRight className="h-4 w-4" />;
      case 'advanced':
        return <ArrowUp className="h-4 w-4" />;
      default:
        return <ArrowDown className="h-4 w-4" />;
    }
  };

  // Determine badge color based on status
  const getBadgeStyle = () => {
    switch(status) {
      case 'upcoming':
        return 'bg-blue-800/70 text-blue-200';
      case 'completed':
        return 'bg-gray-800 text-gray-200';
      case 'selected':
        return 'bg-green-800/70 text-green-200';
      default:
        return classDetails.difficulty === 'beginner' 
          ? 'bg-green-800/70 text-green-200' 
          : 'bg-red-800/70 text-red-200';
    }
  };

  // Determine badge text
  const getBadgeText = () => {
    switch(status) {
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      case 'selected':
        return 'Selected';
      default:
        return classDetails.difficulty.charAt(0).toUpperCase() + classDetails.difficulty.slice(1);
    }
  };

  return (
    <Card className={`border border-gray-800 ${status === 'completed' ? 'opacity-80' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{classDetails.name}</CardTitle>
            <CardDescription>{classType.name} Class</CardDescription>
          </div>
          <Badge className={getBadgeStyle()}>
            {getBadgeText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`space-y-3 ${additionalContent ? 'mb-4' : ''}`}>
          {date && (
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{format(date, 'EEEE, MMMM d, yyyy')}</span>
            </div>
          )}
          {!date && (
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{classDetails.day}</span>
            </div>
          )}
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4" />
            <span>{classDetails.time}</span>
          </div>
          {showLocation && (
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              <span>Tricking Club, Studio 3</span>
            </div>
          )}
          {showInstructor && classDetails.instructor && (
            <div className="flex items-center text-sm">
              <User className="mr-2 h-4 w-4" />
              <span>Instructor: {classDetails.instructor}</span>
            </div>
          )}
          {showPoints && classDetails.pointsCost && (
            <div className="flex items-center text-sm">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Cost: {classDetails.pointsCost} points</span>
            </div>
          )}
        </div>
        
        {additionalContent && additionalContent}
      </CardContent>
    </Card>
  );
};

export default ClassInfoCard;
