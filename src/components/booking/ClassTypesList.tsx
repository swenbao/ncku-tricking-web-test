
import React from 'react';
import { ClassType } from '@/hooks/booking/types';
import ClassTypeCard from './ClassTypeCard';

interface ClassTypesListProps {
  availableClassTypes: ClassType[];
  selectedType: string | null;
  onSelectType: (typeId: string) => void;
}

const ClassTypesList: React.FC<ClassTypesListProps> = ({ 
  availableClassTypes, 
  selectedType, 
  onSelectType 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {availableClassTypes.map((type) => (
        <ClassTypeCard
          key={type.id}
          type={type}
          isSelected={selectedType === type.id}
          onSelect={onSelectType}
        />
      ))}
    </div>
  );
};

export default ClassTypesList;
