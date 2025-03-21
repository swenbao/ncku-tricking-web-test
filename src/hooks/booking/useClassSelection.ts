
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
    if (selectedType) {
      const availableDifficulties = getAvailableDifficulties(selectedType);
      if (availableDifficulties.length === 1) {
        setSelectedDifficulty(availableDifficulties[0].id);
      }
    }
  }, [selectedType]);
  
  // Class type selection handler with auto-navigation
  const setSelectedTypeWithNavigation = (type: string) => {
    // Skip validation checks during reset operations
    if (isResetting) {
      setSelectedType(type);
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
    
    setSelectedType(type);
  };
  
  // Handle class selection
  const handleSelectClass = (classItem: ClassData) => {
    if (userPoints < classItem.pointsCost) {
      toast({
        title: "Insufficient Course Cards",
        description: "You don't have enough course cards to book this class.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedClass(classItem);
    // No navigation here - the component will handle navigation
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
    handleSelectClass
  };
};
