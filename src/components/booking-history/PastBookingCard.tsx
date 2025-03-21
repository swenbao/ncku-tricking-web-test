
import React from 'react';
import ClassInfoCard from '@/components/class/ClassInfoCard';

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
  return (
    <ClassInfoCard
      classDetails={classDetails}
      date={date}
      status="completed"
      showLocation={true}
      showInstructor={true}
    />
  );
};

export default PastBookingCard;
