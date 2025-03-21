
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, ChevronRight, ChevronLeft, Flame, FlipHorizontal, Dumbbell, ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import { format } from 'date-fns';
import { getClassTypeDetails } from '@/lib/bookingData';
import { ClassData } from '@/hooks/useBookingState';

interface ConfirmationStepProps {
  selectedClass: ClassData;
  userPoints: number;
  onConfirm: () => void;
  onPrevious: () => void;
  getBookingDate: (day: string) => Date;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  selectedClass,
  userPoints,
  onConfirm,
  onPrevious,
  getBookingDate
}) => {
  if (!selectedClass) return null;
  
  // Always use 1 course card per class
  const courseCost = 1;
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onPrevious}
          className="mr-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="booking-highlight rounded-lg p-6 border">
            <h3 className="text-lg font-bold mb-4">Class Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Class Type</span>
                <span className="font-medium flex items-center">
                  {selectedClass.type === 'tricking' ? <Flame className="h-4 w-4 mr-1" /> :
                    selectedClass.type === 'flip' ? <FlipHorizontal className="h-4 w-4 mr-1" /> :
                    <Dumbbell className="h-4 w-4 mr-1" />}
                  {getClassTypeDetails(selectedClass.type).name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Class</span>
                <span className="font-medium">{selectedClass.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-medium flex items-center">
                  {selectedClass.difficulty === 'beginner' ? <ArrowDown className="h-4 w-4 mr-1" /> :
                    selectedClass.difficulty === 'intermediate' ? <ArrowRight className="h-4 w-4 mr-1" /> :
                    <ArrowUp className="h-4 w-4 mr-1" />}
                  {selectedClass.difficulty.charAt(0).toUpperCase() + selectedClass.difficulty.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Day</span>
                <span className="font-medium">{selectedClass.day}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{format(getBookingDate(selectedClass.day), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{selectedClass.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Instructor</span>
                <span className="font-medium">{selectedClass.instructor}</span>
              </div>
              <div className="border-t border-[hsl(var(--booking-border))] pt-3 mt-3">
                <div className="flex justify-between font-medium">
                  <span>Course Card Cost</span>
                  <span>{courseCost} card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="booking-highlight rounded-lg p-6 border mb-4">
            <h3 className="text-lg font-bold mb-4">Your Course Cards</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">Current Balance</span>
                <span className="font-medium">{userPoints} cards</span>
              </div>
              <div className="flex justify-between text-lg text-red-400">
                <span>Cost</span>
                <span>-{courseCost} card</span>
              </div>
              <div className="border-t border-[hsl(var(--booking-border))] pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Remaining Balance</span>
                  <span>{userPoints - courseCost} cards</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-800/50 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-300 mb-1">
                  Important Information
                </p>
                <p className="text-sm text-yellow-300">
                  Please arrive 10 minutes before class starts. Wear comfortable clothing and bring water.
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full h-14 text-lg" 
            onClick={onConfirm}
          >
            Confirm Booking
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
