
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
        if (selectedDifficulty) {
          setCurrentStep('type');
        } else {
          toast({
            title: "Please Select a Difficulty Level",
            description: "You need to select a difficulty level to proceed.",
            variant: "destructive",
          });
        }
        break;
      case 'type':
        if (selectedType) {
          setCurrentStep('schedule');
        } else {
          toast({
            title: "Please Select a Class Type",
            description: "You need to select a class type to proceed.",
            variant: "destructive",
          });
        }
        break;
      case 'schedule':
        if (selectedClass) {
          setCurrentStep('confirm');
        } else {
          toast({
            title: "Please Select a Class",
            description: "You need to select a class to proceed.",
            variant: "destructive",
          });
        }
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
