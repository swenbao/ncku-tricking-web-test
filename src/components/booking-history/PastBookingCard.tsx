
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { getClassTypeDetails } from '@/lib/bookingData';

interface PastBookingCardProps {
  id: string;
  date: Date;
  classDetails: any;
}

const PastBookingCard: React.FC<PastBookingCardProps> = ({
  id,
  date,
  classDetails
}) => {
  const classType = getClassTypeDetails(classDetails.type);
  
  return (
    <Card key={id} className="border border-gray-800 opacity-80">
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
      </CardContent>
    </Card>
  );
};

export default PastBookingCard;
