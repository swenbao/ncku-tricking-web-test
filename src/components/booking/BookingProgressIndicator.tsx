
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { BookingStep } from '@/hooks/useBookingState';

interface BookingProgressIndicatorProps {
  currentStep: BookingStep;
}

const BookingProgressIndicator: React.FC<BookingProgressIndicatorProps> = ({ currentStep }) => {
  const steps: BookingStep[] = ['difficulty', 'type', 'schedule', 'confirm', 'complete'];
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center w-1/5">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mb-2 text-sm font-medium transition-colors",
              currentStep === step 
                ? "bg-red-500 text-white" 
                : currentStep === 'complete' || (index < steps.indexOf(currentStep))
                  ? "bg-green-500 text-white"
                  : "bg-gray-800 text-gray-300"
            )}>
              {currentStep === 'complete' || (index < steps.indexOf(currentStep)) 
                ? <CheckCircle2 className="h-5 w-5" /> 
                : index + 1}
            </div>
            <span className={cn(
              "text-xs font-medium text-center",
              currentStep === step ? "text-white" : "booking-text-muted"
            )}>
              {step === 'difficulty' && "Difficulty"}
              {step === 'type' && "Class Type"}
              {step === 'schedule' && "Schedule"}
              {step === 'confirm' && "Confirm"}
              {step === 'complete' && "Complete"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {/* Show 4 progress bars connecting the 5 steps */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className={cn(
              "h-1 rounded", 
              steps.indexOf(currentStep) > i || currentStep === 'complete' 
                ? "bg-green-500" 
                : "bg-gray-800"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BookingProgressIndicator;
