
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface BookingHistoryHeaderProps {
  onGoBack: () => void;
}

const BookingHistoryHeader: React.FC<BookingHistoryHeaderProps> = ({ onGoBack }) => {
  return (
    <>
      <Button 
        variant="outline" 
        className="mb-6" 
        onClick={onGoBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
      </div>
    </>
  );
};

export default BookingHistoryHeader;
