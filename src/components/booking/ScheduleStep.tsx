
import React from 'react';
import { getFilteredClasses } from '@/lib/bookingData';
import { ClassData } from '@/hooks/useBookingState';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import StepHeader from './StepHeader';
import SelectedFilters from './SelectedFilters';
import ClassCard from './ClassCard';
import NoClassesMessage from './NoClassesMessage';

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Safety check - prevent rendering if required props are missing
  if (!selectedType || !selectedDifficulty) return null;
  
  const filteredClasses = getFilteredClasses(selectedType, selectedDifficulty);
  
  const handleSelectClass = (classItem: ClassData) => {
    // Check if user is authenticated first
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to book a class.",
        variant: "destructive",
      });
      
      // Redirect to login page
      navigate('/login');
      return;
    }
    
    if (userPoints >= classItem.pointsCost) {
      onSelectClass(classItem);
      // Navigate to next step after a brief delay to ensure state is updated
      setTimeout(() => {
        onNext();
      }, 10);
    } else {
      toast({
        title: "Insufficient Course Cards",
        description: "You don't have enough course cards to book this class.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <StepHeader 
        title="Select a Class"
        description="Choose from available classes that match your selection."
        onPrevious={onPrevious}
      />
      
      <SelectedFilters 
        selectedType={selectedType} 
        selectedDifficulty={selectedDifficulty} 
      />
      
      <div className="space-y-4">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              isSelected={selectedClass?.id === classItem.id}
              userPoints={userPoints}
              onSelectClass={handleSelectClass}
            />
          ))
        ) : (
          <NoClassesMessage onGoBack={onPrevious} />
        )}
      </div>
    </div>
  );
};

export default ScheduleStep;
