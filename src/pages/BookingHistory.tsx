
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { getClassTypeDetails, enhancedClassData } from '@/lib/bookingData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBookingDate } from '@/hooks/booking/utils';
import { useToast } from '@/components/ui/use-toast';

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
  
  const getClassDetails = (classId: string) => {
    return enhancedClassData.find(c => c.id === classId) || enhancedClassData[0];
  };
  
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Button asChild variant="outline">
          <Link to="/booking">Book New Class</Link>
        </Button>
      </div>
      
      {mockBookingHistory.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl mb-4">You don't have any bookings yet</h2>
          <Button asChild>
            <Link to="/booking">Book a Class</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mockBookingHistory
                .filter(booking => booking.status === 'upcoming')
                .map(booking => {
                  const classDetails = getClassDetails(booking.classId);
                  const classType = getClassTypeDetails(classDetails.type);
                  
                  return (
                    <Card key={booking.id} className="border border-gray-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{classDetails.name}</CardTitle>
                            <CardDescription>{classType.name} Class</CardDescription>
                          </div>
                          <Badge className={classDetails.difficulty === 'beginner' ? 'bg-green-800/70' : 'bg-red-800/70'}>
                            {classDetails.difficulty === 'beginner' ? 'Beginner' : 'Advanced'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{format(booking.date, 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{classDetails.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>Tricking Club, Studio 3</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="mr-2 h-4 w-4" />
                            <span>Instructor: {classDetails.instructor}</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="destructive" 
                          className="w-full"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel Booking
                        </Button>
                      </Card>
                    </Card>
                  );
                })}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Past Classes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mockBookingHistory
                .filter(booking => booking.status === 'completed')
                .map(booking => {
                  const classDetails = getClassDetails(booking.classId);
                  const classType = getClassTypeDetails(classDetails.type);
                  
                  return (
                    <Card key={booking.id} className="border border-gray-800 opacity-80">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{classDetails.name}</CardTitle>
                            <CardDescription>{classType.name} Class</CardDescription>
                          </div>
                          <Badge className="bg-gray-800">Completed</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{format(booking.date, 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{classDetails.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>Tricking Club, Studio 3</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="mr-2 h-4 w-4" />
                            <span>Instructor: {classDetails.instructor}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingHistoryPage;
