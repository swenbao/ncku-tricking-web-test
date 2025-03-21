
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { getClassTypeDetails } from '@/lib/bookingData';

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
  const classType = getClassTypeDetails(classDetails.type);
  
  return (
    <Card key={id} className="border border-gray-800">
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
            <span>{format(date, 'EEEE, MMMM d, yyyy')}</span>
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
          onClick={() => onCancelBooking(id)}
        >
          Cancel Booking
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingBookingCard;
