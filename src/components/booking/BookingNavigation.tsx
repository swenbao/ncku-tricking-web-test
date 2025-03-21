
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
  if (currentStep === 'complete') return null;
  
  return (
    <div className="px-6 py-4 border-t border-[hsl(var(--booking-border))]">
      {/* Navigation footer is now empty but we're keeping the container for consistent spacing */}
    </div>
  );
};

export default BookingNavigation;
