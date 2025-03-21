
import React from 'react';
import { Button } from '@/components/ui/button';
import ClassInfoCard from '@/components/class/ClassInfoCard';

interface UpcomingBookingCardProps {
  id: string;
  date: Date;
  classDetails: any;
  onCancelBooking: (bookingId: string) => void;
}

const UpcomingBookingCard: React.FC<UpcomingBookingCardProps> = ({
  id,
  date,
  classDetails,
  onCancelBooking
}) => {
  return (
    <ClassInfoCard
      classDetails={classDetails}
      date={date}
      status="upcoming"
      showLocation={true}
      showInstructor={true}
      additionalContent={
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => onCancelBooking(id)}
        >
          Cancel Booking
        </Button>
      }
    />
  );
};

export default UpcomingBookingCard;
