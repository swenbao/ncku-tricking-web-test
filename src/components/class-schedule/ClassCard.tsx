
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Flame, FlipHorizontal, Dumbbell, ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/components/ui/use-toast';

interface ClassCardProps {
  classItem: {
    type: string;
    difficulty: string;
    day: string;
    time: string;
    name: string;
    description: string;
    pointsCost: number;
  };
  typeDetails: {
    type: string;
    name: string;
    icon: React.ReactNode;
    color: string;
  };
  language: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem, typeDetails, language }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

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

  // Handle booking redirection
  const handleBookClass = (classType: string) => {
    navigate(`/booking?type=${classType}`);
  };

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="relative p-6 md:p-8 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center mb-3 md:mb-0">
            <div className={`rounded-full ${typeDetails.color} p-2 mr-3`}>
              {typeDetails.icon}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{classItem.name}</h3>
              <div className="flex items-center space-x-4 text-white/80 text-sm">
                <span className="inline-flex items-center">
                  {getDifficultyIcon(classItem.difficulty)}
                  <span className="ml-1 capitalize">{classItem.difficulty}</span>
                </span>
                <span className="mx-2">•</span>
                <span className="font-medium">{classItem.day}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{classItem.time}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-900/60 text-yellow-200 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{classItem.pointsCost} points</span>
            </div>
            <Button 
              onClick={() => handleBookClass(classItem.type)}
              variant="secondary"
              className="whitespace-nowrap"
            >
              {language === 'en' ? 'Book Class' : '預約課程'}
            </Button>
          </div>
        </div>
        <p className="text-white/90 max-w-2xl">{classItem.description}</p>
      </div>
    </div>
  );
};

export default ClassCard;
