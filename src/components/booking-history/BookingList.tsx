
import React from 'react';
import UpcomingBookingCard from './UpcomingBookingCard';
import PastBookingCard from './PastBookingCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BookingHistory {
  id: string;
  classId: string;
  date: Date;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface BookingListProps {
  title: string;
  bookings: BookingHistory[];
  type: 'upcoming' | 'past';
  getClassDetails: (classId: string) => any;
  onCancelBooking?: (bookingId: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({
  title,
  bookings,
  type,
  getClassDetails,
  onCancelBooking
}) => {
  const filteredBookings = bookings.filter(booking => 
    type === 'upcoming' ? booking.status === 'upcoming' : booking.status === 'completed'
  );
  
  if (filteredBookings.length === 0 && type === 'upcoming' && bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl mb-4">You don't have any bookings yet</h2>
        <Button asChild>
          <Link to="/booking">Book a Class</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {filteredBookings.map(booking => {
          const classDetails = getClassDetails(booking.classId);
          
          return type === 'upcoming' ? (
            <UpcomingBookingCard
              key={booking.id}
              id={booking.id}
              date={booking.date}
              classDetails={classDetails}
              onCancelBooking={onCancelBooking || (() => {})}
            />
          ) : (
            <PastBookingCard
              key={booking.id}
              id={booking.id}
              date={booking.date}
              classDetails={classDetails}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BookingList;
