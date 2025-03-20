
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
  showContinueButton = true
}) => {
  if (currentStep === 'complete') return null;
  
  return (
    <div className="px-6 py-4 border-t border-[hsl(var(--booking-border))] flex justify-end">
      {currentStep !== 'confirm' && showContinueButton && (
        <Button
          onClick={onNext}
        >
          {currentStep === 'type' ? 'Choose Difficulty' : 
            currentStep === 'difficulty' ? 'Select Class Type' : 
            'Continue'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default BookingNavigation;
