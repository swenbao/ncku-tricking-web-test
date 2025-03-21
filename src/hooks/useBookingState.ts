
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
  
  // Use modular hooks
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
    handleSelectClass
  } = useClassSelection();
  
  // Override difficulty with URL parameter if present
  const selectedDifficulty = initialDifficulty || classSelectedDifficulty;
  const setSelectedDifficulty = setClassSelectedDifficulty;
  
  // Setup booking navigation
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
  
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Process booking
  const processBooking = () => {
    // In a real app, this would make an API call to create the booking
    setCurrentStep('complete');
    setBookingSuccess(true);
  };
  
  // Reset booking - improved to directly jump to difficulty step
  const resetBooking = () => {
    // First reset the current step directly to difficulty
    setCurrentStep('difficulty');
    
    // Then clear all selections after navigation
    // This prevents any validation errors from the current step
    setTimeout(() => {
      setSelectedType(null);
      setSelectedDifficulty(null);
      setSelectedClass(null);
      setSelectedDate(null);
      setBookingSuccess(false);
    }, 10);
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
