
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { BookingStep } from './types';

export interface UseBookingNavigationProps {
  selectedType: string | null;
  selectedDifficulty: string | null;
  selectedClass: any | null;
}

export const useBookingNavigation = ({
  selectedType,
  selectedDifficulty,
  selectedClass
}: UseBookingNavigationProps) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('difficulty');
  const { toast } = useToast();

  // Navigate to next step
  const goToNextStep = () => {
    switch (currentStep) {
      case 'difficulty':
        setCurrentStep('type');
        break;
      case 'type':
        setCurrentStep('schedule');
        break;
      case 'schedule':
        // Remove the validation here - it will be handled by the handleSelectClass function
        setCurrentStep('confirm');
        break;
      default:
        break;
    }
  };
  
  // Navigate to previous step
  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'type':
        setCurrentStep('difficulty');
        break;
      case 'schedule':
        setCurrentStep('type');
        break;
      case 'confirm':
        setCurrentStep('schedule');
        break;
      default:
        break;
    }
  };

  return {
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep
  };
};
