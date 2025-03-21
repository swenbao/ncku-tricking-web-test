
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { getClassTypeDetails } from '@/lib/bookingData';
import { ClassData } from '@/hooks/useBookingState';
import { Link } from 'react-router-dom';

interface CompletionStepProps {
  selectedClass: ClassData;
  onReset: () => void;
  getBookingDate: (day: string) => Date;
}

const CompletionStep: React.FC<CompletionStepProps> = ({
  selectedClass,
  onReset,
  getBookingDate
}) => {
  if (!selectedClass) return null;
  
  return (
    <div className="p-6 text-center">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-green-900/30 p-3">
          <CheckCircle2 className="h-16 w-16 text-green-400" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
      <p className="text-muted-foreground mb-8">
        Your class has been booked successfully. We look forward to seeing you!
      </p>
      
      <div className="max-w-md mx-auto booking-highlight rounded-lg p-6 border mb-8">
        <h3 className="text-lg font-bold mb-4 text-left">Booking Details</h3>
        
        <div className="space-y-4 text-left">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Class</span>
            <span className="font-medium">{selectedClass.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium">{getClassTypeDetails(selectedClass.type).name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{format(getBookingDate(selectedClass.day), 'EEEE, MMMM d, yyyy')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time</span>
            <span className="font-medium">{selectedClass.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location</span>
            <span className="font-medium">Tricking Club, Studio 3</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          className="min-w-[200px]" 
          onClick={onReset}
        >
          Book Another Class
        </Button>
        
        <Button 
          className="min-w-[200px]"
          variant="outline"
          asChild
        >
          <Link to="/booking-history">
            View My Bookings
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
