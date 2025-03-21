
import React from 'react';
import { getClassTypeDetails, getDifficultyDetails } from '@/lib/bookingData';

interface SelectedFiltersProps {
  selectedType: string;
  selectedDifficulty: string;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  selectedType,
  selectedDifficulty
}) => {
  return (
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
  );
};

export default SelectedFilters;
