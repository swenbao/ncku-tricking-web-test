
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { ClassData } from './booking/types';
import { getBookingDate } from './booking/utils';
import { useBookingNavigation } from './booking/useBookingNavigation';
import { useClassSelection } from './booking/useClassSelection';

// Re-export types
export * from './booking/types';

export const useBookingState = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Initialize selection state with URL parameter
  const initialDifficulty = searchParams.get('difficulty') || null;
  
  // Use the improved class selection hook
  const {
    selectedType,
    selectedDifficulty: classSelectedDifficulty,
    selectedClass,
    selectedDate,
    userPoints,
    setSelectedType,
    setSelectedDifficulty: setClassSelectedDifficulty,
    setSelectedClass,
    setSelectedDate,
    handleSelectClass,
    resetSelections
  } = useClassSelection();
  
  // Override difficulty with URL parameter if present
  const selectedDifficulty = initialDifficulty || classSelectedDifficulty;
  const setSelectedDifficulty = setClassSelectedDifficulty;
  
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Setup booking navigation - must be called after useState hooks
  const {
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep
  } = useBookingNavigation({
    selectedType,
    selectedDifficulty,
    selectedClass
  });
  
  // Process booking
  const processBooking = () => {
    // In a real app, this would make an API call to create the booking
    setCurrentStep('complete');
    setBookingSuccess(true);
  };
  
  // Reset booking - completely refactored to fix the toast issue
  const resetBooking = () => {
    // First reset all selections without triggering validation
    resetSelections();
    
    // Reset booking success state
    setBookingSuccess(false);
    
    // Then set the step to difficulty
    setCurrentStep('difficulty');
  };
  
  return {
    currentStep,
    selectedType,
    selectedDifficulty,
    selectedClass,
    selectedDate,
    bookingSuccess,
    userPoints,
    setSelectedType,
    setSelectedDifficulty,
    setSelectedClass,
    goToNextStep,
    goToPreviousStep,
    processBooking,
    resetBooking,
    handleSelectClass,
    getBookingDate
  };
};
