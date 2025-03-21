
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getAvailableDifficulties } from '@/lib/bookingData';
import { ClassData } from './types';

export const useClassSelection = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  
  // Mock user points data - in a real app this would come from a user context or API
  const userPoints = 15;
  
  // Auto-navigate when selecting a type with only one difficulty level
  useEffect(() => {
    if (!isResetting && selectedType) {
      const availableDifficulties = getAvailableDifficulties(selectedType);
      if (availableDifficulties.length === 1) {
        setSelectedDifficulty(availableDifficulties[0].id);
      }
    }
  }, [selectedType, isResetting]);
  
  // Internal state setter without validation
  const setSelectedTypeInternal = (type: string | null) => {
    setSelectedType(type);
  };
  
  // Class type selection handler with auto-navigation and validation
  const setSelectedTypeWithNavigation = (type: string) => {
    // Skip validation checks during reset operations
    if (isResetting) {
      setSelectedTypeInternal(type);
      return;
    }
    
    const availableDifficulties = getAvailableDifficulties(type);
    
    if (availableDifficulties.length === 0) {
      toast({
        title: "No Classes Available",
        description: "There are no classes available for this type. Please select a different class type.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedTypeInternal(type);
  };
  
  // Handle class selection
  const handleSelectClass = (classItem: ClassData) => {
    if (isResetting) {
      setSelectedClass(classItem);
      return;
    }
    
    if (userPoints < classItem.pointsCost) {
      toast({
        title: "Insufficient Course Cards",
        description: "You don't have enough course cards to book this class.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedClass(classItem);
  };
  
  // Reset all selections without triggering validation
  const resetSelections = () => {
    setIsResetting(true);
    setSelectedTypeInternal(null);
    setSelectedDifficulty(null);
    setSelectedClass(null);
    setSelectedDate(null);
    
    // Reset the resetting flag after a short delay
    setTimeout(() => {
      setIsResetting(false);
    }, 100);
  };

  return {
    selectedType,
    selectedDifficulty,
    selectedClass,
    selectedDate,
    userPoints,
    isResetting,
    setIsResetting,
    setSelectedType: setSelectedTypeWithNavigation,
    setSelectedDifficulty,
    setSelectedClass,
    setSelectedDate,
    handleSelectClass,
    resetSelections
  };
};
