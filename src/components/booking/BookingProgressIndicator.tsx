
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { BookingStep } from '@/hooks/useBookingState';

interface BookingProgressIndicatorProps {
  currentStep: BookingStep;
}

const BookingProgressIndicator: React.FC<BookingProgressIndicatorProps> = ({ currentStep }) => {
  const steps: BookingStep[] = ['type', 'difficulty', 'schedule', 'confirm', 'complete'];
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center w-1/5">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mb-2 text-sm font-medium transition-colors",
              currentStep === step 
                ? "bg-primary text-primary-foreground" 
                : currentStep === 'complete' || (index < steps.indexOf(currentStep))
                  ? "bg-green-500 text-white"
                  : "bg-gray-600 text-gray-300"
            )}>
              {currentStep === 'complete' || (index < steps.indexOf(currentStep)) 
                ? <CheckCircle2 className="h-5 w-5" /> 
                : index + 1}
            </div>
            <span className={cn(
              "text-xs font-medium text-center",
              currentStep === step ? "text-primary" : "booking-text-muted"
            )}>
              {step === 'type' && "Class Type"}
              {step === 'difficulty' && "Difficulty"}
              {step === 'schedule' && "Schedule"}
              {step === 'confirm' && "Confirm"}
              {step === 'complete' && "Complete"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-2">
        <div className={cn("h-1 rounded", currentStep === 'type' ? "bg-gray-600" : "bg-green-500")}></div>
        <div className={cn("h-1 rounded", currentStep === 'type' || currentStep === 'difficulty' ? "bg-gray-600" : "bg-green-500")}></div>
        <div className={cn("h-1 rounded", currentStep === 'type' || currentStep === 'difficulty' || currentStep === 'schedule' ? "bg-gray-600" : "bg-green-500")}></div>
        <div className={cn("h-1 rounded", currentStep !== 'complete' ? "bg-gray-600" : "bg-green-500")}></div>
      </div>
    </div>
  );
};

export default BookingProgressIndicator;
