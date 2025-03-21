
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <Button asChild variant="outline">
          <Link to="/booking">Book New Class</Link>
        </Button>
      </div>
    </>
  );
};

export default BookingHistoryHeader;
