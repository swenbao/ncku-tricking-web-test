
import React from 'react';
import { getAvailableClassTypes } from '@/lib/bookingData';
import StepHeader from './StepHeader';
import ClassTypesList from './ClassTypesList';

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
      <StepHeader 
        title="Select Class Type"
        description="Choose the type of class you're interested in attending."
        onPrevious={onPrevious}
      />
      
      <ClassTypesList
        availableClassTypes={availableClassTypes}
        selectedType={selectedType}
        onSelectType={handleSelectType}
      />
    </div>
  );
};

export default ClassTypeStep;
