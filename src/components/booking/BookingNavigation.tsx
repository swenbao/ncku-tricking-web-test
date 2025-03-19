
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BookingStep } from '@/hooks/useBookingState';

interface BookingNavigationProps {
  currentStep: BookingStep;
  onPrevious: () => void;
  onNext: () => void;
}

const BookingNavigation: React.FC<BookingNavigationProps> = ({
  currentStep,
  onPrevious,
  onNext
}) => {
  if (currentStep === 'complete') return null;
  
  return (
    <div className="px-6 py-4 border-t border-[hsl(var(--booking-border))] flex justify-between">
      {currentStep !== 'type' ? (
        <Button
          variant="outline"
          onClick={onPrevious}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      {currentStep !== 'confirm' && (
        <Button
          onClick={onNext}
        >
          {currentStep === 'type' ? 'Choose Difficulty' : 
            currentStep === 'difficulty' ? 'Select Schedule' : 
            'Continue'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default BookingNavigation;
