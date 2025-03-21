
import { Flame, FlipHorizontal, Dumbbell, ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';
import { ClassType, DifficultyLevel, ClassData } from '@/hooks/useBookingState';

// Class types definitions
export const classTypes: ClassType[] = [
  {
    id: 'tricking',
    name: 'Tricking',
    icon: <Flame className="h-5 w-5" />,
    color: 'bg-orange-800/70 text-orange-200',
    description: 'Learn martial arts-inspired acrobatic movements and combinations.'
  },
  {
    id: 'flip',
    name: 'Flip',
    icon: <FlipHorizontal className="h-5 w-5" />,
    color: 'bg-purple-800/70 text-purple-200',
    description: 'Master various flipping techniques both on ground and with trampolines.'
  },
  {
    id: 'kicking',
    name: 'Kicking',
    icon: <Dumbbell className="h-5 w-5" />,
    color: 'bg-blue-800/70 text-blue-200',
    description: 'Build strength and technique with advanced kicking training.'
  }
];

// Difficulty levels
export const difficultyLevels: DifficultyLevel[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    icon: <ArrowDown className="h-5 w-5" />,
    color: 'bg-green-800/70 text-green-200',
    description: 'For those new to tricking or with minimal experience.'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: <ArrowUp className="h-5 w-5" />,
    color: 'bg-red-800/70 text-red-200',
    description: 'For experienced trickers looking to master complex techniques.'
  },
];

// Class data
export const enhancedClassData: ClassData[] = [
  {
    id: '1',
    type: 'tricking',
    difficulty: 'beginner',
    day: 'Friday',
    time: '19:30-21:00',
    name: 'Beginner Tricking',
    description: 'Introduction to basic tricking movements and fundamentals.',
    pointsCost: 2,
    instructor: 'Alex Chen',
    maxCapacity: 12,
    availableSpots: 8,
  },
  {
    id: '2',
    type: 'tricking',
    difficulty: 'advanced',
    day: 'Monday',
    time: '19:30-21:00',
    name: 'Advanced Tricking',
    description: 'Advanced combination moves and sequences for experienced trickers.',
    pointsCost: 3,
    instructor: 'Sarah Johnson',
    maxCapacity: 10,
    availableSpots: 4,
  },
  {
    id: '3',
    type: 'flip',
    difficulty: 'advanced',
    day: 'Monday',
    time: '18:30-19:30',
    name: 'Advanced Flips',
    description: 'Master complex flipping techniques and combinations.',
    pointsCost: 2,
    instructor: 'Mike Wilson',
    maxCapacity: 8,
    availableSpots: 5,
  },
  {
    id: '4',
    type: 'kicking',
    difficulty: 'advanced',
    day: 'Friday',
    time: '18:00-19:30',
    name: 'Advanced Kicking Techniques',
    description: 'Develop advanced kicking techniques and improve execution.',
    pointsCost: 3,
    instructor: 'Lisa Wong',
    maxCapacity: 10,
    availableSpots: 6,
  }
];

// Utility functions
export const getClassTypeDetails = (typeId: string) => {
  return classTypes.find(type => type.id === typeId) || classTypes[0];
};

export const getDifficultyDetails = (difficultyId: string) => {
  return difficultyLevels.find(level => level.id === difficultyId) || difficultyLevels[0];
};

// Filter classes by selected criteria
export const getFilteredClasses = (selectedType: string | null, selectedDifficulty: string | null) => {
  let filtered = [...enhancedClassData];
  
  if (selectedType) {
    filtered = filtered.filter(c => c.type === selectedType);
  }
  
  if (selectedDifficulty) {
    filtered = filtered.filter(c => c.difficulty === selectedDifficulty);
  }
  
  return filtered;
};

// Check if a class type has the specified difficulty level
export const hasClassWithDifficulty = (typeId: string, difficultyId: string): boolean => {
  return enhancedClassData.some(
    classItem => classItem.type === typeId && classItem.difficulty === difficultyId
  );
};

// Get available difficulties for a class type
export const getAvailableDifficulties = (typeId: string): DifficultyLevel[] => {
  const availableDifficultyIds = new Set(
    enhancedClassData
      .filter(classItem => classItem.type === typeId)
      .map(classItem => classItem.difficulty)
  );
  
  return difficultyLevels.filter(level => availableDifficultyIds.has(level.id));
};

// New function to get available class types for a difficulty level
export const getAvailableClassTypes = (difficultyId: string): ClassType[] => {
  // For beginners, only show tricking classes
  if (difficultyId === 'beginner') {
    return classTypes.filter(type => type.id === 'tricking');
  }
  
  // For other difficulties, show all class types that have classes for that difficulty
  const availableTypeIds = new Set(
    enhancedClassData
      .filter(classItem => classItem.difficulty === difficultyId)
      .map(classItem => classItem.type)
  );
  
  return classTypes.filter(type => availableTypeIds.has(type.id));
};
