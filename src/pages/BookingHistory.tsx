
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { enhancedClassData } from '@/lib/bookingData';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { getBookingDate } from '@/hooks/booking/utils';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingHistoryHeader from '@/components/booking-history/BookingHistoryHeader';
import BookingList from '@/components/booking-history/BookingList';

// Temporary booking history type
interface BookingHistory {
  id: string;
  classId: string;
  date: Date;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const BookingHistoryPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // For demo purposes, show the latest booked class as an upcoming booking
  // In a real app, this would come from an API or database
  const mockBookingHistory: BookingHistory[] = [
    {
      id: '1',
      classId: enhancedClassData[0].id,
      date: getBookingDate(enhancedClassData[0].day),
      status: 'upcoming'
    },
    {
      id: '2',
      classId: enhancedClassData[1].id,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      status: 'completed'
    }
  ];
  
  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been successfully cancelled.",
    });
    
    // In a real app, this would make an API call to cancel the booking
  };
  
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  
  const getClassDetails = (classId: string) => {
    return enhancedClassData.find(c => c.id === classId) || enhancedClassData[0];
  };
  
  if (!isAuthenticated) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your bookings</h1>
        <Button asChild>
          <Link to="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-10 flex-grow pt-24">
        <BookingHistoryHeader onGoBack={handleGoBack} />
        
        {mockBookingHistory.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl mb-4">You don't have any bookings yet</h2>
            <Button asChild>
              <Link to="/booking">Book a Class</Link>
            </Button>
          </div>
        ) : (
          <>
            <BookingList
              title="Upcoming Classes"
              bookings={mockBookingHistory}
              type="upcoming"
              getClassDetails={getClassDetails}
              onCancelBooking={handleCancelBooking}
            />
            
            <BookingList
              title="Past Classes"
              bookings={mockBookingHistory}
              type="past"
              getClassDetails={getClassDetails}
            />
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingHistoryPage;
