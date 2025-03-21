
import React from 'react';
import { BookingStep } from '@/hooks/booking/types';

interface BookingNavigationProps {
  currentStep: BookingStep;
  onPrevious: () => void;
  onNext: () => void;
  showContinueButton: boolean;
}

const BookingNavigation: React.FC<BookingNavigationProps> = ({
  currentStep,
  onPrevious,
  onNext,
  showContinueButton = false
}) => {
  // Simply return null for all steps - this component is no longer being used for navigation
  return null;
};

export default BookingNavigation;
